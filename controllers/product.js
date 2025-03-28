import { ProductModel } from "../models/product.js";
import { addProductValidator } from "../validators/products.js";

export const addProduct = async (req, res, next) => {
  try {
    console.log(req.file, req.files);

    // Validate product information
    const { error, value } = addProductValidator.validate(
      {
        ...req.body,
        media: req.files?.map((file) => {
          return file.filename;
        }),
      },
      { abortEarly: false }
    );
    if (error) {
      res.status(422).json(error);
    }

    // Save product information in the Database
    const result = await ProductModel.create({
      ...value,
      userId: req.user.id,
    });

    // return response
    res.status(201).json(result);
  } catch (error) {
    if (error.code === "MongooseError") {
      return res.status(409).json(error.message);
    }
    next(error);
  }
};

// Get a single advertisement
export const getProduct = async (req, res, next) => {
  // console.log("Requested Product ID:", req.params.id);
  const singleAdvert = await ProductModel.findById(req.params.id);

  // return response
  res.status(200).json({ ad: singleAdvert });
};

export const getProducts = async (req, res, next) => {
  try {
    const { filter = "{}", sort = "{}" } = req.query;

    const result = await ProductModel.find(JSON.parse(filter)).sort(
      JSON.parse(sort)
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updatedProduct = async (req, res) => {
  try {
    const updateAdvert = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,

      { new: true, runValidators: true }
    );

    if (updateAdvert) {
      res.json({
        message: "Product successfully updated!",
        update: updateAdvert,
      });
    } else {
      res.status(404).json(`Product with id ${req.params.id} not found!`);
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res
      .status(500)
      .json({ message: "Failed to updated advert!", error: error.message });
  }
};
// test the put function here
export const replaceProduct = async (req, res, next) => {
  try {
    // add the UserId from the req.auth to the req.body
    const result = await ProductModel.findOneAndReplace(
      { _id: req.params.id },
      { ...req.body, userId: req.user.id },

      { new: true, runValidators: true }
    );

    if (result) {
      res
        .status(200)
        .json({ message: "Product successfully replaced!", product: result });
    } else {
      res
        .status(404)
        .json({ message: `Product with id ${req.params.id} not found!` });
    }
  } catch (error) {
    console.error("Error replacing product:", error);
    res
      .status(500)
      .json({ message: "Failed to replace product!", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const deleteAdvert = await ProductModel.findByIdAndDelete(
    req.params.id,
    req.body,

    { new: true, runValidators: true }
  );

  if (deleteAdvert) {
    res.json({
      message: "Product successfully deleted!",
      delete: deleteAdvert,
    });
  } else {
    res.status(404).json(`Product with id ${req.params.id} not found!`);
  }
};
