import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Game } from '../components/game';
import { useSelector } from 'react-redux';

const GamesScreen = () => {
  const games = useSelector((state) => state.games);

  return (
    <ScrollView style={styles.view}>
      <View style={styles.container}>
        {games.data && games.data.length ? (
          <>
            {games.data.map((game, index) => (
              <Game key={index} game={game} />
            ))}
          </>
        ) : (
          <Text style={{ padding: 20 }}>
            Momentan stehen keine Daten zur Verfügung.
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 0,
    backgroundColor: '#fff',
  },
  container: {
    flex: 10,
  },
});

export default GamesScreen;
