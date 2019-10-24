import React from 'react'
import './Input.scss'
import PropTypes from 'prop-types'


export default class Input extends React.Component{

    render(){
        const { style, ...others } = this.props
        return <div className="quantity">
            <input type="number" min={1} max={9}  />
            <div className='input-label' style={style} {...others}>
                {this.props.label}
            </div>
        </div> 
    }
}
