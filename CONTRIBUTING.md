# Contributing to RideWire AI Hub

Welcome to the intelligence loop. This guide explains how to collaborate with us on solving wicked problems.

---

## Core Principles

1. **Think big, start small.** Pick a bottleneck, propose a 3–6 month experiment, measure what changes.
2. **Share constraints, not just ideas.** What makes this hard? Energy cost? Data scarcity? Political friction? These constraints sharpen the loop.
3. **Notebooks are war rooms, not finished papers.** Comment, fork, iterate. Design evolves when we move together.
4. **Measure, learn, adjust.** Every experiment logs findings—successes and failures. This is data for the next cycle.
5. **Stay accountable to reality.** No vaporware. If you propose something, be ready to test it.

---

## How to Get Started

### 1. Explore the Repository
- Read [README.md](./README.md) for the full vision.
- Check [FOUNDERS_VISION.md](./FOUNDERS_VISION.md) for the invitation and roadmap.
- Review [experiments/001-mars-biomineralization/](./experiments/001-mars-biomineralization/) to see how we structure tests.

### 2. Find Your Domain
Which wicked problem excites you?

- **Planetary Stewardship:** Climate, carbon removal (DAC), energy (fusion, superconductors)
- **Food Systems:** Cultivated meat, extreme-environment agriculture, biotech
- **Interplanetary:** Mars habitats, ISRU, biomineralization, robotics
- **Governance & Policy:** UBI, work-week pilots, institutional design
- **Development & Justice:** State capacity, justice reform, women's empowerment

### 3. Start a Discussion or Issue
Open a GitHub Issue or Discussion describing:

- **The bottleneck:** What specific problem would you tackle?
- **The timeline:** Can you propose a 3–6 month experiment?
- **Your constraints:** What makes this hard? (Cost, data, politics, physics?)
- **Success metric:** What would move the needle?
- **Your role:** What expertise do you bring?

### 4. Fork an Experiment or Create a New One
If you're extending existing work:
- Fork the notebook and propose your changes.
- Comment with data, constraints, or alternative designs.
- Tag collaborators for feedback.

If you're starting a new test:
- Create a folder under `experiments/00X-[domain]/`
- Follow the notebook template (see below).
- Link it in the README.

---

## Experiment Notebook Template

Each experiment notebook should have these sections:

```markdown
# [Domain] Intelligence Loop: [Problem Statement]

## Problem Definition
- What are we solving?
- Why does it matter?
- What are the hard constraints?

## Reality Check
- What do we know from existing literature?
- What are the key unknowns?
- Where are the data gaps?

## AI Design Phase
- Propose 2–3 design concepts.
- For each: materials, energy, timeline, cost, key risks.
- Which is most promising? Why?

## Monitoring & Feedback Loop
- What sensors/metrics would you use?
- How often would you measure?
- What thresholds trigger action?
- How does the system adapt?

## What This Proves (& What It Doesn't)
- Success criteria for this phase.
- Known limitations.
- Next steps if successful.
- Failure modes and recovery.

## Reflection & Open Questions
- What seems plausible from first principles?
- What is clearly sci-fi or needs breakthrough science?
- What critical experiments would move the needle?
- Why does a human-AI family matter here?
```

---

## GitHub Workflow

### Opening an Issue

Use one of these templates:

- **Experiment proposal:** "New test: [Domain] - [Bottleneck]"
- **Data request:** "Data needed: [Dataset] - [Why it matters]"
- **Constraint/limitation:** "[Domain] bottleneck: [What makes this hard]"
- **General discussion:** "Discussion: [Topic] - [Question]"

Include:
- Clear problem statement
- Proposed scope (3–6 months)
- Success metric
- Why this matters
- Any relevant links or papers

### Pull Requests

If you're adding a new experiment notebook or updating docs:

1. **Fork the repo** (or create a branch if you have write access).
2. **Make your changes** in `/experiments` or docs.
3. **Test locally** (render the notebook, check links).
4. **Submit a PR** with:
   - Clear title: `feat: Add [Domain] intelligence loop notebook`
   - Description of what the test does and why it matters
   - Link to any related issue
   - Request review from maintainers
5. **Respond to feedback** and iterate.
6. Once approved, your changes are merged and go live.

### Discussions

Use [Discussions](../../discussions) for:
- Long-form questions about the vision
- Brainstorming new domains or problems
- Sharing relevant research or data
- Debate about approach, timeline, or feasibility
- Networking with other collaborators

---

## Code of Conduct

### We value:
- **Intellectual honesty.** Tell us if something won't work and why.
- **Diverse expertise.** We need skeptics, visionaries, domain experts, and generalists.
- **Long-term thinking.** This is a 20–30 year project. We're playing a long game.
- **Collaboration over competition.** Solve the problem together, not alone.

### We don't tolerate:
- Dismissing someone's idea without understanding it first.
- Claiming success without evidence.
- Abandoning work without documenting what you learned.
- Gatekeeping expertise or information.

---

## Data & Documentation Standards

### For Notebooks:
- Use markdown cells to explain reasoning, not just code.
- Include citations for data sources and papers.
- Document assumptions clearly.
- Add a "Reflection" section at the end.

### For Data:
- Use open formats (CSV, JSON, Parquet, HDF5).
- Include metadata (source, date, units, methodology).
- Link to original sources when possible.
- Document any preprocessing steps.

### For Code:
- Comment complex logic.
- Use meaningful variable names.
- Include unit tests for simulations.
- Add a README if it's a standalone tool.

---

## Recognition

Contributions are tracked via:
- **GitHub history** (commit author)
- **Notebook citations** (acknowledging data providers, co-designers)
- **README contributors section** (for major contributors)
- **Monthly summaries** in project updates

You'll be credited as you contribute, and your expertise will be visible to others in the network.

---

## Frequently Asked Questions

**Q: Do I need to be an expert to contribute?**  
No. We need people who understand constraints, domain specialists, skeptics, and visionaries. What matters is intellectual honesty and willingness to iterate.

**Q: Can I contribute if I only have a few hours a month?**  
Yes. You might:
- Comment with data on a notebook
- Point out a constraint we missed
- Propose a connection between domains
- Share a paper or dataset

Small contributions compound.

**Q: What if my idea gets rejected?**  
That's OK. We'll explain why. Sometimes the timing is wrong, the bottleneck isn't where we thought, or the data isn't available yet. Use the feedback to refine your approach.

**Q: Can I work on this privately before sharing?**  
Yes. Fork, experiment locally, and submit when you're ready. We trust you to know when something is ready to share.

**Q: How do I know if my idea fits RideWire?**  
Ask: "Is this a wicked problem?" (No ex-ante solution, high interconnectedness, requires iteration.) "Can humans and AI co-evolve on this?" If yes to both, let's talk.

---

## Resources

- [GitHub Issues Guide](https://guides.github.com/features/issues/)
- [Jupyter Notebook Best Practices](https://nbformat.readthedocs.io/)
- [Markdown Reference](https://commonmark.org/help/)
- [RideWire Papers & Research](../wiki) (coming)

---

## Contact & Support

- **Questions?** Open a Discussion or comment on an issue.
- **Found a bug?** Submit an issue with the `bug` label.
- **Have a dataset?** Open an issue with the `data` label.
- **Want to lead a domain?** Message the maintainers; let's talk.

---

**Thank you for joining the family. Let's stretch our grasp and blow minds with solutions.**
