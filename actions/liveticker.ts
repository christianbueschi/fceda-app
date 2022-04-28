import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  query,
  onValue,
  orderByChild,
  limitToLast,
} from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyC8D_yanWP--bmfu9KYSw5ZU3rT9Dg-FZA',
  authDomain: 'fc-eda-liveticker.firebaseapp.com',
  databaseURL: 'https://fc-eda-liveticker.firebaseio.com',
  projectId: 'fc-eda-liveticker',
  storageBucket: 'fc-eda-liveticker.appspot.com',
  messagingSenderId: '486296464414',
};

initializeApp(firebaseConfig);

const newDate = new Date();
const today = newDate.setHours(0, 0, 0, 0);

// async action creator
export const getLiveticker = () => {
  return (dispatch) => {
    const db = getDatabase();

    const refQuery = query(
      ref(db, 'liveticker'),
      orderByChild('start'),
      limitToLast(1)
    );

    return onValue(refQuery, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().date >= today) {
          dispatch(livetickerFetchDataSuccess(childSnapshot));
        }
      });
    });
  };
};

// regular action creator
const livetickerFetchDataSuccess = (snapshot) => {
  const data = { ...snapshot.val(), key: snapshot.key };

  return {
    type: 'LIVETICKER_GET',
    data,
  };
};
