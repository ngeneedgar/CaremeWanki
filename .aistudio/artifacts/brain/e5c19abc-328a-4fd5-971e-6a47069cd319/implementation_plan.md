# Custom Setup Guide for caremewanki.com (Bluehost + Vercel)

Based on your exact Bluehost DNS Zone Editor screenshot, **your email DNS records are already 100% configured!**

---

## 1. What Your DNS Screenshot Confirms

| Record | Type | Value | Status |
| :--- | :--- | :--- | :--- |
| **`caremewanki.com`** | **MX** | `mail.caremewanki.com` (Priority 0) | **Active & Ready** |
| **`mail.caremewanki.com`** | **A** | `50.6.155.163` (Bluehost Mail Server) | **Active & Ready** |
| **`webmail.caremewanki.com`** | **A** | `50.6.155.163` | **Active & Ready** |
| **`imap`, `pop`, `smtp`** | **CNAME** | `mail.caremewanki.com` | **Active & Ready** |
| **SPF Deliverability** | **TXT** | `v=spf1 a mx include:websitewelcome.com ~all` | **Active & Ready** |
| **DKIM Authentication** | **TXT** | `default._domainkey.caremewanki.com` | **Active & Ready** |

Your email infrastructure is completely wired on Bluehost. You do **not** need to add any new MX or mail records.

---

## 2. Immediate Step: Create Your `careme@caremewanki.com` Mailbox

Since the DNS is already in place, you only need to create the actual inbox:

1. In your **Bluehost Dashboard**, go to **Advanced** (cPanel) -> **Email Accounts** (or click **Email & Office** in the left sidebar).
2. Click the blue **+ Create** button on the right.
3. Fill in the details:
   - **Domain**: select `caremewanki.com`
   - **Username**: type `careme` (this creates `careme@caremewanki.com`)
   - **Password**: enter a strong password (keep this safe)
   - **Storage Space**: select `Unlimited` or `10 GB`
4. Click **+ Create** at the bottom.

Your business email is now live!

---

## 3. How to Open Your Inbox (Webmail)

You can log in to your email from any browser:
- **Direct Webmail URL**: `https://webmail.caremewanki.com` (or `https://caremewanki.com:2096`)
- **Username**: `careme@caremewanki.com`
- **Password**: The password you just created
- Click **Open** (using Roundcube) to view your inbox, send, and receive emails.

---

## 4. How to Connect to iPhone, Android, or Mac Mail

To get your business emails directly on your phone or computer mail app:

- **Email Address**: `careme@caremewanki.com`
- **Username**: `careme@caremewanki.com` (must be full email)
- **Password**: Your mailbox password
- **Incoming Mail Server (IMAP)**: `mail.caremewanki.com` | Port: **993** | Security: **SSL/TLS**
- **Outgoing Mail Server (SMTP)**: `mail.caremewanki.com` | Port: **465** | Security: **SSL/TLS**

---

## 5. Crucial: How to Connect Vercel WITHOUT Breaking This Email

Notice rows 1 and 12 in your screenshot: you currently have two old `A` records for `caremewanki.com` (`66.235.200.147` and `216.198.79.1`).

When pointing your website to Vercel:
1. **In this Bluehost DNS table**:
   - Find the two `A` records for `caremewanki.com.`
   - Delete one of them, and click **Edit** on the other to change its IP to Vercel's IP: **`76.76.21.21`**
   - Click **Edit** on `www.caremewanki.com` CNAME and point it to: **`cname.vercel-dns.com`**
2. **DO NOT DELETE OR EDIT**:
   - `mail.caremewanki.com`
   - `webmail.caremewanki.com`
   - `MX` record (`caremewanki.com -> mail.caremewanki.com`)
   - `TXT` (SPF and DKIM) records

This guarantees your website is served lightning-fast by Vercel edge servers, while all incoming and outgoing business emails continue flowing seamlessly through Bluehost.
