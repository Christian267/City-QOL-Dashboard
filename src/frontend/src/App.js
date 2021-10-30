import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CityListPage } from './pages/CityListPage';
import { LandingPage } from './pages/LandingPage';


function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/home">
          <LandingPage />  
        </Route>
        <Route path="/cityList/">
          <CityListPage />
        </Route>
      </Router>
    </div>
  );
}

export default App;
