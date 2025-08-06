import os
from dotenv import load_dotenv
from crewai import Crew, Process
from agents import arxiv_researcher, document_processor, knowledge_assistant
from tasks import create_tasks
import glob

# Load environment variables
load_dotenv()

def main():
    """Main function to run the simplified multi-agent research pipeline"""
    
    print("=" * 60)
    print("ArXiv Research Pipeline with Contextual AI")
    print("=" * 60)
    
    search_query = input("Enter your research topic for ArXiv search: ").strip()
    if not search_query:
        search_query = "transformer neural networks"
        print(f"Using default: {search_query}")
    
    user_question = input("Enter your question about the papers: ").strip()
    if not user_question:
        user_question = "What are the key innovations in transformer architectures?"
        print(f"Using default: {user_question}")
    
    print(f"\nSearch: {search_query}")
    print(f"Question: {user_question}")
    print("=" * 60)
    
    # Create tasks
    tasks = create_tasks(search_query, user_question)
    
    # Create crew (simplified - no document status checker needed)
    crew = Crew(
        agents=[arxiv_researcher, document_processor, knowledge_assistant],
        tasks=tasks,
        process=Process.sequential,
        verbose=True
    )
    
    try:
        print("\nStarting pipeline to ")
        print("1. Download ArXiv papers, ")
        print("2. Create Contextual AI agent with documents, ")
        print("3. Answer your question based on the documents provided.")
        print("-" * 60)
        
        result = crew.kickoff()
        
        print("\n" + "=" * 60)
        print("FINAL RESULT")
        print("=" * 60)
        print(result)
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return False
    
    return True

if __name__ == "__main__":
    main()
