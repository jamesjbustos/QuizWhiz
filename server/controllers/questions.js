import { pool } from "../config/database.js";

// Get all questions for a specific quiz
export const getQuestions = async (req, res) => {
  const { quizId } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM questions WHERE quiz_id = $1",
      [quizId]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new question
export const createQuestion = async (req, res) => {
  const { quizId } = req.params;
  const { questionText, answerA, answerB, answerC, answerD, correctAnswer } =
    req.body;

  try {
    const result = await pool.query(
      "INSERT INTO questions (quiz_id, question_text, answer_a, answer_b, answer_c, answer_d, correct_answer) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [quizId, questionText, answerA, answerB, answerC, answerD, correctAnswer]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a question
export const updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { questionText, answerA, answerB, answerC, answerD, correctAnswer } =
    req.body;

  try {
    const result = await pool.query(
      "UPDATE questions SET question_text = $1, answer_a = $2, answer_b = $3, answer_c = $4, answer_d = $5, correct_answer = $6 WHERE id = $7 RETURNING *",
      [questionText, answerA, answerB, answerC, answerD, correctAnswer, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a question
export const deleteQuestion = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM questions WHERE id = $1", [id]);
    res.status(204).json({ message: "Question Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
