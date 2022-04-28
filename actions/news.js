// async action creator
export const getNews = () => {
  return (dispatch) => {
    dispatch(newsFetchDataIsLoading());

    return fetch('http://www.fceda.ch/wp-json/wp/v2/posts?per_page=25')
      .then((data) => {
        return data.json();
      })
      .then((jsonData) => {
        dispatch(newsFetchDataSuccess(jsonData));
      })
      .catch((error) => {
        dispatch(newsFetchDataError());
      });
  };
};

// regular action creator

const newsFetchDataIsLoading = () => {
  return {
    type: 'NEWS_IS_LOADING',
  };
};

const newsFetchDataSuccess = (data) => {
  return {
    type: 'NEWS_GET',
    data,
  };
};

const newsFetchDataError = () => {
  return {
    type: 'NEWS_ERROR',
  };
};
