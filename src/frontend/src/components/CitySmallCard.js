import { React, useState, useCallback } from 'react';
import { separateCamelCaseWord } from '../helperFunctions/helper';

export const CitySmallCard = ({city, index, topThreePreferences}) => {

    const [displayMore, setDisplayMore] = useState(false);

    const toggleDisplay = useCallback(() => {
        console.log("toggleDisplay");
        setDisplayMore(!displayMore);
    },[displayMore]);

    if (city === null) {
        return (
            <div className="city-small-card">
                <p>loading...</p>
            </div>
            )
        }
    const cityNameCountry = city.uaName + ', ' + city.uaCountry;
    const cityScore = ', Score = ' + Math.round(city.score*100)/100;
    return (
        <div className="city-small-card">
            <div className="small-card-title">
                <span>{index}. {cityNameCountry}</span>
                <span className="small-card-toggle" onClick={() => toggleDisplay(false)}>{!displayMore ? 'show details' : 'hide details'}</span>
            </div>
            {topThreePreferences.map(element => 
                <p 
                    key={element['pref']}
                    style={{display: displayMore ? 'inline' : 'none'}}
                    >
                    {separateCamelCaseWord(element['pref']) + ': '} 
                    <span>{Math.round(city[element['pref']]*100)/100}</span>
                </p>
                )
            }
            <p className="see-more-button" style={{display: displayMore ? 'inline' : 'none'}}>See More</p>
        </div>
    )
}