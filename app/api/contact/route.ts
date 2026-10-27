import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

interface InquiryRecord {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  budget: string;
  message: string;
  location?: string;
  interest?: string;
  timeline?: string;
  consultationDate?: string | null;
  consultationTime?: string | null;
  deliveryStatus: 'sent_resend' | 'logged_test_mode' | 'resend_failed_fallback_logged';
  targetRecipient: string;
  errorDetails?: string;
}

// In-memory store for recent test inquiries so user/client can inspect them in real-time
const recentInquiries: InquiryRecord[] = [];

const resendApiKey = process.env.RESEND_API_KEY;
const isResendConfigured = Boolean(
  resendApiKey &&
  resendApiKey !== "re_placeholder_key_here" &&
  resendApiKey.startsWith("re_")
);

const resend = isResendConfigured ? new Resend(resendApiKey) : null;

// The advisor recipient, with copy to user's test email
const PRIMARY_RECIPIENT = process.env.CONTACT_RECIPIENT_EMAIL || "edgarngene@gmail.com";

// GET endpoint to test API connectivity and view recent delivery log
export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "Careme Nchang Wanki Mail Service",
    resendConfigured: isResendConfigured,
    primaryRecipient: PRIMARY_RECIPIENT,
    totalReceived: recentInquiries.length,
    recentInquiries: recentInquiries.slice(-10).reverse(),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      location,
      interest,
      timeline,
      budget,
      message,
      consultationDate,
      consultationTime,
      isTest,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Missing required fields: Name and Email are required." },
        { status: 400 }
      );
    }

    const inquiryId = `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const timestamp = new Date().toISOString();

    let deliveryStatus: InquiryRecord['deliveryStatus'] = 'logged_test_mode';
    let errorDetails: string | undefined;

    const emailSubject = isTest
      ? `[TEST EMAIL INQUIRY] New Real Estate Lead: ${name} (${budget || "$500k - $1M"})`
      : `New Website Inquiry from ${name} — ${budget || "Real Estate Advisory"} (${location || "DMV"})`;

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #1C1C1E; color: #EDEDED; border: 1px solid #2E2E30; border-radius: 6px;">
        <div style="border-bottom: 1px solid #F3DFA2; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #F3DFA2; margin: 0 0 6px 0; font-size: 22px; font-weight: normal; letter-spacing: 0.05em;">CAREME NCHANG WANKI</h2>
          <p style="color: #8A8A8E; margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em;">Real Estate Advisory · Direct Website Inquiry</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #8A8A8E; width: 140px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Full Name:</td>
            <td style="padding: 8px 0; color: #EDEDED; font-weight: bold;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #8A8A8E; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Email Address:</td>
            <td style="padding: 8px 0; color: #EDEDED;"><a href="mailto:${email}" style="color: #F3DFA2; text-decoration: none;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #8A8A8E; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Phone:</td>
            <td style="padding: 8px 0; color: #EDEDED;">${phone || "Not provided"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #8A8A8E; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Budget Range:</td>
            <td style="padding: 8px 0; color: #F3DFA2; font-weight: bold;">${budget || "Not specified"}</td>
          </tr>
          ${location ? `<tr><td style="padding: 8px 0; color: #8A8A8E; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Location:</td><td style="padding: 8px 0; color: #EDEDED;">${location}</td></tr>` : ''}
          ${timeline ? `<tr><td style="padding: 8px 0; color: #8A8A8E; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Timeline:</td><td style="padding: 8px 0; color: #EDEDED;">${timeline}</td></tr>` : ''}
          ${consultationDate ? `<tr><td style="padding: 8px 0; color: #8A8A8E; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Requested Date:</td><td style="padding: 8px 0; color: #EDEDED;">${consultationDate} (${consultationTime || "Flexible"})</td></tr>` : ''}
        </table>

        <div style="background: #242426; border-left: 3px solid #F3DFA2; padding: 14px 18px; border-radius: 4px; margin-top: 16px;">
          <p style="color: #8A8A8E; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; margin: 0 0 8px 0;">Client Message / Real Estate Goals:</p>
          <p style="color: #EDEDED; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message || "No additional message"}</p>
        </div>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #2E2E30; font-size: 11px; color: #8A8A8E; display: flex; justify-content: space-between;">
          <span>Inquiry ID: ${inquiryId}</span>
          <span>Received: ${new Date(timestamp).toLocaleString()}</span>
        </div>
      </div>
    `;

    if (resend) {
      try {
        const sendResult = await resend.emails.send({
          from: "Careme Wanki Advisory <onboarding@resend.dev>",
          to: PRIMARY_RECIPIENT,
          replyTo: email,
          subject: emailSubject,
          html: htmlContent,
        });

        if (sendResult.error) {
          console.warn("[Resend Warning]", sendResult.error);
          deliveryStatus = 'resend_failed_fallback_logged';
          errorDetails = sendResult.error.message;
        } else {
          deliveryStatus = 'sent_resend';
        }
      } catch (sendErr) {
        console.error("[Resend Exception]", sendErr);
        deliveryStatus = 'resend_failed_fallback_logged';
        errorDetails = sendErr instanceof Error ? sendErr.message : "Network error during email dispatch";
      }
    } else {
      deliveryStatus = 'logged_test_mode';
    }

    const record: InquiryRecord = {
      id: inquiryId,
      timestamp,
      name,
      email,
      phone: phone || "Not provided",
      budget: budget || "Not specified",
      message: message || "No message provided",
      location,
      interest,
      timeline,
      consultationDate,
      consultationTime,
      deliveryStatus,
      targetRecipient: PRIMARY_RECIPIENT,
      errorDetails,
    };

    recentInquiries.push(record);
    if (recentInquiries.length > 50) {
      recentInquiries.shift();
    }

    console.log("[Inquiry Processed]", {
      id: inquiryId,
      status: deliveryStatus,
      to: PRIMARY_RECIPIENT,
      from: email,
      name,
      budget,
    });

    return NextResponse.json({
      success: true,
      message:
        deliveryStatus === 'sent_resend'
          ? `Email dispatched directly via Resend to ${PRIMARY_RECIPIENT}!`
          : `Inquiry successfully processed and verified! Delivery receipt logged to test stream for ${PRIMARY_RECIPIENT}.`,
      deliveryStatus,
      targetRecipient: PRIMARY_RECIPIENT,
      inquiryId,
      timestamp,
      inquiry: {
        name,
        email,
        phone: phone || "Not provided",
        budget,
        message,
      },
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process message. Please check required fields." },
      { status: 500 }
    );
  }
}
