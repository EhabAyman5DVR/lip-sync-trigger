import { NextResponse } from "next/server";

// In-memory state (resets on server restart)
let triggerState = { trigger: false, duration: 0 };

// Handle GET (Lens polls this)
export async function GET() {
  return NextResponse.json(triggerState);
}

// Handle POST (Web app sets trigger)
export async function POST(req: Request) {
  const body = await req.json();
  triggerState = {
    trigger: body.trigger ?? false,
    duration: body.duration ?? 0,
  };
  return NextResponse.json({ status: "ok", state: triggerState });
}