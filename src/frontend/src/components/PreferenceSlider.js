import { React, useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import './PreferenceSlider.css';

export const PreferenceSlider = ({value, 
                                  name, 
                                  step, 
                                  min, 
                                  max,
                                  linearGradientColor,
                                  rangeBackgroundColor,
                                  sliderThumbColor,
                                  onChange}) => {

    const useStyles = createUseStyles({
        preferenceSlider: {
            '&::-webkit-slider-thumb': {
                backgroundColor: () => sliderThumbColor,
                boxShadow: () => `0 0 0 1px #d7dcdf, 0 0 0 3px ${sliderThumbColor}`
            }
        },
        preferenceSliderValue: {
            backgroundColor: () => sliderThumbColor,
            '&:after': {
                borderRight: () => `4px solid ${sliderThumbColor}`
            }

        }
    });

    const separateCamelCaseWord = (word) => {
        var newWords = '';
        for (let ch of word) {
            if (ch === ch.toUpperCase()) {
                newWords += ' ';
            }
            newWords += ch;
        }
        newWords[0].toUpperCase();
        return newWords[0].toUpperCase() + newWords.substring(1);
    }

    const classes = useStyles();
    const preferenceRef = useRef();
    const valueRef = useRef();





    useEffect(() => {
        const rangeLinearGradient= (val) => {
            const newBackgroundStyle = `linear-gradient(90deg, ${linearGradientColor} 0% ${val*100 + '%'}, ${rangeBackgroundColor} ${val*100 + '%'} 100%)`;
            preferenceRef.current.style.background = newBackgroundStyle;
        }
        const valueSpanPosition = (val) => {
            valueRef.current.style.top = `${30 - val * 100}px`;
        }
        rangeLinearGradient(value);
        valueSpanPosition(value);
    }, [value, linearGradientColor, rangeBackgroundColor])

    const handleChange = e => {
        onChange(e, name);
    }

    return (

    
        <div className="slider-container">
            <h4>{separateCamelCaseWord(name)}</h4>
            <input 
                ref={preferenceRef}
                className={`preference-slider ${classes.preferenceSlider}`} 
                name={name} type="range" 
                min={min} max={max} 
                value={value} 
                step={step} 
                onChange={(e) => handleChange(e)} 
            />
            <span ref={valueRef} className={`preference-slider-value ${classes.preferenceSliderValue}`}>{value}</span>
            <div className="range-min-max-values">
            </div>
        </div>
    )
}