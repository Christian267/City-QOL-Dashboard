import { React, useEffect, useState } from 'react';
import { CityDetailCard } from '../components/CityDetailCard';
import { CitySmallCard } from '../components/CitySmallCard';


export const CityPage = () => {

    const defaultCity = {
        'city': 'amsterdam',
        'country': 'netherlands'
    };
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

    const [cities, setCities] = useState([{}]);
    const [preferences, setPreferences] = useState(defaultPreferences);
    const [cityName, setCityName] = useState(defaultCity);
    const [preferredCities, setPreferredCities] = useState([{}]);

    const fetchCities = async () => {
        const response = await fetch(`http://localhost:8080/city/`);
        const data = await response.json();
        console.log(data);
        setCities(data);
        setPreferredCities(data);
    };

    useEffect(
        () =>  {
        fetchCities();
        }, [cityName]
    );
    
    
    if (preferredCities.length == 1) {
        return (
            <div className="CityPage">
                <h1> Loading... </h1>            
            <CityDetailCard />
            <CitySmallCard />
            <CitySmallCard />
            <CitySmallCard />
            </div>
        );
    }

    return (
        <div className="CityPage">
            <h1>Your City Preferences</h1>
            <CityDetailCard city={preferredCities[0]}/>
            {preferredCities.slice(1, 4).map(city => <CitySmallCard city={city} />)}
        </div>
    );
}