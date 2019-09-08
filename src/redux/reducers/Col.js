export const SET_COL_CSS = 'SET_COL_CSS'
export const SET_COL_INSTANCE_ID = 'SET_COL_INSTANCE_ID'

const initialState = {
    cols: {},
}

export const setColInstanceById = (instance, id) => {
    return {
        type: SET_COL_INSTANCE_ID,
        instance: instance,
        id: id
    }
}

export const setColCssById = (id, cssAttr, value) => {
    return {
        type: SET_COL_CSS,
        value: value,
        cssAttr: cssAttr,
        id: id
    }
}

export const ColReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_COL_INSTANCE_ID:
            return {
                ...state,
                cols: {
                    ...state.cols,
                    [action.id]: action.instance
                }
            }
            break

        case SET_COL_CSS:
            const { id, cssAttr, value } = action
            state.cols[id].style[cssAttr] = value
            return state
            break

        default:
            return state
    }
}