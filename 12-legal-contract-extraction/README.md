# Legal Contract Data Extraction

A notebook demonstrating automated legal contract analysis and structured data extraction using Contextual AI's platform. This approach can be generalized for any type of data extraction from unstructured documents.

## 📋 Overview

This example showcases how to build a specialized AI agent for legal document analysis that can:
1. **Ingest multiple legal contracts** into a structured datastore with metadata
2. **Create a specialized legal analysis agent** with custom prompts for extraction
3. **Extract structured Y/N/IDK responses** to due diligence questions
4. **Process batch queries** across multiple documents efficiently
5. **Export results** in structured formats (JSON/CSV) for downstream analysis

## 🗂️ Project Structure

```
📁 Legal Contract Extraction/
├── 📁 data/                                    # Sample legal contracts
│   ├── 📄 QuakerChemicalCorporation.pdf       # Non-compete agreement
│   ├── 📄 western.pdf                         # Legal contract
│   └── 📄 vivintsolar.pdf                     # Solar services contract
├── 📓 legal_contract_extraction.ipynb         # Main extraction notebook
└── 📄 README.md                               # This file
```

## 🚀 Quick Start

### Prerequisites
- **API Key:** Contextual AI API key 
- **Python Environment:** Google Colab or Jupyter with internet access
- **Dependencies:** `contextual-client`, `pandas`, `requests`

### Run on Google Colab
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/ContextualAI/examples/blob/main/12-legal-contract-extraction/legal_contract_extraction.ipynb)

## 🤝 Next Steps
- **Scale to Multiple Documents:** Process entire contract portfolios
- **Enhanced Metadata:** Add contract dates, parties, and jurisdiction information
- **Complex Extraction:** Extract specific clauses, dates, and monetary amounts
- **Integration:** Connect to legal tech platforms or document management systems