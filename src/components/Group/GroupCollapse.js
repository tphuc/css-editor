import React from 'react';
import {ChevronDown, Move, RotateCcw, Shuffle} from 'react-feather'
import './Group.css'
import ReactResizeDetector from 'react-resize-detector';
import store from '../../redux/store';
import {setColCssById} from '../../redux/reducers/Col'
export default class Group extends React.Component{

    state = {
        expand: false,
        iconDisplayOnly: false
    }

    getIcon = (name) => {
        switch(name.toUpperCase()){
            case 'TRANSLATE':
                return <Move></Move>

            case 'ROTATE':
                return <RotateCcw></RotateCcw>

            case 'SKEW':
                return <Shuffle></Shuffle>
        }
    }

    headerClick = (e) => {
        this.setState({expand: !this.state.expand}); 
        if(!this.state.expand) store.dispatch(setColCssById('CssToolbar', 'width', '400px')) 
    }

    onResize = (val) => {
        if(val <= 150){
            this.setState({iconDisplayOnly: true})
        }
        else if(val <= 300){
            this.setState({expand: false})
        }
        else{
            this.setState({iconDisplayOnly: false, expand: true})
        }
    }

    render(){
        const { label } = this.props
        const { expand } = this.state
        return <div className='group' ref={ref => this.wrapper = ref} >
            <div className='group-header' 
                onClick={this.headerClick}>
                {!this.state.iconDisplayOnly && label.toUpperCase()} 
                {this.getIcon(label)}
            </div>
            <ReactResizeDetector handleWidth onResize={this.onResize} />
            { this.state.expand && this.props.children}
        </div>
    }
}