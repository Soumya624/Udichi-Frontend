import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from './Components/Signup';
import LoginAdmin from './Components/Admin/Registration/Login';
import LoginAssessor from './Components/Teacher/Registration/Login';
import LoginStudent from './Components/Student/Registration/Login';
import LoginProctorer from './Components/Proctorer/Registration/Login';
import DashboardAdmin from './Components/Admin/Index';
import DashboardProctorer from './Components/Proctorer/Index';
import DashboardAssessor from './Components/Teacher/Index';
import DashboardStudent from './Components/Student/Index';
import ExamAdmin from './Components/Admin/exam';
import CandidateAdmin from './Components/Admin/candidates';
import QuestionAdmin from './Components/Admin/questions';
import StatisticsAdmin from './Components/Admin/statistics';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Signup/>} exact />
          <Route path="/loginAdmin" element={<LoginAdmin/>} exact/>
          <Route path="/loginAssessor" element={<LoginAssessor/>} exact/>
          <Route path="/loginStudent" element={<LoginStudent/>} exact/>
          <Route path="/loginProctorer" element={<LoginProctorer/>} exact/>
          <Route path="/dashboardAdmin" element={<DashboardAdmin/>} exact/>
          <Route path="/dashboardProctorer" element={<DashboardProctorer/>} exact/>
          <Route path="/dashboardAssessor" element={<DashboardAssessor/>} exact/>
          <Route path="/dashboardStudent" element={<DashboardStudent/>} exact/>
          <Route path="/examAdmin" element={<ExamAdmin/>} exact/>
          <Route path="/candidateAdmin" element={<CandidateAdmin/>}  exact/>
          <Route path="/questionAdmin" element={<QuestionAdmin/>} exact/>
          <Route path="/statisticsAdmin" element={<StatisticsAdmin/>} exact/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
