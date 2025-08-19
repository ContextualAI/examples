from crewai import Task
from agents import arxiv_researcher, document_processor, knowledge_assistant

def create_tasks(search_query: str, user_question: str):
    """Create tasks with user-provided search query and question"""
    
    arxiv_search_task = Task(
        description=f"""
        Search ArXiv for papers related to: "{search_query}"
        Download 2 PDF papers that are most relevant to the topic.
        After downloading, output the EXACT file paths of the downloaded PDFs.
        Example output format: "Downloaded PDFs: ./arxiv_pdfs/2204_07780v1.pdf, ./arxiv_pdfs/2305_09880v4.pdf"
        """,
        agent=arxiv_researcher,
        expected_output="Exact file paths of downloaded PDFs in format: './arxiv_pdfs/filename.pdf, ./arxiv_pdfs/filename2.pdf'"
    )

    document_processing_task = Task(
        description=f"""
        Create a Contextual AI RAG pipeline using the exact PDF file paths from the previous task output.
        If the file paths are not found, consider replace dot "." with underscore "_" and then try again. 
        For example: the incorrect file path "./arxiv_pdfs/2204.07780v1.pdf" should be changed to the correct "./arxiv_pdfs/2204_07780v1.pdf"
        
        Use ContextualCreateAgentTool with:
        - agent_name: "Research Paper Assistant"
        - agent_description: "AI assistant with access to research papers on {search_query}"
        - datastore_name: "Research Papers Knowledge Base"
        - document_paths: [use the exact file paths from the previous task output]
        """,
        agent=document_processor,
        expected_output="Success message confirming agent and datastore creation. Print out the exact agent and datastore IDs.",
        depends_on=[arxiv_search_task]
    )

    knowledge_query_task = Task(
        description=f"""
        Answer this question using the processed research papers: "{user_question}"
        Use ContextualQueryTool to query the papers.
        Use the exact agent and datastore IDs created from the previous task.
        Report the exact answer from ContextualQueryTool. Do not make up any new information. 
        """,
        agent=knowledge_assistant,
        expected_output=f"Complete answer to '{user_question}' based on the query results from the research papers.",
        depends_on=[document_processing_task]
    )

    return [arxiv_search_task, document_processing_task, knowledge_query_task]
