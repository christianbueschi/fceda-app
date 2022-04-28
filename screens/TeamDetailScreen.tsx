import React from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

const TeamDetailScreen = (props) => {
  const item = props.route.params;

  const closeScreen = () => {
    props.navigation.goBack();
  };

  return (
    <ParallaxScrollView
      backgroundColor='rgba(0,0,0,0.5)'
      contentBackgroundColor='white'
      parallaxHeaderHeight={450}
      stickyHeaderHeight={STICKY_HEADER_HEIGHT}
      renderStickyHeader={() => (
        <View key='sticky-header' style={styles.stickySection} />
      )}
      renderFixedHeader={() => (
        <View key='fixed-header' style={styles.fixedSection}>
          <Ionicons
            name='close-outline'
            size={42}
            style={styles.close}
            onPress={closeScreen}
          />
        </View>
      )}
      renderBackground={() => (
        <View key='background'>
          <Image
            source={{ uri: item.acf.image.url }}
            style={{ width: window.width, height: 450 }}
          />
        </View>
      )}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{item.title.rendered}</Text>
        <Text style={styles.position}>{item.acf.position}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.left}>Nummer</Text>
        <Text style={styles.right}>{item.acf.number}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.left}>Geburtsdatum</Text>
        <Text style={styles.right}>{item.acf.birthday}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.left}>Nationalität</Text>
        <Text style={styles.right}>{item.acf.nationalitaet}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.left}>Beim FC EDA seit</Text>
        <Text style={styles.right}>{item.acf.in_club_since}</Text>
      </View>
    </ParallaxScrollView>
  );
};

const STICKY_HEADER_HEIGHT = 50;

const styles = StyleSheet.create({
  title: {
    // fontFamily: 'Inter-Regular',
    fontSize: 24,
    marginTop: 12,
  },
  position: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 30,
    color: '#666',
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    width: window.width,
    justifyContent: 'flex-end',
  },
  fixedSection: {
    position: 'absolute',
    bottom: 0,
    right: 5,
  },
  close: {
    color: 'white',
  },
  content: {
    paddingLeft: 20,
    paddingBottom: 12,
  },
  left: {
    // fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  right: {
    // fontFamily: 'Inter-Regular',
    fontSize: 20,
  },
});

export default TeamDetailScreen;
