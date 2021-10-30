import { React, useEffect, useState } from 'react';
import { CityDetailCard } from '../components/CityDetailCard';
import { CitySmallCard } from '../components/CitySmallCard';


export const CityListPage = () => {

    // const defaultCity = {
    //     'city': 'amsterdam',
    //     'country': 'netherlands'
    // };
    const defaultPreferences = {
        businessFreedom: 0.5,
        commute: 0.5,
        costOfLiving: 0.5,
        economy: 0.5,
        education: 0.5,
        environmentalQuality: 0.5,
        healthcare: 0.5,
        housing: 0.5,
        internetAccess: 0.5,
        leisureCulture: 0.5,
        outdoors: 0.5,
        safety: 0.5,
        startups: 0.5,
        taxation: 0.5,
        tolerance: 0.5,
        travelConnectivity: 0.5,
        ventureCapital: 0.5
    };

    // const [cities, setCities] = useState([{}]);
    const [preferences, setPreferences] = useState(defaultPreferences);
    // const [cityName, setCityName] = useState(defaultCity);
    const [preferredCities, setPreferredCities] = useState([{}]);
    const [cityLoadError, setCityLoadError] = useState();

    
    useEffect(() =>  {
        const fetchCities = async () => {
            try {
                const response = await fetch(`http://localhost:8080/city/`);
                const data = await response.json();
                // setCities(data);
                data.sort((a, b) => a.score < b.score ? 1 : -1);
                setPreferredCities(data);
                console.log(data);
            } catch(err) {
                setCityLoadError(err);
            }
        };
        fetchCities();
    }, []
    );

    const updatePreference = (preference, direction) => {
        const val = direction === 'increment' ?
                preferences[preference] + 0.05:
                preference[preference] - 0.05;
        setPreferences({...preferences, [preference]: val});
        updateCityScores();
    };
    
    const updateCityScores = () => {
        const newPreferredCities = preferredCities;
        console.log(newPreferredCities[0].uaName);
        for (let i=0; i < newPreferredCities.length; i++) {
            var newScore = 0;
            for (const key of Object.keys(preferences)) {
                // console.log(key);
                // console.log(newPreferredCities[i][key])
                newScore += newPreferredCities[i][key] * preferences[key];
            }
            // console.log(city);
            // console.log('Score: ' + newScore);
            try {
                newPreferredCities[i]['score'] = newScore / 17;
                // console.log(city['score']);
            } catch(err) {
                console.log("Key error, city has no property 'score'");
            }
        }
        newPreferredCities.sort((a, b) => a.score > b.score ? -1 : 1);
        setPreferredCities(newPreferredCities);
    };
    
    if (preferredCities.length === 1) {
        return (
            <div className="CityListPage">
                <h1>{ cityLoadError ? 'Could not load city data' : 'Loading...'}</h1>            
                <p>{JSON.stringify(preferences)}</p>
                {/* {Array(13).fill(Object.keys(preferences).map(pref => <button onclick={setPreference}>pref</button>))} */}
                <CityDetailCard />
                {Array(1).fill([1,2,3]).map(v => <CitySmallCard key={v}/>)}
            </div>
        );
    }
    
    return (
        <div className="CityListPage">
            <h1>Your City Preferences</h1>
            {/* <h1>Count: {count}</h1> */}
            <p>{JSON.stringify(preferences)}</p>
            {Array(1).fill(Object.keys(preferences)
                .map(pref => <button key={pref} onClick={() => updatePreference(pref, 'increment')}>{pref}++</button>))}
            <br/>
            {Array(1).fill(Object.keys(preferences)
                .map(pref => <button key={pref} onClick={() => updatePreference(pref, 'decrement')}>{pref} - -</button>))}
            <CityDetailCard city={preferredCities[0]}/>
            {preferredCities.slice(1, 4).map(city => <CitySmallCard key={city.uaName} city={city} />)}
        </div>
    );
}