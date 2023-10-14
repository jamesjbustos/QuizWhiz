import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateQuizPage = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setQuizTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setQuizDescription(event.target.value);
  };

  const createQuiz = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: quizTitle,
          description: quizDescription,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create quiz");
      }

      const newQuiz = await response.json();
      navigate(`/create-questions/${newQuiz.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quiz-form">
      <h1>🤓 Create a New Quiz</h1>

      {error && <p className="error">Error: {error}</p>}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          createQuiz();
        }}
      >
        <div>
          <label htmlFor="title">Quiz Title: </label>
          <input
            type="text"
            id="title"
            value={quizTitle}
            onChange={handleTitleChange}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="description">Quiz Description: </label>
          <textarea
            id="description"
            value={quizDescription}
            onChange={handleDescriptionChange}
            required
            disabled={loading}
          ></textarea>
        </div>
        <div className="button-group">
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Quiz"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuizPage;
