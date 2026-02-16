import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Problem1 from './problems/Problem1/Problem1';
import Problem2 from './problems/Problem2/Problem2';
import Problem3 from './problems/Problem3/Problem3';
import './App.css';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <div>
              <h1>Code Challenge Solutions</h1>
              <p>Select a problem from the navigation menu to view the solution.</p>
            </div>
          } />
          <Route path="problem1" element={<Problem1 />} />
          <Route path="problem2" element={<Problem2 />} />
          <Route path="problem3" element={<Problem3 />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
