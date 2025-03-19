import { create } from "zustand";

type wishListType = {
    wishlistCount: number,
    setWishlistCount: (value: number) => void
}

const useWishlistStore = create<wishListType>((set)=> ({
    wishlistCount: 0, 
    setWishlistCount: (value)=> set({wishlistCount: value})
}));

export default useWishlistStore;