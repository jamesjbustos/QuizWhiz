import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateQuizPage from "./pages/CreateQuizPage";
import CreateQuestionsPage from "./pages/CreateQuestionsPage";
import QuizDetailPage from "./pages/QuizDetailPage";
import Navigation from "./components/Navigation";

const App = () => {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-quiz" element={<CreateQuizPage />} />
        <Route
          path="/create-questions/:quizId"
          element={<CreateQuestionsPage />}
        />
        <Route path="/quizzes/:quizId" element={<QuizDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
