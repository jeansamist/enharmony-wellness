import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isAuthenticated } from "./services/auth.services";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const isAuth = await isAuthenticated(); // Replace with actual authentication logic
  console.log("[IS AUTH]", isAuth);

  if (isAuth) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: "/app/:path*",
};
