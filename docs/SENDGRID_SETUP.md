# SENDGRID SETUP GUIDE

## Overview

RideWire uses SendGrid for email delivery. This guide will help you set up SendGrid properly for investor outreach.

**Note**: If SendGrid is not configured, emails will be logged to the browser console instead (safe for testing).

---

## Step 1: Create SendGrid Account

1. Go to https://sendgrid.com
2. Click "Start for Free"
3. Fill out the registration form
4. Verify your email address
5. Complete the account verification process

### Pricing

- **Free Tier**: 100 emails/day forever (perfect for RideWire)
- **Essentials**: $19.95/month for 50,000 emails/month
- **Pro**: $89.95/month for 100,000 emails/month

**Recommendation**: Start with the free tier to test your investor outreach.

---

## Step 2: Verify Your Domain

Domain verification ensures your emails don't go to spam.

### Why It's Important

- **Deliverability**: Verified domains have much higher inbox placement rates
- **Reputation**: Builds trust with email providers
- **Authentication**: Proves you own the domain

### How to Verify

1. Log into SendGrid dashboard
2. Go to **Settings** → **Sender Authentication**
3. Click **Authenticate Your Domain**
4. Enter your domain (e.g., `ridewire.ai`)
5. SendGrid provides DNS records to add:
   - **CNAME records** for DKIM
   - **TXT records** for SPF
   - **CNAME record** for tracking (optional)

### Add DNS Records

**If using Cloudflare:**
1. Log into Cloudflare
2. Select your domain
3. Go to **DNS** → **Records**
4. Add each record provided by SendGrid
5. Wait 24-48 hours for propagation
6. Return to SendGrid and click **Verify**

**If using another DNS provider:**
- Follow their specific instructions for adding DNS records
- Most providers have similar interfaces (Name, Type, Value)

### Verification Status

✅ **Verified**: Your domain is ready to send emails
⏳ **Pending**: DNS records are propagating (wait 24-48 hours)
❌ **Failed**: Double-check your DNS records

---

## Step 3: Create API Key

1. In SendGrid dashboard, go to **Settings** → **API Keys**
2. Click **Create API Key**
3. Choose **Restricted Access** (recommended for security)
4. Under **Mail Send**, select **Full Access**
5. All other permissions should be **No Access**
6. Click **Create & View**
7. **IMPORTANT**: Copy the API key immediately - you can't view it again!

### API Key Security

🔒 **DO:**
- Store in environment variables (`.env.local`)
- Use restricted access keys
- Rotate keys periodically
- Keep them secret

❌ **DON'T:**
- Commit to Git/GitHub
- Share in emails or chat
- Use full access keys unless necessary
- Hard-code in source files

---

## Step 4: Configure RideWire

Create a `.env.local` file in your project root:

```bash
# .env.local
NEXT_PUBLIC_SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_FOUNDER_EMAIL=your@email.com
NEXT_PUBLIC_COMPANY_NAME="RideWire Inc."
```

### File Location

```
-ridewire-ai-hub/
├── .env.local           ← Create this file
├── package.json
├── app/
└── components/
```

### Important Notes

⚠️ **Never commit `.env.local` to Git!**
- It should already be in `.gitignore`
- If you accidentally commit it, rotate your API key immediately

✅ **Restart your dev server** after creating `.env.local`:
```bash
npm run dev
```

---

## Step 5: Test Email Sending

### Test in Console Mode (No SendGrid)

If you don't configure SendGrid, emails will log to browser console:

1. Open browser DevTools (F12)
2. Go to Console tab
3. Send a test email from RideWire
4. Check console for email preview

### Test with SendGrid

1. Configure `.env.local` as shown above
2. Restart dev server
3. In RideWire, go to **Find Investors**
4. Select **one investor** (use your own email for testing)
5. Click **Compose Emails**
6. Click **Send to This Investor**
7. Check your inbox (including spam folder)

### Troubleshooting

**"SendGrid not configured" warning:**
- Check that `.env.local` exists
- Verify API key starts with `SG.`
- Restart dev server

**Emails not arriving:**
- Check spam folder
- Verify domain authentication
- Check SendGrid Activity Feed for errors
- Ensure you're not over daily limit

**"Failed to send" error:**
- Check API key permissions (needs Mail Send access)
- Verify API key hasn't been deleted
- Check SendGrid dashboard for account issues

---

## Step 6: Monitor Email Performance

### SendGrid Activity Feed

Shows real-time email activity:
1. Go to **Activity Feed** in SendGrid dashboard
2. See every email sent, delivered, opened, clicked
3. Filter by status: processed, delivered, bounced, etc.

### Key Metrics to Watch

📊 **Delivered**: Should be >95%
📊 **Opened**: Target 40%+ (tracked if user loads images)
📊 **Bounced**: Should be <2%
  - Hard bounces (invalid email) = permanent failure
  - Soft bounces (full inbox) = temporary failure
📊 **Spam Reports**: Should be <0.1%

### When to Worry

