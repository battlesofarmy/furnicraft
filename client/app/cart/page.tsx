"use client";

import useCart, { UseCartReturn } from "@/hooks/useCart";
import CartItem from "@/components/CartItem";
import Link from "next/link";

export default function MyCart() {
  const { cartItems, increaseProductCount, decreaseProductCount, handleCartItemDelete }: UseCartReturn = useCart();

  return (
    <section className="py-20">
      <div className="container">
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-8 gap-5">
            <div className="col-span-5">
              {cartItems.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  increaseProductCount={increaseProductCount}
                  decreaseProductCount={decreaseProductCount}
                  handleCartItemDelete={handleCartItemDelete} // ✅ This now matches the expected type
                />
              ))}
            </div>
            <div className="col-span-3 border shadow-sm p-10 mt-9">
              <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>
              <p>Subtotal ({cartItems.length} items)</p>
              <Link href="/checkout">
                <button className="bg-primary text-white py-2 rounded-sm mt-5 w-full">Checkout</button>
              </Link>
            </div>
          </div>
        ) : (
          <h2 className="text-xl">The Shopping cart is empty. No product added!</h2>
        )}
      </div>
    </section>
  );
}
