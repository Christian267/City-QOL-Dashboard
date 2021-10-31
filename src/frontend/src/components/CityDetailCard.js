import { React } from 'react';

export const CityDetailCard = ({city}) => {


    return (
        <div className="CityPage">
            <h3>Your Top City</h3>
            <h4>{city ? city.uaName + ', ' + city.uaCountry + ', Score = ' + Math.round(city.score*100)/100 : 'Loading...'}</h4>
            <h5>Business Freedom {city ? city['businessFreedom'] : 'loading...'}</h5>
            <h5>Education {city ? city['education'] : 'loading...'}</h5>
            <h5>Housing {city ? city['housing'] : 'loading...'}</h5>
            <br/>
        </div>
    )
}