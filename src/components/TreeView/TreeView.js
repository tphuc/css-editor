import React from 'react';
import { frost_blue, dark1, dark4, dark3, frost_ocean, dark2, frost_green, frost_cyan, light3, LG_dark, text_light, text_dim } from '../Color/Nord';
import PropTypes from 'prop-types';
import { ChevronRight, ChevronDown, ChevronLeft } from 'react-feather';
import {FaProjectDiagram} from 'react-icons/fa'


const tree = [
    {
        id: 'body',
        children:[
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
                                id: '123123112312'
                            },
                            {
                                id: 'asdasdawdaw',
                            },
                            {
                                id: 'asd1231232w',
                            },
                            {
                                id: '12312311232'
                            },
                            {
                                id: '12dawdw23112312'
                            },
                            {
                                id: '--1231232312'
                            },
                            {
                                id: '12ooo[[[aw12312'
                            },
                            {
                                id: '122fdd3112312'
                            },
                            {
                                id: '12odw2302312'
                            },
                            {
                                id: '1290923712112312'
                            },
                            {
                                id: '423212312'
                            },

                        ]
                    }
                ]
            },
            {
                id: 'asdasdasd23',
            }
        
        ]
    }
]

const DROP_AREA = {
    BOTTOM: 'bottom',
    TOP: 'top',
    MIDDLE: 'middle'
}

const THEME = {
    defaultBg: LG_dark,
    dragOver: dark4,
    text: light3

}

class TreeGroup extends React.Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        depth: PropTypes.number,
        disableDragDrop: PropTypes.bool
    }

    static defaultProps = {
        depth: 0,
        disableDragDrop: false
    }

    state = {
        expand: true
    }

    componentDidMount() {
        const { x, y, height, width } = this.wrapper.getBoundingClientRect();
        this.topArea = y + height * 1 / 3 - 30
        this.bottomArea = y + height * 2 / 3 - 30
        this.innerText = this.wrapper.firstChild.innerText

    }

    handleClick = (e) => {
        this.setState({ expand: !this.state.expand })
    }

    dragStart = (e) => {
        if(this.props.disableDragDrop) return
        e.dataTransfer.setData("text", this.props.id);
        // disable view
        e.currentTarget.style.height = '0px'
        e.currentTarget.firstChild.innerText = ''
        this.setState({ expand: false })
    }

    dragLeave = (e) => {
        if(this.props.disableDragDrop)
            return
        this.wrapper.style.borderWidth = 0;
        this.wrapper.style.background = THEME.defaultBg
    }

    dragEnd = (e) => {
        if(this.props.disableDragDrop)
            return
        e.target.style.opacity = 1;
        //enable view
        e.currentTarget.style.height = '25px'
        e.currentTarget.firstChild.innerText = this.innerText
        this.setState({ expand: this.state.expand })
    }

    dragOver = (e) => {
        if(this.props.disableDragDrop)
            return
        e.preventDefault();
        const { x, y, height, width } = this.wrapper.getBoundingClientRect();
        this.topArea = y + height * 1 / 3
        this.bottomArea = y + height * 2 / 3

        if (this.topArea > e.clientY) {
            this.wrapper.style.background = THEME.defaultBg
            this.wrapper.style.borderTop = `3px solid ${frost_blue}`
            this.dropArea = DROP_AREA.TOP
        }
        else if (this.bottomArea < e.clientY) {
            this.wrapper.style.background = THEME.defaultBg
            this.wrapper.style.borderBottom = `3px solid ${frost_blue}`
            this.dropArea = DROP_AREA.BOTTOM
        }
        else {
            this.wrapper.style.borderStyle = 'none'
            this.wrapper.style.background = THEME.dragOver;
            this.dropArea = DROP_AREA.MIDDLE
        }
    }

    drop = (e) => {
        e.preventDefault();
        if(this.props.disableDragDrop) return
        this.wrapper.style.background = THEME.defaultBg
        this.wrapper.style.borderStyle = 'none'
        const { id, depth, treeInstance } = this.props
        
        var dragKey = e.dataTransfer.getData('text')
        switch (this.dropArea) {
            case DROP_AREA.BOTTOM:
                treeInstance.handleDrop(dragKey, id, 'bottom')
                break
            case DROP_AREA.TOP:
                treeInstance.handleDrop(dragKey, id, 'top')
                break
            case DROP_AREA.MIDDLE:
                treeInstance.handleDrop(dragKey, id, 'middle')
                break
            default:
                return
        }
    }

    renderItems = (data = [], depth = 0) => {
        return data.map(obj => {
            return (
                obj.children && obj.children.length ?
                    <TreeGroup treeInstance={this.props.treeInstance} id={obj.id} key={obj.id + depth} data={obj} depth={depth} >{obj.id}</TreeGroup>
                    :
                    <TreeItem treeInstance={this.props.treeInstance} id={obj.id} key={obj.id + depth} depth={depth}>{obj.id}</TreeItem>
            )
        })
    }

    render() {
        const { expand } = this.state
        const { id } = this.props

        return (
            <React.Fragment>
                <div
                    ref={ref => this.wrapper = ref}
                    id={id}
                    // ---------- drags ------------ //
                    onDragStart={this.dragStart}
                    onDragEnter={this.dragEnter}
                    onDragLeave={this.dragLeave}
                    onDragOver={this.dragOver}
                    onDragEnd={this.dragEnd}
                    //----------- drop ------------ //
                    onDrop={this.drop}
                    style={{
                        background: THEME.defaultBg,
                        height: 25,
                        marginTop: 2,
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: 5,
                        boxSizing: "border-box",
                        // boxShadow:'0px 2px 5px rgba(0,0,0,0.2)',
                        borderWidth: 3,
                        justifyContent: 'space-between',
                        transition: '0.2s',
                        color: THEME.text,
                        fontSize: 8,
                        paddingLeft: 5,
                        userSelect:'none',
                        marginLeft: this.props.depth * 20,
                        position: 'relative'
                    }}
                    onClick={this.handleClick}
                    draggable={!this.props.disableDragDrop}
                >
                    <div>{this.props.children}</div>
                    {
                        <div style={{ position: 'absolute', top: 0, right: 0 }}>
                            {expand ? <ChevronDown strokeWidth={1} fontSize={4} /> : <ChevronRight fontSize={4} strokeWidth={1} />}
                        </div>
                    }

                </div>

                {
                    expand && this.renderItems(this.props.data.children, this.props.depth + 1)
                }

            </React.Fragment>
        )
    }
}

