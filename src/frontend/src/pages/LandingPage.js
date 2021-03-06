import { React, useState, useMemo, useCallback} from 'react';
import { Link } from 'react-router-dom';
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
            linearGradientColor: "#0a71b1",
            rangeBackgroundColor: "#d7dcdf",
            sliderThumbColor: "#0a71b1",
            onChange: (e, pref) => onChangeSlider(e, pref),
        }),
        [onChangeSlider]
    );

    return (
        <div className="landing-page">
            <h2>Choose your city preferences</h2>
            <div className="grid">
                {Object.keys(defaultPreferences).map(pref => 
                <PreferenceSlider 
                    key={pref + '-slider'} 
                    value={preferenceValues[pref]} 
                    name={pref} {...sliderProps} 
                />)
                }
            </div>
            <Link 
                className="link-btn"
                to={{
                    pathname: '/cityList',
                    state: preferenceValues
                }}
            >
            Discover My Cities
            </Link>
        </div>
    );
}