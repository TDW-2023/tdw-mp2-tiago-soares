const initialState = {
    animeList: [],
    loading: false,
    animeDetails: [],
};

const animeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_ANIME_START':
            return {
                ...state,
                loading: true,
            };
        case 'FETCH_ANIME_SUCCESS':
            return {
                ...state,
                animeList: action.payload,
                loading: false,
            };
        case 'FETCH_ANIME_ERROR':
            return {
                ...state,
                loading: false,
            };
        case 'FETCH_ANIME_DETAIL_SUCCESS':
            return {
                ...state,
                animeDetails: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default animeReducer;
