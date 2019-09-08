import React from 'react';
import propTypes from 'prop-types';
import Slider from '@material-ui/core/Slider';
import Input from '../Input/Input'

import './Slider.scss'
function valuetext(value) {
    return `${value}°C`;
}



export default class SliderCss extends React.Component {
    state = {
        min: this.props.min,
        max: this.props.max,
        current: this.props.current
    }


    render() {
        const { cssAttr } = this.props
        return <div style={{ display: 'flex', flexDirection: 'row',justifyContent:'center', alignItems:'center',}}>
            <div className='css-attr-tag'>{cssAttr}</div>
            <Input label='min'></Input>
            <Slider
                getAriaValueText={valuetext}
                defaultValue={0}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="on"
                min={0}
                max={360}
            />
            <Input label='max'></Input>
        </div>
    }
}