const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

const authRouter = Router();

authRouter.post("/register", authController.Register);
authRouter.post("/login", authController.Login);
authRouter.post("/reset-password", authController.ResetPassword);

authRouter.get("/get-me", authMiddleware, authController.getMe);
authRouter.post("/logout", authMiddleware, authController.Logout);
authRouter.delete("/delete-account", authMiddleware, authController.DeleteAccount);
authRouter.put("/update-username", authMiddleware, authController.UpdateUsername);

module.exports = authRouter;
