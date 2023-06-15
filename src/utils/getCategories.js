import { getCategoriesFromDb } from "@/services/category.service";
import { cache } from "react";
import "server-only";

const getCategories = cache(() => {
  return getCategoriesFromDb();
});

export default getCategories;
