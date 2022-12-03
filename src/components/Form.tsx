import { FC, useState, useEffect } from "react";
import styled from "styled-components";

import { Card, MainContainer } from "components/Main";
import {
  flexDisplay,
  setButtonFont,
  setInterFont,
  setLatoFont,
} from "helpers/helpers";

const TitleContainer = styled.div`
  ${flexDisplay("70%", "auto", "column")}
  align-items: flex-end;
  margin-top: 50px;
`;

const Title = styled.span`
  ${setInterFont(20)};
  padding: 10px 0;
`;

const TitleBox = styled.div`
  width: 166.17px;
  height: 9.29px;
  background: #071594;
`;

const Form = styled.form`
  ${flexDisplay("70%", "auto", "column")}
  align-items: flex-end;
`;

const FormLabel = styled.label`
  width: 100%;
  text-align: left;
  margin-top: 30px;
  ${setInterFont(20)};
`;

const FormInput = styled.input<{ isError?: string }>`
  width: 100%;
  padding: 5px;
  border: none;
  border-bottom: 2px solid ${props => (props.isError ? "#FF0000" : "#000000")};
  background-color: #ffffff;
  outline: none;
  ${setLatoFont(16)};
`;

const FormButton = styled.input`
  width: 50%;
  height: 54.88px;
  background: #071594;
  box-shadow: 10px 4px 4px rgba(0, 0, 0, 0.75);
  border-radius: 20px;
  ${setButtonFont()};
  cursor: pointer;
  margin: 0 25%;
`;

const AgreementContainer = styled.div`
  ${flexDisplay("100%", "auto", "row")};
  align-items: center;
  gap: 10px;
  margin: 30px 0;
`;

const FormCheckbox = styled.input`
  width: 30px;
  height: 30px;
`;

const FormCheckboxLabel = styled.label`
  ${setInterFont(16)};
  text-align: left;
`;

const FormAlert = styled.span`
  ${setInterFont(12)};
  text-align: right;
  color: #ff0000;
`;

export const FormPage: FC = () => {
  const initialValues = { email: "", number: "", agree: false };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (
      !formErrors.number &&
      !formErrors.email &&
      !formErrors.agree &&
      isSubmit
    ) {
      console.log("mozna wysylac");
    }
  }, [formErrors]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): React.ChangeEventHandler<HTMLInputElement> | void => {
    const { name, value, checked } = event.target;
    setFormValues({
      ...formValues,
      [name]: name === "agree" ? checked : value,
    });
  };

  const validateForm = (values: {
    email: string;
    number: string;
    agree: boolean;
  }) => {
    const errors = { email: "", number: "", agree: false };

    if (
      !values.email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    )
      errors.email = "Nieprawidłowy format adresu e-mail";
    if (
      !values.number.match(/^\(?([0-9]{3})\)?[- ]?([0-9]{3})[- ]?([0-9]{3})$/)
    )
      errors.number = "Nieprawidłowy numer telefonu";
    if (!values.agree) errors.agree = true;

    return errors;
  };

  const onFormSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): React.FormEventHandler<HTMLFormElement> | void => {
    event.preventDefault();
    setFormErrors(validateForm(formValues));
    setIsSubmit(true);
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
          <FormLabel htmlFor="email">E-mail:</FormLabel>
          <FormInput
            type="text"
            name="email"
            id="email"
            onChange={handleChange}
            value={formValues.email}
            isError={formErrors.email}
          />
          {formErrors.email && (
            <FormAlert>Nieprawidłowy format adresu e-mail</FormAlert>
          )}
          <FormLabel htmlFor="number">Numer telefonu:</FormLabel>
          <FormInput
            type="tel"
            name="number"
            id="number"
            onChange={handleChange}
            value={formValues.number}
            isError={formErrors.number}
          />
          {formErrors.number && (
            <FormAlert>Nieprawidłowy numer telefonu</FormAlert>
          )}
          <AgreementContainer>
            <FormCheckbox
              type="checkbox"
              id="agree"
              name="agree"
              onChange={handleChange}
            />
            <FormCheckboxLabel htmlFor="agree">
              Akceptuję regulamin
            </FormCheckboxLabel>
            {formErrors.agree && (
              <FormAlert>Wymagana akceptacja regulaminu</FormAlert>
            )}
          </AgreementContainer>
          <FormButton type="submit" value="zapisz" />
        </Form>
      </Card>
    </MainContainer>
  );
};
