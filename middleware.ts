export const config = {
  matcher: ["/"],
};

export default function middleware(request: Request) {
  return new Response(null, {
    headers: {
      "x-middleware-rewrite": new URL("/api/handler", request.url).toString(),
    },
  });
}
