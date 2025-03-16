"use client"

import { gql, useMutation } from "@apollo/client";
import client from "@/lib/apolloClient";
import { CheckCircle, Heart, ShoppingCart } from 'lucide-react';
import useAuthStore from "@/utils/store/authStore";
import { toast } from "sonner";
import useCounterStore from "@/utils/store/itemCount";


const ADD_TO_CART = gql`
  mutation($id: ID!, $catId: String!, $subCatId: String!, $name: String!, $email: String!, $img: String!, $model: String!, $price: Int!, $count: Int!){
    addOrIncreaseCartCount(_id: $id, catId: $catId, subCatId: $subCatId, name: $name, email: $email, img: $img, model: $model, price: $price, count: $count) {
        count
    }
  }
`;

interface CartProps{
  _id: string,
  email?: string,
  catId: string,
  subCatId: string,
  name: string,
  price: number,
  model: string,
  count?: number,
  img: string,
}
interface Props {
  ele: CartProps;
}

export default function CartWishlistIcon({ele}: Props) {
//   const { cartCount, setCartCount, wishlistCount, setWishlistCount } = useContext(CountContext);
//   const {user} = useContext(AuthContext);

  // const { data } = useQuery(GET_CART_ITEMS, {
  //   variables: { email: user?.email || "" },
  //   skip: !user?.email, // Avoid running query when user is not available
  //   client
  // });
  // console.log(ele)
  const {user} = useAuthStore();
  const {cartCount} = useCounterStore();


// Use useMutation hook
const [addOrIncreaseCartCount] = useMutation(ADD_TO_CART, { client });


const addToCart = async () => {
    // if (!user?.email) {
    //   console.log("User not logged in");
    // return;
    // }

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
    // toast("Product Added Succesfully")
    // toast("New message received", {
    //   className: "bg-blue-500 text-white border border-blue-700 shadow-xl",
    // });
    toast.success("Product Succesfully Added to cart", {
      style: { border: "0.2px solid rgb(62, 68, 77)", fontSize: '15px' },
      icon: <CheckCircle className="text-green-600 w-6 h-6" />,
    });

    console.log(data)

    if(data.addOrIncreaseCartCount.count===1){
      cartCount();
      console.log("hello")
    }

    } catch (err) {
      console.error("Error adding to cart:", err);
    }
};



const addToWishlist =()=>{
   console.log("Hello WishList");
}

return (
  <>
    {/* Wishlist icon  */}
    <Heart onClick={()=> addToWishlist()} className="text-xl cursor-pointer"/>
    {/* Cart Icon  */}
    <ShoppingCart onClick={()=>addToCart()} className="text-4xl  mt-2 cursor-pointer"/>
  </>
)
}
