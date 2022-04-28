import React, { useEffect, useState } from 'react';
import {
  Text,
  FlatList,
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { replaceDash } from '../helper/HtmlHelper';
import moment from 'moment';
import 'moment/locale/de';

import LivetickerResult from '../components/livetickerResult';

import { Game } from '../components/game';
import { useDispatch, useSelector } from 'react-redux';
import { getGames } from '../actions/games';

moment.locale('de');

const NewsScreen = (props) => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [endOfList, setEndOfList] = useState(false);

  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGames());
  }, []);

  const game = useSelector((state) => state.game);

  const fetchNews = async () => {
    if (endOfList) return;

    setIsLoading(true);
    const data = await fetch(
      `http://www.fceda.ch/wp-json/wp/v2/posts?per_page=${
        page * 25
      }&page=${page}`
    );
    const json = await data.json();

    setIsLoading(false);

    if (!json.length) {
      setEndOfList(true);
      return;
    }

    setNews([...news, ...json]);

    setPage(page + 1);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const showDetail = (data) => {
    props.navigation.navigate('NewsDetail', data);
  };

  const renderRow = (item, index) => {
    let date = new Date(item.date);
    let displayName = replaceDash(item.title.rendered);
    let stylesImage = index == 0 ? styles.imageFirst : styles.image;
    let stylesTitle = index == 0 ? styles.titleFirst : styles.title;
    return (
      <TouchableHighlight onPress={() => showDetail(item)} style={styles.item}>
        <View>
          <Image
            source={{ uri: item.featured_image_large_url }}
            style={stylesImage}
          />
          <View style={styles.titleContainer}>
            <Text style={stylesTitle}>{displayName}</Text>
            <Text style={styles.date}>
              {moment(date).format('Do MMMM YYYY')}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  const renderFooter = () => {
    if (!isLoading) return null;
    return <ActivityIndicator style={styles.loading} />;
  };

  const liveticker = useSelector((state) => state.liveticker);

  return (
    <View style={styles.container}>
      {liveticker && liveticker.homeTeam && (
        <LivetickerResult liveticker={liveticker} />
      )}

      {game && game.data.team1 && !liveticker?.homeTeam && (
        <Game game={game.data} small />
      )}
      <FlatList
        data={news}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => renderRow(item, index)}
        ListFooterComponent={renderFooter}
        onEndReached={fetchNews}
        onEndReachedThreshold={0.4}
      />
    </View>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({
  item: {
    position: 'relative',
    marginBottom: 5,
  },
  image: {
    height: 200,
  },
  imageFirst: {
    height: 250,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(51, 51, 51, 0.45)',
    padding: 10,
  },
  title: {
    // fontFamily: 'Inter-Regular',
    fontSize: 20,
    color: 'white',
  },
  titleFirst: {
    // fontFamily: 'Inter-Regular',
    fontSize: 24,
    color: 'white',
  },
  date: {
    fontSize: 11,
    marginTop: 5,
    color: '#c3c3c3',
  },
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
    justifyContent: 'center',
  },
  error: {
    position: 'absolute',
    backgroundColor: 'red',
    padding: 20,
    top: 0,
    width: Dimensions.get('window').width,
  },
  errorText: {
    textAlign: 'center',
    color: 'white',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#ff0000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  loading: {
    marginVertical: 20,
  },
});
