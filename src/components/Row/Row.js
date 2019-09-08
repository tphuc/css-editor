import React from 'react';

export const Row = (props) => {
    return <div style={{display:'flex', width:'100%', height:'100%', position:'relative' }}>
        {props.children}
    </div>
}