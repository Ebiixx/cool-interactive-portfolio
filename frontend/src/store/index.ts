import { createStore } from 'redux';
import { combineReducers } from 'redux';

// Example reducer for managing user state
const userReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
};

// Example reducer for managing projects state
const projectsReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_PROJECT':
            return [...state, action.payload];
        case 'REMOVE_PROJECT':
            return state.filter(project => project.id !== action.payload.id);
        default:
            return state;
    }
};

// Combine reducers
const rootReducer = combineReducers({
    user: userReducer,
    projects: projectsReducer,
});

// Create store
const store = createStore(rootReducer);

export default store;