from crewai import Task
from agents import arxiv_researcher, document_processor, knowledge_assistant

def create_tasks(search_query: str, user_question: str):
    """Create tasks with user-provided search query and question"""
    
    arxiv_search_task = Task(
        description=f"""
        Search ArXiv for papers related to: "{search_query}"
        Download exactly 2 PDF papers that are most relevant to the topic.
        Provide a brief summary of each downloaded paper including title and author.
        Ensure PDFs are saved to ./arxiv_pdfs directory.
        """,
        agent=arxiv_researcher,
        expected_output="Summary of exactly 2 downloaded papers with titles and authors. Confirm PDFs saved in ./arxiv_pdfs."
    )

    document_processing_task = Task(
        description=f"""
        Create a Contextual AI RAG pipeline from the downloaded research papers.
        
        Use the Document Processor tool with search topic: "{search_query}"
        
        This will:
        1. Find PDF files in ./arxiv_pdfs directory (limited to 2)
        2. Create agent and datastore using create_with_documents
        3. Upload and process documents automatically
        
        The system will automatically store the agent and datastore IDs for the next task.
        """,
        agent=document_processor,
        expected_output="Success message confirming agent and datastore creation with file upload count.",
        depends_on=[arxiv_search_task]
    )

    knowledge_query_task = Task(
        description=f"""
        Answer this question using the processed research papers: "{user_question}"
        
        Use your assigned ContextualTool to query the research papers. The tool automatically:
        - Connects to the created agent and datastore
        - Waits for document processing to complete
        - Queries the processed documents
        
        Use the tool's response directly as your final answer. Do not:
        - Add your own interpretations or opinions
        - Modify or paraphrase the tool's response  
        - Remove any information from the tool's answer
        - Add additional context beyond what the tool provides
        
        Simply return the complete, unmodified response from the ContextualTool query.
        """,
        agent=knowledge_assistant,
        expected_output=f"The complete, unmodified response from the ContextualTool query about '{user_question}'.",
        depends_on=[document_processing_task]
    )

    return [arxiv_search_task, document_processing_task, knowledge_query_task]
