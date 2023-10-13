import { pool } from "../config/database.js";

// Get all quizzes
export const getQuizzes = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM quizzes ORDER BY id DESC");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single quiz with questions
export const getQuiz = async (req, res) => {
  const { id } = req.params;

  try {
    const quizResult = await pool.query("SELECT * FROM quizzes WHERE id = $1", [
      id,
    ]);
    const questionsResult = await pool.query(
      "SELECT * FROM questions WHERE quiz_id = $1",
      [id]
    );

    res.status(200).json({
      quiz: quizResult.rows[0],
      questions: questionsResult.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new quiz
export const createQuiz = async (req, res) => {
  const { title, description } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO quizzes (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a quiz
export const updateQuiz = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const result = await pool.query(
      "UPDATE quizzes SET title = $1, description = $2 WHERE id = $3 RETURNING *",
      [title, description, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a quiz
export const deleteQuiz = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM questions WHERE quiz_id = $1", [id]);
    await pool.query("DELETE FROM quizzes WHERE id = $1", [id]);
    res.status(204).json({ message: "Quiz Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
