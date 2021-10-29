import { React, useEffect, useState } from 'react';
import { CityDetailCard } from '../components/CityDetailCard';
import { CitySmallCard } from '../components/CitySmallCard';


export const CityPage = () => {

    // const defaultCity = {
    //     'city': 'amsterdam',
    //     'country': 'netherlands'
    // };
    const defaultPreferences = {
        businessFreedom: 1.0,
        commute: 1.0,
        costOfLiving: 1.0,
        economy: 1.0,
        education: 1.0,
        environmentalQuality: 1.0,
        healthcare: 1.0,
        housing: 1.0,
        internetAccess: 1.0,
        leisureCulture: 1.0,
        outdoors: 1.0,
        safety: 1.0,
        startups: 1.0,
        taxation: 1.0,
        tolerance: 1.0,
        travelConnectivity: 1.0,
        ventureCapital: 1.0
    };

    // const [cities, setCities] = useState([{}]);
    const [preferences, setPreferences] = useState(defaultPreferences);
    // const [cityName, setCityName] = useState(defaultCity);
    const [preferredCities, setPreferredCities] = useState([{}]);
    const [cityLoadError, setCityLoadError] = useState();
    const [count, setCount] = useState(0);

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


    const updatePreference = (preference, direction) => {
        const newPreferences = preferences;
        newPreferences[preference] = direction === 'increment' ?
                    newPreferences[preference] + 0.05 : 
                    newPreferences[preference] - 0.05;
        setPreferences(newPreferences);
        updateCityScores();
        setCount(count + 1);
    };

    const updateCityScores = () => {
        const newPreferredCities = preferredCities;
        // console.log(newPreferredCities[0]['score']);
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
    }

    useEffect(
        () =>  {
        fetchCities();
        }, []
    );
    
    
    if (preferredCities.length === 1) {
        return (
            <div className="CityPage">
                <h1>{ cityLoadError ? 'Could not load city data' : 'Loading...'}</h1>            
                <p>{JSON.stringify(preferences)}</p>
                {/* {Array(13).fill(Object.keys(preferences).map(pref => <button onclick={setPreference}>pref</button>))} */}
                <CityDetailCard />
                {Array(1).fill([1,2,3]).map(v => <CitySmallCard key={v}/>)}
            </div>
        );
    }

    return (
        <div className="CityPage">
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