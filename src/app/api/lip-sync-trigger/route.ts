import { NextResponse } from "next/server";

const allowedOrigin = "https://ehabayman5dvr.github.io";

// In-memory state (resets on server restart)
let triggerState: { trigger: boolean; duration: number } = { trigger: false, duration: 0 };

// 🔧 Utility to attach CORS headers to all responses
function withCORS<T>(json: T, status = 200) {
  return NextResponse.json(json, {
    status,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

// Handle GET (Lens polls this)
export async function GET() {
  return withCORS(triggerState);
}

// Handle POST (Web app sets trigger)
export async function POST(req: Request) {
  const body = await req.json();
  triggerState = {
    trigger: body.trigger ?? false,
    duration: body.duration ?? 0,
  };
  return withCORS({ status: "ok", state: triggerState });
}

// Handle OPTIONS (CORS preflight)
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
