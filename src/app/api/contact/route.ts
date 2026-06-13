import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error("Missing RESEND_API_KEY environment variable");
      return NextResponse.json(
        { error: "Email configuration error on the server" },
        { status: 500 }
      );
    }

    // Call Resend's API directly without needing extra SDK downloads
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        // Resend free tier onboarding default sender
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: "binethmad@gmail.com",
        replyTo: email,
        subject: `[Portfolio Contact] ${subject}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e5e5; border-radius: 12px; background-color: #ffffff; color: #171717;">
            <h2 style="color: #000000; border-bottom: 1px solid #e5e5e5; padding-bottom: 12px; margin-top: 0; font-size: 20px;">
              New Contact Form Submission
            </h2>
            <p style="margin: 10px 0; font-size: 14px; line-height: 1.5;">
              <strong>Name:</strong> ${name}
            </p>
            <p style="margin: 10px 0; font-size: 14px; line-height: 1.5;">
              <strong>Email:</strong> <a href="mailto:${email}" style="color: #ffd600; text-decoration: underline;">${email}</a>
            </p>
            <p style="margin: 10px 0; font-size: 14px; line-height: 1.5;">
              <strong>Subject:</strong> ${subject}
            </p>
            <div style="margin-top: 20px; padding: 16px; background-color: #f5f5f5; border-radius: 8px; border-left: 4px solid #ffd600; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
              ${message}
            </div>
          </div>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Resend API error response:", data);
      return NextResponse.json(
        { error: data.message || "Failed to send email" },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, message: "Message sent successfully" });
  } catch (error: any) {
    console.error("Contact API Internal Server Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
