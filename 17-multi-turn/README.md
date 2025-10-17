# Multi-Turn vs Single-Turn Agent Testing

This example demonstrates the differences between multi-turn and single-turn agents in Contextual AI through comprehensive testing scenarios.

## Overview

The notebook creates two agents with identical configurations except for their multi-turn settings:
- **MultiTurnAgent**: Maintains conversation context across multiple messages
- **SingleTurnAgent**: Treats each message independently without memory

## What You'll Learn

- How to enable/disable multi-turn functionality in Contextual AI agents
- The difference in behavior between multi-turn and single-turn agents
- How to use `conversation_id` to continue previous conversations
- Best practices for testing agent memory capabilities

## Key Concepts

### Multi-Turn Agents
- Remember conversation history using `conversation_id`
- Can reference previous messages and maintain context
- Ideal for conversational interfaces and complex interactions

### Single-Turn Agents
- Process each message independently
- No memory of previous interactions
- Suitable for stateless operations and simple Q&A

### Conversation Management
- The first message in a conversation generates a `conversation_id`
- Subsequent messages use this ID to maintain context
- Conversations can be resumed later using the same ID

## Test Methodology

The notebook follows a systematic approach:

1. **Setup**: Creates two identical agents with different multi-turn settings
2. **Initial Facts**: Shares the same information with both agents
3. **Memory Testing**: Asks follow-up questions to test retention
4. **Comparison**: Validates expected vs actual behavior
5. **Recurring Conversations**: Tests conversation continuity

### Test Scenarios

| Scenario | MultiTurnAgent | SingleTurnAgent |
|----------|----------------|-----------------|
| Initial message with facts | ✓ Acknowledges | ✓ Acknowledges |
| Follow-up question about facts | ✓ Remembers | ✗ Forgets |
| Complex recall request | ✓ Full context | ✗ No context |
| Conversation resumption | ✓ Continues | N/A |

## Running the Notebook

### Prerequisites
- Contextual AI API key
- Python environment with required packages

### Setup Steps
1. Update the `API_KEY` variable with your Contextual AI API key
2. Run all cells sequentially
3. Review the test results summary at the end

### Expected Outputs
- Multi-turn agent should pass memory tests (remember color and cats)
- Single-turn agent should fail memory tests (forget previous information)
- All 5 tests should pass if multi-turn functionality works correctly

## Configuration Details

### Agent Configuration
```python
agent_configs = {
    "global_config": {
        "enable_multi_turn": True,  # Key difference between agents
        "enable_filter": False,
        "enable_rerank": False,
        "should_check_retrieval_need": True,
    },
    "reformulation_config": {
        "enable_query_expansion": False,
        "enable_query_decomposition": False,
    },
    "generate_response_config": {
        "model": 'vertex_ai/gemini-2.0-flash-lite'
    }
}
```

### Query with Conversation ID
```python
response = client.agents.query.create(
    agent_id=agent.id,
    messages=[{"content": "Your message", "role": "user"}],
    conversation_id=conversation_id  # Enables context retention
)
```

## Test Data

The example uses simple, verifiable facts:
- **Favorite color**: Blue
- **Pet count**: 3 cats
- **Pet names**: Whiskers, Mittens, Shadow

These concrete values make it easy to verify whether agents remember information correctly.

## Cleanup

The notebook includes an optional cleanup section to delete the test agents and datastore after experimentation. Uncomment the cleanup code if you want to remove the created resources.

## Use Cases

### Multi-Turn Agents Are Ideal For:
- Customer service chatbots
- Interactive tutorials
- Complex problem-solving sessions
- Personalized conversations

### Single-Turn Agents Are Ideal For:
- FAQ systems
- Simple classification tasks
- Stateless API endpoints
- One-off queries

## Troubleshooting

### Common Issues
- **Agent doesn't remember**: Ensure you're using the correct `conversation_id`
- **Tests fail**: Check API key validity and agent configuration
- **Unexpected behavior**: Verify the `enable_multi_turn` setting

### Debugging Tips
- Monitor conversation IDs in the output
- Check agent responses for context clues
- Validate test data matches expected values

## Next Steps

After understanding multi-turn behavior, consider:
- Implementing conversation persistence
- Adding conversation branching
- Building stateful applications
- Exploring advanced context management

---

**Note**: Remember to keep your API key secure and never commit it to version control.