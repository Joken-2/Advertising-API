import { ProductModel } from "../models/product.js";

export const checkVendorRole = (req, res, next) => {
  console.log(req.user)
  // check if the user has the vendor role
  if (req.user && req.user.role === "vendor") {
    // User is a vendor, proceed to the next middleware or route handler
    next();
  } else {
    res.status(403).json({
      message: "Access denied. Only vendors can perform this action.",
    });
  }
};


export const checkUserOwnership = (req, res, next) => {
  try {
    const userIdFromToken = req.user.id;
    const userIdFromParams = req.params.id;

    if (userIdFromToken === userIdFromParams) {
      // User is authorized to access their own data
      next();
    } else {
      res.status(403).json({
        message: "Access denied. You can only access your own advert.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


export const checkVendorProductOwnership = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const vendorId = req.user.id;
    const product = await ProductModel.findOne({
      _id: productId,
      userId: vendorId,
    });

    if (!product) {
      return res.status(403).json({
        message: "Access denied. You can only access your own product.",
      });
    }
    req.product = product;
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};