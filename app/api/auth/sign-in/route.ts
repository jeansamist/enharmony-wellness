import { signIn } from "@/services/auth.services";
import { redirect, RedirectType } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const code = searchParams.get("code");

  if (!email || !code) {
    redirect("/", RedirectType.push);
  }

  const resp = await signIn(email, code);

  if (resp) {
    redirect("/app/dashboard", RedirectType.push);
  } else {
    redirect("/auth/sign-in?error=Invalid credentials", RedirectType.push);
  }
}

export async function POST(request: Request) {
  // Parse the request body
  const body = await request.json();
  const { email, code } = body;

  const resp = await signIn(email, code);

  if (!resp) {
    return new Response(JSON.stringify({ message: "Invalid credentials" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(
    JSON.stringify({ message: "Sign in successful", data: resp }),
    {
      status: 201,
      headers: { "Content-Type": "application/json" },
    }
  );
}
