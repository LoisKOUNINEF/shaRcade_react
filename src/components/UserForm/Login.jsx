import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAtom } from 'jotai';
import {userAtom, authorizationAtom} from '../../stores/cookies';
import { API_URL } from '../../stores/api_url';
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './UserForm.css';

const Login = () => {

    const navigate = useNavigate();

    const [user, setUser] = useAtom(userAtom);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [authorization, setAuthorization] = useAtom(authorizationAtom);

    function fetchData(e){
        e.preventDefault();

        const data = {
          "user" :{
            "email": email,
            "password": password
        }
    };

    fetch(API_URL + 'users/sign_in', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
    .then((response) => {
      setAuthorization([...response.headers.get('authorization')].join(''));
      Cookies.set('token', [...response.headers.get('authorization')].join(''));
      return response.json()
  })
    .then((response) => {
      setUser(response.user.id);
      Cookies.set('id', response.user.id)
      navigate('/')
  })
}

return (
  <Form className="form" onSubmit={fetchData}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Label className="label">Email address</Form.Label>
  <Form.Control className="field" type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label className="label">Password</Form.Label>
  <Form.Control className="field" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
  </Form.Group>
  <Button className="submit-btn" variant="primary" type="submit">
  Submit
  </Button>
  </Form>
  );
}

export default Login;