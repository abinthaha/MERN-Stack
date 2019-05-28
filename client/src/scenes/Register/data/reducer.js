const initialState = {
    count: 0
}
export default function registerReducer(state=initialState, action) {
    switch (action.type) {
        case 'CHANGE':
            return {
                count: state.count + 1
            }
        default:
            return state
    }
}