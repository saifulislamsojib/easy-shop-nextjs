import { getProductsByIdsFromDb } from "@/services/product.service";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    const cookie = request.cookies.get("cart")?.value;
    if (!cookie) return NextResponse.json({ cart: [] });
    const cartObj = JSON.parse(cookie);
    const products = await getProductsByIdsFromDb(Object.keys(cartObj));
    const cart = products.map((product) => {
      return {
        ...product,
        quantity: cartObj[product._id.toString()],
      };
    });
    return NextResponse.json({ cart });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
};

export const POST = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const action = searchParams.get("action");
    if (!id) throw new Error("id not found");
    const cookie = cookies();
    let cart = {};
    let res = { added: true, message: "added to cart" };
    if (cookie.get("cart")?.value) {
      cart = JSON.parse(cookie.get("cart")?.value);
      if (cart[id]) {
        if (action === "plus") {
          cart[id] += 1;
        } else if (action === "minus") {
          if (cart[id] <= 1) throw new Error("Minus must be greater than 1");
          cart[id] -= 1;
          res.message = "Reduced from cart";
        } else {
          throw new Error("Already added to cart");
        }
      } else {
        cart[id] = 1;
      }
    } else {
      cart[id] = 1;
    }
    cookie.set({
      name: "cart",
      value: JSON.stringify(cart),
      secure: true,
      httpOnly: true,
    });
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ added: false, message: error.message });
  }
};
