import os
from dotenv import load_dotenv
load_dotenv()

from crewai import Agent
from crewai_tools.tools.arxiv_paper_tool.arxiv_paper_tool import ArxivPaperTool
from crewai_tools import ContextualAICreateAgentTool, ContextualAIQueryTool

# Initialize tools
arxiv_tool = ArxivPaperTool(download_pdfs=True, save_dir="./arxiv_pdfs", use_title_as_filename=False)
create_agent_tool = ContextualAICreateAgentTool(api_key=os.getenv("CONTEXTUAL_API_KEY")) # , set_env_vars=False
query_tool = ContextualAIQueryTool(api_key=os.getenv("CONTEXTUAL_API_KEY")) # , use_env_vars=False

# Define agents
arxiv_researcher = Agent(
    role="ArXiv Research Specialist",
    goal="Search and download at most 2 academic papers from ArXiv based on user queries",
    backstory="You are an expert at finding the most relevant academic papers on ArXiv. You carefully select and download at most 2 PDFs that best match the research topic.",
    tools=[arxiv_tool],
    verbose=True,
    allow_delegation=False
)

document_processor = Agent(
    role="Document Processing Specialist", 
    goal="Create complete RAG pipeline from downloaded research papers using Contextual AI",
    backstory="You specialize in setting up knowledge bases from academic documents. You use ContextualCreateAgentTool to build complete RAG pipelines with automatic document processing and agent creation and report the datastore and agent IDs.",
    tools=[create_agent_tool],
    verbose=True,
    allow_delegation=False
)

knowledge_assistant = Agent(
    role="Research Knowledge Assistant",
    goal="Answer questions by directly querying the document knowledge base and returning complete tool responses",
    backstory="You are a research assistant that queries processed academic documents using ContextualQueryTool. You always return the complete, unmodified response from the tool without adding, removing, or changing any information. You do not interpret or paraphrase - you pass through the exact answer from the knowledge base.",
    tools=[query_tool],
    verbose=True,
    allow_delegation=False
)
