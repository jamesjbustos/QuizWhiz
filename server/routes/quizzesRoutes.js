import express from "express";
import * as quizzesController from "../controllers/quizzes.js";

const router = express.Router();

router.get("/", quizzesController.getQuizzes);
router.post("/", quizzesController.createQuiz);
router.get("/:id", quizzesController.getQuiz);
router.put("/:id", quizzesController.updateQuiz);
router.delete("/:id", quizzesController.deleteQuiz);

export default router;
