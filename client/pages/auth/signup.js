import { useState } from 'react';
import axios from 'axios';

import { Form, Button } from 'react-bootstrap';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    try {
      const response = await axios.post('/api/users/signup', {
        email,
        password,
      });
      console.log(response);
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <Form.Group controlId="signup-email-input">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          required
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="signup-password-input">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          required
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      {!!errors.length && (
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
