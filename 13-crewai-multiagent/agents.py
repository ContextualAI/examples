import sys
import os
from dotenv import load_dotenv
import glob
from typing import Type
from pydantic import BaseModel, Field
from crewai.tools import BaseTool
sys.path.append('/Users/qj/Desktop/crewAI-tools')

# Load environment variables
load_dotenv()

from crewai import Agent
from crewai_tools.tools.arxiv_paper_tool.arxiv_paper_tool import ArxivPaperTool
from crewai_tools.tools.contextual_tool.contextual_tool import ContextualTool

# Shared state for pipeline
class PipelineState:
    agent_id = None
    datastore_id = None

pipeline_state = PipelineState()

# Custom tool for creating Contextual AI agent with documents
class DocumentProcessorSchema(BaseModel):
    search_topic: str = Field(..., description="The research topic used for naming the agent and datastore")

class DocumentProcessorTool(BaseTool):
    name: str = "Document Processor"
    description: str = "Create Contextual AI agent from PDF files using create_with_documents method"
    args_schema: Type[BaseModel] = DocumentProcessorSchema
    api_key: str = Field(..., description="Contextual AI API key")
    
    def _run(self, search_topic: str) -> str:
        try:
            # Find all PDF files
            all_pdf_files = glob.glob("./arxiv_pdfs/*.pdf")
            if not all_pdf_files:
                return "Error: No PDF files found in ./arxiv_pdfs directory"
            
            pdf_files = all_pdf_files[:2]  # Take only first 2 PDFs for a quick demo
            
            # Use create_with_documents to set up complete pipeline
            tool = ContextualTool.create_with_documents(
                api_key=self.api_key,
                agent_name=f"Research Paper Assistant",
                agent_description=f"AI assistant with access to research papers on {search_topic}",
                datastore_name="Research Papers Knowledge Base",
                document_paths=pdf_files,
                name="Research Query Tool",
                description="Query research papers with built-in document status checking"
            )
            
            # Update shared state
            pipeline_state.agent_id = tool.agent_id
            pipeline_state.datastore_id = tool.datastore_id
            
            return f"SUCCESS: Created agent {tool.agent_id} with datastore {tool.datastore_id}, uploaded {len(pdf_files)} files"
            
        except Exception as e:
            return f"Error creating Contextual AI agent: {str(e)}"

# State-aware ContextualTool
class StateAwareContextualTool(ContextualTool):
    def _run(self, query: str) -> str:
        self.agent_id = pipeline_state.agent_id
        self.datastore_id = pipeline_state.datastore_id
        return super()._run(query)

# Initialize tools
arxiv_tool = ArxivPaperTool(download_pdfs=True, save_dir="./arxiv_pdfs")

# Get API key
contextual_api_key = os.getenv("CONTEXTUAL_API_KEY")
if not contextual_api_key:
    raise ValueError("CONTEXTUAL_API_KEY environment variable is required")

# Create specialized tools
document_processor_tool = DocumentProcessorTool(api_key=contextual_api_key)
contextual_query_tool = StateAwareContextualTool(api_key=contextual_api_key)

# Define agents
arxiv_researcher = Agent(
    role="ArXiv Research Specialist",
    goal="Search and download exactly 2 academic papers from ArXiv based on user queries",
    backstory="You are an expert at finding the most relevant academic papers on ArXiv. You carefully select and download exactly 2 high-quality PDFs that best match the research topic.",
    tools=[arxiv_tool],
    verbose=True,
    allow_delegation=False
)

document_processor = Agent(
    role="Document Processing Specialist", 
    goal="Create complete RAG pipeline from downloaded research papers using Contextual AI",
    backstory="You specialize in setting up knowledge bases from academic documents. You use Contextual AI's create_with_documents method to build complete RAG pipelines with automatic document processing and status checking.",
    tools=[document_processor_tool],
    verbose=True,
    allow_delegation=False
)

knowledge_assistant = Agent(
    role="Research Knowledge Assistant",
    goal="Answer questions by directly querying the document knowledge base and returning complete tool responses",
    backstory="You are a research assistant that queries processed academic documents using your ContextualTool. You always return the complete, unmodified response from the tool without adding, removing, or changing any information. You do not interpret or paraphrase - you pass through the exact answer from the knowledge base.",
    tools=[contextual_query_tool],
    verbose=True,
    allow_delegation=False
)
