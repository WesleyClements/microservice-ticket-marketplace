import { useState } from 'react';
import Router from 'next/router';
import { useRequest } from '../../hooks';

import { Form, Button } from 'react-bootstrap';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [postSignup, postSignupErrors] = useRequest({
    method: 'post',
    url: '/api/users/signup',
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    const res = await postSignup({
      data: {
        email,
        password,
      },
    });
    if (!res) return;
    Router.push('/');
  };

  return (
    <Form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <Form.Group controlId="signup-email-input">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          required
          placeholder="example@placeholder.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="signup-password-input">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          required
          placeholder="..."
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      {!!postSignupErrors && (
        <div className="alert alert-danger">
          <h4>Ooops...</h4>
          <ul>
            {postSignupErrors.map((err, i) => (
              <li key={'error' + i}>{err.message}</li>
            ))}
          </ul>
        </div>
      )}
      <Button variant="primary" type="submit">
        Sign Up
      </Button>
    </Form>
  );
};

export default SignUp;
