<img src="https://imagedelivery.net/Dr98IMl5gQ9tPkFM5JRcng/3e5f6fbd-9bc6-4aa1-368e-e8bb1d6ca100/Ultra" alt="Image description" width="200" />

<br/>

## Hands-on Lab: Creating a Specialized RAG Agent

Contextual AI lets you create and run specialized AI agents that are powered by your data. This notebook introduces an end-to-end example workflow for creating a Retrieval-Augmented Generation (RAG) agent for a financial use case. The agent will answer questions based on the documents provided, but avoid any forward looking statements, e.g., Tell me about sales in 2028. 

The full documentation is available at [docs.contextual.ai](https://docs.contextual.ai/)

You can go through this lab in 30-60 minutes and covers the following topics:

#### Lab 1: Creating the Datastore and Agent

In this lab you will learn how to:

  - Creating a Datastore: this is where your documents live (unstructured data)
  - Ingesting Documents: we will use a single PDF document but the platform is fully scalable and supports HTML among other formats
  - Creating an RAG Agent: all you need is a good system prompt to get started
  - Query a RAG Agent: answers based on your data and nothing more

#### Lab 2: Evaluating the RAG Agent

#### Lab 3: Improving the RAG Agent using:
  - Prompt engineering
  - Fine-tuning

### Prerequisites:

- API key. You can request one [here](https://contextual.ai/platform/).

- We will share the key with you or you will have to:
 
    1. Login to your account at app.contextual.ai
    2. Click on "API Keys"
    3. Click on "Create API Key". *Note: Please keep your key in a secure place, and do not share it with anyone*

- Python 3.9+

### Environment Setup


1. Clone the repo: `git clone https://github.com/ContextualAI/examples.git`
2. To run this notebook locally in [VS Code](https://code.visualstudio.com/):

    2.1 Open the terminal, switch to `examples` directory and create a Python virtual environment:

        python -m venv .
    2.2 Activate the virtual environment:
        
        source bin/activate
    2.3 Intall the dependencies

        pip install -r requirements.txt
    2.4 Finally, to get started: open the notebook `examples/python/hands-on-lab/lab1_create_agent.ipynb` and click on "Select Kernel" (top right) -> "Python Environments" and select the newly created kernel    
