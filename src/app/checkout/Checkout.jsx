"use client";

import useCart from "@/hooks/useCart";
import classNames from "@/utils/classNames";
import { toast } from "react-hot-toast";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Checkout = () => {
  const { isLoading, mutate, cart, isValidating } = useCart();

  const handleCount = async (id, action) => {
    if (isValidating) return;
    const toastId = toast.loading("loading...");
    try {
      const res = await fetch(`/api/cart?id=${id}&action=${action}`, {
        method: "POST",
      });
      const result = await res.json();
      toast.dismiss(toastId);
      if (result.added) {
        toast.success(result.message);
        mutate();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.dismiss(toastId);
      console.log(error);
    }
  };

  if (isLoading) {
    return <h1 className="text-center text-2xl font-medium">Loading...</h1>;
  }
  if (!isLoading && cart.length === 0) {
    return <h1>No product added to cart</h1>;
  }

  if (cart.length > 0) {
    return (
      <div className="overflow-x-auto">
        <table className="table table-lg">
          <thead>
            <tr className="text-center">
              <th>No.</th>
              <th>Title</th>
              <th>Price</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(({ _id, title, brand, quantity, price }, i) => (
              <tr key={_id} className="text-center">
                <th>{i + 1}</th>
                <td>{title}</td>
                <td>{price}</td>
                <td>{brand}</td>
                <td className="flex items-center justify-center">
                  <button
                    onClick={() => handleCount(_id, "plus")}
                    className={classNames(
                      "btn btn-primary mr-3",
                      isValidating && "cursor-wait"
                    )}
                  >
                    <AiOutlinePlus />
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => handleCount(_id, "minus")}
                    className={classNames(
                      "btn btn-secondary ml-3",
                      isValidating && "cursor-wait"
                    )}
                    disabled={quantity <= 1}
                  >
                    <AiOutlineMinus />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary my-3 ml-auto block mr-16">
          Checkout
        </button>
      </div>
    );
  }
};

export default Checkout;
