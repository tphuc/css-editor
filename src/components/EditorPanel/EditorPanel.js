import React from 'react';
import Slider from '../Slider/Slider';
import GroupCollapse from '../Group/GroupCollapse';
import './EditorPanel.scss'
import {Settings} from 'react-feather';
import {light3} from '../Color/Nord';


export default class EditorPanel extends React.Component{

    render(){
        return <div className='editor-panel'>
                <div className='editor-container'>
                    {this.props.children}
                </div>
        </div>
    }
}