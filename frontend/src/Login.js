import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase';
import {
  GlobalStyle,
  LoginContainer,
  Title,
  Form,
  InputGroup,
  Input,
  InputIcon,
  Button,
  ErrorMessage,
  SignUpRedirect, // Assuming this is a styled component for the "Sign Up" redirect section
} from './LoginStyles'; // Adjust the import path as necessary
import { User, Lock, AlertCircle } from 'lucide-react';
import axios from 'axios'; // Use axios to make API calls

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        setError(error.message);
      } else {
        // Successful login
        console.log('Logged in:', user);
        navigate('/dashboard'); // Redirect to dashboard after login
      }
    } catch (error) {
      setError('Login failed');
    }
  };

  const handleSignUpRedirect = () => {
    navigate('/signup'); // Redirect to sign-up page
  };

  return (
    <>
      <GlobalStyle />
      <LoginContainer>
        <Title>Welcome Back</Title>
        <Form onSubmit={handleLogin}>
          <InputGroup>
            <InputIcon>
              <User size={20} />
            </InputIcon>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <InputIcon>
              <Lock size={20} />
            </InputIcon>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
          <Button type="submit">Login</Button>
        </Form>
        {error && (
          <ErrorMessage>
            <AlertCircle size={16} style={{ marginRight: '5px' }} />
            {error}
          </ErrorMessage>
        )}
        <SignUpRedirect>
          Don't have an account?{' '}
          <Button type="button" onClick={handleSignUpRedirect}>
            Sign Up
          </Button>
        </SignUpRedirect>
      </LoginContainer>
    </>
  );
}

export default Login;
