import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { product_id, user_email } = await req.json();

    if (!product_id) {
      throw new Error("Missing product_id in request");
    }

    const STORE_ID = process.env.NEXT_PUBLIC_LEMON_SQUEEZY_STORE_ID;
    const PRODUCT_ID = product_id;

    const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_LEMON_SQUEEZY_API_KEY}`,
        "Content-Type": "application/vnd.api+json",
        Accept: "application/vnd.api+json",
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            checkout_data: {
              custom: {
                user_email: user_email,
              },
            },
          },
          relationships: {
            store: {
              data: {
                type: "stores",
                id: STORE_ID.toString(),
              },
            },
            variant: {
              data: {
                type: "variants",
                id: PRODUCT_ID.toString(),
              },
            },
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create checkout");
    }

    const data = await response.json();

    const checkoutUrl = data.data.attributes.url;
    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    console.error("Checkout API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
