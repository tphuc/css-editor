import React from 'react';
import {frost_blue, dark1, dark4, dark3, frost_ocean, dark2, frost_green, frost_cyan, light3} from '../Color/Nord';

const tree = [
    {
        id: '1231231212312312',
        children: [
            {

            }
        ]
    },
    {

    },
    {

    }
]


class TreeItem extends React.Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        const { x, y, height, width } = this.wrapper.getBoundingClientRect();
        this.topArea = y + height * 1/3
        this.bottomArea = y + height * 2/3
    }

    dragStart = (e) => {
        e.dataTransfer.setData("text/data", e.target.id);
        e.target.style.height = 0
    }
    
    dragLeave = (e) => {
        this.wrapper.style.borderWidth = 0;
        this.wrapper.style.background = `linear-gradient(90deg, ${dark4}, ${dark2})`
    }

    dragEnd = (e) => {
        e.target.style.opacity = 1;
    }

    dragOver = (e) => {
        e.preventDefault();
        console.log('top', this.topArea, 'bottom', this.bottomArea, e.clientY)
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
                    minHeight: 30, margin:2, display:'flex', alignItems:'center',
                    borderRadius: 2,
                    boxSizing: "border-box",
                    borderWidth: 3,
                    transition:'0.2s',
                    color: light3,
                    fontSize:12
                 }}
                draggable={true}
            >
                {this.props.children || 'div'}
            </div>
        )
    }
}


export default class TreeView extends React.Component {


    render() {
        return (
            <div style={{ height: 400}}
            >
               <TreeItem>item1</TreeItem>
               <TreeItem>item2</TreeItem>
            </div>
        )
    }
}