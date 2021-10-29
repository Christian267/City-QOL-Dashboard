import { React } from 'react';

export const CitySmallCard = ({city}) => {
    return (
        <div className="CityPage">
            <p>{city ? city.uaName + ', ' + city.uaCountry : 'Loading...'}</p>
        </div>
    )
}