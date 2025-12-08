# Marketplace Plan

## Overview
The Oasis Marketplace is a multi-category platform where users can:
1. Subscribe to third-party AI agents (monthly/annual subscriptions)
2. Purchase digital goods (avatar packs, themes, sound packs)
3. Buy physical merchandise via print-on-demand (Printful integration)

## Revenue Streams
- **Agent Subscriptions**: 70/30 split (developer keeps 70%, platform 30%)
- **Digital Goods**: One-time purchases, 80/20 split
- **Physical Merch**: Dropshipping margin on top of Printful cost (typically 2-3x markup)

## Technical Architecture

### Phase 1: Agent Marketplace (MVP)
- Agent discovery page with search and filters
- Agent detail pages with capabilities, pricing, reviews
- Stripe subscription integration for monthly/annual billing
- Permission system: agents can request scoped access (read messages, post replies, access user preferences)
- Approval workflow: admins review agents before they go live

### Phase 2: Digital Goods
- Product catalog with categories (avatars, themes, sound packs, effects)
- Stripe one-time payment checkout
- Delivery via download links or automatic account provisioning
- License management (single-user vs multi-seat)

### Phase 3: Physical Merch (Printful Dropshipping)
- Product catalog synced with Printful's API
- Cart and checkout via Stripe
- Order fulfillment webhook from Printful
- Order tracking and customer notifications
- Returns/refunds handled through Printful

## Seller Onboarding
- Creators submit agent/product via form or GitHub PR
- Review process: security scan, permissions review, test deployment
- Seller dashboard: sales analytics, earnings, payout settings
- Monthly payouts via Stripe Connect or PayPal

## Quality & Safety
- All agents must pass security review (no unauthorized data access)
- User ratings and reviews visible on marketplace
- Report abuse system: users can flag malicious agents
- Automated monitoring: usage spikes, error rates, negative sentiment

## Marketing & Discovery
- Featured agents on homepage
- Curated collections (e.g., "Best for Coding", "Creative Tools")
- Search by category, price, rating, and keywords
- Social proof: "X users installed this agent"

## Future Enhancements
- Agent bundles (buy 3, get 1 free)
- Affiliate program for creators
- Gift cards and vouchers
- Seasonal sales and promotions
