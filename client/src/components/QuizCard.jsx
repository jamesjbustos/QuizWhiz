import { Link } from "react-router-dom";

const QuizCard = ({ quiz }) => {
  return (
    <Link
      to={`/quizzes/${quiz.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <article className="card">
        <h1>{quiz.title}</h1>
        <p>{quiz.description}</p>
      </article>
    </Link>
  );
};

export default QuizCard;
