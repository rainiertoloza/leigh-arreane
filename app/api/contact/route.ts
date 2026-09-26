import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    name?: string;
    email?: string;
    message?: string;
  };
  if (!body.email?.includes("@") || !body.message || body.message.length < 8) {
    return NextResponse.json({ error: "Please complete the form." }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
