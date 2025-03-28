"use client";
import client from "@/lib/apolloClient";
import { useQuery, gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import CartWishlistIcon from "@/components/CartWishlistIcon";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import useAuthStore from "@/utils/store/authStore";

const ALL_SUBCATEGORY = gql`
  query ($subCatId: String!) {
    productsBySubCategory(subCatId: $subCatId) {
      _id
      catId
      subCatId
      price
      model
      name
      img
    }
  }
`;

interface Product {
  _id: string;
  catId: string;
  subCatId: string;
  price: number;
  model: string;
  name: string;
  img: string;
  count?: number;
  wishlist: string;
}


const WISHLIST_PRODUCT_ID =  gql`
  query($email: String!){
    wishlistByEmail(email: $email) {
      products {
        _id
      }
    }
  }
`;


export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const {user} = useAuthStore();
  const { data } = useQuery(ALL_SUBCATEGORY, {
    variables: { subCatId: "1001" },
    client,
  });



  
  const { data: wishlist_product_id } = useQuery(WISHLIST_PRODUCT_ID, {
    variables: { email: user?.email || "" },
    skip: !user?.email, // Avoid running query when user is not available
    client
  });



  // Update wishlist IDs when the data is fetched
  useEffect(() => {
    // setProducts
    if(data?.productsBySubCategory && wishlist_product_id?.wishlistByEmail){
      const productItems = data.productsBySubCategory.map((ele: Product)=> ({
        ...ele,
        // johfa: (wishlist_product_id.wishlistByEmail.products),
        wishlist: wishlist_product_id.wishlistByEmail.products.find((item: Product)=> item._id === ele._id)
      }));
      setProducts(productItems);
    }
  }, [wishlist_product_id]);



  
  return (
    <div>
      <section className="py-10">
        <div className="container">
          <div className="grid grid-cols-4 gap-6">
            {products.length>0
              ? products.map((ele: Product) => (
                  <div className="shadow relative" key={ele._id}>
                    <Link href={`/subcategory/${ele._id}`}>
                      <Image
                        src={ele.img}
                        alt={ele.name}
                        width={300}
                        height={300}
                        className="w-full h-auto"
                      />
                    </Link>

                    {/* Prodcut wishlist & cart icon  */}
                    <div className="absolute top-2 right-2">

                      <CartWishlistIcon ele={ele} setProducts={setProducts}/>
                    </div>
                    <div className="p-3 bg-white text-center">
                      <h2>{ele.name}</h2>
                    </div>
                  </div>
                ))
              : Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="shadow relative">
                    <Skeleton className="w-full h-[300px]" />

                    {/* Prodcut wishlist & cart icon  */}
                    <div className="absolute top-2 right-2">
                      {/* <CartWishlistIcon /> */}
                    </div>
                    <div className="p-3 bg-white text-center">
                      <Skeleton className="w-full h-[25px]" />
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>
    </div>
  );
}
