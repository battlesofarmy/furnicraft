"use client";

import { gql, useMutation } from "@apollo/client";
import client from "@/lib/apolloClient";
import { CheckCircle, ShoppingCart } from "lucide-react";
import useAuthStore from "@/utils/store/authStore";
import { toast } from "sonner";
import useCounterStore from "@/utils/store/itemCount";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ADD_TO_CART = gql`
  mutation (
    $id: ID!
    $catId: String!
    $subCatId: String!
    $name: String!
    $email: String!
    $img: String!
    $model: String!
    $price: Int!
    $count: Int!
  ) {
    addOrIncreaseCartCount(
      _id: $id
      catId: $catId
      subCatId: $subCatId
      name: $name
      email: $email
      img: $img
      model: $model
      price: $price
      count: $count
    ) {
      count
    }
  }
`;

const ADD_OR_REMOVED_WISHLISTITEMS = gql`
  mutation (
    $id: ID!
    $catId: String!
    $subCatId: String!
    $name: String!
    $email: String!
    $img: String!
    $model: String!
    $price: Int!
  ) {
    addOrRemovedToWishlist(
      _id: $id
      catId: $catId
      subCatId: $subCatId
      name: $name
      email: $email
      img: $img
      model: $model
      price: $price
    )
  }
`;


interface CartProps {
  _id: string;
  email?: string;
  catId: string;
  subCatId: string;
  name: string;
  price: number;
  model: string;
  count?: number;
  img: string;
  wishlist : string;
}
interface Props {
  ele: CartProps;
  setProducts: React.Dispatch<React.SetStateAction<CartProps[]>>; // ✅ Add this line
}


export default function CartWishlistIcon({ ele, setProducts }: Props) {



  const { user } = useAuthStore();
  const { cartCount } = useCounterStore();


  

  // Use useMutation hook
  const [addOrIncreaseCartCount] = useMutation(ADD_TO_CART, { client });
  const [ addOrRemovedToWishlist ] = useMutation(ADD_OR_REMOVED_WISHLISTITEMS, {
    client,
  });

  const addToCart = async () => {
    try {
      const { data } = await addOrIncreaseCartCount({
        variables: {
          id: ele._id,
          email: user?.email,
          catId: ele.catId,
          subCatId: ele.subCatId,
          name: ele.name,
          price: ele.price,
          model: ele.model,
          count: 1,
          img: ele.img,
        },
      });
      toast.success("Product Succesfully Added to cart", {
        style: { border: "0.2px solid rgb(62, 68, 77)", fontSize: "15px" },
        icon: <CheckCircle className="text-green-600 w-6 h-6" />,
      });

      if (data.addOrIncreaseCartCount.count === 1) {
        cartCount();
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const addToWishlist = async () => {
    try {
      const { data } = await addOrRemovedToWishlist({
        variables: {
          id: ele._id,
          catId: ele.catId,
          subCatId: ele.subCatId,
          name: ele.name,
          email: user?.email,
          img: ele.img,
          model: ele.model,
          price: ele.price,
        },
      });
  
      // Toggle wishlist in state after mutation
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === ele._id
            ? { ...product, wishlist: product.wishlist ? "" : "true" } // Toggle
            : product
        )
      );
  
      console.log("Wishlist updated:", data);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };
  
  return (
    <>
      {/* Wishlist icon  */}
      <button onClick={() => addToWishlist()}>
        {ele.wishlist ? (
          <FaHeart className="text-red-500 text-xl" />
        ) : (
          <FaRegHeart className="text-xl" />
        )}
      </button>

      {/* Cart Icon  */}
      <ShoppingCart
        onClick={() => addToCart()}
        className="text-4xl  mt-2 cursor-pointer"/>
    </>
  );
}
