import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from "./route/route"
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
           {
             routes.map(route => <Route key={`${route.name}`} exact path={`${route.path}`} element={<route.element />} />)
           }
        </Routes>
      </Router>
    </div>
  );
}

export default App;
