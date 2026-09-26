import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getBook, type BookFormatType } from "@/lib/books";

type PayloadItem = {
  slug: string;
  format: BookFormatType;
  quantity: number;
};

export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      {
        error:
          "Stripe is not configured yet. Add STRIPE_SECRET_KEY to .env.local (test mode).",
      },
      { status: 501 },
    );
  }

  const body = (await request.json()) as { items?: PayloadItem[] };
  const items = body.items ?? [];
  if (items.length === 0) {
    return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });
  }

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const item of items) {
    const book = getBook(item.slug);
    const format = book?.formats.find((f) => f.type === item.format);
    if (!book || !format) {
      return NextResponse.json({ error: "Unknown item in bag." }, { status: 400 });
    }
    if (item.quantity < 1 || item.quantity > 20) {
      return NextResponse.json({ error: "Invalid quantity." }, { status: 400 });
    }
    line_items.push({
      quantity: item.quantity,
      price_data: {
        currency: format.currency,
        unit_amount: format.price,
        product_data: {
          name: `${book.title} (${format.label})`,
          description: book.hook,
          images: [
            `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}${book.coverImage}`,
          ],
        },
      },
    });
  }

  const stripe = new Stripe(secret);
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ??
    request.headers.get("origin") ??
    "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items,
    success_url: `${origin}/checkout/success`,
    cancel_url: `${origin}/checkout/cancel`,
    shipping_address_collection: { allowed_countries: ["US", "PH", "GB", "CA", "AU"] },
    allow_promotion_codes: true,
  });

  return NextResponse.json({ url: session.url });
}
