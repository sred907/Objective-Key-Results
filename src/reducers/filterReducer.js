import { SET_DATA, SET_FILTERS } from "../actions/actionsTypes";

const initState = {
    data: [],
    filtersApplied: [],
    filteredData: []
}

const filterReducer= (state = initState, action)=>{

    if (action.type === SET_DATA) {
        return {
            ...state,
            data: action.data,
            filteredData: action.data
        };
    }

    if (action.type === SET_FILTERS) {
        let newfiltersApplied = action.filtersApplied.slice(0);
        let newfilteredData;
        if (!newfiltersApplied.length || newfiltersApplied[0] === "All") {
            newfilteredData = [...state.data];
        } else {
            newfilteredData = state.data.filter((item) => {
                return (newfiltersApplied.indexOf(item.data.category) !== -1);
            });
        }
        return {
            ...state,
            filtersApplied: newfiltersApplied,
            filteredData: newfilteredData
        };
    }

    return state;
}

export default filterReducer;
