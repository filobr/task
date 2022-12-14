import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import icon from "assets/Icon.svg";
import tick from "assets/Tick.svg";
import {
  flexDisplay,
  setButtonFont,
  setInterFont,
  setLatoFont,
  width,
} from "helpers/helpers";
import { starWarsDataType } from "App";

export const MainContainer = styled.div`
  ${flexDisplay("100vw", "100vh", "row")};
  background: #d9d9d9;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  ${flexDisplay("100vh", "100vh", "column")};
  background: #ffffff;
  align-items: center;
  ${width.tablet} {
    width: 100vw;
  } ;
`;

const CardTopContent = styled.div`
  ${flexDisplay("96%", "15%", "row")};
  justify-content: space-between;
  padding: 2%;
`;
const NameLabel = styled.span`
  ${setLatoFont(30)};
  ${width.mobile} {
    font-size: 20px;
  } ;
`;

const FormButton = styled.button`
  width: 236px;
  height: 90px;
  background: #40483a;
  box-shadow: 10px 4px 4px rgba(0, 0, 0, 0.75);
  border-radius: 20px;
  ${setButtonFont()};
  cursor: pointer;
  ${width.mobile} {
    width: 120px;
    height: 40px;
  } ;
`;

const CardMainContent = styled.div`
  ${flexDisplay("100%", "85%", "column")};
  align-items: center;
`;

const Profile = styled.div`
  ${flexDisplay("70%", "70%", "column")};
  margin-bottom: 50px;
  background: #917878;
  border-radius: 500px 60px 300px 100px;
  backdrop-filter: blur(280px);
  filter: drop-shadow(12px 4px 4px rgba(0, 0, 0, 0.6));
  align-items: center;
  ${width.tablet} {
    width: 70vw;
    height: 60vw;
  }
  ${width.mobile} {
    width: 70vw;
    height: 60vw;
  }
`;

type ProfileImageProps = {
  url: string;
};

const ProfileImage = styled.div<ProfileImageProps>`
  margin-top: 15%;
  width: 60%;
  height: 50%;
  background-image: url(${props => props.url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 200px 20px 100px 50px;
`;

const ProfileDetails = styled.div`
  margin-top: 20px;
  ${flexDisplay("60%", "auto", "row")};
  ${width.mobile} {
    margin-top: 5px;
  }
`;

const ProfileDetailsSide = styled.div`
  ${flexDisplay("10%", "auto", "row")};
  justify-content: center;
`;

const ProfileDetailsCenter = styled.div`
  ${flexDisplay("90%", "auto", "row")}
  justify-content: center;
`;

const ProfileName = styled.span`
  ${setInterFont(24)};
  line-height: 100%;
  letter-spacing: 0;
  ${width.mobile} {
    font-size: 16px;
    margin: 5px 0;
  }
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
  margin: 5px;
  ${width.tablet} {
    width: 20px;
    height: 20px;
    margin: 2px;
  }
  ${width.mobile} {
    width: 15px;
    height: 15px;
    margin: 1px;
  }
`;

const ProfileText = styled.span`
  width: 50%;
  ${setLatoFont(20)};
  ${width.mobile} {
    font-size: 12px;
  }
`;

const NextButton = styled.button`
  background: #35660e;
  box-shadow: 10px 4px 4px rgba(0, 0, 0, 0.75);
  border-radius: 20px;
  ${setButtonFont}
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

interface MainProps {
  handleNewStarWarsData: (param: starWarsDataType) => void;
}

export const Main: FC<MainProps> = ({ handleNewStarWarsData }) => {
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
    const fetchStarWarsData = async () => {
      try {
        const response = await fetch(
          `https://swapi.py4e.com/api/people/${characterId}/`
        );
        const data = await response.json();
        handleNewStarWarsData({
          name: data.name,
          vehicles: data.vehicles,
          created: data.created,
        });
        setCharacterData(data);
        const rand = Math.random() * 10000;
        setImage(`https://picsum.photos/534/383?${rand}`);
      } catch (error) {
        console.log("Something went wrong");
      }
    };
    fetchStarWarsData();
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
