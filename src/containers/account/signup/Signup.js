import React, { useState } from "react";
import { Header, Button, Container, Form } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

import Message from "../../../components/UI/Message";

import { history } from "../../../helpers";
import { authenticationService } from "../../../services";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    authenticationService
      .signup(username, email, password, confirmPassword)
      .then((response) => {
        setLoading(false);
        history.push("/");
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message || error);
      });
  };

  if (authenticationService.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Header>Signup for an account</Header>
      {error && <Message danger message={error} />}
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Username</label>
          <input
            placeholder="Username"
            value={username}
            type="text"
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            placeholder="Email"
            value={email}
            type="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            placeholder="Password"
            value={password}
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            placeholder="Confirm Password"
            value={confirmPassword}
            type="password"
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </Form.Field>
        <Button
          primary
          fluid
          loading={loading}
          disabled={loading}
          type="submit"
        >
          Signup
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
