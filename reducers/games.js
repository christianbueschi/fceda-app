
const initialState = { isLoading: false, isError: false, data: [] };

export const games = (state = initialState, action) => {
	switch (action.type) {
		case 'GAMES_IS_LOADING':
			return {...state, isLoading: true};
		case 'GAMES_GET':
			return {...state, isLoading: false, data: action.data};
		case 'GET_GAME':
			return {...state, isLoading: false, isError: true};
		case 'GAMES_ERROR':
			return {...state, isLoading: false, isError: true};
		default:
			return state;
	}
};

export const game = (state = initialState, action) => {
	switch (action.type) {
		case 'GAME_IS_LOADING':
			return {...state, isLoading: true};
		case 'GAME_GET':
			return {...state, isLoading: false, data: action.data};
		case 'GAME_ERROR':
			return {...state, isLoading: false, isError: true};
		default:
			return state;
	}
};