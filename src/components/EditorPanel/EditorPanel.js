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
                    <GroupCollapse label='Translate'>
                        <Slider cssAttr={'Translate X'}></Slider> 
                        <Slider cssAttr={'Translate Y'}></Slider> 
                    </GroupCollapse>
                    <GroupCollapse label='Rotate'>
                        <Slider cssAttr={'Rotate X'}></Slider> 
                        <Slider cssAttr={'Rotate Y'}></Slider> 
                        <Slider cssAttr={'Rotate Z'}></Slider> 
                    </GroupCollapse>
                    <GroupCollapse label='Skew'>
                        <Slider cssAttr={'Skew X'}></Slider> 
                        <Slider cssAttr={'Skew Y'}></Slider> 
                    </GroupCollapse>
                </div>
        </div>
    }
}