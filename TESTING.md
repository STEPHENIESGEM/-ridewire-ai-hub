# Testing Guide (for non-developers)

How to run the app locally
1. Install Node.js LTS.
2. Open a terminal and run:
   git clone https://github.com/STEPHENIESGEM/-ridewire-ai-hub.git
   cd -ridewire-ai-hub
   npm install
   npm run dev
3. Open the app URL shown in the terminal.

Running tests (one-command)
- End-to-end tests:
  npm run test:e2e
  (This will open or run recorded UI tests using Playwright/Cypress.)

Manual test checklist (copy these into an issue or spreadsheet):
- [ ] App loads in browser, no build errors in terminal.
- [ ] Main page displays with correct styles.
- [ ] Login flow works (if present).
- [ ] Core AI features produce responses (note down any errors or hallucinations).
- [ ] Settings / user profile works.
- [ ] No console errors in browser dev tools.

How to report issues
- Open a new issue and include:
  - OS and browser
  - Steps to reproduce
  - Expected vs actual behavior
  - Screenshots or short screen recordings (recommended)

If you get stuck, send the output of:
- node -v
- npm -v
- The terminal output after running `npm run dev`
