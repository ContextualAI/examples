# Research Crew with Contextual AI and ArXiv Tools

A multi-agent CrewAI system that searches ArXiv papers, processes them with Contextual AI tools, and answers queries based on the documents.

## Multi-agent Workflow

The research crew consists of 3 specialized agents, each equipped with a dedicated tool:

- **ArXiv Researcher**: Downloads relevant research papers to `./arxiv_pdfs/` based on the user's research topic using `ArxivPaperTool`.
- **Document Processor**: Ingests the downloaded papers into a new Contextual AI datastore and initializes a RAG agent using `ContextualAICreateAgentTool`.
- **Knowledge Assistant**: Uses `ContextualAIQueryTool` to answer user queries with responses grounded in the research papers. The tool automatically waits for document processing completion before querying.

## Architecture Diagram

```
┌─────────────┐
│ User Inputs │
│ • Topic     │
│ • Question  │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────┐
│                    CrewAI Crew (Sequential)                │
│                                                             │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐   │
│  │   Agent 1   │────▶│   Agent 2   │────▶│   Agent 3   │   │
│  │   ArXiv     │     │  Document   │     │ Knowledge   │   │
│  │ Researcher  │     │ Processor   │     │ Assistant   │   │
│  └─────────────┘     └─────────────┘     └─────────────┘   │
│         │                     │                     │       │
│         ▼                     ▼                     ▼       │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐   │
│  │ArxivPaper   │     │DocumentProc │     │StateAware   │   │
│  │Tool         │     │Tool         │     │Contextual   │   │
│  │             │     │             │     │Tool         │   │
│  └─────────────┘     └─────────────┘     └─────────────┘   │
└─────────────────────────────────────────────────────────────┘
       │                     │                     │
       ▼                     ▼                     ▼
┌─────────────┐     ┌─────────────────────┐     ┌─────────────┐
│   ArXiv     │     │   Contextual AI     │     │ Final Answer│
│    API      │     │   Service           │     │ (unmodified │
│             │     │ • create_with_docs  │     │  response)  │
│Downloads    │     │ • agent_id stored   │     │             │
│2 PDFs to    │     │ • datastore_id      │     │             │
│./arxiv_pdfs │     │   stored in         │     │             │
│             │     │   PipelineState     │     │             │
└─────────────┘     └─────────────────────┘     └─────────────┘
```

## Setup

1. Install dependencies:
```bash
pip install crewai python-dotenv contextual-client arxiv
```

2. Configure environment variables in `.env`:
```
CONTEXTUAL_API_KEY={your_contextualai_api_key}
OPENAI_API_KEY={your_openai_api_key}
```

## Usage

```bash
python main.py
```

Enter your prompts when prompted:
```
Enter your research topic for ArXiv search: 
Enter your question about the papers: 
```

## Example

For the research topic, enter:
```
vision transformer
```

For the query, enter:
```
What novel methods are discussed in the papers?              
```

After document processing, the agent returns responses such as:
```
The paper introduces Group-wise Transformation as a novel approach to achieve a lightweight yet general Transformer network, termed LW-Transformer. Specifically, the documentation reveals two key methodological innovations: ...
```