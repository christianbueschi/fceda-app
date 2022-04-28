
const initialState = { isLoading: false, isError: false, data: [] };

export const news = (state = initialState, action) => {
	switch (action.type) {
		case 'NEWS_IS_LOADING':
			return {...state, isLoading: true};
		case 'NEWS_GET':
			return {...state, isLoading: false, data: action.data};
		case 'NEWS_ERROR':
			return {...state, isLoading: false, isError: true};
		default:
			return state;
	}
};