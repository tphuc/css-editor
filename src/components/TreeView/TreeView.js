import React from 'react';
import {frost_blue, dark1, dark4, dark3, frost_ocean, dark2, frost_green, frost_cyan, light3} from '../Color/Nord';
import PropTypes from 'prop-types';

const tree = [
    {
        id: '1231231212312312',
        children: [
            {
                id: 'asdasdasd',
            }
        ]
    },
    {
        id: 'awd2asdasd',
        children: [
            {
                id: 'asda2e123',
                children: [
                    {
                        id: 'asdasdawdaw',
                    },
                    {
                        id: 'asd1231232w',
                    }
                ]
            }
        ]
    },
    {
        id: 'asdasdasd23',
    }
]


class TreeItem extends React.Component {

    constructor(props){
        super(props)
    }

    static propTypes = {
        depth: PropTypes.number
    }

    static defaultProps = {
        depth: 0
    }
    
    componentDidMount(){
        const { x, y, height, width } = this.wrapper.getBoundingClientRect();
        this.topArea = y + height * 1/3 - 30
        this.bottomArea = y + height * 2/3 - 30
        this.innerHTML = this.wrapper.innerHTML
    }

    dragStart = (e) => {
        e.dataTransfer.setData("text", '123');
        // disable view
        e.currentTarget.style.minHeight = '0px'
        e.currentTarget.style.height = '0px'
        e.currentTarget.innerHTML = ''
    }
    
    dragLeave = (e) => {
        this.wrapper.style.borderWidth = 0;
        this.wrapper.style.background = `linear-gradient(90deg, ${dark4}, ${dark2})`
    }

    dragEnd = (e) => {
        e.target.style.opacity = 1;
        //enable view
        e.currentTarget.style.minHeight = '25px'
        e.currentTarget.style.height = '25px'
        e.currentTarget.innerHTML = this.innerHTML
    }

    dragOver = (e) => {
        e.preventDefault();
        // if(e.target === this.wrapper){
        //     return
        // }
        const { x, y, height, width } = this.wrapper.getBoundingClientRect();
        this.topArea = y + height * 1/3 
        this.bottomArea = y + height * 2/3 

        if(this.topArea > e.clientY){
            this.wrapper.style.background = `linear-gradient(90deg, ${dark3}, ${dark2})`
            this.wrapper.style.borderTop = `3px solid ${frost_blue}`
        } 
        else if( this.bottomArea < e.clientY){
            this.wrapper.style.background = `linear-gradient(90deg, ${dark3}, ${dark2})`
            this.wrapper.style.borderBottom = `3px solid ${frost_blue}`
        } 
        else {
            this.wrapper.style.borderStyle = 'none' 
            this.wrapper.style.background = "#626c82";

        }
    }

    drop = (e) => {
        console.log(e.dataTransfer.getData("text"))
        e.preventDefault();
    }

    render() {
        return (
            <div
                ref={ref => this.wrapper = ref}
                id='1'
                // ---------- drags ------------ //
                onDragStart={this.dragStart}
                onDragEnter={this.dragEnter}
                onDragLeave={this.dragLeave}
                onDragOver={this.dragOver}
                onDragEnd={this.dragEnd}
                //----------- drop ------------ //
                onDrop={this.drop}
                style={{ 
                    background: `linear-gradient(90deg, ${dark3}, ${dark2})`, 
                    minHeight: 25, margin:2, display:'flex', alignItems:'center',
                    borderRadius: 5,
                    boxSizing: "border-box",
                    borderWidth: 3,
                    transition:'0.2s',
                    color: light3,
                    fontSize:8,
                    paddingLeft: 5,
                    marginLeft: this.props.depth * 20,
                    position:'relative'
                 }}
                draggable={true}
            >
                {this.props.children || 'div'}
            </div>
        )
    }
}


export default class TreeView extends React.Component {



    renderItems = (data=[], depth=0) => {
        return data.map(obj => {
            return (
                <React.Fragment>
                <TreeItem depth={depth}>{obj.id}</TreeItem>
                {
                    obj.children && this.renderItems(obj.children, depth + 1)   
                }
                </React.Fragment>
            )
        })
    }

    render() {
        return (
            <div style={{ height: 400}}
            >
               
               {this.renderItems(tree)}
            </div>
        )
    }
}