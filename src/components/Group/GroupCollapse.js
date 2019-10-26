import React from 'react';
import { ChevronDown, Move, RotateCcw, Shuffle } from 'react-feather'
import './Group.scss'
import ReactResizeDetector from 'react-resize-detector';
import store from '../../redux/store';
import { setColCssById } from '../../redux/reducers/Col';

export default class Group extends React.Component {

    state = {
        expand: false,
        iconDisplayOnly: false
    }

    getIcon = (name) => {
        switch (name.toUpperCase()) {
            case 'TRANSLATE':
                return <Move></Move>

            case 'ROTATE':
                return <RotateCcw></RotateCcw>

            case 'SKEW':
                return <Shuffle></Shuffle>
        }
    }

    headerClick = (e) => {
        this.setState({ expand: !this.state.expand });
        if (!this.state.expand) store.dispatch(setColCssById('CssToolbar', 'width', '400px'))
    }

    onResize = (val) => {
        if (val <= 150) {
            this.setState({ iconDisplayOnly: true })
        }
        else if (val <= 300) {
            this.setState({ expand: false })
        }
        else {
            this.setState({ iconDisplayOnly: false, expand: true })
        }
    }

    render() {
        const { label } = this.props
        const { expand } = this.state
        return  <div className='group' ref={ref => this.wrapper = ref} >
            <div style={{margin: 2, display:'flex', position:'relative', flexDirection:'column'}}>
            <div className={`group-header${expand?' expand':''}`}
                onClick={this.headerClick}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {this.getIcon(label)}
                </div>
                {!this.state.iconDisplayOnly && <p style={{ margin: 0, alignSelf: 'center' }}>{label.toUpperCase()}</p>}

            </div>
            <ReactResizeDetector handleWidth onResize={this.onResize} />

            {
                this.state.expand &&
                <div className='content'>
                    <div className='group-body'>{this.props.children}</div>
                </div>
            }
    
            </div>
        </div>
    }
}