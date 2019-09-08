import React from 'react';
import propTypes from 'prop-types'
import './Col.scss';
import {unitToNum} from '../../lib/utils';
import store from '../../redux/store' 
import { setColInstanceById } from '../../redux/reducers/Col';

const MIN_WIDTH = 100
const MAX_WIDTH = 700
const MIN_HEIGHT = 600

const ResizableColStyles = {
    resizeBar:{
        left: {
            flexGrow:0,
            flexShrink:0,
        },
        right: {
            flexGrow:0
        },
        false: {
            flexGrow: 1
        }
    },
    cellWrapper: {
        display:'flex',
        alignItems:'stretch', 
        height:'100%',
        minWidth: MIN_WIDTH,
        flexDirection:'row', 
        position:'relative', 
    }
}








export class Col extends React.Component {

    constructor(props) {
        super(props);
        this._INIT(props)
    }

    _initMouse = (props) => {
        this.deltaX = 0
        this.deltaY = 0
        this.mouseX = 0
        this.mouseY = 0
    }
    _initResize = (props) => {
        this.scaleDirection = props.resizeBar === 'right' ? 1 : -1

    }

    _INIT = (props) => {
        this._initMouse(props)
        this._initResize(props)
    }
    // ---------React component life cycle-------
    componentDidMount(){
        store.dispatch(setColInstanceById(this.wrapper, this.props.id))
    }

    //-----------Mouse handling ----------------
    handleMouseDown = (e) => {
        e = e || this.window.event
        e.preventDefault()
        e.stopPropagation();
        this.mouseX = e.clientX
        this.mouseY = e.clientY
        document.onmousemove = this.handleMouseMove
        document.onmouseup = this.handleMouseUp
    }

    handleMouseMove = (e) => {
        e = e || this.window.event
        e.preventDefault()
        e.stopPropagation();
        this.deltaX = this.mouseX - e.clientX;
        this.deltaY = this.mouseY - e.clientY;
        this.mouseX = e.clientX
        this.mouseY = e.clientY
        this.wrapper.style.cursor = 'drag'
        this.wrapper.style.width = Math.min(Math.max(unitToNum(this.wrapper.getBoundingClientRect().width) - this.deltaX * this.scaleDirection, MIN_WIDTH), MAX_WIDTH) + 'px'
    }

    handleMouseUp = (e) => {
        document.onmousemove = null
        document.onmouseup = null
    }


    //-------Render functions-----------------
    renderResizeBar = () => {
        const {resizeBar} = this.props
        if(resizeBar) 
        return <div 
            className={`resize-vertical ${resizeBar}`} 
            ref={ref => this[`slider ${resizeBar}`] = ref} 
            onMouseDown={resizeBar? this.handleMouseDown : null} 
        />
    }

    render(){
        const {resizeBar} = this.props

        return (
            <div className="cell-wrapper" 
                style={{
                    ...ResizableColStyles.cellWrapper,
                    ...ResizableColStyles.resizeBar[resizeBar]
                }} 
                ref={ref => this.wrapper = ref}
            >
                <div className="cell" ref={ref => this.container = ref}>
                    {this.props.children}
                </div>
                { this.renderResizeBar() }
            </div>
        )
    }
}



Col.propTypes = {
    resizeBar: propTypes.oneOf(['left', 'right', false]),
    id: propTypes.string
}

Col.defaultProps = {
    resizeBar: false,
    
}