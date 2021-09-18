import { SET_DATA, SET_FILTERS } from './actionsTypes';

//add data
export const setData= (data)=>{
    return{
        type: SET_DATA,
        data
    }
}
//set filters
export const setFilters = (filtersApplied) => {
    return {
        type: SET_FILTERS,
        filtersApplied
    }
}