class TreeItem extends React.Component {

    constructor(props) {
        super(props)
    }

    static propTypes = {
        depth: PropTypes.number,
        disableDragDrop: PropTypes.bool
    }

    static defaultProps = {
        depth: 0,
        disableDragDrop: false
    }

    componentDidMount() {
        const { x, y, height, width } = this.wrapper.getBoundingClientRect();
        this.topArea = y + height * 1 / 3 - 30
        this.bottomArea = y + height * 2 / 3 - 30
        this.innerHTML = this.wrapper.innerHTML
    }

    dragStart = (e) => {
        e.dataTransfer.setData("text", this.props.id);
        //disable view
        e.currentTarget.style.minHeight = '0px'
        e.currentTarget.style.height = '0px'
        e.currentTarget.innerHTML = ''
    }

    dragLeave = (e) => {
        this.wrapper.style.borderWidth = 0;
        this.wrapper.style.background = THEME.defaultBg
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
        const { x, y, height, width } = this.wrapper.getBoundingClientRect();
        this.topArea = y + height * 1 / 3
        this.bottomArea = y + height * 2 / 3

        if (this.topArea > e.clientY) {
            this.wrapper.style.background = THEME.defaultBg
            this.wrapper.style.borderTop = `3px solid ${frost_blue}`
            this.dropArea = DROP_AREA.TOP
        }
        else if (this.bottomArea < e.clientY) {
            this.wrapper.style.background = THEME.defaultBg
            this.wrapper.style.borderBottom = `3px solid ${frost_blue}`
            this.dropArea = DROP_AREA.BOTTOM
        }
        else {
            this.wrapper.style.borderStyle = 'none'
            this.wrapper.style.background = THEME.dragOver;
            this.dropArea = DROP_AREA.MIDDLE
        }
    }

