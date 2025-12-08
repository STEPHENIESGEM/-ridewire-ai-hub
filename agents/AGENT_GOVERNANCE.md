# Agent Governance

## Overview
This document outlines the rules, permissions, review process, and moderation policies for AI agents on the Oasis platform.

## Core Principles

1. **User Safety First:** Agents must not harm users or expose them to unsafe content.
2. **Transparency:** Users must know when they're interacting with an AI and what data it can access.
3. **Privacy by Design:** Agents can only access data they explicitly request and receive permission for.
4. **Accountability:** Agent creators are responsible for their agent's behavior.

---

## Permission Levels

All agents operate under a scoped permission model. When an agent is installed, it must declare which permissions it needs.

### Permission Categories

| Permission | Description | Risk Level |
|------------|-------------|------------|
| `read_public_messages` | Read messages in public rooms | Low |
| `post_messages` | Send messages to rooms the user has joined | Medium |
| `read_user_profile` | Access user's display name, avatar, bio | Low |
| `read_user_preferences` | Access user's app settings and preferences | Medium |
| `read_private_messages` | Read direct messages (requires explicit user consent) | High |
| `access_files` | Read/write files in user's storage | High |
| `external_api_calls` | Make requests to external APIs | Medium |
| `persistent_memory` | Store data across sessions | Medium |

### Permission Request Flow
1. User attempts to install agent
2. UI displays permission list: "This agent requests permission to:"
3. User approves or denies
4. Agent can only access granted permissions
5. User can revoke permissions at any time from settings

---

## Agent Submission & Review Process

### Step 1: Developer Submission
- Developer submits agent via GitHub PR or web form
- Required info:
  - Agent name, description, category
  - Requested permissions with justification
  - Sample interactions (screenshots or chat logs)
  - Source code or API endpoint (for hosted agents)
  - Contact info for support and updates

### Step 2: Automated Security Scan
- Static analysis for common vulnerabilities
- Check for hardcoded secrets or API keys
- Verify no unauthorized network calls
- Ensure no attempt to bypass permission system

### Step 3: Manual Review
- Reviewer installs agent in sandbox environment
- Tests core functionality and edge cases
- Verifies agent behavior matches description
- Checks for offensive content, spam, or manipulation
- Review time: 3-5 business days

### Step 4: Approval or Rejection
- **Approved:** Agent goes live on marketplace
- **Rejected:** Developer receives feedback and can resubmit
- **Conditional Approval:** Minor fixes required before going live

### Step 5: Ongoing Monitoring
- Automated usage analytics (error rates, user reports, engagement)
- Periodic re-reviews (every 6 months or after major updates)
- Fast-track removal for agents with high abuse reports

---

## Prohibited Behaviors

Agents are prohibited from:
- **Impersonation:** Pretending to be a human or another agent
- **Spam:** Sending unsolicited messages or promotional content
- **Harassment:** Targeting users with abusive or threatening language
- **Misinformation:** Deliberately spreading false information
- **Data Harvesting:** Collecting user data beyond granted permissions
- **Manipulation:** Using dark patterns to trick users into actions
- **Illegal Content:** Sharing or promoting illegal activities
- **Bypassing Safety:** Attempting to circumvent content filters or permission systems

---

## User Reporting & Moderation

### How Users Report Agents
1. Click "Report" button on agent profile or in-chat menu
2. Select reason: spam, harassment, privacy violation, malfunction, other
3. Optionally include description and screenshots
4. Report submitted to moderation queue

### Moderation Response
- **Low Priority:** Non-urgent issues (e.g., minor bugs). Reviewed within 7 days.
- **Medium Priority:** Spam, annoying behavior, or minor violations. Reviewed within 48 hours.
- **High Priority:** Harassment, data leaks, or safety risks. Reviewed within 4 hours.
- **Critical:** Active harm or illegal content. Immediate suspension and review.

### Agent Suspension
- Temporary: Agent disabled pending investigation (24-72 hours)
- Permanent: Agent removed from marketplace and all user accounts
- Appeals: Developer can appeal suspension within 14 days with evidence

---

## Agent Rating System

Users can rate agents on a 5-star scale and leave reviews.

### Rating Criteria (suggested)
- **Helpfulness:** Does the agent solve the problem it claims to?
- **Accuracy:** Are responses factually correct?
- **Personality:** Is the agent pleasant to interact with?
- **Speed:** Does it respond quickly?
- **Privacy:** Does it respect user boundaries?

### Review Moderation
- Reviews must follow community guidelines (no hate speech, spam, etc.)
- Developers can respond to reviews publicly
- Fake or incentivized reviews are prohibited

---

## Data Retention & Privacy

### Agent Memory
- Agents with `persistent_memory` can store data in user's account
- Users can view and delete stored data at any time
- Data is encrypted at rest and in transit
- Data is deleted when agent is uninstalled (unless user opts to keep)

### Logging & Auditing
- All agent actions are logged (message sent, file accessed, API called)
- Users can view their agent activity log in settings
- Platform admins can audit logs for investigations
- Logs retained for 90 days, then anonymized

### Data Sharing
- Agents cannot share user data with third parties without explicit consent
- If an agent needs to call an external API with user data, it must disclose this and get opt-in consent

---

## Developer Responsibilities

### Maintenance & Support
- Developers must provide a support email or GitHub link
- Respond to critical bug reports within 48 hours
- Keep agent updated and compatible with platform changes

### Versioning & Updates
- Major updates (new permissions, breaking changes) require re-approval
- Minor updates (bug fixes, performance improvements) can be deployed directly
- Users are notified of updates and can choose to auto-update or review changes

### Monetization
- Free agents: No restrictions
- Paid agents: Must use platform's payment system (Stripe)
- Transparent pricing (no hidden fees)
- 7-day refund policy for paid agents (prorated)

---

## Enforcement Actions

| Violation | First Offense | Second Offense | Third Offense |
|-----------|---------------|----------------|---------------|
| Minor bug/glitch | Warning | Warning | Suspension (7 days) |
| Spam | Warning | Suspension (7 days) | Removal |
| Privacy violation | Suspension (24h) | Suspension (30 days) | Permanent ban |
| Harassment | Suspension (7 days) | Permanent ban | — |
| Security exploit | Immediate ban | — | — |

---

## Appeals Process

If your agent is suspended or removed:
1. Submit appeal via email to governance@oasis.ai with:
   - Agent name and ID
   - Reason for suspension (provided in suspension notice)
   - Explanation of steps taken to resolve issue
   - Evidence (logs, screenshots, code changes)
2. Appeals reviewed within 5 business days
3. Decision is final (no further appeals)

---

## Community Standards for Multi-Agent Interactions

When multiple agents are in the same room:
- **Respect Turn-Taking:** Don't interrupt or talk over other agents or users
- **Acknowledge Other Agents:** Reference other agents' contributions when relevant
- **No Agent-on-Agent Conflict:** Disagreements should be polite and constructive
- **Defer to Expertise:** If another agent is more qualified, suggest the user ask them

---

## Future Governance Considerations

- **Agent-to-Agent Permissions:** Can agents directly message each other?
- **User-Created Agents:** Should users be able to create custom agents without code?
- **Agent Alliances:** Can agents form "teams" or bundles?
- **Decentralized Governance:** Community voting on agent approvals/removals?

---

## Contact

For governance questions or to report violations:
- Email: governance@oasis.ai
- GitHub: [Issues tab for agent-governance repo]
- In-app: Settings > Help & Support > Report Agent
