import { NextResponse } from "next/server";

/**
 * Contact endpoint.
 *
 * Currently validates the payload and acknowledges it. TODO: forward to a real
 * provider — Resend, Formspree, Postmark, or an existing CRM — by adding the
 * API call where the `TODO` comment sits below.
 */

type Payload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "Please include your name." }, { status: 422 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "That email address doesn't look right." }, { status: 422 });
  }
  if (message.length < 10) {
    return NextResponse.json({ ok: false, error: "Tell me a little more — at least 10 characters." }, { status: 422 });
  }
  if (message.length > 4000) {
    return NextResponse.json({ ok: false, error: "That message is a bit long. Please trim it down." }, { status: 422 });
  }

  // TODO: send the enquiry somewhere real, e.g.
  // await resend.emails.send({ from: "site@…", to: process.env.CONTACT_TO!, replyTo: email, subject: `New enquiry from ${name}`, text: message });

  return NextResponse.json({ ok: true });
}

export function GET() {
  return NextResponse.json({ ok: false, error: "Use POST to send an enquiry." }, { status: 405 });
}
