import os
os.environ.clear()

from dotenv import load_dotenv
from crewai import Crew, Process
from agents import arxiv_researcher, document_processor, knowledge_assistant
from tasks import create_tasks
load_dotenv()

def main():    
    print("=" * 60)
    print("ArXiv Research Pipeline with Contextual AI")
    print("=" * 60)
    search_query = input("Enter your research topic for ArXiv search: ").strip()
    user_question = input("Enter your question about the papers: ").strip()
    print("=" * 60)
    
    # Create tasks
    tasks = create_tasks(search_query, user_question)
    
    # Create crew 
    crew = Crew(
        agents=[arxiv_researcher, document_processor, knowledge_assistant],
        tasks=tasks,
        process=Process.sequential,
        verbose=True
    )

    result = crew.kickoff()
    print("\n" + "=" * 60)
    print("FINAL RESULT")
    print("=" * 60)
    print(result)

if __name__ == "__main__":
    main()