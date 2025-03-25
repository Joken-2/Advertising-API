import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProducts,
  replaceProduct,
  updatedProduct,
} from "../controllers/product.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import { advertPicturesUpload } from "../middlewares/upload.js";

// Creating the Router
const advertRouter = Router();

// Defining Routes
advertRouter.post(
  "/advert",
  isAuthenticated,
  isAuthorized(["vendor"]),
  advertPicturesUpload.array("pictures", 4),
  addProduct
);

advertRouter.get("/advert", getProducts);

advertRouter.patch("/advert/:id", isAuthenticated, updatedProduct);

advertRouter.put(
  "/advert/:id",
  isAuthenticated,
  advertPicturesUpload.array("pictures", 4),
  replaceProduct
);

advertRouter.delete("/advert/:id", isAuthenticated, deleteProduct);

// Exporting the Router
export default advertRouter;
