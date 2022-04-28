import React, { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { getLiveticker } from '../actions/liveticker';
import LivetickerResult from '../components/livetickerResult';

const StyledScrollView = styled.ScrollView`
  flex: 1;
  padding: 10px;
`;

const StyledImage = styled.Image`
  flex: 1;
  height: 150px;
`;

const StyledView = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Feed = styled.View`
  flex: 1;
`;

const FeedItem = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 20px;
`;

const Minute = styled.Text`
  /* font-family: Inter-Regular; */
  font-size: 20;
  flex: 2;
`;

const MessageView = styled.View`
  flex: 10;
`;

const Message = styled.Text`
  /* font-family: Inter-Regular; */
  font-size: 16;
`;

const LiveTickerScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLiveticker());
  }, []);

  const liveticker = useSelector((state) => state.liveticker);

  let messages = [];
  for (var prop in liveticker.messages) {
    if (liveticker.messages.hasOwnProperty(prop)) {
      let item = liveticker.messages[prop];
      item.key = prop;
      messages.push(item);
    }
  }
  messages.sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <StyledView>
      {liveticker.homeTeam && <LivetickerResult liveticker={liveticker} />}
      <StyledScrollView>
        {
          <Feed>
            {messages &&
              messages.map((item, index) => {
                return (
                  <View key={index}>
                    <FeedItem>
                      <Minute>{item.minuteOfPlay}'</Minute>
                      <MessageView>
                        <Message>
                          {item.goalsHomeTeam &&
                            item.goalsGuestTeam &&
                            item.goalsHomeTeam +
                              ':' +
                              item.goalsGuestTeam +
                              ' '}
                          {item.message}
                        </Message>

                        {item.image && (
                          <StyledImage source={{ uri: item.image }} />
                        )}
                      </MessageView>
                    </FeedItem>
                  </View>
                );
              })}
          </Feed>
        }
        {!liveticker.homeTeam && (
          <Text>
            Kein Spiel im Liveticker? Besuch uns doch am Spielfeldrand oder
            schau später wieder rein. Wir freuen uns!{'\n\n'}Sportliche Grüsse -
            FC EDA
          </Text>
        )}
      </StyledScrollView>
    </StyledView>
  );
};

export default LiveTickerScreen;
