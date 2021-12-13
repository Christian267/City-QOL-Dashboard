import './AppBaseStyles.css'
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CityListPage } from './pages/CityListPage';
import { LandingPage } from './pages/LandingPage';
import { CityPage } from './pages/CityPage';



function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  );
}

export default App;
