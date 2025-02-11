# Evaluation and Tune Example 📊

<img src="https://imagedelivery.net/Dr98IMl5gQ9tPkFM5JRcng/3e5f6fbd-9bc6-4aa1-368e-e8bb1d6ca100/Ultra" alt="Alt Text" width="300">

This repository contains an example notebook demonstrating how to evaluate and tune your model. This guide is a python implementation of the [Evaluation and Tune documentation](https://docs.contextual.ai/reference/tune-evaluation-guide).

## Repository Structure

This repository includes the following:
- [tune_and_eval.ipynb](tune_and_eval.ipynb): Jupyter notebook that uses the Python SDK.

## Features

> [!NOTE]  
> This notebook assumes you've completed the [Intro End to End Example](../01-intro-end-to-end/) and already have a Agent setup. If you haven't, please complete that example first.


This notebook has the following steps:
- Create a tune job based on [data/Dummy_Tuneset.json](data/Dummy_Tuneset.json)
- Query the status of the tune job
- Deploy the tuned model
- Eval the model using [data/Dummy_EvalSet.csv](data/Dummy_EvalSet.csv)

## Quick Start

The examples can be completed in under 30 minutes. Each notebook is self-contained and includes detailed explanations for each step.

### Prerequisites

- Contextual AI API Key
- Python 3.8+
- Required dependencies (listed in `requirements.txt`)

## Documentation

For comprehensive platform documentation, visit [docs.contextual.ai](https://docs.contextual.ai/)

## Getting Started

1. Clone this repository

    ```bash
    git clone https://github.com/ContextualAI/examples
    ```

2. Install required dependencies

    ```bash
    pip install -r requirements.txt
    ```

3. Start jupyter lab:

    ```bash
    jupyter lab
    ```
4. Run through the steps in [tune_and_eval.ipynb](./tune_and_eval.ipynb)

## Support 🐛

For additional support or questions, please refer to the [official documentation](https://docs.contextual.ai/) or contact the Contextual AI support team.