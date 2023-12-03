import axios from 'axios';

export const fetchAnimeStart = () => ({
    type: 'FETCH_ANIME_START',
});

export const fetchAnimeSuccess = (data) => ({
    type: 'FETCH_ANIME_SUCCESS',
    payload: data,
});

export const fetchAnimeDetailSuccess = (data) => ({
    type: 'FETCH_ANIME_DETAIL_SUCCESS',
    payload: data,
});

export const fetchAnimeError = () => ({
    type: 'FETCH_ANIME_ERROR',
});

export const fetchAnimeList = (filter, search='') => async (dispatch) => {
    dispatch(fetchAnimeStart());
    try {
        const baseUrl = "https://api.jikan.moe/v4"

        let apiUrl;

        switch (filter) {
            case 'popular':
                apiUrl = `${baseUrl}/top/anime?filter=bypopularity`;
                break;
            case 'search':
                // Modify the URL and add logic for search
                apiUrl = `${baseUrl}/anime?q=${search}&order_by=popularity&sort=asc`;
                break;
            case 'upcoming':
                apiUrl = `${baseUrl}/top/anime?filter=upcoming`;
                break;
            case 'airing':
                apiUrl = `${baseUrl}/top/anime?filter=airing`;
                break;
            case 'top':
                apiUrl = `${baseUrl}/top/anime`;
                break;
        }

        const response = await axios.get(apiUrl);
        dispatch(fetchAnimeSuccess(response.data.data));
        console.log("data",response.data)

    } catch (error) {
        console.error('Error fetching anime list:', error);
        dispatch(fetchAnimeError());
    }
};


export const fetchAnimeDetail = (id) => async (dispatch) => {
    dispatch(fetchAnimeStart());
    try {
        const baseUrl = "https://api.jikan.moe/v4"

        const response = await axios.get(`${baseUrl}/anime/${id}/full`);
        const response2 = await axios.get(`${baseUrl}/anime/${id}/characters`);
        response.data.data.characters = [...response2.data.data];
        console.log("animedetail",response.data.data);
        dispatch(fetchAnimeDetailSuccess(response.data.data));

    } catch (error) {
        console.error('Error fetching anime list:', error);
        dispatch(fetchAnimeError());
    }
};

