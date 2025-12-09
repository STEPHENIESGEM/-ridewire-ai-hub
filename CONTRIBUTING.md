# Contributing to RideWire AI Hub

Thank you for your interest in contributing to RideWire AI Hub! We welcome contributions from the community and are excited to have you help make this project better.

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our code of conduct:

- **Be respectful**: Treat everyone with respect and kindness
- **Be inclusive**: Welcome diverse perspectives and experiences
- **Be collaborative**: Work together to achieve common goals
- **Be professional**: Maintain a positive and constructive environment

## 🚀 Getting Started

### Prerequisites

Before contributing, ensure you have:
- Node.js 18+ installed
- Git installed and configured
- A GitHub account
- Familiarity with TypeScript and React

### Setting Up Your Development Environment

1. **Fork the repository**
   
   Click the "Fork" button at the top right of the repository page.

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/-ridewire-ai-hub.git
   cd -ridewire-ai-hub
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/STEPHENIESGEM/-ridewire-ai-hub.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- A clear, descriptive title
- Steps to reproduce the bug
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Your environment details (OS, Node version, browser)

### Suggesting Enhancements

For feature requests or enhancements:
- Check if the feature has already been requested
- Provide a clear description of the feature
- Explain why this feature would be useful
- Include mockups or examples if applicable

### Pull Request Process

1. **Update your fork**
   ```bash
   git fetch upstream
   git merge upstream/main
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation as needed

3. **Test your changes**
   ```bash
   npm run lint
   npm run build
   npm run dev
   ```
   Manually test your changes in the browser.

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```
   
   Use conventional commit messages:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `style:` for formatting changes
   - `refactor:` for code refactoring
   - `test:` for adding tests
   - `chore:` for maintenance tasks

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill in the PR template with:
     - Description of changes
     - Related issue numbers
     - Screenshots (for UI changes)
     - Testing steps

7. **Address review feedback**
   - Respond to comments promptly
   - Make requested changes
   - Push updates to the same branch

## 🎨 Coding Standards

### TypeScript

- Use TypeScript for all new files
- Define proper types and interfaces
- Avoid using `any` type when possible
- Use meaningful variable and function names

### React Components

- Use functional components with hooks
- Keep components small and focused
- Use proper prop typing
- Follow React best practices

### Styling

- Use TailwindCSS utility classes
- Follow the existing color scheme (slate, cyan, blue)
- Ensure responsive design (mobile-first)
- Maintain dark theme consistency

### File Organization

- Place components in the `components/` directory
- Use clear, descriptive file names
- Group related files together
- Export components using named exports

### Git Workflow

- Keep commits atomic and focused
- Write clear commit messages
- Rebase on main before submitting PR
- Squash commits if requested

## 🧪 Testing

Currently, the project is in early development. When adding new features:
- Manually test all functionality
- Test on different screen sizes
- Test in multiple browsers
- Verify no console errors

Automated testing will be added in future phases.

## 📚 Documentation

When contributing:
- Update README.md if adding new features
- Document new environment variables in .env.example
- Add inline comments for complex logic
- Update SETUP.md for development changes

## 🎯 Priority Areas

Current focus areas for contributions:
1. **Social Features**: Authentication, user profiles, post interactions
2. **Diagnostic Garage**: Full dashboard implementation
3. **AI Integration**: OpenAI API integration for smart features
4. **Mobile Optimization**: Responsive design improvements
5. **Accessibility**: ARIA labels, keyboard navigation
6. **Performance**: Code splitting, lazy loading

## ❓ Questions?

If you have questions:
- Check existing issues and discussions
- Open a new issue with the "question" label
- Reach out to the maintainers

## 🙏 Thank You!

Your contributions help make RideWire AI Hub better for everyone. We appreciate your time and effort!

---

**Happy Coding! ⚡**
