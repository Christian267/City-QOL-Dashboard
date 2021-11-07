import { React } from 'react';
import { separateCamelCaseWord } from '../helperFunctions/helper';


export const ScoreBar = ({preference, score}) => {
    const colors = {
        businessFreedom: "#19ad51",
        commute: "#36cc24",
        costOfLiving: "#f3d630",
        economy: "#5c14a1",
        education: "#150e78",
        environmentalQuality: "#3d14a4",
        healthcare: "#051fa5",
        housing: "#f3c32c",
        internetAccess: "#b9117d",
        leisureCulture: "#d10d54",
        outdoors: "#f1351b",
        safety: "#0d6999",
        startups: "#f4eb33",
        taxation: "#88149f",
        tolerance: "#e70c26",
        travelConnectivity: "#7adc29",
        ventureCapital: "#d2ed31"
    };
    // environmental quality: 6.34/10  30 - 14
    // commute: 6/10
    const stringLength = separateCamelCaseWord(preference).length + score.toString().length + 2;
    const padding = 30 - stringLength;
    var paddedString = separateCamelCaseWord(preference) + ': ' + score.toString().padStart(padding, '!') + '/10';
    // console.log(preference + ': ' + score.toString());
    console.log(paddedString);
    
    return(
        <div key={preference} className="preference-row" >
            <div
                className="card-preference"
                key={preference}
                >
                {separateCamelCaseWord(preference)}
            </div>
            <div 
                key={score} 
                className="score-bar" 
                style={{
                    background: `linear-gradient(to right, ${colors[preference]} ${score*10}%, #eee ${score}% ${100 - score*10}%)`,
                    color: colors[preference]}}
                    >
                    .
            </div>
        </div>
    )

}