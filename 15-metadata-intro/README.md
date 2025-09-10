# Metadata Management in Contextual AI

A comprehensive notebook demonstrating how to add, configure, and utilize metadata within the Contextual AI Platform for enhanced document retrieval and filtering. Learn to organize documents with rich metadata, apply precise filters, and leverage metadata in reranking and generation.

## 📋 Overview

This example showcases how to implement advanced metadata management for RAG systems that can:

1. **Configure Metadata at Ingest Time** with flexible field settings and configurations
2. **Update Metadata Post-Processing** for dynamic document organization
3. **Apply Precise Document Filters** using multiple operators and complex logic
4. **Enhance Retrieval Quality** through metadata-based filtering and reranking
5. **Leverage Metadata in Generation** for contextually aware responses

## 🗂️ Project Structure

```
📁 Metadata Management/
├── 📁 data/                           # Sample policy documents
│   ├── 📄 POL_EU-v3.md               # EU refund policy document
│   ├── 📄 POL_US-v2.md               # US refund policy document  
│   ├── 📄 KB_Template_US.md          # US customer email template
│   ├── 📄 KB_Template_EU.md          # EU customer email template
│   └── 📄 KB_Template_DE.md          # German customer template
├── 📓 metadata_intro.ipynb           # Main metadata notebook
└── 📄 README.md                      # This file
```

## 🚀 Quick Start

### Prerequisites
- **API Key:** Contextual AI API key from your workspace dashboard
- **Python Environment:** Google Colab or Jupyter with internet access
- **Python Client:** Version 0.8.0 or higher required

### Run on Google Colab
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/ContextualAI/examples/blob/main/15-metadata-intro/metadata_intro.ipynb)


## 📚 Related Examples

- 🔗 **RAG Agent Monitoring**: [14-monitoring](../14-monitoring/)
- 🔗 **Retrieval Analysis**: [11-retrieval-analysis](../11-retrieval-analysis/)
- 🔗 **Policy Change Management**: [05-policy-changes](../05-policy-changes/)
- 🔗 **Agent Performance**: [06-improve-agent-performance](../06-improve-agent-performance/)

## 📖 Additional Resources

- **Contextual AI Documentation**: [docs.contextual.ai](https://docs.contextual.ai/)
- **Metadata API Reference**: [API Documentation](https://docs.contextual.ai/api-reference/datastores-documents/get-document-metadata)
- **Best Practices Guide**: [Metadata Management](https://docs.contextual.ai/user-guides/beginner-guide)

