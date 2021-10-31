import { React, useState, useMemo} from 'react';
import { PreferenceSlider } from '../components/PreferenceSlider';
import './LandingPage.css';
export const LandingPage = () => {

    
    const defaultPreferences = {
        businessFreedom: 0.5,
        commute: 0.5,
        costOfLiving: 0.5,
        economy: 0.5,
        education: 0.5,
        environmentalQuality: 0.5,
        healthcare: 0.5,
        housing: 0.5,
        internetAccess: 0.5,
        leisureCulture: 0.5,
        outdoors: 0.5,
        safety: 0.5,
        startups: 0.5,
        taxation: 0.5,
        tolerance: 0.5,
        travelConnectivity: 0.5,
        ventureCapital: 0.5
    };
    const [preferenceValues, setPreferenceValues] = useState(defaultPreferences);

    // const sliderValueChanged = useCallback(val => {
    //     console.log("NEW VALUE", val[0] + ",", val[1]);
    //     const newPreferences = preferenceValues;
    //     newPreferences[val[0]] = val[1];
    //     setPreferenceValues(newPreferences);
    // });

    const onChangeSlider = (e, pref) => {
        // newPref[pref]  = parseFloat(e.target.value);
        setPreferenceValues({...preferenceValues, [pref]: parseFloat(e.target.value)});
    }

    const sliderProps = useMemo(
        () => ({
            step: 0.01,
            min: 0,
            max: 1,
            linearGradientColor: "#2c3e50",
            rangeBackgroundColor: "#d7dcdf",
            sliderThumbColor: "#2c3e50",
            onChange: (e, pref) => onChangeSlider(e, pref),
        }),
        [preferenceValues]
    );

    return (
        <div className="landing-page">
            <h2>Adjust your preferences on what you care about in a city</h2>
            <h6>{JSON.stringify(preferenceValues)}</h6>
            <div className="grid">
                {Array(1).fill(Object.keys(defaultPreferences)
                .map(pref => <PreferenceSlider value={preferenceValues[pref]} name={pref} {...sliderProps} />))}
            </div>
        </div>
    )
}