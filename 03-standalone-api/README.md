# Component API Examples

This repository contains examples of using the component API's.

## LMUnit

LMUnit is a specialized model developed by Contextual AI for evaluating LLM response quality through natural language unit testing. It achieves state-of-the-art performance in assessing generative AI outputs by providing a structured method to test responses.

Key features:
- Natural language unit tests for LLM response evaluation
- State-of-the-art performance in quality assessment
- Structured testing methodology
- API access available (free access can be requested)

See the [LMUnit example](01-lmunit/lmunit.ipynb) for a detailed walkthrough using financial services as a case study.

## Generate

Generate is Contextual AI's Grounded Language Model.

See the [Generate example](02-generate/generate.ipynb) for a demonstration of using the Generate API to power text generation applications.

## Rerank

Rerank is Contextual AI's specialized reranking model for improving search and retrieval results. It helps optimize the ordering of search results by reranking them based on relevance to the query.

Key features:
- Improves search result quality through intelligent reranking
- Optimizes ordering based on semantic relevance 
- Easy integration with existing search systems
- Fast inference for production use

See the [Rerank example](03-rerank/rerank.ipynb) for a demonstration of using the Rerank API to enhance search applications.

## Parse

Parse is Contextual AI's structured data extraction model. It excels at converting unstructured text (PDF, DOCX) into markdown format by identifying and extracting key information.

Key features:
- Extracts unstructured data into markdown text
- Hierarchical representation of sections including title, headers, ect.
- Table extraction
- Multiple output formats (markdown-per-page, markdown-document, and blocks-per-page)

See the [Parse example](04-parse/parse.ipynb) for a demonstration of using the Parse API to extract structured data from documents.
