import { Router } from "express";
import {
  changePassword,
  checkAccessTokenExpiry,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/current-user").get(verifyJwt, getCurrentUser)
router.route("/change-password").patch(verifyJwt, changePassword)
router.route("/update-account-details").patch(verifyJwt, updateAccountDetails)
router.route("/verify-access-token").get(checkAccessTokenExpiry)
router.route("/refresh-access-token").post(refreshAccessToken)

export default router;
