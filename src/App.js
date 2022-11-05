import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "../src/redux/store";
import routes from "./route/route"
import './App.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {
                  routes.map(route => <Route key={`${route.name}`} exact path={`${route.path}`} element={<route.element />} />)
                }
              </Routes>
          </Suspense>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
