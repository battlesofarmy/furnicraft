"use client";

import useCart from "@/hooks/useCart";
import CartItem from "@/components/CartItem";
import Link from "next/link";

export default function MyCart() {
  const { cartItems, increaseProdouctCount, decreaseProdouctCount, handleCartItemDelete } = useCart();
  
  const calculateTotalPrice = () => cartItems.reduce((sum, ele) => sum + ele.price * ele.count, 0);
  const totalItems = () => cartItems.reduce((sum, ele) => sum + ele.count, 0);
  
  return (
    <section className="py-20">
      <div className="container">
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-8 gap-5">
            {/* Cart Items */}
            <div className="col-span-5">
              <div className="grid grid-cols-8 mb-3 place-items-center">
                <h4 className="col-span-1 font-semibold">Product Img</h4>
                <h4 className="col-span-3 font-semibold">Title</h4>
                <h4 className="col-span-1 font-semibold">Price</h4>
                <h4 className="col-span-2 font-semibold">Count</h4>
                <h4 className="col-span-1 font-semibold">Remove</h4>
              </div>

              {cartItems.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  increaseProdouctCount={increaseProdouctCount}
                  decreaseProdouctCount={decreaseProdouctCount}
                  handleCartItemDelete={handleCartItemDelete}
                />
              ))}
            </div>

            {/* Order Summary */}
            <div className="col-span-3 border shadow-sm p-10 mt-9">
              <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>
              <p>Subtotal ({totalItems()} items): {calculateTotalPrice()}</p>
              <p>Shipping Fee: 100</p>
              <p className="font-semibold">Total: {calculateTotalPrice() + 100}</p>
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
