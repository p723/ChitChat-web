import React from "react";
import styles from "./HomeTabs.module.css";
import ChatsTab from "../../screens/Tabs/ChatsTab/ChatsTab";
import StatusTab from "../../screens/Tabs/StatusTab/StatusTab";
import CallsTab from "../../screens/Tabs/CallsTab/CallsTab";
import styled from "styled-components";
import { useSelector } from "react-redux";
import FabButton from "../FabButton/FabButton";
import { useHistory } from "react-router-dom";

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
  transition: transform 0.3s ease 0s;
  transform: translateX(${(props) => props.goToSlide});
`;

const Slide = styled.div`
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  transition: transform 0.3s;
  transform: translateX(${(props) => props.defaultPosition});
`;

type Props = {
  viewState: string,
  // showChatScreen: Function,
};

const HomeTabs = ({ viewState }: Props) => {
  const history = useHistory();
  const { activeTab } = useSelector((state) => state.tab);
  function ShowAllUsers() {
    history.push("/Chats/Users");
  }

  let position;

  if (activeTab === 0) {
    position = "-0%";
  } else if (activeTab === 1) {
    position = "-100%";
  } else if (activeTab === 2) {
    position = "-200%";
  } else if (activeTab === 3) {
    position = "-300%";
  }
  return (
    <Carousel>
      <CarouselTrack goToSlide={position}>
        <Slide defaultPosition={"0%"}>Camera slide</Slide>
        <Slide defaultPosition={"100%"}>
          <ChatsTab />
          <FabButton onClick={ShowAllUsers} />
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
