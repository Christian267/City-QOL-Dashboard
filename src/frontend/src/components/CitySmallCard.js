import { React } from 'react';

export const CitySmallCard = ({city, index}) => {
    if (city === null) {
        return (
            <div className="city-small-card">
                <p>loading...</p>
            </div>
            )
        }
    const cityNameCountryScore = city.uaName + ', ' + city.uaCountry + ', Score = ' + Math.round(city.score*100)/100
    return (
        <div className="city-small-card">
            <p>{index}. {cityNameCountryScore}</p>
        </div>
    )
}