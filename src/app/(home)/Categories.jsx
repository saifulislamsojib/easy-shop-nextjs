import getCategories from "@/utils/getCategories";
import SingleCategory from "./SingleCategory";

const Categories = async () => {
  const categories = await getCategories();

  return (
    <div className="mt-14">
      <h3 className="mb-5 text-3xl font-semibold">Categories</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-5">
        {categories.map((category) => (
          <SingleCategory category={category} key={category._id} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
