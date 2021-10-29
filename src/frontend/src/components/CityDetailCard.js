import { React } from 'react';

export const CityDetailCard = ({city}) => {
    return (
        <div className="CityPage">
            <h3>Top Cities</h3>
            <h3>City Details</h3>
            <h4>{city ? city.uaName + ', ' + city.uaCountry : 'Loading...'}</h4>
        </div>
    )
}