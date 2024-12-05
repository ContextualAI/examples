{
 "cells": [
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "# Introduction to Datasets API\n",
    "\n",
    "This notebook demonstrates how to interact with the Datasets API endpoints for creating, updating, retrieving, and deleting datasets. The API provides comprehensive functionality for managing your datasets programmatically."
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "## Setup\n",
    "\n",
    "First, let's set up our environment with necessary imports and configurations."
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "import requests\n",
    "import json\n",
    "from typing import Dict, Optional\n",
    "from pathlib import Path"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "# Configuration\n",
    "API_TOKEN = 'YOUR_API_TOKEN_HERE'  # Replace with your actual API token\n",
    "BASE_URL = 'https://api.contextual.ai/v1'\n",
    "APPLICATION_ID = 'YOUR_APPLICATION_ID'  # Replace with your application ID"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "def get_headers(content_type: str = \"application/json\") -> Dict[str, str]:\n",
    "    \"\"\"\n",
    "    Generate headers for API requests\n",
    "    \n",
    "    Args:\n",
    "        content_type: Content type for the request\n",
    "        \n",
    "    Returns:\n",
    "        Dictionary containing request headers\n",
    "    \"\"\"\n",
    "    return {\n",
    "        \"accept\": \"application/json\",\n",
    "        \"Content-Type\": content_type,\n",
    "        \"Authorization\": f\"Bearer {API_TOKEN}\"\n",
    "    }"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "## Dataset Management Functions\n",
    "\n",
    "Let's implement functions for each dataset operation: CREATE, UPDATE, GET, and DELETE."
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "def create_dataset(application_id: str, file_path: str) -> Dict:\n",
    "    \"\"\"\n",
    "    Create a new dataset by uploading a file\n",
    "    \n",
    "    Args:\n",
    "        application_id: ID of the application\n",
    "        file_path: Path to the file to upload\n",
    "        \n",
    "    Returns:\n",
    "        API response as dictionary\n",
    "    \"\"\"\n",
    "    url = f\"{BASE_URL}/applications/{application_id}/datasets\"\n",
    "    \n",
    "    try:\n",
    "        with open(file_path, 'rb') as f:\n",
    "            files = {'file': f}\n",
    "            response = requests.post(\n",
    "                url,\n",
    "                headers=get_headers(\"multipart/form-data\"),\n",
    "                files=files\n",
    "            )\n",
    "            response.raise_for_status()\n",
    "            return response.json()\n",
    "    except Exception as e:\n",
    "        print(f\"Error creating dataset: {str(e)}\")\n",
    "        raise"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "def update_dataset(application_id: str, dataset_name: str, file_path: str) -> Dict:\n",
    "    \"\"\"\n",
    "    Update an existing dataset\n",
    "    \n",
    "    Args:\n",
    "        application_id: ID of the application\n",
    "        dataset_name: Name of the dataset to update\n",
    "        file_path: Path to the updated file\n",
    "        \n",
    "    Returns:\n",
    "        API response as dictionary\n",
    "    \"\"\"\n",
    "    url = f\"{BASE_URL}/applications/{application_id}/datasets/{dataset_name}\"\n",
    "    \n",
    "    try:\n",
    "        with open(file_path, 'rb') as f:\n",
    "            files = {'file': f}\n",
    "            response = requests.put(\n",
    "                url,\n",
    "                headers=get_headers(\"multipart/form-data\"),\n",
    "                files=files\n",
    "            )\n",
    "            response.raise_for_status()\n",
    "            return response.json()\n",
    "    except Exception as e:\n",
    "        print(f\"Error updating dataset: {str(e)}\")\n",
    "        raise"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "def get_dataset(application_id: str, dataset_name: str, output_path: Optional[str] = None) -> Dict:\n",
    "    \"\"\"\n",
    "    Download a dataset\n",
    "    \n",
    "    Args:\n",
    "        application_id: ID of the application\n",
    "        dataset_name: Name of the dataset to retrieve\n",
    "        output_path: Optional path to save the downloaded dataset\n",
    "        \n",
    "    Returns:\n",
    "        API response as dictionary\n",
    "    \"\"\"\n",
    "    url = f\"{BASE_URL}/applications/{application_id}/datasets/{dataset_name}\"\n",
    "    \n",
    "    try:\n",
    "        response = requests.get(url, headers=get_headers())\n",
    "        response.raise_for_status()\n",
    "        \n",
    "        if output_path:\n",
    "            with open(output_path, 'wb') as f:\n",
    "                f.write(response.content)\n",
    "            print(f\"Dataset saved to {output_path}\")\n",
    "            \n",
    "        return response.json()\n",
    "    except Exception as e:\n",
    "        print(f\"Error retrieving dataset: {str(e)}\")\n",
    "        raise"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "def get_dataset_metadata(application_id: str, dataset_name: str) -> Dict:\n",
    "    \"\"\"\n",
    "    Get metadata for a specific dataset\n",
    "    \n",
    "    Args:\n",
    "        application_id: ID of the application\n",
    "        dataset_name: Name of the dataset\n",
    "        \n",
    "    Returns:\n",
    "        API response as dictionary\n",
    "    \"\"\"\n",
    "    url = f\"{BASE_URL}/applications/{application_id}/datasets/{dataset_name}/metadata\"\n",
    "    \n",
    "    try:\n",
    "        response = requests.get(url, headers=get_headers())\n",
    "        response.raise_for_status()\n",
    "        return response.json()\n",
    "    except Exception as e:\n",
    "        print(f\"Error retrieving dataset metadata: {str(e)}\")\n",
    "        raise"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "def delete_dataset(application_id: str, dataset_name: str) -> Dict:\n",
    "    \"\"\"\n",
    "    Delete a dataset\n",
    "    \n",
    "    Args:\n",
    "        application_id: ID of the application\n",
    "        dataset_name: Name of the dataset to delete\n",
    "        \n",
    "    Returns:\n",
    "        API response as dictionary\n",
    "    \"\"\"\n",
    "    url = f\"{BASE_URL}/applications/{application_id}/datasets/{dataset_name}\"\n",
    "    \n",
    "    try:\n",
    "        response = requests.delete(url, headers=get_headers())\n",
    "        response.raise_for_status()\n",
    "        return response.json()\n",
    "    except Exception as e:\n",
    "        print(f\"Error deleting dataset: {str(e)}\")\n",
    "        raise"
   ]
  },
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "## Example Usage\n",
    "\n",
    "Here are examples of how to use each function:"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "# Example: Create a new dataset\n",
    "try:\n",
    "    result = create_dataset(\n",
    "        application_id=APPLICATION_ID,\n",
    "        file_path=\"path/to/your/dataset.csv\"\n",
    "    )\n",
    "    print(\"Dataset created:\", json.dumps(result, indent=2))\n",
    "except Exception as e:\n",
    "    print(f\"Failed to create dataset: {e}\")"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "# Example: Update an existing dataset\n",
    "try:\n",
    "    result = update_dataset(\n",
    "        application_id=APPLICATION_ID,\n",
    "        dataset_name=\"example_dataset\",\n",
    "        file_path=\"path/to/updated/dataset.csv\"\n",
    "    )\n",
    "    print(\"Dataset updated:\", json.dumps(result, indent=2))\n",
    "except Exception as e:\n",
    "    print(f\"Failed to update dataset: {e}\")"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "# Example: Get dataset and save to file\n",
    "try:\n",
    "    result = get_dataset(\n",
    "        application_id=APPLICATION_ID,\n",
    "        dataset_name=\"example_dataset\",\n",
    "        output_path=\"downloaded_dataset.csv\"\n",
    "    )\n",
    "    print(\"Dataset retrieved:\", json.dumps(result, indent=2))\n",
    "except Exception as e:\n",
    "    print(f\"Failed to retrieve dataset: {e}\")"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "# Example: Get dataset metadata\n",
    "try:\n",
    "    result = get_dataset_metadata(\n",
    "        application_id=APPLICATION_ID,\n",
    "        dataset_name=\"example_dataset\"\n",
    "    )\n",
    "    print(\"Dataset metadata:\", json.dumps(result, indent=2))\n",
    "except Exception as e:\n",
    "    print(f\"Failed to retrieve dataset metadata: {e}\")"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": [
    "# Example: Delete a dataset\n",
    "try:\n",
    "    result = delete_dataset(\n",
    "        application_id=APPLICATION_ID,\n",
    "        dataset_name=\"example_dataset\"\n",
    "    )\n",
    "    print(\"Dataset deleted:\", json.dumps(result, indent=2))\n",
    "except Exception as e:\n",
    "    print(f\"Failed to delete dataset: {e}\")"
   ]
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.8.0"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 4
}
