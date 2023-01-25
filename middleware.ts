import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const previousPage = req.nextUrl.pathname;

  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const validRoles = ["admin", "super-user", "SEO"];

  if (
    previousPage.startsWith("/checkout") ||
    previousPage.startsWith("/admin")
  ) {
    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/login";
      url.search = `p=${previousPage}`;
      return NextResponse.redirect(url);
    }
  }

  if (previousPage.startsWith("/admin")) {
    if (!validRoles.includes(session.user.role)) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  if (previousPage.startsWith("/api/admin")) {
    if (!session || !validRoles.includes(session.user.role)) {
      return new Response(JSON.stringify({ message: "No autorizado." }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout/:path*", "/admin/:path*", "/api/admin/:path*"],
};
