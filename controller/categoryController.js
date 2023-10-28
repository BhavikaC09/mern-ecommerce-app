import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
  try {
    //getting ctegory name
    const { name } = req.body;

    //checking if name is provided
    if (!name) {
      return res.status(401).send({ message: "Name is required." });
    }

    //checking if category exists
    const existingCateogry = await categoryModel.findOne({ name });
    if (existingCateogry) {
      return res.status(200).send({
        success: true,
        message: "Category already exists",
      });
    }
    //creating and saving new category
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(200).send({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in category",
    });
  }
};

// UPDATE CATEGORY CONTROLLER
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

// GET ALL CATEGORIES
export const categoryController = async (req, res) => {
  try {
    const categoriesss = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All categories:",
      categoriesss,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting all categories",
    });
  }
};

// GET SINGLE CATEGORY
export const singleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const singleCategory = await categoryModel.findOne({
      slug,
    });
    res.status(200).send({
      success: true,
      message: "Single category:",
      singleCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting single category",
    });
  }
};

// DELETE CATEGORY CONTROLLER
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        error,
        message: "Error in deleting category",
      });
  }
};
