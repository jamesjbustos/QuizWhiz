import "../App.css";
import "../css/Navigation.css";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <h1>📝 QuizWhiz</h1>
          </Link>
        </li>
      </ul>

      <ul>
        <li>
          <Link to="/" role="button">
            Home
          </Link>
        </li>
        <li>
          <Link to="/create-quiz" role="button">
            Create Quiz
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
