import { Router } from "express";
import { addTodo, deleteTodo, getAllTodos, getCompletedTodos, getPendingTodos, toggleCompletion, updateTodo } from "../controllers/todo.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router()

router.use(verifyJwt)

router.route("/add-todo").post(addTodo)
router.route("/update-todo/:todoId").patch(updateTodo)
router.route("/delete-todo/:todoId").delete(deleteTodo)
router.route("/toggle-completion/:todoId").patch(toggleCompletion)
router.route("/get-all-todos").get(getAllTodos)
router.route("/get-pending-todos").get(getPendingTodos)
router.route("/get-completed-todos").get(getCompletedTodos)

export default router;