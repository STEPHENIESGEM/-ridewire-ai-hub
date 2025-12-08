# Dropshipping Flow (Printful Integration)

## Overview
This document describes the end-to-end flow for physical merchandise orders using Printful as the print-on-demand and fulfillment partner.

## Prerequisites
- Printful account (free to create)
- Stripe account for payments
- Products created in Printful catalog
- Webhook endpoint configured on server

## Order Flow

### 1. User Browses Marketplace
- User visits marketplace physical merch section
- Products display with images, descriptions, pricing
- Pricing = Printful cost + markup (e.g., 2-3x for profit margin)

### 2. User Adds to Cart
- Client-side cart stores product IDs, variant (size, color), quantity
- Cart persists in localStorage or user session

### 3. Checkout
- User clicks "Checkout"
- Frontend calls `/api/create-checkout-session` with line items
- Backend creates Stripe Checkout Session with line items
- User redirected to Stripe-hosted checkout page

### 4. Payment Completion
- User completes payment on Stripe
- Stripe sends webhook to `/api/webhooks/stripe` with `checkout.session.completed` event
- Backend verifies webhook signature
- Backend extracts order details (customer email, shipping address, line items)

### 5. Order Submission to Printful
- Backend calls Printful API: `POST /orders` with:
  - Recipient (name, address, email)
  - Line items (product ID, variant ID, quantity)
  - Shipping method
- Printful confirms order and returns order ID
- Backend stores order ID in database linked to Stripe payment

### 6. Order Fulfillment
- Printful manufactures product (typically 2-7 business days)
- Printful ships product and updates order status
- Printful sends webhook to `/api/webhooks/printful` with status updates:
  - `package_shipped`: tracking number available
  - `package_delivered`: order completed

### 7. Customer Notifications
- Backend listens for Printful webhooks
- On `package_shipped`: send email to customer with tracking link
- On `package_delivered`: send confirmation email, request review

### 8. Returns & Refunds
- Customer contacts support for return/refund
- Backend initiates return via Printful API or Printful dashboard
- Printful handles return logistics
- Backend issues refund via Stripe API once return is confirmed

## API Endpoints

### `/api/create-checkout-session` (POST)
**Request:**
```json
{
  "line_items": [
    {
      "price_data": {
        "currency": "usd",
        "product_data": {
          "name": "Oasis T-Shirt",
          "images": ["https://..."]
        },
        "unit_amount": 2499
      },
      "quantity": 1
    }
  ],
  "customer_email": "user@example.com"
}
```
**Response:**
```json
{
  "id": "cs_test_...",
  "url": "https://checkout.stripe.com/..."
}
```

### `/api/webhooks/stripe` (POST)
- Verifies Stripe signature
- Handles `checkout.session.completed` event
- Creates order in Printful

### `/api/webhooks/printful` (POST)
- Verifies Printful signature (X-Printful-Signature header)
- Handles order status updates
- Sends customer notifications

## Environment Variables
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
PRINTFUL_API_KEY=...
PRINTFUL_WEBHOOK_SECRET=...
SUCCESS_URL=https://yourdomain.com/order-success
CANCEL_URL=https://yourdomain.com/cart
```

## Testing
- Use Stripe test mode for payment testing
- Use Printful sandbox environment for order testing
- Test webhook delivery with ngrok or webhook.site

## Cost Calculation Example
- Printful cost: $10 (t-shirt production + shipping)
- Markup: 2.5x
- Sell price: $25
- Stripe fee: ~$1 (2.9% + $0.30)
- Net profit: $14 per sale

## Monitoring & Alerts
- Track order success rate (Printful API success vs failures)
- Monitor shipping delays (>7 days to ship)
- Alert on high refund rate (>5%)
- Dashboard for daily/weekly/monthly sales and profit
