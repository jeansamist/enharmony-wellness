import { verifyUnsubscribeToken } from "@/lib/newsletter-token";
import { unsubscribeFromNewsletter } from "@/services/newsletter.services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return new NextResponse("Missing token", { status: 400 });
  }

  const email = verifyUnsubscribeToken(token);

  if (!email) {
    return new NextResponse("Invalid or expired token", { status: 400 });
  }

  await unsubscribeFromNewsletter(email);

  return new NextResponse(
    `<html>
      <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
        <h1>Unsubscribed</h1>
        <p>You have been successfully unsubscribed from the newsletter.</p>
        <a href="/">Return to Home</a>
      </body>
    </html>`,
    {
      headers: {
        "Content-Type": "text/html",
      },
    }
  );
}
