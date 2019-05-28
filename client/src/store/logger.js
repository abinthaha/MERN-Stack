function logger({
    getState
}) {
    return next => action => {
        const returnValue = next(action)
        console.log(getState())
        return returnValue
    }
}

export default logger;