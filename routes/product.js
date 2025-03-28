import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  replaceProduct,
  updatedProduct,
} from "../controllers/product.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import { advertMediaUpload } from "../middlewares/upload.js";
import { checkVendorProductOwnership } from "../controllers/auth_controllers.js";

// Creating the Router
const advertRouter = Router();

// Defining Routes
advertRouter.post(
  "/advert",
  isAuthenticated,
  isAuthorized(["vendor"]),
  advertMediaUpload.array("media", 4),
  addProduct
);

advertRouter.get("/advert/:id", getProduct);

advertRouter.get("/advert", getProducts);

advertRouter.patch(
  "/advert/:id",
  isAuthenticated,
  isAuthorized(["vendor"]),
  checkVendorProductOwnership,
  updatedProduct
);

advertRouter.put(
  "/advert/:id",
  isAuthenticated,
  isAuthorized(["vendor"]),
  checkVendorProductOwnership,
  advertMediaUpload.array("media", 4),
  replaceProduct
);

advertRouter.delete(
  "/advert/:id",
  isAuthenticated,
  isAuthorized(["vendor"]),
  checkVendorProductOwnership,
  deleteProduct
);

// Exporting the Router
export default advertRouter;
