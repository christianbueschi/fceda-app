import React from 'react';
import styled from 'styled-components/native';
import Team from '../components/team';

const LivetickerResult = (props) => {
  const { liveticker } = props;

  const dateNow = new Date();

  let timeOfGame = new Date();
  timeOfGame.setHours(liveticker.hours);
  timeOfGame.setMinutes(liveticker.minutes);

  const isGameOn = dateNow > timeOfGame;

  return (
    <Header>
      <Headline>{isGameOn ? 'LIVE!' : 'Heute'}</Headline>
      <TitleContainer>
        <Title>
          <Team name={liveticker.homeTeam} />
        </Title>
        <ResultContainer>
          <Result>{liveticker.result ? liveticker.result : '0:0'}</Result>
        </ResultContainer>
        <Title>
          <Team name={liveticker.guestTeam} />
        </Title>
      </TitleContainer>
      {liveticker.hours && !isGameOn && (
        <Subtitle>
          {liveticker.hours}:{liveticker.minutes} Uhr, {liveticker.location}
        </Subtitle>
      )}
      {liveticker.hours && isGameOn && (
        <Subtitle>{liveticker.location}</Subtitle>
      )}
    </Header>
  );
};

export default LivetickerResult;

const TitleContainer = styled.View`
  flex: 1;
  flex-direction: row;
  padding-top: 20px;
  padding-bottom: 30px;
`;

const Header = styled.View`
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-color: #cbcbcb;
  height: 140px;
  background-color: #fff;
`;

const Title = styled.View`
  flex: 10;
  justify-content: center;
  align-items: center;
`;

const ResultContainer = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
`;

const Result = styled.Text`
  /* font-family: Inter-Regular; */
  font-size: 24;
`;

const Subtitle = styled.Text`
  /* font-family: Inter-Regular; */
  font-size: 16;
  text-align: center;
`;

const Headline = styled.Text`
  /* font-family: Inter-Regular; */
  font-size: 14;
  text-align: center;
  color: red;
`;
