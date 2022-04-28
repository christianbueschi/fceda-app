export const liveticker = (state = {}, action) => {
	switch (action.type) {
		case 'LIVETICKER_GET':
			return action.data;
		default:
			return state;
	}
};