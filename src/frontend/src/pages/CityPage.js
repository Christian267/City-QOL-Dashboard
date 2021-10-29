import { React, useEffect, useState } from 'react';
import { CityDetailCard } from '../components/CityDetailCard';
import { CitySmallCard } from '../components/CitySmallCard';


export const CityPage = () => {

    const [city, setCity] = useState({});
    const [cityName, setCityName] = useState({
                                                'city': 'amsterdam',
                                                'country': 'netherlands'
                                            });

    const fetchCities = async () => {
        const response = await fetch(`http://localhost:8080/city/${cityName['city']}/${cityName['country']}`);
        const data = await response.json();
        console.log(data);
        setCity(data);
    }

    useEffect(
        () =>  {
        fetchCities();
        }, [cityName]);


    return (
        <div className="CityPage">
            <h1>{city.uaName}</h1>
            <CityDetailCard />

            <CitySmallCard />
            <CitySmallCard />
            <CitySmallCard />
        </div>
    )
}