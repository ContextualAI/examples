# ArXiv Research Pipeline with Contextual AI

Multi-agent CrewAI system that searches ArXiv papers, process them with Contextual AI to create a datastore and agent, and answers queries based on the documents in the datastore.

## Features

- **ArXiv Search**: Downloads relevant research papers (the first 2 papers are selected for ingestion)
- **Automatic Processing**: Creates Contextual AI datastore and agent
- **Intelligent Q&A**: Answers questions based on processed papers

## Setup

1. Install dependencies:
```bash
pip install crewai python-dotenv contextual-client arxiv
```

2. Set environment variables in `.env`:
```
CONTEXTUAL_API_KEY=your_contextual_api_key_here
```

## Usage

```bash
python main.py
```

The system will prompt for:
- Research topic for ArXiv search
- Question about the papers

## Workflow

1. **ArXiv Researcher**: Downloads relevant papers to `./arxiv_pdfs/`
2. **Document Processor**: Creates Contextual AI agent using `create_with_documents`
3. **Knowledge Assistant**: Queries the agent (with automatic document status checking) after document ingestion is finished. 


## Example

```
Search: transformer attention mechanisms
Question: What are some key ideas and novelties in the papers in your datastore?
```

