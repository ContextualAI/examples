# RAG Evaluation with RAGAS 📊

<img src="https://imagedelivery.net/Dr98IMl5gQ9tPkFM5JRcng/3e5f6fbd-9bc6-4aa1-368e-e8bb1d6ca100/Ultra" alt="Contextual AI logo" width="300">

This repository contains an example notebook demonstrating how to evaluate Contextual AI's RAG agents using the RAGAS framework. THis approach can also be used with other external evaluation approaches.

## Repository Structure

This repository includes the following:
- [Using_RAGAS.ipynb](Using_RAGAS.ipynb): Jupyter notebook that demonstrates RAG evaluation using RAGAS
- `data/eval_short.csv`: Sample evaluation dataset downloaded via the notebook

## Features

> [!NOTE]  
> This notebook assumes you've completed the [Intro End to End Example](../01-intro-end-to-end/) and already have a Contextual AI Agent setup. If you haven't, please complete that example first.

The notebook covers:
- Setting up the RAGAS evaluation environment
- Preparing evaluation datasets
- Querying Contextual AI RAG agents
- Calculating RAGAS metrics:
  - Faithfulness: Measures factual consistency with retrieved context
  - Context Recall: Evaluates completeness of retrieved information
  - Answer Accuracy: Assesses match with reference answers
- Analyzing and exporting evaluation results

## Quick Start

The example can be completed in under 30 minutes. The notebook is self-contained and includes detailed explanations for each step.

### Prerequisites

- Contextual AI API Key
- OpenAI API Key (for RAGAS evaluation)
- Python 3.8+
- Required dependencies (listed in `requirements.txt`)

## Documentation

For comprehensive platform documentation, visit [docs.contextual.ai](https://docs.contextual.ai/)

## Support 🐛

For additional support or questions, please refer to the [official documentation](https://docs.contextual.ai/) or contact the Contextual AI support team.