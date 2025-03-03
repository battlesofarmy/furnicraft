import { FiMinus } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Image from "next/image";

const CartItem = ({ item, increaseProdouctCount, decreaseProdouctCount, handleCartItemDelete }) => {
  return (
    <div key={item._id} className="grid grid-cols-8 place-items-center border-2 my-2">
      <div className="col-span-4">
        <div className="grid grid-cols-4 items-center">
          <Image width={100} height={100} className="col-span-1" src={item.img} alt="img" />
          <h4 className="col-span-3 pl-4">
            <p className="text-lg">{item.name}</p>
            <p className="text-xs">{item.model}</p>
          </h4>
        </div>
      </div>

      <h4 className="col-span-1">{item.price * item.count}</h4>
      <h4 className="col-span-2 text-lg">
        <div className="flex justify-center items-center gap-2">
          {/* Decrease Button */}
          <div className={`${item.count < 2 ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}>
            <div onClick={() => item.count > 1 && decreaseProdouctCount(item)} className="bg-gray-300 w-8 flex items-center justify-center text-xl">
              <FiMinus />
            </div>
          </div>

          <div>{item.count}</div>

          {/* Increase Button */}
          <div className="cursor-pointer">
            <div onClick={() => increaseProdouctCount(item)} className="bg-gray-300 w-8 text-xl text-center">+</div>
          </div>
        </div>
      </h4>

      {/* Delete Button */}
      <h4 onClick={() => handleCartItemDelete(item)} className="col-span-1 text-red-600">
        <button className="text-2xl">
          <MdDelete />
        </button>
      </h4>
    </div>
  );
};

export default CartItem;