    drop = (e) => {
        this.wrapper.style.background = THEME.defaultBg
        this.wrapper.style.borderStyle = 'none'
        const { eventDrop, id, depth, treeInstance } = this.props
        e.preventDefault();
        var dragKey = e.dataTransfer.getData('text')

        switch (this.dropArea) {
            case DROP_AREA.BOTTOM:
                treeInstance.handleDrop(dragKey, id, 'bottom')
                break
            case DROP_AREA.TOP:
                treeInstance.handleDrop(dragKey, id, 'top')
                break
            case DROP_AREA.MIDDLE:
                treeInstance.handleDrop(dragKey, id, 'middle')
                break
            default:
                return
        }

    }

    render() {
        return (
            <div
                ref={ref => this.wrapper = ref}
                id={this.props.id}
                // ---------- drags ------------ //
                onDragStart={this.dragStart}
                onDragEnter={this.dragEnter}
                onDragLeave={this.dragLeave}
                onDragOver={this.dragOver}
                onDragEnd={this.dragEnd}
                //----------- drop ------------ //
                onDrop={this.drop}
                style={{
                    background: THEME.defaultBg,
                    minHeight: 25,
                    margin: 2,
                    marginRight:0,
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 5,
                    boxSizing: "border-box",
                    borderWidth: 3,
                    transition: '0.2s',
                    color: THEME.text,
                    fontSize: 8,
                    paddingLeft: 5,
                    marginLeft: this.props.depth * 20,
                    position: 'relative',
                    // boxShadow:'0px 2px 5px rgba(0,0,0,0.1)',
                }}
                draggable={!this.props.disableDragDrop}
            >
                {this.props.children || 'div'}
            </div>
        )
    }
}



export default class TreeView extends React.Component {

    state = {
        tree: tree
    }

    handleDrop = (dragKey, dropKey, dropArea) => {
        console.log(dropArea)
        const isIncludes = (parent, itemId) => {
            var found = false
            parent.forEach(item => {
                if(item.id === itemId){
                    found = true
                }
                    
            })
            return found
        }
        const loop = (tree, key, callback) => {
            tree.forEach((item, index, arr) => {
                if (item.id === key) {
                    return callback(item, index, arr);
                }
                if (item.children) {
                    return loop(item.children, key, callback);
                }
            });
        };
        const loopParent = (tree, key, callback) => {
            tree.forEach((item, index, arr) => {
                if (item.children) {
                    if(isIncludes(item.children, key)){
                        return callback(item, index, arr);
                    }
                    return loopParent(item.children, key, callback);
                }
            });
        };

        var data = [...this.state.tree]
        let dragObj;
        loop(data, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        });

        switch (dropArea) {
            case DROP_AREA.MIDDLE:
                loop(data, dropKey, item => {
                    item.children = item.children || [];
                    item.children.push(dragObj);
                });
                break
            case DROP_AREA.TOP:
                loopParent(data, dropKey, item => {
                    var children = [...item.children]
                    let dropObj;
                    loop(tree, dropKey, item => {
                        dropObj = item
                    })
                    var i = children.indexOf(dropObj)
                    children.splice(i, 0, dragObj)
                    item.children = children
                })
                break
            case DROP_AREA.BOTTOM:
                console.log(dropKey)
                loopParent(data, dropKey, item => {
                    var children = [...item.children]
                    let dropObj;
                    loop(tree, dropKey, item => {
                        dropObj = item
                    })
                    var i = children.indexOf(dropObj)
                    children.splice(i+1, 0, dragObj)
                   
                    item.children = children
                })
                break
        }
        this.setState({tree: data})

    }

    renderItems = (data = [], depth = 0) => {
        return data.map(obj => {
            return (

                obj.children && obj.children.length ?
                    <TreeGroup disableDragDrop={true} treeInstance={this} id={obj.id} key={obj.id + depth} data={obj} depth={depth}>{obj.id}</TreeGroup>
                    :
                    <TreeItem treeInstance={this} id={obj.id} key={obj.id + depth} depth={depth}>{obj.id}</TreeItem>

            )
        })
    }

    render() {
        return (
            <div style={{ height: 400 }}>
                {this.renderItems(this.state.tree)}
            </div>
        )
    }
}