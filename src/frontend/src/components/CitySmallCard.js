import { React } from 'react';

export const CitySmallCard = ({city}) => {
    return (
        <div className="CityPage">
            <p>{city ? city.uaName + ', ' + city.uaCountry + ', Score = ' + Math.round(city.score*100)/100 : 'Loading...'}</p>
        </div>
    )
}