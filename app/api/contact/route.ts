import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend =
  resendApiKey && resendApiKey !== "re_placeholder_key_here"
    ? new Resend(resendApiKey)
    : null;

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
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    console.log("[Inquiry Received]", {
      name,
      email,
      phone: phone || "Not provided",
      location: location || "Not specified",
      interest: interest || "General Inquiry",
      timeline: timeline || "Not specified",
      budget: budget || "Not specified",
      message: message || "No message provided",
      consultationDate: consultationDate || null,
      consultationTime: consultationTime || null,
      receivedAt: new Date().toISOString(),
    });

    if (resend) {
      await resend.emails.send({
        from: "Website Inquiry <onboarding@resend.dev>",
        to: "Careme@onestreet.one",
        replyTo: email,
        subject: `New Inquiry from ${name} — ${interest || "General"} (${location || "DMV"})`,
        html: `
          <h2>New Website Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Location / Market:</strong> ${location || "Not specified"}</p>
          <p><strong>Interested in:</strong> ${interest || "Not specified"}</p>
          <p><strong>Timeline:</strong> ${timeline || "Not specified"}</p>
          <p><strong>Budget Range:</strong> ${budget || "Not specified"}</p>
          ${consultationDate ? `<p><strong>Requested Consultation Date:</strong> ${consultationDate} (${consultationTime || "Flexible"})</p>` : ""}
          <p><strong>Message:</strong></p>
          <p>${message || "No additional message"}</p>
        `,
      });
    } else {
      console.warn("RESEND_API_KEY is unset or placeholder. Message logged successfully.");
    }

    return NextResponse.json({ success: true, message: "Inquiry received." });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
