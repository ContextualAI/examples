# Contextual AI Reranker Examples

This folder contains examples demonstrating how to use Contextual AI's reranker, which is the first reranker with instruction-following capabilities to handle conflicts in retrieval. It is the most accurate reranker in the world per industry-leading benchmarks like BEIR.

## 📁 Contents

### 1. `rerank.ipynb` - Basic Reranker Usage
A comprehensive tutorial showing different ways to use the Contextual AI reranker:

- **REST API implementation** - Direct API calls using the `requests` library
- **Python SDK** - Using the official `contextual-client` package  
- **Langchain integration** - Using the `langchain-contextual` package

**Key Features Demonstrated:**
- Query reranking with custom instructions
- Document metadata handling
- Multiple integration methods
- Enterprise pricing example use case

### 2. `reranker_benchmarking.ipynb` - Performance Evaluation
A robust evaluation framework for testing the Contextual AI reranker against standard benchmarks:

- **Dataset Support** - Evaluation on Hugging Face datasets including:
  - touche2020
  - msmarco  
  - treccovid
  - nq (Natural Questions)
  - hotpotqa
  - fiqa2018

- **Comprehensive Metrics** - Proper evaluation using:
  - NDCG@10 (Normalized Discounted Cumulative Gain)
  - MAP (Mean Average Precision)
  - Recall@10
  - MRR (Mean Reciprocal Rank)

## 🎯 Available Models

The current reranker models include:
- `ctxl-rerank-v2-instruct-multilingual` - Full model with multilingual support
- `ctxl-rerank-v2-instruct-multilingual-mini` - Faster mini version
- `ctxl-rerank-v1-instruct` - Previous generation model

## 🔗 Learn More

- [Contextual AI Reranker Blog Post](https://contextual.ai/blog/introducing-instruction-following-reranker/)
- [Open Sourcing Rerank v2](https://contextual.ai/blog/rerank-v2/)
- [API Documentation](https://docs.contextual.ai/api-reference/rerank/rerank
- [Python SDK Documentation](https://github.com/ContextualAI/contextual-client-python/blob/main/api.md#rerank)
- [Langchain Package](https://pypi.org/project/langchain-contextual/)

## 📝 Example Usage

```python
from contextual import ContextualAI

client = ContextualAI(api_key="your-api-key")

rerank_response = client.rerank.create(
    query="What is the enterprise pricing for RTX 5090?",
    instruction="Prioritize internal sales documents over market reports",
    documents=["Document 1", "Document 2", "Document 3"],
    model="ctxl-rerank-v2-instruct-multilingual"
)

print(rerank_response.to_dict())
```

Start with `rerank.ipynb` for basic usage, then explore `reranker_benchmarking.ipynb` for advanced evaluation and performance testing.
