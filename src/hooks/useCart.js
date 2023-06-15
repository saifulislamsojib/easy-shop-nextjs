import useSWR from "swr";

const fetcher = async (...args) => {
  const res = await fetch(...args);
  const data = await res.json();
  return data.cart;
};

const useCart = () => {
  const {
    data: cart = [],
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR("/api/cart", fetcher);

  return {
    cart,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export default useCart;