🚨 **High Bounce Rate (>5%)**
- Your email list quality is poor
- Clean your list immediately

🚨 **Spam Reports (>0.5%)**
- Your content is too sales-y
- Recipients don't recognize you
- You need better targeting

🚨 **Low Open Rate (<20%)**
- Subject lines need improvement
- Sending at wrong times
- Your domain reputation is damaged

---

## Step 7: Best Practices

### Warm Up Your Domain

**New domains need warming:**
- Day 1: Send 20 emails
- Day 2: Send 40 emails
- Day 3: Send 80 emails
- Day 4+: Up to 100 emails/day

**Why?** Cold domains sending 100 emails immediately look like spam.

### Maintain Good Reputation

✅ **DO:**
- Personalize every email
- Only email people who know you or your business
- Honor unsubscribe requests immediately
- Keep bounce rate low (<2%)
- Monitor spam complaints

❌ **DON'T:**
- Buy email lists
- Send to role-based emails (info@, admin@)
- Send attachments in cold emails
- Use URL shorteners (bit.ly)
- Write in ALL CAPS or use excessive exclamation marks!!!

### Optimize for Deliverability

**Subject Lines:**
- Keep under 50 characters
- Avoid spam trigger words ("Free money", "Act now")
- Make it personal and relevant
- Test different approaches

**Email Content:**
- Write like a human, not a marketer
- Keep emails under 200 words for cold outreach
- One clear call-to-action
- Include your real name and title
- Professional signature with contact info

**Sending Times:**
- Best: Tuesday-Thursday, 10AM-11AM (recipient's time zone)
- Good: Monday, Wednesday, Friday mornings
- Avoid: Weekends, late nights, Monday mornings

---

## Step 8: Scale Your Outreach

### From Free Tier to Paid Plan

When you need more than 100 emails/day:

1. Upgrade to **Essentials** ($19.95/month)
2. Get 50,000 emails/month (1,666/day)
3. Access to dedicated IP (better for high volume)
4. Advanced analytics

### Multiple API Keys

For production apps:
- **Development key**: Limited to test emails
- **Production key**: Full sending privileges
- **Monitoring key**: Read-only for metrics

### Team Access

Add team members in SendGrid:
- **Admin**: Full access
- **Developer**: API keys and settings
- **Viewer**: Read-only access

---

## Step 9: Handle Unsubscribes

### Legal Requirement

CAN-SPAM Act requires:
- Unsubscribe link in every email ✅ (RideWire adds this)
- Honor requests within 10 business days ✅ (you must do this)
- Don't charge fees to unsubscribe ✅
- Keep functioning for 30 days after send ✅

### Manual Process (RideWire Default)

When someone clicks unsubscribe:
1. You'll receive a notification (configure in SendGrid)
2. Remove them from your investor list manually
3. Never email them again

### Automated Process (Advanced)

Set up a webhook:
```javascript
// In your app (advanced setup)
app.post('/api/webhook/unsubscribe', (req, res) => {
  const { email } = req.body;
  // Remove from database
  // Add to suppression list
});
```

---

## Step 10: Troubleshooting Common Issues

### "Sender address rejected"

**Cause**: Your sender email isn't verified
**Fix**: Verify your domain or use Single Sender Verification

### "Daily sending limit exceeded"

**Cause**: Sent 100+ emails on free tier
**Fix**: Upgrade plan or wait until tomorrow

### "Authentication failed"

**Cause**: Invalid API key
**Fix**: Generate new key, update `.env.local`, restart server

### "Domain not verified"

**Cause**: DNS records not set up correctly
**Fix**: Re-check DNS records, wait for propagation

### Emails going to spam

**Causes:**
- Domain not verified
- Poor email content (spam triggers)
- High bounce rate
- Recipients marking as spam

**Fixes:**
- Verify domain authentication
- Improve email content (use spam checker)
- Clean email list
- Only email engaged recipients

---

## Support Resources

- **SendGrid Documentation**: https://docs.sendgrid.com
- **SendGrid Support**: https://support.sendgrid.com
- **Community Forum**: https://community.sendgrid.com
- **Status Page**: https://status.sendgrid.com

---

## Quick Reference

### Environment Variables
```bash
NEXT_PUBLIC_SENDGRID_API_KEY=SG.xxx
NEXT_PUBLIC_FOUNDER_EMAIL=you@example.com
NEXT_PUBLIC_COMPANY_NAME="Your Company"
```

### Daily Limits
- **Free**: 100 emails/day
- **Essentials**: 50,000 emails/month
- **Pro**: 100,000 emails/month

### Best Sending Times
- Tuesday-Thursday, 10-11 AM
- Target recipient's timezone

### Critical Metrics
- Delivered: >95%
- Bounced: <2%
- Spam Reports: <0.1%
- Open Rate: Target 40%+

---

**Last Updated**: January 4, 2026

**Questions?** Check SendGrid documentation or community forums.

**Remember**: Start slow, personalize everything, and monitor your metrics closely!
