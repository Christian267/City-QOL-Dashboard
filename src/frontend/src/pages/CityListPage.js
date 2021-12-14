import { React, useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
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

    const userPreferences = useLocation();

    const continentFilters = {
        "Asia": false,
        "North America": false,
        "South America": false,
        "Africa": false,
        "Europe": false,
        "Oceania": false
    }
    
    const minDisplayCount = 6;
    const [preferences, setPreferences] = useState(userPreferences.state ? userPreferences.state : defaultPreferences);
    const [preferredCities, setPreferredCities] = useState([{}]);
    const [filters, setFilters] = useState(continentFilters);
    const [filteredCities, setFilteredCities] = useState([{}]);
    const [cityLoadError, setCityLoadError] = useState();
    const [displayCount, setDisplayCount] = useState(minDisplayCount);

    const sliderModalRef = useRef();
    const filterModalRef = useRef();

    const openSliderModal = () => {
        sliderModalRef.current.style.display = 'block'; 
    };

    const closeSliderModal = () => {
        sliderModalRef.current.style.display = 'none';
    }

    const openFilterModal = () => {
        filterModalRef.current.style.display = 'block'; 
    };

    const closeFilterModal = () => {
        filterModalRef.current.style.display = 'none';
    }
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch(`http://localhost:8080/city/`);
                const data = await response.json();
                data.sort((a, b) => a.score < b.score ? 1 : -1);
                console.log(data);
                setPreferredCities(sortCitiesByPreferences(data, preferences));
                setFilteredCities(sortCitiesByPreferences(data, preferences));
            } catch (err) {
                setCityLoadError(err);
            }
        };
        fetchCities();
    }, [preferences]
    );

    const changeDisplayCount = useCallback((increment) => {
        const maxCount = filteredCities.length;
        const step = 12;
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
    }, [displayCount, filteredCities.length]
    );

    const onChangeSlider = useCallback((e, pref) => {
        setPreferences({ ...preferences, [pref]: parseFloat(e.target.value) });
        setPreferredCities(sortCitiesByPreferences(preferredCities, preferences));
        setFilteredCities(sortCitiesByPreferences(filteredCities, preferences));
    }, [preferences, preferredCities, filteredCities]
    );
    
    const onChangeFilter = useCallback((e, filter) => {
        const newFilters = filters;
        const toggledValue = filters[filter];
        newFilters[filter] = !newFilters[filter];
        setFilters({ ...filters, [filter]: !toggledValue });
        const toggledFilters = [];
        for (const [key, value] of Object.entries(newFilters)) {
            if (value === true) toggledFilters.push(key);
        }
        if (toggledFilters.length > 0) {
            const newFilteredCities = [];
            for (const city of preferredCities) {
                if (toggledFilters.includes(city.uaContinent)) newFilteredCities.push(city);
            }
            if (displayCount > newFilteredCities.length) setDisplayCount(newFilteredCities.length);
            setFilteredCities(newFilteredCities);
        }
        else {
            setFilteredCities(preferredCities);
        }

    }, [filters, preferredCities, displayCount]
    );

    const sortedPreferences = useCallback(() => {
        var sorted = Object.keys(preferences);
        sorted = sorted.sort((a, b) => preferences[a] > preferences[b] ? -1 : 1);
        const newSorted = [];
        for (let pref of sorted) {
            newSorted.push({ pref: pref });
        }
        return newSorted;
    }, [preferences]
    );

    const sliderProps = useMemo(() => ({
            step: 0.01,
            min: 0,
            max: 1,
            linearGradientColor: "#0a71b1",
            rangeBackgroundColor: "#d7dcdf",
            sliderThumbColor: "#0a71b1",
            onChange: (e, pref) => onChangeSlider(e, pref),
        }), [onChangeSlider]
    );

    const cardProps = useMemo(() => ({
            city: filteredCities[0],
            sortedPreferences: sortedPreferences(),
        }), [filteredCities, sortedPreferences]
    )

    // const cityModal = () => {
    //     return (
    //         <div className="slider-modal">
    //             <div className="modal-content">
    //                 <div className="modal-header">
    //                     <span className="close" onClick={closeSliderModal}>&times;</span>
    //                     <h2>Adjust Your Preferences</h2>
    //                 </div>
    //                 <div className="modal-body">
    //                     {Object.keys(defaultPreferences)
    //                     .map(pref => <PreferenceSlider 
    //                         key={pref + '-slider'} 
    //                         value={preferences[pref]} 
    //                         name={pref} 
    //                         {...sliderProps} 
    //                         />)
    //                     }
    //                 </div>
    //             </div>
    //         </div>
    // )
    // }
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
            <div className="topbar">
                <h1 className="city-list-title">Your Preferred Cities</h1>
                <h4 className="modal-button" onClick={openFilterModal}>Filter</h4>
                <h4 className="modal-button" onClick={openSliderModal}>Preferences</h4>
            </div>
            <div ref={sliderModalRef} className="slider-modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="close" onClick={closeSliderModal}>&times;</span>
                        <h2>Adjust Your Preferences</h2>
                    </div>
                    <div className="modal-body">
                        {Object.keys(defaultPreferences).map(pref => 
                        <PreferenceSlider 
                            key={pref + '-slider'} 
                            value={preferences[pref]} 
                            name={pref} 
                            {...sliderProps} 
                        />)
                         }
                    </div>
                </div>

            </div>
            <div ref={filterModalRef} className="filter-modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="close" onClick={closeFilterModal}>&times;</span>
                        <h2>Filter By Continent</h2>
                    </div>
                    <div className="modal-body">
                        {Object.keys(filters).map(filterName =>
                            <div key={filterName} className="filter-checkbox-container">
                                <input 
                                    type="checkbox" 
                                    id={`${filterName}-checkbox`} 
                                    name={filterName} 
                                    value={filterName}
                                    checked={filters[filterName]}
                                    onChange={(e) => onChangeFilter(e, filterName)}
                                />
                                <label htmlFor={`${filterName}-checkbox`}>{filterName}</label>
                            </div>
                            )
                            }
                    </div>
                </div>
            </div>
            <CityDetailCard 
                key="active-card" 
                {...cardProps} 
            />

            <div className="card-grid">
                {filteredCities.slice(1, displayCount)
                .map(city => <CitySmallCard 
                                key={city.uaName + city.uaCountry} 
                                city={city}
                                index={filteredCities.indexOf(city) + 1} 
                                sortedPreferences = {cardProps['sortedPreferences']}
                            />
                    )
                }
                <div className='show-container'>
                    <span 
                        className="show-more" 
                        onClick={() => changeDisplayCount(true)} 
                        style={{display: displayCount===filteredCities.length ? 'none' : 'inline'}}
                        >
                        Show More
                    </span>
                    <span 
                        className="show-less" 
                        onClick={() => changeDisplayCount(false)} 
                        style={{display: displayCount===minDisplayCount ? 'none' : 'inline'}}
                        >
                        Show Less
                    </span>
                </div>
            </div>
        </div>
    );
}

function sortCitiesByPreferences(cities, preferences) {
    const newPreferredCities = cities;
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
    return newPreferredCities;
};