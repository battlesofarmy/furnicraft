"use client";
import client from "@/lib/apolloClient";
import { useQuery, gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import CartWishlistIcon from '@/components/CartWishlistIcon';

const ALL_SUBCATEGORY = gql`
 query($subCatId: String!){
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

interface Product{
  _id: string, 
  catId: string,
  subCatId: string,
  price: number,
  model: string,
  name: string,
  img: string
}

export default function Products() {

  const { data } = useQuery(ALL_SUBCATEGORY, { 
    variables: { subCatId: "1001" },
    client,
   });
  // console.log(data?.productsBySubCategory)
  
  return (
    <div>

<section className="py-10">
            <div className="container">
                <div className="grid grid-cols-4 gap-6">
                {data?.productsBySubCategory.map((ele: Product) => (
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
                        <CartWishlistIcon ele={ele} />
                    </div>
                    <div className="p-3 bg-white text-center">
                        <h2>{ele.name}</h2>
                    </div>

                    </div>
                ))}
                </div> 
            </div>
        </section>
    </div>
  )
}