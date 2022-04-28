import React, { Component, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const TableScreen = () => {
  const [content, setContent] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    const data = await fetch(
      'https://0ndywq9292.execute-api.eu-central-1.amazonaws.com/prod/aws-nodejs-dev-getTable'
    );

    const json = await data.json();
    if (!json?.selection1) {
      setIsLoading(false);
      return;
    }

    const chunkSize = 12;
    const formattedData = [];

    for (let i = 0; i < json?.selection1.length; i += chunkSize) {
      const chunk = json?.selection1.slice(i, i + chunkSize);
      formattedData.push(chunk);
    }

    setContent(formattedData);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const renderRows = (data) => {
    if (!data || !data.length > 0) {
      return (
        <Text style={{ padding: 10 }}>
          Momentan stehen keine Daten zur Verfügung.
        </Text>
      );
    }

    return data.map((cell, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.rank}>{cell[0].name}</Text>
          <Text
            style={myTeam(cell[1].name)}
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            {cell[1].name}
          </Text>
          <Text style={styles.games}>{cell[2].name}</Text>
          <Text style={styles.win}>{cell[3].name}</Text>
          <Text style={styles.draw}>{cell[4].name}</Text>
          <Text style={styles.defeat}>{cell[5].name}</Text>
          <Text style={styles.penalty}>{cell[6].name}</Text>
          <Text style={styles.shoot}>{cell[7].name}</Text>
          <Text style={styles.separator}>:</Text>
          <Text style={styles.received}>{cell[9].name}</Text>
          <Text style={styles.points}>{cell[10].name}</Text>
        </View>
      );
    });
  };

  return (
    <ScrollView style={styles.view}>
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 24 }} />
      ) : (
        <View style={styles.container}>{renderRows(content)}</View>
      )}
    </ScrollView>
  );
};

const myTeam = (team) => {
  if (team === 'FC EDA') {
    return {
      flex: 4,
      color: 'red',
    };
  } else {
    return {
      flex: 4,
    };
  }
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
  },
  container: {
    padding: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 5,
  },
  rank: {
    flex: 1,
  },
  games: {
    flex: 1,
  },
  win: {
    flex: 1,
  },
  draw: {
    flex: 1,
  },
  defeat: {
    flex: 1,
  },
  penalty: {},
  shoot: {
    flex: 1,
    textAlign: 'right',
  },
  received: {
    flex: 1,
    textAlign: 'left',
  },
  points: {
    flex: 1,
  },
  separator: {
    flex: 0.5,
    textAlign: 'center',
  },
});

export default TableScreen;
