# Contextual AI Workshop: Build Production-Ready AI Agents in 15 Minutes

## Overview

Forget RAG Pipelines — Build Production-Ready AI Agents in 15 Minutes! This workshop demonstrates how you can deploy Agentic RAG in minutes using Contextual AI's managed RAG solution. We'll explore how Contextual handles intelligent parsing and chunking of your data, retrieves information with state-of-the-art accuracy, and generates responses with a multi-layered set of guardrails against hallucinations.

**What You'll Build**: An end-to-end Agentic RAG pipeline for financial data analysis that can answer questions across multiple documents with high accuracy and proper citations.

**Time Required**: Under 15 minutes for a fully functional RAG agent

## What You'll Learn

This workshop covers everything you need to set up a production-ready RAG agent:

- **Creating a RAG Agent** - Set up datastores, ingest documents, and configure agents
- **Querying a RAG Agent** - Submit questions and receive accurate, cited responses  
- **Evaluating a RAG Agent** - Measure performance using LMUnit evaluation framework
- **Improving the RAG Agent** - Update prompts and fine-tune responses

As well as bonus materials: 
- **API Integration** - Use Contextual's standalone APIs (Parse, Rerank, Generate, LMUnit)
- **MCP Integration** - Connect your agent to existing systems via Model Context Protocol

## Workshop Content

### 1. Agent Setup (5 minutes)
- Create a Contextual AI workspace and API key
- Set up a datastore for secure document storage
- Ingest financial documents (quarterly reports, revenue slides, research papers)
- Configure an intelligent agent with custom system prompts

### 2. Document Processing
The workshop uses real financial documents including:
- **A_Rev_by_Mkt_Qtrly_Trend_Q425.pdf** - Market quarterly revenue trends
- **B_Q423-Qtrly-Revenue-by-Market-slide.pdf** - Quarterly revenue breakdowns
- **C_Neptune.pdf** - Research on spurious correlations (Neptune distance vs. burglary rates)
- **D_Unilever.pdf** - Corporate financial data

### 3. Agent Querying (3 minutes)
Learn to:
- Submit complex, multi-document questions
- Receive responses with proper source citations
- Handle follow-up questions with conversation context
- Query across different document types and formats

### 4. Evaluation Framework (4 minutes)
- Use the **LMUnit** evaluation endpoint to assess agent performance
- Evaluate responses against predefined question-answer pairs
- Measure accuracy, relevance, and citation quality
- Analyze performance metrics and identify improvement areas

### 5. Advanced Features (3 minutes)
- **Parse API**: Extract structured data from complex documents
- **Rerank API**: Improve search result relevance
- **Generate API**: Customize response generation
- **MCP Integration**: Connect to external tools and databases

## Key Features Demonstrated

### Intelligent Document Processing
- Automatic parsing and chunking of complex financial documents
- Support for PDFs, slides, and mixed document formats
- Metadata extraction and document organization

### State-of-the-Art Retrieval
- Semantic search across multiple documents
- Context-aware information retrieval
- Accurate source attribution and citations

### Multi-Layered Guardrails
- Hallucination prevention mechanisms
- Response accuracy verification
- Source-grounded answer generation

### Production-Ready Architecture
- Secure datastore management
- API-first design for easy integration
- Scalable agent deployment

## Getting Started

### Prerequisites
- Google Colab account (or local Jupyter environment)
- Contextual AI workspace ([Sign up free](https://app.contextual.ai/))
- API key from your Contextual workspace

### Quick Start
1. Open the workshop notebook: `Contextual_workshop.ipynb`
2. Set up your `CONTEXTUAL_API_KEY` in Colab secrets
3. Follow the step-by-step instructions
4. Have a working RAG agent in under 15 minutes!

## Workshop Resources

### Live Workshop Materials
- 📊 **Slide Deck**: [contextual.ai/workshop](https://contextual.ai/workshop)
- 💻 **Colab Notebook**: [Workshop notebook](https://colab.research.google.com/drive/1JmO0GOycelMFvKF8CkCmJI0dSk2SeGjp?usp=sharing) or find the jupyter notebook in this directory
- 📚 **Documentation**: [docs.contextual.ai](https://docs.contextual.ai/)

### Previous Workshop Recording
- 🎥 **YouTube Recording**: [Watch the previous workshop](https://www.youtube.com/watch?v=lArgRvBV3tQ)

### Additional Examples
- 🔗 **Parse API Demo**: [03-standalone-api/04-parse](../03-standalone-api/04-parse/)
- 🔗 **Rerank API Demo**: [03-standalone-api/03-rerank](../03-standalone-api/03-rerank/)
- 🔗 **Generate API Demo**: [03-standalone-api/02-generate](../03-standalone-api/02-generate/)
- 🔗 **LMUnit Demo**: [03-standalone-api/01-lmunit](../03-standalone-api/01-lmunit/)

## Sample Questions You Can Ask

After completing the workshop, your agent will be able to answer complex questions like:

- "What was NVIDIA's Data Center revenue in Q4 FY25?"
- "How did NVIDIA's total revenue change from Q1 FY22 to Q4 FY25?"
- "What are the four main reasons why spurious correlations work?"
- "Why should we be skeptical of the correlation between Unilever's revenue and Google searches for 'lost my wallet'?"
- "When did NVIDIA's data center revenue overtake gaming revenue?"

## Integration Options

### Model Context Protocol (MCP)
Connect your RAG agent to existing tools and workflows:
- **Local MCP Servers**: [Documentation](https://docs.contextual.ai/user-guides/mcp-server)
- **GitHub Integration**: [contextual-mcp-server](https://github.com/ContextualAI/contextual-mcp-server)

### API Integration
Use Contextual's APIs in your existing applications:
- REST API endpoints for all functionality
- Python client library (`pip install contextual-client`)
- Streaming responses for real-time applications

## Support

- 📧 **Email**: info@contextual.ai
- 📖 **Documentation**: [docs.contextual.ai](https://docs.contextual.ai/)
- 🏢 **Platform**: [app.contextual.ai](https://app.contextual.ai/)

---

**Ready to get started?** Open `Contextual_workshop.ipynb` and build your first production-ready AI agent in under 15 minutes! 