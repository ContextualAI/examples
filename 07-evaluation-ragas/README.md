# RAG Evaluation with RAGAS 📊

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/ContextualAI/examples/blob/main/images/Contextual_AI_Lockup_Light.png?raw=true">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/ContextualAI/examples/blob/main/images/Contextual_AI_Lockup_Dark.png?raw=true">
  <img src="https://github.com/ContextualAI/examples/blob/main/images/Contextual_AI_Lockup_Dark.png?raw=true" alt="Contextual AI" width="300">
</picture>

<p></p>
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
