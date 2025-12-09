# RideWire AI Hub ⚡

An AI-powered social network platform with a unique Diagnostic Garage feature, built with Next.js 15, React 19, and TypeScript. RideWire AI Hub combines modern social networking capabilities with gamification elements and AI-driven features to create an engaging, futuristic user experience.

## 🌟 Features

- **Social Feed**: Share posts, interact with content through likes, comments, and shares
- **Diagnostic Garage**: Real-time system health monitoring with a game-like interface
  - AI Engine status tracking
  - System health visualization
  - Performance metrics dashboard
- **Modern UI/UX**: Dark theme with cyberpunk aesthetic using cyan/blue accents
- **Real-time Interactions**: State management with Zustand for seamless user experience
- **AI Integration Ready**: Built with AI-powered features in mind (content suggestions, smart replies, user recommendations)
- **Gamification**: Achievements, streaks, levels, and XP system (in development)

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- A modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/STEPHENIESGEM/-ridewire-ai-hub.git
   cd -ridewire-ai-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration values.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📖 Usage

### Development

- **Start development server**: `npm run dev`
- **Build for production**: `npm run build`
- **Start production server**: `npm start`
- **Run linter**: `npm run lint`

### Creating Posts

1. Navigate to the home page
2. Use the "Create a Post" text area
3. Type your content
4. Click the "Post" button to share

### Diagnostic Garage

Access the Diagnostic Garage sidebar on the home page to:
- Monitor AI Engine status
- View system health metrics
- Access the full garage dashboard (coming soon)

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS 3.4](https://tailwindcss.com/)
- **State Management**: [Zustand 4.4](https://github.com/pmndrs/zustand)
- **HTTP Client**: [Axios 1.6](https://axios-http.com/)

## 📁 Project Structure

```
ridewire-ai-hub/
├── app/                      # Next.js 15 App Router
│   ├── layout.tsx           # Root layout with header
│   ├── page.tsx             # Home page with feed & garage sidebar
│   └── globals.css          # TailwindCSS + custom animations
├── components/              # React components (to be added)
├── lib/                      # Utilities & helpers
├── public/                  # Static assets
├── .env.example             # Environment variables template
├── package.json             # Dependencies
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # TailwindCSS theme
├── tsconfig.json            # TypeScript configuration
├── CONTRIBUTING.md          # Contribution guidelines
└── LICENSE                  # MIT License
```

## 🤝 Contributing

We welcome contributions from the community! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on how to contribute to this project.

## 📋 Roadmap

### Phase 1: Foundation ✅ DONE
- [x] Scaffold Next.js 15 + React 19 with TypeScript
- [x] Setup TailwindCSS with custom theme
- [x] Create root layout with header
- [x] Build mock feed page with post creation UI
- [x] Add Diagnostic Garage preview sidebar

### Phase 2: Social Features (Current)
- [ ] Implement authentication
- [ ] Add real post creation & storage
- [ ] Create user profiles
- [ ] Build comment/reply system
- [ ] Add like/share interactions

### Phase 3: Diagnostic Garage (Hero Feature)
- [ ] Create full-screen Diagnostic Garage page
- [ ] Design 3D-style bay visualization
- [ ] Build comprehensive system health dashboard
- [ ] Add gamification elements (achievements, streaks, levels)

### Phase 4: AI Integration
- [ ] Setup AI API routes
- [ ] Implement AI-powered features:
  - Auto-generate post suggestions
  - Smart replies to comments
  - User recommendation engine
  - Content moderation

### Phase 5: Polish & Deploy
- [ ] Production deployment
- [ ] CI/CD pipeline
- [ ] Mobile optimization
- [ ] Performance tuning

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **STEPHENIESGEM** - Project Lead
- **Comet** - AI Architect & Builder

## 📞 Support

For support, please open an issue in the GitHub repository or contact the team.

## 🙏 Acknowledgments

- Built during a 24-hour development blitz
- Inspired by Iron Man's garage aesthetic
- Powered by the latest web technologies

---

**Made with ⚡ by the RideWire Team**
