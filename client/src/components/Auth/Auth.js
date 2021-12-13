import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Container, Card, Form, Button } from "react-bootstrap";

import Input from "./Input";
import { AUTH } from "../../constants/actionTypes";

import { signUp, signIn } from "../../actions/auth";

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const switchMode = () => {
    setIsSignUp(!isSignUp);
    setShowPassword(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(signUp(formData, history));
    } else {
      dispatch(signIn(formData, history));
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "30rem" }}>
        <Card.Body>
          <h3 className="mt-3 mb-4 text-center">
            {isSignUp ? "Sign Up" : "Sign In"}
          </h3>
          <Form onSubmit={handleSubmit}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  handleChange={handleChange}
                />
                <Input
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  handleChange={handleChange}
                />
              </>
            )}
            <Input
              name="email"
              type="email"
              placeholder="Email Address"
              handleChange={handleChange}
            />
            <Input
              name="password"
              type={!showPassword ? "password" : "text"}
              placeholder="Password"
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
            />

            {isSignUp && (
              <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                handleChange={handleChange}
              />
            )}

            <Button className="mt-4" variant="primary" type="submit" block>
              SIGN IN
            </Button>

            <Button onClick={switchMode} variant="light" block>
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Auth;
