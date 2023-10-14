import { useEffect, useState } from "react";
import QuizCard from "./QuizCard";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState(null);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch("/api/quizzes");
      if (!response.ok) {
        throw new Error("😔 Failed to fetch quizzes");
      }
      const data = await response.json();
      setQuizzes(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div className="card-container">
      {error && <p>{error}</p>}
      {quizzes.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </div>
  );
};

export default QuizList;
