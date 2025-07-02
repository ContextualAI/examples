# **FACTS Grounding Benchmark Evaluation Script**

This repo provides functionality to evaluate Contextual AI Grounded Language Model (GLM) responses using the FACTS Grounding benchmark framework.
A [script](GLMv2_FACTS.py) is inclulded to generate responses for evaluating Contextual AI for the FACTS benchmark.
An upcoming notebook will walk through the process of assessing factual grounding and quality across multiple LLM models using LLM judges including Gemini-1.5-pro, GPT-4o, and Claude-3-5-sonnet. 

## **Prerequisites**
* [Contextual API key](https://app.contextual.ai/) [Notebook and Script]
* Google AI Studio API key [Notebook only]
* OpenAI API key  [Notebook only]
* Anthropic API key  [Notebook only]

## **Dataset**
The script uses the [FACTS Grounding 1.0 Public Examples](https://kaggle.com/datasets/deepmind/FACTS-grounding-examples/data) dataset containing:
* 860 public examples (out of 1,719 total examples)

## **Notes**
* Based on Google DeepMind's FACTS Grounding benchmark
* Designed for factual grounding assessment, not general response quality
* See [FACTS Technical Report](https://arxiv.org/abs/2501.03200) for methodology details
* Check the [official leaderboard](https://kaggle.com/facts-leaderboard) for complete results