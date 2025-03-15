 'use client';

import useCart from '@/hooks/useCart';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function CheckoutPage() {
  const [selectedShipping, setSelectedShipping] = useState('fedex');
  const { cartItems } = useCart();


  return (
    <section className='py-20'>
        <div className="container mx-auto px-4 sm:px-10 lg:px-20 xl:px-32">
        <div className="grid lg:grid-cols-2 gap-10 mt-8">
            <div>
            <h2 className="text-xl font-medium">Order Summary</h2>
            <p className="text-gray-400">Check your items and select a shipping method.</p>

            {
                cartItems?.map(ele=>
                <div key={ele._id} className="mt-3 bg-white p- rounded-lg shadow">
                    <div className="flex items-center">
                    <Image src={ele.img} width={100} height={100} className="rounded-md" alt="Shoe" />
                    <div className="ml-4">
                        <p>{ele.name}</p>
                        <p className='text-sm'>{ele.price} BDT</p>
                    </div>
                    </div>
                </div>

                )
            }



          <h2 className="mt-8 text-lg font-medium">Shipping Methods</h2>
          <div className="mt-5 space-y-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="shipping"
                value="fedex"
                checked={selectedShipping === 'fedex'}
                onChange={() => setSelectedShipping('fedex')}
                className="hidden"
              />
              <span className="w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center">
                {selectedShipping === 'fedex' && <span className="w-2 h-2 bg-gray-700 rounded-full"></span>}
              </span>
              <span className="font-medium">Cash On Delevery (2-4 Days)</span>
            </label>
          </div>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-medium">Payment Details</h2>
          <p className="text-gray-400">Complete your order by providing payment details.</p>
          <form className="mt-4 space-y-4">
            <input type="text" placeholder="Your Nmae" className="w-full p-2 border rounded-md" />
            <input type="email" placeholder="Your email" className="w-full p-2 border rounded-md" />
            <Link href={"/thankyou"}>
            <button className="w-full bg-gray-900 text-white p-2 rounded-md">Place Order</button>
            </Link>
          </form>
        </div>
      </div>
        </div>
    </section>
  );
}
