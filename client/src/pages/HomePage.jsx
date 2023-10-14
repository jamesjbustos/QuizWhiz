import QuizList from "../components/QuizList";

const HomePage = () => {
  return (
    <div className="quiz-list">
      <div className="quiz-list-header">
        <h1>Quizzes</h1>
        <p>Browse and Create Your Knowledge Adventure!</p>
      </div>
      <QuizList />
    </div>
  );
};

export default HomePage;
