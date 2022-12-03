import { FC, useState } from "react";
import styled from "styled-components";

import { Card, MainContainer } from "components/Main";

const TitleContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 50px;
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
  align-items: flex-end;
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
  margin-top: 30px;
`;

const FormInput = styled.input<{ isError?: boolean }>`
  width: 100%;
  padding: 5px;
  border: none;
  border-bottom: 2px solid ${props => (props.isError ? "#F00000" : "#000000")};
  background-color: #ffffff;
  outline: none;
  font-size: 12px;
  letter-spacing: 1.5px;
  resize: none;

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
  align-items: center;
  gap: 10px;
  margin: 30px 0;
`;

const FormCheckbox = styled.input`
  width: 30px;
  height: 30px;
`;

const FormCheckboxLabel = styled.label`
  text-align: left;
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 165%;
  color: #000000;
`;

const FormAlert = styled.span`
  text-align: right;
  font-family: "Inter";
  font-style: italic;
  font-weight: 300;
  font-size: 14px;
  color: #ff0000;
`;

export const FormPage: FC = () => {
  const [inputNumber, setInputNumber] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isNumberValid, setIsNumberValid] = useState(true);
  const [isCheckboxError, setIsCheckboxError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const checkNumber = () =>
    inputNumber.match(/^\(?([0-9]{3})\)?[- ]?([0-9]{3})[- ]?([0-9]{3})$/)
      ? true
      : false;

  const checkEmail = () =>
    inputEmail.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
      ? true
      : false;

  const onFormSubmit = (
    event: React.ChangeEvent<HTMLFormElement>
  ): React.FormEventHandler<HTMLFormElement> | void => {
    event.preventDefault();
    setIsEmailValid(checkEmail());
    setIsNumberValid(checkNumber());
    setIsCheckboxError(!isCheckboxChecked);
    // setIsFormValid(isEmailValid && isNumberValid && !isCheckboxError);
  };

  return (
    <MainContainer>
      <Card>
        <TitleContainer>
          <Title>FORMULARZ REJESTRACYJNY</Title>
          <TitleBox />
        </TitleContainer>
        <Form onSubmit={onFormSubmit}>
          <FormLabel htmlFor="login">Login:</FormLabel>
          <FormInput type="text" name="login" id="login" required />
          <FormLabel htmlFor="password">Hasło:</FormLabel>
          <FormInput type="text" name="password" id="password" required />
          <FormLabel htmlFor="e-mail">E-mail:</FormLabel>
          <FormInput
            type="text"
            name="e-mail"
            id="e-mail"
            onChange={event => setInputEmail(event.target.value)}
            value={inputEmail}
            isError={!isEmailValid}
          />
          {!isEmailValid && (
            <FormAlert>Nieprawidłowy format adresu e-mail</FormAlert>
          )}
          <FormLabel htmlFor="phone-number">Numer telefonu:</FormLabel>
          <FormInput
            type="tel"
            name="phone-number"
            id="phone-number"
            onChange={event => setInputNumber(event.target.value)}
            value={inputNumber}
            isError={!isNumberValid}
          />
          {!isNumberValid && (
            <FormAlert>Nieprawidłowy numer telefonu</FormAlert>
          )}
          <AgreementContainer>
            <FormCheckbox
              type="checkbox"
              id="agree"
              onChange={event => setIsCheckboxChecked(event.target.checked)}
            />
            <FormCheckboxLabel htmlFor="agree">
              Akceptuję regulamin
            </FormCheckboxLabel>
            {isCheckboxError && (
              <FormAlert>Wymagana akceptacja regulaminu</FormAlert>
            )}
          </AgreementContainer>
          <FormButton type="submit" value="zapisz" />
        </Form>
      </Card>
    </MainContainer>
  );
};
