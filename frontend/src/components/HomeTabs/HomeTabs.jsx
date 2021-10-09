import React from 'react'
import styles from './HomeTabs.module.css'
import ChatsTab from '../../screens/Tabs/ChatsTab/ChatsTab';
import StatusTab from '../../screens/Tabs/StatusTab/StatusTab';
import CallsTab from '../../screens/Tabs/CallsTab/CallsTab';
import styled from "styled-components";

const Carousel = styled.div`
  min-width: 200px;
  min-height: 850px;
  overflow-y: hidden;
  overflow-x: hidden;
  position: relative;
  padding: 0;
  background-color: #fafafa;
`;

const CarouselTrack = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 0;
  margin: 0;
  transition: transform 0.2s ease 0s;
  transform: translateX(${props => props.goToSlide});
`;

const Slide = styled.div`
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  transition: transform 0.2s;
  transform: translateX(${props => props.defaultPosition});
`;

type Props = {
  viewState: string,
  // showChatScreen: Function,
};

const HomeTabs = ({ viewState }: Props) => {
  let position;
  if (viewState === "1") {
    position = "-0%";
  } else if (viewState === "2") {
    position = "-100%";
  } else if (viewState === "3") {
    position = "-200%";
  } else if (viewState === "4") {
    position = "-300%";
  }
  return (
    <Carousel>
      <CarouselTrack goToSlide="-100%">
        <Slide defaultPosition={"0%"}>Camera slide</Slide>
        <Slide defaultPosition={"100%"}>
            <ChatsTab />
        </Slide>
        <Slide defaultPosition={"200%"}>
          <StatusTab />
        </Slide>
        <Slide defaultPosition={"300%"}>
          <CallsTab />
        </Slide>
      </CarouselTrack>
    </Carousel>
  );
};

export default HomeTabs;
