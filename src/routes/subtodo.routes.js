import { Router } from "express";
import { addSubTodo, deleteSubTodo, getAllSubTodos, getCompletedSubTodos, getPendingSubTodos, toggleCompletion, updateSubTodo } from "../controllers/subtodo.controller.js";
import {verifyJwt} from "../middlewares/auth.middleware.js";

const router = Router()

router.use(verifyJwt)

router.route("/add-subtodo/:todoId").post(addSubTodo)
router.route("/update-subtodo/:subtodoId").patch(updateSubTodo)
router.route("/delete-subtodo/:subtodoId").delete(deleteSubTodo)
router.route("/toggle-completion/:subtodoId").patch(toggleCompletion)
router.route("/get-all-subtodos/:todoId").get(getAllSubTodos)
router.route("/get-pending-subtodos/:todoId").get(getPendingSubTodos)
router.route("/get-completed-subtodos/:todoId").get(getCompletedSubTodos)

export default router;