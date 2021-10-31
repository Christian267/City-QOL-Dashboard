import { React, useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { separateCamelCaseWord } from '../helperFunctions/helper';
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

    const handleScrollChange = e => {
        console.log("Scrolled");
        e.target.value += 0.01;
        onChange(e, name);
    }
    return (

    
        <div className="slider-container">
            <h4 className="preference-text">{separateCamelCaseWord(name)}
                <span className="tooltip-text">TOOLTIP TEXT</span>
            </h4>
            <input 
                ref={preferenceRef}
                className={`preference-slider ${classes.preferenceSlider}`} 
                name={name} type="range" 
                min={min} max={max} 
                value={value} 
                step={step} 
                onChange={(e) => handleChange(e)} 
                onScroll={(e) => handleScrollChange(e)}
            />
            <span ref={valueRef} className={`preference-slider-value ${classes.preferenceSliderValue}`}>{value}</span>
            <div className="range-min-max-values">
            </div>
        </div>
    )
}