# RAG Agent Monitoring & Analytics

A notebook demonstrating how to monitor, analyze, and optimize Retrieval-Augmented Generation (RAG) agents in production using Contextual AI's Metrics API. Learn to track performance metrics, analyze user feedback, and ensure consistent, high-quality responses.

## 📋 Overview

This example showcases how to build a complete monitoring and analytics dashboard for RAG agents that can:

1. **Extract Real-time Metrics** from the Contextual AI Metrics API
2. **Analyze User Feedback** across conversations
3. **Monitor Response Quality** with content analysis
4. **Visualize Usage Patterns** through interactive time series analysis
5. **Generate Actionable Insights** for performance optimization and capacity planning

## 🗂️ Project Structure

```
📁 RAG Agent Monitoring/
├── 📁 data/                           # Sample monitoring data
│   └── 📄 synthetic_data.csv          # Demo dataset with 441 conversations
├── 📓 monitoring_intro.ipynb          # Main monitoring notebook
└── 📄 README.md                       # This file
```

## 🚀 Quick Start

### Prerequisites
- **API Key:** Contextual AI API key with metrics access permissions
- **Python Environment:** Google Colab or Jupyter with internet access
- **Dependencies:** `contextual-client`, `pandas`, `plotly`, `matplotlib`, `seaborn`
- **Active RAG Agent:** At least one deployed agent with conversation history (optional for demo)

### Run on Google Colab
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/ContextualAI/examples/blob/main/14-monitoring/monitoring_intro.ipynb)

## 📚 Related Examples

- 🔗 **RAGAS Evaluation**: [07-evaluation-ragas](../07-evaluation-ragas/)
- 🔗 **Retrieval Analysis**: [11-retrieval-analysis](../11-retrieval-analysis/)
- 🔗 **LMUnit Evaluation**: [03-standalone-api/01-lmunit](../03-standalone-api/01-lmunit/)
- 🔗 **Agent Performance**: [06-improve-agent-performance](../06-improve-agent-performance/)

## 📖 Additional Resources

- **Contextual AI Documentation**: [docs.contextual.ai](https://docs.contextual.ai/)
- **Metrics API Reference**: [API Documentation](https://docs.contextual.ai/api-reference/datastores/list-datastores)
- **RAGAS Framework**: [GitHub Repository](https://github.com/explodinggradients/ragas)

---

**Ready to start monitoring?** Open `monitoring_intro.ipynb` and build your RAG agent analytics dashboard in under 30 minutes!