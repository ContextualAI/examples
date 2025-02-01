# Tracking Changes in Long Policy Documents Using Contextual AI

<img src="https://imagedelivery.net/Dr98IMl5gQ9tPkFM5JRcng/3e5f6fbd-9bc6-4aa1-368e-e8bb1d6ca100/Ultra" alt="Alt Text" width="300">

<br>


Analyze complex policy documents and their evolution over time using RAG agents. This example shows you how to overcome traditional challenges of analyzing lengthy documents and identifying policy changes across multiple versions.

## Why This Matters

Traditional document comparison and RAG systems often struggle with:

* Documents spanning hundreds of pages that exceed context length limits  
* Loss of context when chunking large documents  
* Complexity in tracking changes across multiple document versions  
* Maintaining historical context while analyzing policy evolution

## Quick Start

You can explore this capability in two ways:

1. Through our intuitive UI  
2. Using [python notebook](policy-example.ipynb) provided in this repository

This repository includes the source files from FEMA in the data folder.

## Example Use Case: FEMA Policy Evolution 

We show this using FEMA's Public Assistance Program and Policy Guide, which has evolved significantly over multiple versions:

- V4 (2020) - 276 pages - [source](https://www.fema.gov/sites/default/files/documents/fema_pappg-v4-updated-links_policy_6-1-2020.pdf)  
- V3.1 (2018) - 217 pages - [source](https://www.fema.gov/sites/default/files/documents/fema_pappg-v3.1-archived_policy_5-4-2018.pdf) 
- V2 (2017) - 207 pages - [source](https://s3-us-west-2.amazonaws.com/asfpm-library/Digital+Coast/Public_Assistance_Prog_Policy_Guide_FEMA_2017.pdf)

Source documents are included in the [data](data) folder.


## Getting Started

1. Create your RAG Agent with our specialized prompt:

```
You are an analyst focused on identifying differences across documents. V4 was published in 2020, V3.1 was published in 2018 and V2 was published in 2017. If retrieved, V5 is proposed for 2025. When discussing policy keep in mind the version and consider differences in other versions. 
```

2. Load your documents into the Datastore  
3. Start querying for changes across versions

## Example Queries for Insights

#### See changes over time 

See how the RAG agent handles the long context and tracks changes, try these queries:

- How has cost eligibility changed  
- What's changed with the Small Business Administration Loan Requirement   
- How has the relationship to indian tribal governments changed

#### Policy Recommendations

The agent can also help generate insights based on changes, try these queries:

- How has the appeals process changed  
- Based on the appeal changes in version 4, how should we change our contracts with experts

#### Updating on New Information 

To see how the RAG agent responds to new information, add the [FEMA_2025_updates](FEMA_2025_updates.txt) to the datastore. This is a synthetic update to show that the agent responds to new information. After loading in the datastore, try the query:

- How has cost eligibility changed

You should now see a response incorporating the 2025 update.

## Notebook

The notebook walks you through setting up your agent, ingesting your data, and making the first query. To explore more of the python capabilities check out the end-to-end notebook or the full documentation.  