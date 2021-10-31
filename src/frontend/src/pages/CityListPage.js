import { React, useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { CityDetailCard } from '../components/CityDetailCard';
import { CitySmallCard } from '../components/CitySmallCard';
import { PreferenceSlider } from '../components/PreferenceSlider';
import './CityListPage.css';

export const CityListPage = () => {

    // const defaultCity = {
    //     'city': 'amsterdam',
    //     'country': 'netherlands'
    // };
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

    const [preferences, setPreferences] = useState(defaultPreferences);
    const [preferredCities, setPreferredCities] = useState([{}]);
    const [cityLoadError, setCityLoadError] = useState();

    const modalRef = useRef();;

    const openModal = () => {
        modalRef.current.style.display = 'block'; 
    };

    const closeModal = () => {
        modalRef.current.style.display = 'none';
    }

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch(`http://localhost:8080/city/`);
                const data = await response.json();
                // setCities(data);
                data.sort((a, b) => a.score < b.score ? 1 : -1);
                setPreferredCities(data);
                console.log(data);
            } catch (err) {
                setCityLoadError(err);
            }
        };
        fetchCities();
    }, []
    );

    const onChangeSlider = useCallback((e, pref) => {
        // newPref[pref]  = parseFloat(e.target.value);
        setPreferences({ ...preferences, [pref]: parseFloat(e.target.value) });
        const updateCityScores = () => {
            const newPreferredCities = preferredCities;
            for (let i = 0; i < newPreferredCities.length; i++) {
                var newScore = 0;
                for (const key of Object.keys(preferences)) {
                    newScore += newPreferredCities[i][key] * preferences[key];
                }
                try {
                    newPreferredCities[i]['score'] = newScore / 17;
                } catch (err) {
                    console.log("Key error, city has no property 'score'");
                }
            }
            newPreferredCities.sort((a, b) => a.score > b.score ? -1 : 1);
            setPreferredCities(newPreferredCities);
        };
        updateCityScores();
    },
        [preferences, preferredCities]);



    const topThreePreferences = useCallback(() => {
        var sorted = Object.keys(preferences);
        sorted = sorted.sort((a, b) => preferences[a] > preferences[b] ? -1 : 1).slice(0, 3);
        const newSorted = [];
        for (let pref of sorted) {
            newSorted.push({ pref: pref });
        }
        return newSorted;
    },
        [preferences]);

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
        [onChangeSlider]
    );

    const detailCardProps = useMemo(
        () => ({
            city: preferredCities[0],
            topPreferences: topThreePreferences()
        }),
        [preferredCities, topThreePreferences]
    )

    if (preferredCities.length === 1) {
        return (
            <div className="CityListPage">
                <h1>{cityLoadError ? 'Could not load city data' : 'Loading...'}</h1>
                <p>{JSON.stringify(preferences)}</p>
                {/* {Array(13).fill(Object.keys(preferences).map(pref => <button onclick={setPreference}>pref</button>))} */}
                <CityDetailCard key="null-card" city={null} />
                {[1, 2, 3].map(v => <CitySmallCard key={v} />)}
            </div>
        );
    }


    return (
        <div className="CityListPage">
            <h1>Your City Preferences</h1>
            <button id="myBtn" onClick={openModal}>Open Modal</button>
            <div ref={modalRef} id="myModal" className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Adjust Your Preferences</h2>
                    </div>
                    <div className="modal-body grid">
                        {Array(1).fill(Object.keys(defaultPreferences)
                        .map(pref => <PreferenceSlider key={pref + '-slider'} value={preferences[pref]} name={pref} {...sliderProps} />))}
                    </div>
                    <div className="modal-footer">
                        <h3>Filter By:</h3>
                    </div>
                </div>

            </div>
            <CityDetailCard key="active-card" {...detailCardProps} />
            {preferredCities.slice(1, 4).map(city => <CitySmallCard key={city.uaName} city={city} />)}
        </div>
    );
}