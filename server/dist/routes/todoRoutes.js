"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoControllers_1 = require("../controllers/todoControllers");
const checkUser_1 = require("../middleware/checkUser");
const router = express_1.default.Router();
// router.post('/todos', validateUser, getAllTodos);
// router.post('/task-details', validateUser, getTodoById);    
// router.post('/todo', validateUser, createTodo);
router.post('/update-task', checkUser_1.validateUser, todoControllers_1.updateTodo);
// router.post('/delete-task', validateUser, deleteTodo);
exports.default = router;
