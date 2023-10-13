import express from "express";
import * as questionsController from "../controllers/questions.js";

const router = express.Router({ mergeParams: true });

router.get("/", questionsController.getQuestions);
router.post("/", questionsController.createQuestion);
router.put("/:id", questionsController.updateQuestion);
router.delete("/:id", questionsController.deleteQuestion);

export default router;
