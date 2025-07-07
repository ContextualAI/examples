"""
Script to call the GLMv2 endpoint and generate outputs for the FACTS dataset.

Usage:
API_KEY=key-yQS
python GLMv2_endpoint_call.py \
--api_token $API_KEY \
--dataset_path examples.csv \
--output_path output.csv
"""
import logging
import requests
from argparse import ArgumentParser
import pandas as pd
from tqdm import tqdm

def parse_args():
    parser = ArgumentParser()
    parser.add_argument("--api_token", type=str, required=True)
    parser.add_argument("--dataset_path", type=str, required=True)
    parser.add_argument("--output_path", type=str, required=True)
    return parser.parse_args()

logger = logging.getLogger(__name__)

PARAMETERS_CONFIG ={
    "temperature": 0.0,
    "top_p": 0.9,
    "max_new_tokens": 2048,
    "avoid_commentary": True,
}


def generate_contextual_ai(
    api_token: str,
    prompt: str,
    system_prompt: str,
    avoid_commentary: bool = True,
    temperature: float = 0.0,
    top_p: float = 0.9,
    max_new_tokens: int = 2048
) -> requests.Response:
    """
    Generate a response using the Contextual AI API.
    
    Args:
        api_token: Your Contextual AI API token
        model: The model to use for generation
        messages: List of message dictionaries with 'role' and 'content' keys
        knowledge: Optional list of knowledge strings to include
        system_prompt: Optional system prompt to guide the model
        avoid_commentary: Whether to avoid commentary in responses
        temperature: Controls randomness (0 = deterministic, higher = more random)
        top_p: Controls diversity via nucleus sampling
        max_new_tokens: Maximum number of tokens to generate
    
    Returns:
        requests.Response object containing the API response
    """
    url = "https://api.contextual.ai/v1/generate"
    
    # Build payload
    payload = {
              "avoid_commentary": avoid_commentary,
              "temperature": temperature,
              "top_p": top_p,
              "max_new_tokens": max_new_tokens,
              "system_prompt": system_prompt,
              "knowledge": [],
              "model": "v2",
              "messages": [
                    {
                        "content": prompt,
                        "role": "user"
                    }
                ]
            }
    
    # Set headers
    headers = {
        "Authorization": f"Bearer {api_token}",
        "Content-Type": "application/json"
    }
    
    # Make the request
    response = requests.post(url, json=payload, headers=headers)
    
    return response

if __name__ == "__main__":
    args = parse_args()
    dataset = pd.read_csv(args.dataset_path)
    results = []
    for _, row in tqdm(dataset.iterrows(), total=len(dataset)):
        response = generate_contextual_ai(
            api_token=args.api_token,
            prompt=row["full_prompt"],
            system_prompt="",
            avoid_commentary=PARAMETERS_CONFIG["avoid_commentary"],
            temperature=PARAMETERS_CONFIG["temperature"],
            top_p=PARAMETERS_CONFIG["top_p"],
            max_new_tokens=PARAMETERS_CONFIG["max_new_tokens"]
        )
        results.append(response.json()["response"])
    dataset["generated_output"] = results
    dataset.to_csv(args.output_path, index=False)