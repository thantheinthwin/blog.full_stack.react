export const actionType = {
    SET_USER: "SET_USER",
    SET_ALL_POST: "SET_ALL_POST"
}

const reducer = (state, action) => {
    switch(action.type){
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user,
            }
        
        case actionType.SET_ALL_POST:
            return {
                ...state,
                allPosts: action.allPosts
            }
        
        default:
            return state;
    }
}

export default reducer;