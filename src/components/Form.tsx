import { FC } from "react";
import styled from "styled-components";

import { Card, MainContainer } from "components/Main";

const TitleContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 50px 0;
`;

const Title = styled.span`
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  line-height: 165%;
  letter-spacing: 0.15em;
  color: #000000;
  padding: 10px 0;
`;

const TitleBox = styled.div`
  width: 166.17px;
  height: 9.29px;
  background: #071594;
`;

const Form = styled.form`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormLabel = styled.label`
  width: 100%;
  text-align: left;
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 165%;
  color: #000000;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 5px;
  border: none;
  border-bottom: 2px solid #000000;
  background-color: #ffffff;
  outline: none;
  font-size: 12px;
  letter-spacing: 1.5px;
  resize: none;
  margin-bottom: 30px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 120%;
  color: #000000;
`;

const FormButton = styled.input`
  width: 224.3px;
  height: 54.88px;

  background: #071594;
  box-shadow: 10px 4px 4px rgba(0, 0, 0, 0.75);
  border-radius: 20px;

  font-family: "Lato";
  font-style: italic;
  font-weight: 400;
  font-size: 30px;
  line-height: 100%;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
`;

const AgreementContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 30px;
`;

const FormCheckbox = styled.input`
  width: 30px;
  height: 30px;
`;

export const FormPage: FC = () => {
  return (
    <MainContainer>
      <Card>
        <TitleContainer>
          <Title>FORMULARZ REJESTRACYJNY</Title>
          <TitleBox />
        </TitleContainer>
        <Form onSubmit={() => console.log("ELO")}>
          <FormLabel htmlFor="login">Login:</FormLabel>
          <FormInput type="text" name="login" id="login" required />
          <FormLabel htmlFor="password">Hasło:</FormLabel>
          <FormInput type="text" name="password" id="password" required />
          <FormLabel htmlFor="e-mail">E-mail:</FormLabel>
          <FormInput type="email" name="e-mail" id="e-mail" required />
          <FormLabel htmlFor="phone-number">Numer telefonu:</FormLabel>
          <FormInput
            type="tel"
            name="phone-number"
            id="phone-number"
            required
          />
          <AgreementContainer>
            <FormCheckbox type="checkbox" id="agree" />
            <FormLabel htmlFor="agree">Akceptuję regulamin</FormLabel>
          </AgreementContainer>
          <FormButton type="submit" value="zapisz" />
        </Form>
      </Card>
    </MainContainer>
  );
};
