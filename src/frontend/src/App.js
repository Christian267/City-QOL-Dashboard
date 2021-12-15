import './AppBaseStyles.css'
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { CityListPage } from './pages/CityListPage';
import { LandingPage } from './pages/LandingPage';
import { CityPage } from './pages/CityPage';



function App() {
  
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route path="/cityList">
            <CityListPage />
          </Route>
        <Route path="/city/:cityName/Country/:countryName">
          <CityPage />
        </Route>
        <Route path="/">
          <LandingPage />  
        </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
