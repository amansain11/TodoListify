import { Router } from "express";
import { addTodo } from "../controllers/todo.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router()

router.use(verifyJwt)

router.route("/add-todo").post(addTodo)

export default router;