import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const QuizDetailPage = () => {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/quizzes/${quizId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        setQuizData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [quizId]);

  // Handling input changes
  const handleInputChange = (e, index = null) => {
    const { name, value } = e.target;

    if (index !== null) {
      // If there's an index, we're dealing with question data
      const updatedQuestions = [...editedData.questions];
      updatedQuestions[index][name] = value;
      setEditedData((prev) => ({ ...prev, questions: updatedQuestions }));
    } else {
      // If there's no index, we're dealing with quiz-level data (title, description)
      setEditedData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handling edit submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    // API call to update the data
    try {
      const response = await fetch(`/api/quizzes/${quizId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedData),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      setQuizData(editedData);
      setEditing(false);
    } catch (error) {
      console.error("Failed to edit quiz:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        const response = await fetch(`/api/quizzes/${quizId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        // Navigate back to the quiz list after deleting.
        navigate("/");
      } catch (error) {
        console.error("Failed to delete quiz:", error);
      }
    }
  };

  const handleDeleteQuestion = async (questionIndex) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        const questionId = editedData.questions[questionIndex].id;
        const response = await fetch(
          `/api/quizzes/${quizId}/questions/${questionId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        // Update the local state
        setEditedData((prevData) => {
          const updatedQuestions = prevData.questions.filter(
            (_, index) => index !== questionIndex
          );
          return { ...prevData, questions: updatedQuestions };
        });
      } catch (error) {
        console.error("Failed to delete question:", error);
      }
    }
  };

  const renderEditForm = () => (
    <form onSubmit={handleEditSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={editedData.title}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={editedData.description}
          onChange={handleInputChange}
        ></textarea>
      </label>
      {editedData.questions.map((question, index) => (
        <div key={index}>
          <label>
            Question {index + 1}:
            <input
              type="text"
              name="question_text"
              value={question.question_text}
              onChange={(e) => handleInputChange(e, index)}
            />
          </label>
          <label>
            Answer A:
            <input
              type="text"
              name="answer_a"
              value={question.answer_a}
              onChange={(e) => handleInputChange(e, index)}
            />
          </label>
          <label>
            Answer B:
            <input
              type="text"
              name="answer_b"
              value={question.answer_b}
              onChange={(e) => handleInputChange(e, index)}
            />
          </label>
          <label>
            Answer C:
            <input
              type="text"
              name="answer_c"
              value={question.answer_c}
              onChange={(e) => handleInputChange(e, index)}
            />
          </label>
          <label>
            Answer D:
            <input
              type="text"
              name="answer_d"
              value={question.answer_d}
              onChange={(e) => handleInputChange(e, index)}
            />
          </label>
          {/* Delete button for each question */}
          <button type="button" onClick={() => handleDeleteQuestion(index)}>
            Delete Question
          </button>
        </div>
      ))}
      <div className="button-group">
        <button type="submit">Submit Edits</button>
      </div>
    </form>
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!quizData) return <p>No Data!</p>;

  return (
    <div className="quiz-detail-container">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && quizData && (
        <>
          <h2 className="quiz-title">{quizData.quiz.title}</h2>
          <p className="quiz-description">{quizData.quiz.description}</p>
          <p>Number of questions: {quizData.questions.length}</p>
          {quizData.questions.map((question, index) => (
            <div key={index} className="question">
              <h3>{question.question_text}</h3>
              <ul className="answers">
                <li className="answer">A: {question.answer_a}</li>
                <li className="answer">B: {question.answer_b}</li>
                <li className="answer">C: {question.answer_c}</li>
                <li className="answer">D: {question.answer_d}</li>
              </ul>
            </div>
          ))}
          <div className="button-group">
            <button className="button delete-button" onClick={handleDelete}>
              Delete Quiz
            </button>
            <button
              className="button"
              onClick={() => {
                setEditing(!editing);
                setEditedData(quizData);
              }}
            >
              {editing ? "Done Editing" : "Edit Quiz"}
            </button>
          </div>
          {editing && renderEditForm()}
        </>
      )}
    </div>
  );
};

export default QuizDetailPage;
