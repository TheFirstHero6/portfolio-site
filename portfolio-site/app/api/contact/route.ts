import { NextRequest, NextResponse } from "next/server";

// Helper function moved outside POST handler
async function sendEmail(data: { to: string; subject: string; html: string }) {
  // Development mode: log email instead of sending (if no API key)
  if (!process.env.RESEND_API_KEY) {
    console.log("📧 [DEV MODE] Contact form submission:", {
      to: data.to,
      subject: data.subject,
      message: data.html,
    });
    console.log(
      "💡 To send real emails, add RESEND_API_KEY to your .env.local file"
    );
    // Still return success in dev mode so form works
    return;
  }

  // Production: send via Resend
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Use verified domain or Resend's test domain
    // To use kclabs.app: verify the domain in Resend dashboard first
    // For testing: use "onboarding@resend.dev" (works immediately)
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    console.log("📤 Attempting to send email via Resend...");
    console.log("From:", fromEmail);
    console.log("To:", data.to);
    console.log(
      "⚠️  Note: If using custom domain, ensure it's verified in Resend"
    );

    const result = await resend.emails.send({
      from: fromEmail,
      to: data.to, // This can be any email address, doesn't need to be verified
      subject: data.subject,
      html: data.html,
    });

    // Check if Resend response indicates failure
    if (result.error) {
      console.error("❌ Resend API error:", result.error);
      throw new Error(
        result.error.message || `Resend error: ${JSON.stringify(result.error)}`
      );
    }

    // Check if email was successfully sent (should have data.id)
    if (!result.data?.id) {
      console.error("❌ Resend response missing email ID:", result);
      throw new Error("Email sending failed: No email ID returned from Resend");
    }

    console.log("✅ Email sent successfully, ID:", result.data.id);
    return result;
  } catch (emailError: any) {
    console.error("❌ Email sending error:", emailError);
    console.error("Error details:", JSON.stringify(emailError, null, 2));

    // Provide more helpful error messages
    let errorMessage = "Failed to send email";

    // Check for SMTP errors specifically
    const errorString = JSON.stringify(emailError).toLowerCase();
    if (
      errorString.includes("smtp") ||
      errorString.includes("421") ||
      errorString.includes("connection")
    ) {
      errorMessage =
        "SMTP connection failed. This usually means:\n" +
        "1. The destination mail server (kclabs.app) is unreachable\n" +
        "2. DNS/MX records might be misconfigured\n" +
        "3. The mail server might be blocking connections\n" +
        "\nTry: Verify your domain's MX records or use a different destination email temporarily.";
    } else if (emailError?.message) {
      errorMessage = emailError.message;
    } else if (emailError?.response?.body?.message) {
      errorMessage = emailError.response.body.message;
    } else if (emailError?.response?.status === 403) {
      errorMessage =
        "Domain not verified. Please verify kclabs.app in Resend dashboard or use onboarding@resend.dev for testing.";
    }

    throw new Error(errorMessage);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { name, email, message } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Name should be at least two characters" },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !/.+@.+\..+/.test(email)) {
      return NextResponse.json(
        { error: "Please Enter a Valid Email" },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters" },
        { status: 400 }
      );
    }

    // Send email
    await sendEmail({
      to: "klaus.dev@kclabs.app",
      subject: `Portfolio Contact: ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Contact API error:", error);

    // Return specific error message if available
    const errorMessage =
      error?.message || "Failed to send message. Please try again later.";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
