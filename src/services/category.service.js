import "server-only";
import DbConnect from "./DbConnect";

export const getCategoriesFromDb = async () => {
  const db = await DbConnect();
  const categoriesCollection = db.collection("categories");
  return categoriesCollection.find({}).toArray();
};
