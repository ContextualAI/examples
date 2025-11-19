# Matthew McConaughey AI Chat

Host the agent you just made w/Nextjs and Vercel!

A clean, simple Next.js chat interface for interacting with a Contextual AI agent embodying Matthew McConaughey's wisdom, philosophy, and life lessons.

## Features

- Clean, modern chat interface
- Subtle space-themed design with McConaughey aesthetics
- Real-time conversation with AI agent
- Responsive design for mobile and desktop
- Powered by Contextual AI

## Prerequisites

- Node.js 18+ installed
- A Contextual AI API key
- Your Matthew McConaughey agent ID (from your notebook)

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   
   Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your credentials:
   ```
   CONTEXTUAL_API_KEY=your_api_key_here
   CONTEXTUAL_AGENT_ID=your_agent_id_here
   ```

3. **Find your Agent ID:**
   
   You can get your agent ID from your Jupyter notebook where you created the agent. Look for the output after running the agent creation code:
   ```python
   print(f"Agent ID created: {agent_id}")
   ```
   
   Or retrieve it by listing your agents:
   ```python
   agents = client.agents.list()
   for agent in agents:
       if agent.name == "Matthew_McConaughey":
           print(f"Agent ID: {agent.id}")
   ```

## Running the App

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Deployment

This Next.js app can be easily deployed to:

- **Vercel** (recommended): Connect your GitHub repo at [vercel.com](https://vercel.com)
- **Netlify**: Follow their Next.js deployment guide
- **Any Node.js hosting**: Run `npm run build` and `npm start`

Don't forget to set your environment variables (`CONTEXTUAL_API_KEY` and `CONTEXTUAL_AGENT_ID`) in your deployment platform's settings.

## Project Structure

```
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts       # API endpoint for Contextual AI
│   ├── globals.css            # Global styles and animations
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main chat interface
├── .env.local.example         # Environment variables template
├── next.config.js             # Next.js configuration
├── tailwind.config.js         # Tailwind CSS configuration
└── package.json               # Dependencies and scripts
```

## Customization

- **Colors**: Edit `tailwind.config.js` to change the color scheme
- **Suggested queries**: Update the `suggestedQueries` array in `app/page.tsx`
- **Styling**: Modify `app/globals.css` and component styles in `app/page.tsx`

## Troubleshooting

**"API key not configured" error:**
- Make sure you've created `.env.local` from `.env.local.example`
- Verify your API key is correct
- Restart the development server after adding environment variables

**"Agent ID not configured" error:**
- Add your agent ID to `.env.local`
- Make sure the agent exists in your Contextual AI account

**No response from agent:**
- Check your API key has the correct permissions
- Verify your agent is properly configured with a datastore
- Check the browser console and terminal for error messages

## License

MIT

