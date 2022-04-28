import React from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import HTMLView from 'react-native-htmlview';
import { Ionicons } from '@expo/vector-icons';
import { replaceDash } from '../helper/HtmlHelper';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import moment from 'moment';
import 'moment/locale/de';

moment.locale('de');

const NewsDetail = (props) => {
  const closeScreen = () => {
    props.navigation.goBack();
  };

  const data = props.route.params;

  const date = new Date(data.date);

  const content = data.content.rendered;

  // .replace(new RegExp('<p>', 'g'), '<span>')
  // .replace(new RegExp('</p>', 'g'), '</span>');

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
            source={{ uri: data.featured_image_large_url }}
            style={{ width: window.width, height: 450 }}
          />
        </View>
      )}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{replaceDash(data.title.rendered)}</Text>
        <Text style={styles.date}>{moment(date).format('Do MMMM YYYY')}</Text>
        <HTMLView value={content} stylesheet={htmlStyles} />
      </View>
    </ParallaxScrollView>
  );
};

export default NewsDetail;

const STICKY_HEADER_HEIGHT = 50;

const styles = StyleSheet.create({
  title: {
    // fontFamily: 'Inter-Regular',
    fontSize: 24,
  },
  date: {
    fontSize: 13,
    marginTop: 5,
    marginBottom: 20,
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
  content: {
    padding: 20,
  },
  text: {
    fontSize: 16,
  },
  close: {
    color: 'white',
  },
});

const htmlStyles = StyleSheet.create({
  p: {
    // fontFamily: 'Inter-Regular',
    fontSize: 18,
  },
  a: {
    color: '#ff0000',
  },
});

module.exports = NewsDetail;
