import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Navigation } from 'react-native-navigation';

const width = Dimensions.get('window').width;

const TeamsScreen = ({ navigation }) => {
  const [team, setTeam] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    const data = await fetch(
      'http://www.fceda.ch/wp-json/wp/v2/team_member?per_page=30'
    );
    const json = await data.json();

    setTeam(json);
    setIsLoading(false);
  };

  const renderRow = (item, index) => {
    let number = item.acf.number;
    if (number === 'variabel') number = '';
    if (number === 'tbd') number = '';

    return (
      <View
        style={[
          styles.item,
          { paddingRight: index % 2 === 0 ? 2.5 : 0 },
          { paddingLeft: index % 2 === 1 ? 2.5 : 0 },
        ]}
      >
        <TouchableHighlight
          onPress={() => navigation.navigate('TeamDetailScreen', item)}
        >
          <View>
            <Image source={{ uri: item.acf.image.url }} style={styles.image} />
            <View style={styles.titleContainer}>
              <Text style={styles.number}>{number}</Text>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>
                {item.title.rendered}
              </Text>
              <Text style={styles.position}>{item.acf.position}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  };

  return (
    <>
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 24 }} />
      ) : (
        <FlatList
          data={team}
          renderItem={({ item, index }) => renderRow(item, index)}
          contentContainerStyle={styles.container}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: width / 2,
    height: 200,
    marginBottom: 5,
  },
  image: {
    height: 200,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 10,
  },
  title: {
    // fontFamily: 'Inter-Regular',
    fontSize: 15,
    marginLeft: 35,
  },
  number: {
    // fontFamily: 'Inter-Regular',
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 24,
    color: 'red',
    width: 40,
  },
  position: {
    // fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginLeft: 35,
  },
});

export default TeamsScreen;
