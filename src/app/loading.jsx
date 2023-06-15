import Spinner from "@/components/Spinner";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-400px)]">
      <Spinner />
    </div>
  );
};

export default Loading;
