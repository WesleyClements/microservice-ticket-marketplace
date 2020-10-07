import { useState } from 'react';
import { useRequest } from '../../hooks';

import { Form, Button } from 'react-bootstrap';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    await doRequest({
      email,
      password,
    });
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
      {!!errors && (
        <div className="alert alert-danger">
          <h4>Ooops...</h4>
          <ul>
            {errors.map((err) => (
              <li>{err.message}</li>
            ))}
          </ul>
        </div>
      )}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default SignUp;
