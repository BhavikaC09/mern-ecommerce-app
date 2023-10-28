import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//protecting routes further
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//checking if the user is admin i.e role = 1
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    // console.log(user.role);
    if (user.role != 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized access - tu admin nahi hai.",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};
