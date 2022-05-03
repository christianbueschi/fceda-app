export const getGames = () => {
  return (dispatch) => {
    dispatch(gamesFetchDataIsLoading());

    return fetch(
      'https://us-central1-fc-eda-liveticker.cloudfunctions.net/getGames'
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        dispatch(gamesFetchDataSuccess(json));
        if (json.length > 0) dispatch(nextGameFetchDataSucces(json));
      })
      .catch((err) => {
        dispatch(gamesFetchDataError());
      });
  };
};

const gamesFetchDataIsLoading = () => {
  return {
    type: 'GAMES_IS_LOADING',
  };
};

const gamesFetchDataSuccess = (data) => {
  return {
    type: 'GAMES_GET',
    data,
  };
};

const gamesFetchDataError = () => {
  return {
    type: 'GAMES_ERROR',
  };
};

const nextGameFetchDataSucces = (data) => {
  var nextGame = data[0];

  return {
    type: 'GAME_GET',
    data: nextGame,
  };
};
