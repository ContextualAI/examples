# LMUnit Evaluation Script for RewardBench

This [script](rewardbench_lmunit.py) provides functionality to evaluate language model responses using the [RewardBench framework](https://github.com/allenai/reward-bench) and LMUnit API. It assesses responses across multiple dimensions including factuality, focus, mathematical accuracy, instruction following, safety, and helpfulness.
The script is designed to be adaptable to other datasets needing long running evaluation.

## Prerequisites

- Python 3.x
- Contextual AI API key
- Hugging Face token (optional, for accessing private datasets)

## Installation

```bash
pip install rewardbench
pip install aiohttp aiolimiter transformers datasets torch tqdm
```

## Environment Variables

- `HF_TOKEN` (optional): Hugging Face token for accessing private datasets

## Usage

Basic usage:

```bash
python rewardbench_lmunit.py --model lmunit-api --api_key your-api-key
```
Start with --debug so you can make sure everything runs on a small sample.

### Command Line Arguments

- `--model`: Model identifier (required)
- `--api_key`: Contextual AI API key (required)
- `--dataset`: Dataset to use (default: "allenai/reward-bench-2")
- `--batch_size`: Batch size for inference (default: 64)
- `--debug`: Enable debug mode with small example set
- `--torch_dtype`: PyTorch dtype (default: float16)
- `--mode_unit_test`: Unit test mode (default: "default")
- `--out-dataset-path`: Path to save output dataset

### Evaluation Dimensions

The script by default evaluates responses across multiple dimensions:
- Factuality: Checks for factual accuracy without hallucinations
- Focus: Assesses response relevance to the question
- Math: Verifies mathematical accuracy
- Precise IF: Evaluates instruction following
- Safety: Checks response safety
- Ties: Assesses overall helpfulness

## Customization
The script is designed to be adaptable for different evaluation needs:

### Custom Datasets
1. Ensure your dataset has a 'text' field containing query/response pairs
2. The dataset should be compatible with HuggingFace's Dataset format
3. Modify `prepare_dialogue()` if your data format differs from the default structure

### Custom Evaluation Criteria
1. Add new dimensions to `CUSTOM_GLOBAL_PROMPTS` in the script
2. Use `--mode_unit_test custom_per_subset` to enable subset-specific evaluation
3. Each subset can have its own evaluation prompt

### API Configuration
- Adjust rate limits (default: 1 request/second)
- Modify retry parameters
- Customize API client for different services

### Custom Processing Pipeline
The main evaluation pipeline can be customized by:
1. Modifying dataset loading/processing
2. Adding new scoring methods
3. Changing output format
4. Implementing different evaluation strategies

## Output

The script generates:
- Evaluation scores for each dimension
- Overall average score
- Results saved in JSON format (`results_grouped_{model_name}.json`)

## Rate Limiting

- Default rate limit: 1 request per second
- Maximum retries: 10
- Base delay: 1.0 seconds

## Error Handling

The script includes:
- Exponential backoff for API requests
- Comprehensive error logging
- Session management for API connections

## Example

```bash
python rewardbench_lmunit.py \
    --model lmunit-api \
    --api_key your-api-key \
    --debug \
    --mode_unit_test custom_per_subset
```

## Notes

- For large datasets, consider adjusting batch size and rate limits
- Debug mode is available for testing with a smaller dataset
- Custom unit tests can be specified per subset using the `mode_unit_test` parameter
- The script is designed to be modular and extensible for different evaluation needs