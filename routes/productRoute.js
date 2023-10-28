import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductsController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controller/productController.js";
import formidable from "express-formidable";

//router object
const router = express.Router();

//routes
// create product route
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//get products
router.get("/get-products", getProductsController);

//get single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);

//updating product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//product filter
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product list
router.get("/product-list/:page", productListController);

// search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-products/:pid/:cid", relatedProductController);

//category wise products
router.get("/product-category/:slug", productCategoryController);

//payment token
router.get("/braintree/token", braintreeTokenController);

//payment
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

export default router;
