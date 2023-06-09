import './App.css';
import TodoList from './components/TodoList';
import LoginPage from './components/LoginPage';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate();

  return (
    <div className="fullscreen-container">
        <Routes>
          <Route path="/" element={<LoginPage navigate={navigate} />} />
          <Route path="/todos" element={<TodoList navigate={navigate} />} />
        </Routes>
    </div>
  );
}

export default App;
