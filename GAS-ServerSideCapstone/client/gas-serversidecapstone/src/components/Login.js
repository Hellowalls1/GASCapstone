import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";

export default function Login() {
  const history = useHistory();
  const { login } = useContext(UserContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  //might need to add more items to state for my user
  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => history.push("/"))
      .catch(() => alert("Invalid email or password"));
  };

  return (
    <>
      <div className="login-page">
        <div className="container">
          <Form onSubmit={loginSubmit}>
            <fieldset>
              <FormGroup>
                <Label className="email" for="email">
                  Email
                </Label>
                <Input
                  id="email"
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label className="password" for="password">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Button>Login</Button>
              </FormGroup>
              <em className="register">
                Not registered? <br></br>
                <Link to="register" type="button" class="btn btn-info">
                  Register
                </Link>
              </em>
            </fieldset>
          </Form>
        </div>
      </div>
    </>
  );
}
