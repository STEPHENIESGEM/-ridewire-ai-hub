# RideWire — Oasis: Social AR AI Home (Vision & Roadmap)

Vision
A warm, human-centered Social AR "home" where AI agents and people coexist — a place that feels like an oasis: friendly colors and soft motion, playful micro-interactions, and spaces where AIs "meet" and chat with each other and with users. The goal is a personal hub: your friends, your AI assistants, and public AIs can socialize, learn, and assist in a delightful environment.

Core concepts
- Spaces: persistent rooms (Living Room, Garden, Studio) where AIs and users gather.
- Avatars: lightweight 2D/3D avatars representing users and AI agents (customizable).
- Conversations: threaded chat + voice + multimodal (images or short clips).
- Agent orchestration: multiple AI agents can be connected to a conversation and "talk to each other" with human-visible context and guardrails.
- AR/Spatial UI: progressive WebXR support for viewing rooms in 3D, but fully functional in 2D web UI.
- Privacy-first: user control of data, simple OOB choices (who can see/save conversations).
- Beautiful, soothing UI: oasis palette, soft gradients, rounded components, and subtle animations.

Prioritized feature list (MVP → V1 → V2)
- MVP (0–4 weeks)
  - Basic app shell and "Oasis" theme (global styles, palette, fonts, landing UI).
  - Authentication (hosted provider: Supabase/Auth0/Clerk).
  - Rooms: create/join simple rooms with chat messages.
  - Agent connector: connect one hosted LLM (OpenAI or Perplexity API) to room chat.
  - Avatars: simple 2D avatar selection (prebuilt images).
  - Basic RAG support: embed small docs and perform simple retrievals.
  - Playwright recorded E2E tests for major flow (open, login, join room, chat).

- V1 (1–3 months)
  - Multi-agent orchestration: multiple agents in the same room with labeled messages (Agent A / Agent B).
  - Voice chat (record/play) with speech-to-text integration (optional hosted STT).
  - Vector DB integration (Pinecone/Qdrant) for richer RAG.
  - Room persistence & user presence indicators.
  - Role system (owner/moderator/member) and basic moderation tools.
  - Figma design system with component library (buttons, cards, avatars).

- V2 (3–9 months)
  - WebXR "AR mode" prototypes: place a virtual room in your environment, view avatars in AR.
  - Advanced personalization (agent memory, user preferences).
  - Self-hosted model option for privacy-sensitive users.
  - Plug-in marketplace: add third-party agents (with scoped permissions).
  - Rich media sharing and story mode (save moments, highlights).

Design principles
- Warm & human: soft gradients, organic shapes, friendly type.
- Calm motion: slow, smooth transitions and micro-interactions.
- Social-first: presence indicators, audio cues, and easy invites.
- Safe-by-default: privacy controls upfront, moderation tools.

KPIs & success metrics
- Comfort score (user-rated warmth & beauty)
- Engagement (time in rooms, DAU/MAU)
- Avg session length in rooms
- User satisfaction (rating flows)
- Model cost per session and latency targets (p95/p99)

Stakeholders & collaborators
- Product owner: you
- Design lead: Perplexity (or chosen UI lead)
- Frontend Lead: UI/UX implementation & AR prototypes
- Backend/AI Lead: model orchestration, vector DB, RAG
- QA: non-dev testers (playwright recordings + manual checklist)
