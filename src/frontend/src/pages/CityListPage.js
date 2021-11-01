import { React, useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { CityDetailCard } from '../components/CityDetailCard';
import { CitySmallCard } from '../components/CitySmallCard';
import { PreferenceSlider } from '../components/PreferenceSlider';
import './CityListPage.css';

export const CityListPage = () => {

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
    const minDisplayCount = 6;
    const [preferences, setPreferences] = useState(defaultPreferences);
    const [preferredCities, setPreferredCities] = useState([{}]);
    const [cityLoadError, setCityLoadError] = useState();
    const [displayCount, setDisplayCount] = useState(minDisplayCount);

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
                data.sort((a, b) => a.score < b.score ? 1 : -1);
                console.log(data);
                setPreferredCities(data);
            } catch (err) {
                setCityLoadError(err);
            }
        };
        fetchCities();
    }, []
    );

    const changeDisplayCount = useCallback((increment) => {
        const maxCount = preferredCities.length;
        const step = 10;
        if (increment && displayCount <= maxCount - step) {
            setDisplayCount(displayCount + step);
        }
        else if (increment && displayCount < maxCount) {
            setDisplayCount(maxCount);
        }
        else if (!increment && displayCount >= minDisplayCount + step) {
            setDisplayCount(displayCount - step);
        }
        else if(!increment && displayCount > minDisplayCount) {
            setDisplayCount(minDisplayCount);
        }
    },
    [displayCount, preferredCities.length]);

    const onChangeSlider = useCallback((e, pref) => {
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
            linearGradientColor: "#073857",
            rangeBackgroundColor: "#d7dcdf",
            sliderThumbColor: "#073857",
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
            <div className="city-list-page">
                <h1>{cityLoadError ? 'Could not load city data' : 'Loading...'}</h1>
                {/* {Array(13).fill(Object.keys(preferences).map(pref => <button onclick={setPreference}>pref</button>))} */}
                <CityDetailCard key="null-card" city={null} />
                {[1, 2, 3].map(v => <CitySmallCard key={v} city={null}/>)}
            </div>
        );
    }

    return (
        <div className="city-list-page">
            <div className="card-grid">
                <h1>Cities Ranked on Preference</h1>
                <h4 className="modal-button" onClick={openModal}>Adjust your preferences</h4>
                <div ref={modalRef} className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <span className="close" onClick={closeModal}>&times;</span>
                            <h2>Adjust Your Preferences</h2>
                        </div>
                        <div className="modal-body">
                            {Array(1).fill(Object.keys(defaultPreferences)
                            .map(pref => <PreferenceSlider 
                                            key={pref + '-slider'} 
                                            value={preferences[pref]} 
                                            name={pref} 
                                            {...sliderProps} 
                                        />
                                    )
                                )
                            }
                        </div>
                        <div className="modal-footer">
                            <h3>Filter By:</h3>
                        </div>
                    </div>

                </div>
                <CityDetailCard key="active-card" {...detailCardProps} />
                {preferredCities.slice(1, displayCount)
                .map(city => <CitySmallCard 
                                key={city.uaName + city.uaCountry} 
                                city={city}
                                index={preferredCities.indexOf(city) + 1} 
                            />
                    )
                }
                <div className='show-container'>
                    <span 
                        className="show-more" 
                        onClick={() => changeDisplayCount(true)} 
                        style={{display: displayCount===preferredCities.length ? 'none' : 'inline'}}
                        >
                        show more
                    </span>
                    <span 
                        className="show-less" 
                        onClick={() => changeDisplayCount(false)} 
                        style={{display: displayCount===minDisplayCount ? 'none' : 'inline'}}
                        >
                        show less
                    </span>
                </div>
            </div>
        </div>
    );
}