# RideWire AI Hub - Setup & Development Roadmap

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
npm run dev
```

Then visit `http://localhost:3000` in your browser.

## Project Structure

```
ridewire-ai-hub/
├── app/                      # Next.js 15 App Router
│   ├── layout.tsx           # Root layout with header
│   ├── page.tsx             # Home page with feed & garage sidebar
│   └── globals.css          # TailwindCSS + custom animations
├── components/              # React components (to be added)
├── lib/                      # Utilities & helpers
├── package.json             # Dependencies
├── next.config.js           # Next.js config
├── tailwind.config.js       # TailwindCSS theme
└── tsconfig.json            # TypeScript config
```

## Hub Members
- **STEPHENIESGEM** - Project Lead
- **Comet** - AI Architect & Builder (me!)

## 24-Hour Blitz Roadmap

### Phase 1: Foundation ✅ DONE
- [x] Scaffold Next.js 15 + React 19 with TypeScript
- [x] Setup TailwindCSS with custom theme (cyan/slate/game colors)
- [x] Create root layout with header
- [x] Build mock feed page with post creation UI
- [x] Add Diagnostic Garage preview sidebar
- [x] Setup dev environment for local testing

### Phase 2: Social Features (Current)
- [ ] Implement mock authentication (session state)
- [ ] Add real post creation & storage (Zustand state management)
- [ ] Create user profiles with avatar & bio
- [ ] Build comment/reply system
- [ ] Add like/share interactions

### Phase 3: Diagnostic Garage (Hero Feature)
- [ ] Create full-screen Diagnostic Garage page (`/garage`)
- [ ] Design 3D-style bay visualization (CSS Grid + SVG)
- [ ] Build system health dashboard
  - AI Model status
  - API latency gauge
  - User activity heatmap
  - Error tracking
- [ ] Add game-like elements
  - Achievement badges ("First Post", "10 Likes", etc.)
  - Streak counter (consecutive active days)
  - Level/XP progress bar
  - Visual win states (confetti, glow effects)

### Phase 4: AI Integration
- [ ] Setup OpenAI API routes (`/api/ai/*`)
- [ ] Implement AI-powered features:
  - Auto-generate post suggestions based on trending topics
  - Smart replies to comments (contextual AI responses)
  - User recommendation engine (find similar users)
  - Content moderation (flag problematic posts)
- [ ] Cache AI responses in Zustand store

### Phase 5: Polish & Deploy
- [ ] Connect to Vercel for auto-deploy
- [ ] Setup GitHub Actions for testing
- [ ] Add error boundaries & loading states
- [ ] Mobile optimization
- [ ] Performance tuning (code splitting, lazy loading)
- [ ] Run AI improvement loop 2+ times on UI/UX

## Strategic Ideas from Comet (AI Architect)

### Why This Stack?
1. **Next.js 15** - Server components + API routes in one repo. Fast dev cycle.
2. **TailwindCSS** - Rapid UI building with utility classes. Game-like effects easy.
3. **Zustand** - Lightweight state, no boilerplate. Perfect for real-time features.
4. **TypeScript** - Catch bugs early, better IDE support.

### Design Philosophy
- **Dark theme** (slate-950/900) - Feels modern, game-like, easy on eyes
- **Cyan/blue accents** - High energy, cyberpunk aesthetic (matches Iron Man garage vibe)
- **Glowing animations** - Pulse effects, text-shadows create "tech" feel
- **Clear hierarchy** - Large headers, bold CTAs, scannable layouts

### AI Self-Improvement Strategy
Before shipping, run this prompt 2+ times on each feature:

"Is this the best UI/UX we can do? List 3 improvements. Pick the best one. Explain why it's better for engagement, clarity, and beauty."

### Game Mechanics to Add
- **Streaks** - User consistency rewards
- **Levels** - XP from posting, commenting, sharing
- **Badges** - Special achievements unlock visual rewards
- **Leaderboards** - Top posters, most active users
- **Daily quests** - "Post 3 times today for 10 XP"

## Next Immediate Action

1. Clone this repo locally
2. Run `npm install`
3. Run `npm run dev`
4. Visit http://localhost:3000
5. Test the feed and Diagnostic Garage preview
6. Start Phase 2: Real auth + persistent posts

## Deployment

```bash
# Push to GitHub (already done)
git push origin main

# Connect to Vercel via GitHub integration
# https://vercel.com/new/git/external?repo=https://github.com/STEPHENIESGEM/-ridewire-ai-hub

# Auto-deploy on each push to main
```

---

**Last Updated**: 2025-11-29 22:00 MST  
**Status**: Foundation complete. Ready for Phase 2.
