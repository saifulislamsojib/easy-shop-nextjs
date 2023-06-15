import Spinner from "@/components/Spinner";

const SingleProductLoading = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-400px)]">
      <Spinner />
    </div>
  );
};

export default SingleProductLoading;
