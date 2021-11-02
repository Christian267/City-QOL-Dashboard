import { React } from 'react';
import { separateCamelCaseWord } from '../helperFunctions/helper';
import { ScoreBar } from './ScoreBar';

export const CityDetailCard = ({city, topPreferences}) => {

    if (city === null) {
        return (
            <div className="city-detail-card">
                <h3>Your Top City</h3>
                <p></p>
                <h4>Loading...</h4>
            </div>
            )
    }
    
    return (
        <div className="city-detail-card">
            <h3>Your Top City: {city.uaName + ', ' + city.uaCountry}</h3>
            {topPreferences.map(element => 
            <ScoreBar key={element['pref']} preference={element['pref']} score={Math.round(city[element['pref']]*100)/100} />
            )}

            {/* <h5>Business Freedom {city ? Math.round(city['businessFreedom']*100)/100 : 'loading...'}</h5>
            <h5>Education {city ? Math.round(city['education']*100)/100 : 'loading...'}</h5>
            <h5>Housing {city ? Math.round(city['housing']*100)/100 : 'loading...'}</h5> */}
            <br/>
        </div>
    )
}