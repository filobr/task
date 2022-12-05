import { FC, useState, useEffect } from "react";
import styled from "styled-components";

import { Card, MainContainer } from "components/Main";
import {
  flexDisplay,
  setButtonFont,
  setInterFont,
  setLatoFont,
  width,
} from "helpers/helpers";
import { starWarsDataType } from "App";

const TitleContainer = styled.div`
  ${flexDisplay("70%", "auto", "column")}
  align-items: flex-end;
  margin-top: 50px;
  ${width.mobile} {
    margin-top: 20px;
    width: 90%;
  }
`;

const Title = styled.span`
  ${setInterFont(20)};
  padding: 10px 0;
  ${width.mobile} {
    font-size: 12px;
  }
`;

const TitleBox = styled.div`
  width: 166.17px;
  height: 9.29px;
  background: #071594;
`;

const Form = styled.form`
  ${flexDisplay("70%", "auto", "column")}
  align-items: flex-end;
  ${width.mobile} {
    width: 90%;
  }
`;

const FormLabel = styled.label`
  width: 100%;
  text-align: left;
  margin-top: 30px;
  ${setInterFont(20)};
  ${width.mobile} {
    font-size: 14px;
  }
`;

const FormInput = styled.input<{ isError?: string }>`
  width: 100%;
  padding: 5px;
  border: none;
  border-bottom: 2px solid ${props => (props.isError ? "#FF0000" : "#000000")};
  background-color: #ffffff;
  outline: none;
  ${setLatoFont(16)};
  ${width.mobile} {
    font-size: 12px;
  }
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
  ${width.mobile} {
    gap: 5px;
  }
`;

const FormCheckbox = styled.input`
  width: 30px;
  height: 30px;
  ${width.mobile} {
    width: 20px;
    height: 20px;
  }
`;

const FormCheckboxLabel = styled.label`
  ${setInterFont(16)};
  text-align: left;
  ${width.mobile} {
    font-size: 10px;
  }
`;

const FormAlert = styled.span`
  ${setInterFont(12)};
  text-align: right;
  color: #ff0000;
  ${width.mobile} {
    font-size: 8px;
  }
`;

const Alert = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  position: absolute;
  top: 10px;
  background: #ecdcdc;
  width: 60%;
  height: 100px;
  box-shadow: 10px 4px 4px rgba(0, 0, 0, 0.75);
  border-radius: 20px;
  padding: 10px;
  ${setLatoFont(20)};
  line-height: 120%;
  text-align: center;
  color: #ff0000;
  ${width.tablet} {
    width: 80%;
  }
`;

interface FormProps {
  starWarsData: starWarsDataType[];
}

export const FormPage: FC<FormProps> = ({ starWarsData }) => {
  const initialValues = {
    login: "",
    password: "",
    email: "",
    number: "",
    agree: false,
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  useEffect(() => {
    if (isAlertVisible) {
      const alertTimeout = setTimeout(() => setIsAlertVisible(false), 3000);
      return () => clearTimeout(alertTimeout);
    }
  }, [isAlertVisible]);

  useEffect(() => {
    const postData = async () => {
      try {
        const rawResponse = await fetch("https://example.com", {
          method: "POST",
          body: JSON.stringify({ formValues, starWarsData }),
        });
        const content = await rawResponse.json();
        console.log(content);
      } catch (error) {
        console.log({ formValues, starWarsData });
        setIsAlertVisible(true);
      }
    };

    if (
      !formErrors.number &&
      !formErrors.email &&
      !formErrors.agree &&
      isSubmit
    )
      postData();
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
    login: string;
    password: string;
    email: string;
    number: string;
    agree: boolean;
  }) => {
    const errors = {
      login: "",
      password: "",
      email: "",
      number: "",
      agree: false,
    };

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
          <FormInput
            type="text"
            name="login"
            id="login"
            onChange={handleChange}
            value={formValues.login}
            required
          />
          <FormLabel htmlFor="password">Hasło:</FormLabel>
          <FormInput
            type="text"
            name="password"
            id="password"
            onChange={handleChange}
            value={formValues.password}
            required
          />
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
      {isAlertVisible && (
        <Alert>
          Wysyłanie danych nie powiodło się. Dane przygotowane do wysłania
          możesz zobaczyć w konsoli.
        </Alert>
      )}
    </MainContainer>
  );
};
