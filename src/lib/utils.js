export const getUnit = (val) => {
    var split = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(val);
    if (split) { return split[1]; }
}

export const unitToNum = (px) => {

    if (typeof px === 'number') return px;
    if(px)
        return Number(px.match(/(.*)px/)[1])
    else
        return 0
}