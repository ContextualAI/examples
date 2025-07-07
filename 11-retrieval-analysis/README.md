# RAG Evaluation Pipeline

A notebooks for evaluating retrieval quality for Contextual AI RAG agents using synthetic multi-hop question dataset.

## 📋 Overview

This pipeline provides an end-to-end solution for rigorously evaluating RAG systems by:
1. **Generating realistic multi-hop questions** from your documents
2. **Matching ground-truth evidence** to retrieved chunks automatically
3. **Evaluating retrieval performance** using both traditional IR and modern RAG-specific metrics

## 🗂️ Pipeline Structure

```
📁 RAG Evaluation Pipeline/
├── 📁 Data                                # A set of sample PDFs 
├── 📓 Retrieval_GenerateMultiHop.ipynb    # Step 1: Generate multi-hop QA pairs
├── 📓 Retrieval_Matching.ipynb            # Step 2: Match evidence to chunks
├── 📓 Retrieval_Evaluation.ipynb          # Step 3: Evaluate retrieval performance
└── 📄 README.md                           # This file
```

## 🚀 Quick Start

### Prerequisites
- **API Keys Required:**
  - Claude API key (for question generation)
  - Contextual AI API key (for retrieval evaluation)
- **Python Environment:** Google Colab or Jupyter with internet access
- **Documents:** 2+ PDF files for optimal multi-hop question generation

### 1. Generate Multi-Hop Questions
**Run on Google Colab**
**Input:** PDF documents  
**Output:** `qa_pairs_YYYYMMDD_HHMMSS.xlsx` (structured Q&A with evidence)  
**Runtime:** ~15-30 minutes for 100 questions
**Provided Example:** `qa_pairs_multi_row_20250616_174936.xlsx`

### 2. Match Evidence to Chunks
**Input:** Excel file from Step 1  
**Output:** `matched_retrieval_Jun20.csv` (evidence matched to chunk IDs)  
**Runtime:** ~2-3 seconds per evidence string
**Provided Example:** `matched_retrievals`

### 3. Evaluate Retrieval Performance
**Input:** CSV file from Step 2  
**Output:** `eval_results_final.csv` (comprehensive metrics)  
**Provided Example:** `eval_results_final.csv`
