import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import icon from "assets/Icon.svg";
import tick from "assets/Tick.svg";

export const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  width: 100vh;
  height: 100vh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardTopContent = styled.div`
  width: 96%;
  height: 15%;
  display: flex;
  justify-content: space-between;
  padding: 2%;
`;
const NameLabel = styled.span`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 100%;
  color: #000000;
`;

const FormButton = styled.button`
  width: 236px;
  height: 90px;
  background: #40483a;
  box-shadow: 10px 4px 4px rgba(0, 0, 0, 0.75);
  border-radius: 20px;
  font-family: "Lato";
  font-style: italic;
  font-weight: 400;
  font-size: 30px;
  line-height: 100%;
  color: #ffffff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const CardMainContent = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Profile = styled.div`
  margin-bottom: 50px;
  width: 500px;
  height: 450px;
  background: #917878;
  border-radius: 500px 60px 300px 100px;
  backdrop-filter: blur(280px);
  filter: drop-shadow(12px 4px 4px rgba(0, 0, 0, 0.6));
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type ProfileImageProps = {
  url: string;
};

const ProfileImage = styled.div<ProfileImageProps>`
  margin-top: 100px;
  width: 300px;
  height: 200px;
  background-image: url(${props => props.url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 200px 20px 100px 50px;
`;

const ProfileDetails = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  width: 60%;
`;

const ProfileDetailsSide = styled.div`
  display: flex;
  width: 10%;
  justify-content: center;
`;

const ProfileDetailsCenter = styled.div`
  display: flex;
  width: 90%;
  justify-content: center;
`;

const ProfileName = styled.span`
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-size: 30px;
  line-height: 61px;
  text-align: center;

  color: #000000;
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
  margin: 5px;
`;

const ProfileText = styled.span`
  width: 50%;
  font-family: "Inter";
  font-style: italic;
  font-weight: 100;
  font-size: 20px;
  line-height: 24px;
  text-align: left;
  color: #000000;
`;

const NextButton = styled.button`
  background: #35660e;
  box-shadow: 10px 4px 4px rgba(0, 0, 0, 0.75);
  border-radius: 20px;
  font-family: "Lato";
  font-style: italic;
  font-weight: 400;
  font-size: 30px;
  line-height: 100%;
  color: #ffffff;
  padding: 20px;
  cursor: pointer;
`;

const spin = keyframes`
    0% { 
        transform: rotate(0deg); 
    }
    100% { 
        transform: rotate(360deg); 
    }
`;

export const Spinner = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${spin} 2s linear infinite;
`;

export const Main: FC = () => {
  interface characterDataType {
    name: string;
    birth_year: string;
    eye_color: string;
    gender: string;
    hair_color: string;
    height: string;
    mass: string;
    skin_color: string;
    homeworld: string;
    films: [];
    species: [];
    starships: [];
    vehicles: [];
    url: string;
    created: string;
    edited: string;
  }

  const [characterId, setCharacterId] = useState(1);
  const [characterData, setCharacterData] = useState<characterDataType | null>(
    null
  );
  const [image, setImage] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `https://swapi.py4e.com/api/people/${characterId}/`
      );
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      const data = await response.json();

      setCharacterData(data);
    };
    getData();
    const rand = Math.random() * 10000;
    setImage(`https://picsum.photos/534/383?${rand}`);
  }, [characterId]);

  const onNextButtonClick = () => {
    if (characterId === 83) setCharacterId(1);
    else if (characterId === 16) setCharacterId(18);
    else setCharacterId(characterId + 1);
  };

  return (
    <MainContainer>
      {!characterData ? (
        <Spinner />
      ) : (
        <Card>
          <CardTopContent>
            <NameLabel>Filip Obracaj</NameLabel>
            <Link to="form">
              <FormButton>formularz rejestracyjny</FormButton>
            </Link>
          </CardTopContent>
          <CardMainContent>
            <Profile>
              <ProfileImage url={image} />
              <ProfileDetails>
                <ProfileDetailsCenter>
                  <ProfileName>{characterData.name}</ProfileName>
                </ProfileDetailsCenter>
                <ProfileDetailsSide>
                  <Icon src={icon} />
                  <Icon src={tick} />
                </ProfileDetailsSide>
              </ProfileDetails>
              <ProfileText>Birth year: {characterData.birth_year}</ProfileText>
              <ProfileText>Eye color: {characterData.eye_color}</ProfileText>
            </Profile>
            <NextButton onClick={onNextButtonClick}>next profiles</NextButton>
          </CardMainContent>
        </Card>
      )}
    </MainContainer>
  );
};
