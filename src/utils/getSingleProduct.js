import { getProductByIdFromDb } from "@/services/product.service";
import { cache } from "react";
import "server-only";

const getSingleProduct = cache(getProductByIdFromDb);

export default getSingleProduct;
