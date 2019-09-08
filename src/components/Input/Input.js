import React from 'react'
import './Input.scss'



export default class Input extends React.Component{

    render(){
        return <div className="quantity">
            <input type="number" min={1} max={9}  />
            <div className='input-label' >
                {this.props.label}
            </div>
        </div> 
    }
}
