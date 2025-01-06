import { Router } from "express";
import { addSubTodo } from "../controllers/subtodo.controller.js";
import {verifyJwt} from "../middlewares/auth.middleware.js";

const router = Router()

router.use(verifyJwt)

router.route("/add-subtodo/:todoId").post(addSubTodo)

export default router;