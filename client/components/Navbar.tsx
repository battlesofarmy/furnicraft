"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useAuthStore from "@/utils/store/authStore";
import { IoCartOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { gql, useQuery } from "@apollo/client";
import client from '@/lib/apolloClient'
import useCounterStore from "@/utils/store/itemCount";

export default function Header() {
  const pages = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Contact", href: "/contact" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get current route
  const {user} = useAuthStore();
  const {count, setCount} = useCounterStore();

  const CART_COUNT = gql`
     query($email: String!){
      cartCountByEmail(email: $email)
    }
  `;

  const {data} = useQuery(CART_COUNT, {
    variables: { email: user?.email },
    skip: !user?.email, // Prevents query if email is undefined
    client
  });

  // Close the menu when the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(()=>{
    setCount(data?.cartCountByEmail || 0);
 },[data, setCount])



  const { logout } = useAuthStore();  

  return (
    <header className="border">
      <div className="container flex shrink-0 items-center h-16">
        {/* Logo ========================  */}
        <Link href="/" className="mr-6" prefetch={false}>
          <Logo/>
        </Link>

        {/* Desktop Menu ======================== */}
        <nav className="ml-auto hidden lg:flex gap-2">
          {pages?.map((ele) => (
            <Link
              key={ele.name}
              href={ele.href}
              className="group text-sm inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              prefetch={false}
            >
              {ele.name}
            </Link>
          ))}
        <div>
      {user ? <button onClick={logout} className="bg bg-teal-600 py-2 px-4 text-white">LogOut</button> : <p className="mt-1"> <Link href={'/login'}>Login</Link> </p>}
    </div>
     
     {/* Cart and wishlist icon  */}
     <div className="navbar-end flex items-center gap-5">

               <Link href='/wishlist'>
                 <div className='flex'>
                        <div className='text-3xl'><IoMdHeartEmpty/></div>
                        <p className='bg-primary text-white w-5 h-5 text-center rounded-full text-[0.8rem] -mt-1 -ml-3 '>  {2}  </p>
                  </div>
               </Link>
                
                <Link href='/cart'>
                  <div className='flex'>
                    <div className='text-3xl'><IoCartOutline/></div>
                    <p className='bg-primary text-white w-5 h-5 text-center rounded-full text-[0.8rem] -mt-1 -ml-3'> 
                      {count}
                    </p>
                  </div>
                </Link>
                
              </div>


    </nav>

        {/* Mobile Menu ======================== */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          {/* Mobile menu Icon  */}
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden ml-auto">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          {/* Mobile Menu */}
          <SheetContent side="left">
            {/* Menu title */}
            <Link href="#" className="mr-6 lg:flex" prefetch={false}>
              <Logo />
            </Link>

            {/* Menu links */}
            <div className="grid gap-2 py-6">
              {pages?.map((ele) => (
                <Link
                  key={ele.name}
                  href={ele.href}
                  className="flex w-full items-center py-2 font-semibold"
                  prefetch={false}
                >
                  {ele.name}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function Logo() {
  return <h2 className="text-2xl h-6 w-6">Muntasir</h2>;
}