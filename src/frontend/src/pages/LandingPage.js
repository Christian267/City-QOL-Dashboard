import { React, useState, useMemo, useCallback} from 'react';
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

    const onChangeSlider = useCallback((e, pref) => {
        setPreferenceValues({...preferenceValues, [pref]: parseFloat(e.target.value)});
    },
    [preferenceValues]);

    const sliderProps = useMemo(
        () => ({
            step: 0.01,
            min: 0,
            max: 1,
            linearGradientColor: "#073857",
            rangeBackgroundColor: "#d7dcdf",
            sliderThumbColor: "#073857",
            onChange: (e, pref) => onChangeSlider(e, pref),
        }),
        [onChangeSlider]
    );

    return (
        <div className="landing-page">
            <h2>Adjust your preferences on what you care about in a city</h2>
            <h6>{JSON.stringify(preferenceValues)}</h6>
            <div className="grid">
                {Array(1).fill(Object.keys(defaultPreferences)
                .map(pref => <PreferenceSlider key={pref + '-slider'} value={preferenceValues[pref]} name={pref} {...sliderProps} />))}
            </div>
        </div>
    );
}