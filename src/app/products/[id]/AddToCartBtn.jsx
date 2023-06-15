"use client";

import useCart from "@/hooks/useCart";
import { toast } from "react-hot-toast";
import { MdOutlineAddShoppingCart } from "react-icons/md";

const AddToCartBtn = ({ id }) => {
  const { cart, isLoading, mutate } = useCart();

  const isAlready = cart.findIndex((pd) => pd._id === id);

  const handleAddToCart = async (id) => {
    try {
      const res = await fetch(`/api/cart?id=${id}`, {
        method: "POST",
      });
      const result = await res.json();
      if (result.added) {
        toast.success(result.message);
        mutate();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={() => handleAddToCart(id)}
      className="btn btn-primary mt-4"
      disabled={isAlready !== -1 || isLoading}
    >
      <MdOutlineAddShoppingCart />
      {isAlready !== -1 ? "Already added" : "Add To Cart"}
    </button>
  );
};

export default AddToCartBtn;
