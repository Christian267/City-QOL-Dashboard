import { React, useState, useCallback } from 'react';
import { ScoreBar } from './ScoreBar';

export const CitySmallCard = ({city, index, sortedPreferences}) => {
    const [displayMore, setDisplayMore] = useState(false);

    const toggleDisplay = useCallback(() => {
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

    return (
        <div className="city-small-card">
            <div className="small-card-title">
                <span>{index}. {cityNameCountry}</span>
                <span className="small-card-toggle" onClick={() => toggleDisplay(false)}>{!displayMore ? 'show details' : 'hide details'}</span>
            </div>
            <div style={{display: displayMore ? 'block' : 'none'}}>
                {sortedPreferences.slice(0, 3).map(element => 
                    <ScoreBar key={element['pref']} preference={element['pref']} score={Math.round(city[element['pref']]*100)/100}/>
                    )
                }
                <p className="see-more-button">See More</p>
            </div>
        </div>
    )
}