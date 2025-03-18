import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CART_ITEMS, INCREASE_CART_ITEMS, DECREASE_CART_ITEMS, DELETE_CART_ITEM_BY_EMAIL_ID } from "@/graphql/cartQueries";
import client from "@/lib/apolloClient";
import useAuthStore from "@/utils/store/authStore";

interface CartItemInterface{
  _id: string,
  name: string,
  email: string,
  model: string, 
  count: number,
  img: string,
  price: number,
}

export interface UseCartReturn {
  cartItems: CartItemInterface[];
  increaseProductCount: (item: CartItemInterface) => void;
  decreaseProductCount: (item: CartItemInterface) => Promise<void>;
  handleCartItemDelete: (item: CartItemInterface) => Promise<void>;
}


const useCart = (): UseCartReturn => {
  const { user } = useAuthStore();
  const [cartItems, setCartItems] = useState<CartItemInterface[]>([]);

  const { data } = useQuery(CART_ITEMS, {
    variables: { email: user?.email },
    skip: !user?.email,
    client,
  });

  useEffect(() => {
    if (data?.cartsByEmail) {
      setCartItems(data.cartsByEmail);
    }
  }, [data]);

  const [increaseProduct] = useMutation(INCREASE_CART_ITEMS, { client });
  const [decreaseProductItem] = useMutation(DECREASE_CART_ITEMS, { client });
  const [deleteProduct] = useMutation(DELETE_CART_ITEM_BY_EMAIL_ID, { client });

  // Increase item
  const increaseProductCount = async (ele: CartItemInterface) => {
    console.log("Hello")
    await increaseProduct({ variables: { _id: ele._id, email: user?.email } });
    setCartItems((data) => data.map((item) => (item._id === ele._id ? { ...item, count: item.count + 1 } : item)));
  };

  // Decrease item
  const decreaseProductCount = async (ele: CartItemInterface) => {
    await decreaseProductItem({ variables: { _id: ele._id, email: user?.email } });
    setCartItems((data) => data.map((item) => (item._id === ele._id ? { ...item, count: item.count - 1 } : item)));
  };

  // Delete item
  const handleCartItemDelete = async (ele: CartItemInterface) => {
    await deleteProduct({ variables: { _id: ele._id, email: ele.email } });
    setCartItems(cartItems.filter((item) => item._id !== ele._id));
  };

  return { cartItems, increaseProductCount, decreaseProductCount, handleCartItemDelete };
};

export default useCart;
