import { pool } from "../config/database.js";
import "../config/dotenv.js";
import quizzes from "../data/quizzes.js";

const createQuizzesTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS questions;
    DROP TABLE IF EXISTS quizzes;
    
    CREATE TABLE IF NOT EXISTS quizzes (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description VARCHAR(255)
    );
    
    CREATE TABLE IF NOT EXISTS questions (
      id SERIAL PRIMARY KEY,
      quiz_id INTEGER REFERENCES quizzes(id),
      question_text VARCHAR(255) NOT NULL,
      answer_a VARCHAR(255) NOT NULL,
      answer_b VARCHAR(255) NOT NULL,
      answer_c VARCHAR(255) NOT NULL,
      answer_d VARCHAR(255) NOT NULL,
      correct_answer VARCHAR(255) NOT NULL
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log("🎉 quizzes and questions tables created successfully");
  } catch (err) {
    console.error("⚠️ error creating tables", err);
  }
};

const seedQuizzesTable = async () => {
  await createQuizzesTable();

  quizzes.forEach((quiz) => {
    const insertQuizQuery = {
      text: "INSERT INTO quizzes (title, description) VALUES ($1, $2) RETURNING id",
      values: [quiz.title, quiz.description],
    };

    pool.query(insertQuizQuery, (err, res) => {
      if (err) {
        console.error(`⚠️ error inserting quiz: ${quiz.title}`, err);
        return;
      }
      console.log(`✅ ${quiz.title} added successfully`);

      const quizId = res.rows[0].id;

      quiz.questions.forEach((question) => {
        const insertQuestionQuery = {
          text: "INSERT INTO questions (quiz_id, question_text, answer_a, answer_b, answer_c, answer_d, correct_answer) VALUES ($1, $2, $3, $4, $5, $6, $7)",
          values: [
            quizId,
            question.question_text,
            question.answer_a,
            question.answer_b,
            question.answer_c,
            question.answer_d,
            question.correct_answer,
          ],
        };

        pool.query(insertQuestionQuery, (err, res) => {
          if (err) {
            console.error(
              `⚠️ error inserting question for quiz: ${quiz.title}`,
              err
            );
            return;
          }
          console.log(`✅ Question added successfully for ${quiz.title}`);
        });
      });
    });
  });
};

seedQuizzesTable();
