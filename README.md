# 🌟 Contextual API Examples

Welcome to our collection of example notebooks showcasing the power of Contextual's AI platform! 🚀

## 🎯 Overview

This repository contains practical examples and demonstrations of how to interact with Contextual's API, helping you get started quickly and efficiently. You can run these examples in any jupyter notebook but an easy way to get started is Colab notebooks:

<a target="_blank" href="https://colab.research.google.com/github/ContextualAI/examples/blob/main/01-getting-started/end-to-end-example.ipynb">
  <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>

## Table of Contents

### Getting Started
- [End to End Example](01-getting-started/) - Complete example of the Contextual Platform
- [Hands on Lab](02-hands-on-lab/) - Lab broken into three chapters: Creating Agent & Datastores, Evaluation, and Tuning
- [Standalone API](03-standalone-api/) - Examples of using individual API endpoints like `/generate`, `/rerank`, `/parse`, and `/lmunit`
- [Contextual AI MCP Server](https://github.com/ContextualAI/contextual-mcp-server)

### Advanced Use Cases
- [Policy Changes](05-policy-changes/) - Tracking changes in long policy documents
- [Improving Agent Performance](06-improve-agent-performance/) - Settings for improving or specializing your RAG agent
- [Retrieval Analysis](11-retrieval-analysis/) - End-to-end evaluation of RAG retrieval
- [Structured Data Extraction](12-legal-contract-extraction/) - Extraction from unstructured legal documents
- [Monitoring RAG](14-monitoring) - Using Metrics API to monitor your RAG agent
- [Metadata Introduction](15-metadata-intro/) - Working with metadata in your RAG Agent
- [Build your own Matthew McConaughey](16-matthew-mcconaughey) - Building your own custom RAG agent.

### Integrations
- [CrewAI Multi-Agent Workflow](13-crewai-multiagent/) - Using CrewAI in a MultiAgent workflow
- [RAGAS Evaluation](07-evaluation-ragas/) - Using RAGAS for RAG agent evaluation
- [Google Sheets Script](04-sheets-script/) - Automating form filling using Contextual AI's API
- [Full Stack Deep Research with Gemini, Contextual AI, and LangGraph](https://github.com/rajshah4/contextualai-gemini-research-agent)
- [Deep Research Agent using Agno, Contextual AI, Tavily, and Langfuse](https://github.com/rajshah4/LLM-Evaluation/blob/main/ResearchAgent_Agno_LangFuse.ipynb)
- [Using Dify.AI with Contextual AI](https://www.youtube.com/watch?v=3WNUoKiwd2U)

### Benchmarks & Evaluation
- [Reranker v2 Benchmarks](03-standalone-api/03-rerank/reranker_benchmarking.ipynb) - Performance evaluation of the reranker
- [LMUnit Evaluation for RewardBench](09-lmunit-rewardbench/) - Using LMUnit for evaluating RewardBench
- [FACTS Benchmark](10-FACTS-benchmark/) - Benchmark for evaluating grounding in LLMs
- [RAG QA Arena](https://github.com/rajshah4/LLM-Evaluation/tree/main/RAG_QA_Arena) - End-to-end RAG benchmark


## 🚀 Getting Started

1. 📥 Clone this repository
    ```bash
    git clone https://github.com/ContextualAI/examples
    ```
2. 🔑 Set up your API credentials in the respective [notebook](01-getting-started/end-to-end-example.ipynb)
    ```bash
    API_TOKEN = '...'  # Replace with your actual API token
    ```
3. 📦 Install required dependencies
    ```bash
    pip install -r requirements.txt
    ```
4. 🎮 Run the example notebook

## 🔧 Prerequisites

- Python 3.7+
- Jupyter Notebook/Lab
- Contextual API credentials
- Required Python packages (listed in `requirements.txt`)

## 🤝 Contributing

We welcome contributions! Feel free to:
- 🐛 Report bugs
- ✨ Request features
- 🔀 Submit pull requests

## 📫 Support

Need help? 
- 📧 Contact our support team [support@contextual.ai](mailto:support@contextual.ai)
- 💬 Join our community discussions
- 📖 Check out our [documentation](https://docs.contextual.ai)

## ⚖️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Made with ❤️ by the Contextual team

