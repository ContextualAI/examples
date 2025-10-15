# Building Matthew McConaughey with Contextual AI 🚀

## Overview

See a Demo! ([Demo](https://www.alrightalrightalright.ai/))

Build your own Matthew McConaughey AI agent! This project demonstrates how to create a RAG-powered conversational agent that embodies Matthew McConaughey's wisdom, philosophy, and personality. Inspired by his interview with Joe Rogan where he expressed interest in "a private LLM, fed only with his books, notes, journals, and aspirations," we'll build exactly that using Contextual AI's managed RAG solution.

**What You'll Build**: An interactive AI agent that speaks like Matthew McConaughey, drawing from his speeches, interviews, lessons, and life advice—fully grounded in his actual words with no outside influence.

**Time Required**: Under 20 minutes for a fully functional Matthew McConaughey AI agent

## What You'll Learn

This tutorial covers everything you need to build a personality-driven RAG agent:

- **Creating a RAG Agent** - Set up datastores, ingest documents, and configure agents with custom personalities
- **Querying the Agent** - Have conversations with your McConaughey agent and get wisdom grounded in his actual words
- **Evaluating "McConaugheyness"** - Measure how well your agent captures his unique voice and philosophy
- **Custom System Prompts** - Learn to craft prompts that maintain personality consistency

## Project Content

### 1. Agent Setup (5 minutes)
- Create a Contextual AI workspace and API key
- Set up a datastore for McConaughey's content
- Ingest speeches, interviews, and life lessons
- Configure an agent with custom personality prompts

### 2. Document Collection
The project uses authentic Matthew McConaughey content including:
- **13 Lessons Learned by Matthew McConaughey.pdf** - Life wisdom and principles
- **7 Takeaways from Matthew McConaughey and Greenlights.pdf** - Key insights from his book
- **Joe Rogan - Matthew.pdf** - Podcast interview transcript
- **Matthew McConaughey's Advice for Creating Your Best 2025.pdf** - Goal-setting wisdom
- **The Art of a Courageous Life.pdf** - Philosophy on courage and living authentically
- **The Hidden Art Of Reinventing Yourself.pdf** - Transformation and personal growth
- **The Origin Story of 'Alright, Alright, Alright'.pdf** - His iconic catchphrase origin
- **To Make the Loss of These Lives Matter.pdf** - Speech on meaningful topics

### 3. Agent Interaction (5 minutes)
Learn to:
- Ask questions about life advice, acting, and philosophy
- Receive responses that sound authentically like McConaughey
- Maintain conversational context across multiple queries
- Get answers grounded in his actual writings and speeches

### 4. Personality Evaluation (5 minutes)
- Use the **LMUnit** evaluation framework to assess "McConaugheyness"
- Test for authenticity, wisdom consistency, and voice matching
- Measure how well the agent captures his unique communication style
- Evaluate retrieval accuracy and response grounding

### 5. Custom Prompt Engineering (5 minutes)
- Craft system prompts that maintain personality consistency
- Handle first-person vs. third-person references correctly
- Ensure responses stay grounded in source material
- Create instructions for authentic voice replication

## Key Features Demonstrated

### Personality-Driven RAG
- Custom system prompts that embody McConaughey's speaking style
- First-person perspective handling for authentic responses
- Wisdom and philosophy extraction from diverse sources

### Intelligent Document Processing
- Automatic parsing of speeches, interviews, and articles
- Support for PDF transcripts and varied document formats
- Metadata extraction for proper attribution

### Authentic Response Generation
- Responses that capture McConaughey's unique voice
- Grounding in actual quotes and teachings
- Proper source citation for verification

### Production-Ready Architecture
- Secure datastore management
- API-first design for integration
- Scalable agent deployment

## Getting Started

### Prerequisites
- Google Colab account (or local Jupyter environment)
- Contextual AI workspace ([Sign up free](https://contextual.ai/?utm_campaign=McConaughey&utm_source=contextualai&utm_medium=github&utm_content=notebook))
- API key from your Contextual workspace

### Quick Start
1. Open the notebook: `McConaughey.ipynb`
2. Set up your `CONTEXTUAL_API_KEY` in Colab secrets or `.env` file
3. Follow the step-by-step instructions
4. Start chatting with your McConaughey agent!

## Sample Questions You Can Ask

After completing the tutorial, your agent will be able to answer questions like:

- "Tell me the story behind 'alright, alright, alright'"
- "What are your thoughts on living a courageous life?"
- "What lessons have you learned about success and failure?"
- "How do you approach reinventing yourself?"
- "What advice do you have for setting goals?"
- "What does 'greenlights' mean to you?"

## The Inspiration

This project was inspired by Matthew McConaughey's interview with Joe Rogan where he described wanting:

> "a private LLM, fed only with his books, notes, journals, and aspirations, so he can ask it questions and get answers based solely on that information, without any outside influence"

Using Contextual AI's RAG platform, we've built exactly that—an agent that speaks with McConaughey's voice, drawing only from his actual words and wisdom.

## Integration Options

### API Integration
Use this agent in your existing applications:
- REST API endpoints for all functionality
- Python client library (`pip install contextual-client`)
- Streaming responses for real-time conversations

## Related Examples

- 🔗 **Full Workshop Tutorial**: [08-ai-workshop](../08-ai-workshop/)
- 🔗 **LMUnit Evaluation**: [03-standalone-api/01-lmunit](../03-standalone-api/01-lmunit/)
- 🔗 **Parse API Demo**: [03-standalone-api/04-parse](../03-standalone-api/04-parse/)
- 🔗 **Agent Performance**: [06-improve-agent-performance](../06-improve-agent-performance/)

## Support

- 📧 **Email**: info@contextual.ai
- 📖 **Documentation**: [docs.contextual.ai](https://docs.contextual.ai/)
- 🏢 **Platform**: [app.contextual.ai](https://app.contextual.ai/)

---

**Ready to channel some McConaughey wisdom?** Open `McConaughey.ipynb` and build your own AI agent that embodies his unique perspective on life! Alright, alright, alright! 🎬
