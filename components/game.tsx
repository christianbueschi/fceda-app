import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Team from './team';

export const Game = ({ game, small }) => {
  const cleanText = (text) => {
    return text.replace('(SFS S-A)', '');
  };

  return (
    <View style={[styles.row, small && styles.rowSmall]}>
      <Text style={[styles.type, small && styles.typeSmall]}>
        {small && 'Nächstes Spiel: '} {game.type}
      </Text>
      <View style={[styles.header, small && styles.headerSmall]}>
        <Team name={cleanText(game.team1)} small={small} />
        <View style={styles.dateWrapper}>
          <Text style={[styles.date, small && styles.dateSmall]}>
            {game.time} Uhr
          </Text>
          <Text style={[styles.date, small && styles.dateSmall]}>
            {game.date}
          </Text>
        </View>
        <Team name={cleanText(game.team2)} small={small} />
      </View>
      <Text style={[styles.location, small && styles.locationSmall]}>
        {game.location}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    borderBottomWidth: 1,
    borderBottomColor: '#CBCBCB',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  rowSmall: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  header: {
    marginBottom: 10,
    paddingBottom: 5,
    flexDirection: 'row',
  },
  headerSmall: {
    marginBottom: 0,
  },
  dateWrapper: {
    flex: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    // fontFamily: 'Inter-Regular',
    fontSize: 17,
  },
  dateSmall: {
    fontSize: 12,
  },
  icon: {
    marginLeft: 10,
    marginRight: 5,
  },
  type: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
  },
  typeSmall: {
    marginBottom: 5,
  },
  location: {
    // fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginTop: 10,
    marginLeft: 20,
    textAlign: 'center',
  },
  locationSmall: {
    marginTop: 0,
  },
});
