import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CreateQuestionsPage = () => {
  const [questionText, setQuestionText] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [correctOption, setCorrectOption] = useState("");
  const [questions, setQuestions] = useState([]);
  const { quizId } = useParams();
  const navigate = useNavigate();

  const createQuestion = async (e) => {
    e.preventDefault();
    try {
      const newQuestion = {
        questionText,
        options: [option1, option2, option3, option4],
        correctOption,
      };

      // Add question to local state
      setQuestions((prev) => [...prev, newQuestion]);

      // Clear form for next question
      setQuestionText("");
      setOption1("");
      setOption2("");
      setOption3("");
      setOption4("");
      setCorrectOption("");
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  const finishCreating = async () => {
    try {
      // Send all questions to the API
      for (const question of questions) {
        await fetch(`/api/quizzes/${quizId}/questions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question_text: question.questionText,
            answer_a: question.options[0],
            answer_b: question.options[1],
            answer_c: question.options[2],
            answer_d: question.options[3],
            correct_answer: question.correctOption,
          }),
        });
      }

      // Navigate to the quiz details page
      navigate(`/quizzes/${quizId}`);
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  return (
    <div className="quiz-form">
      <h1>✍️ Add Your Questions</h1>
      <form onSubmit={createQuestion}>
        <label>
          Question Text:
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />
        </label>
        <label>
          Option 1:
          <input
            type="text"
            value={option1}
            onChange={(e) => setOption1(e.target.value)}
            required
          />
        </label>
        <label>
          Option 2:
          <input
            type="text"
            value={option2}
            onChange={(e) => setOption2(e.target.value)}
            required
          />
        </label>
        <label>
          Option 3:
          <input
            type="text"
            value={option3}
            onChange={(e) => setOption3(e.target.value)}
            required
          />
        </label>
        <label>
          Option 4:
          <input
            type="text"
            value={option4}
            onChange={(e) => setOption4(e.target.value)}
            required
          />
        </label>
        <label>
          Correct Option:
          <select
            value={correctOption}
            onChange={(e) => setCorrectOption(e.target.value)}
            required
          >
            <option value="">Select correct option</option>
            <option value="A">Option 1</option>
            <option value="B">Option 2</option>
            <option value="C">Option 3</option>
            <option value="D">Option 4</option>
          </select>
        </label>
        <div className="button-group">
          <button type="submit">Add Question</button>
          <button type="button" onClick={finishCreating}>
            Done
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuestionsPage;
