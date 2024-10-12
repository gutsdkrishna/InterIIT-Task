import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  SignUpRedirect, // Assuming this is a styled component for the "Login" redirect section
} from './LoginStyles'; // Adjust the import path as necessary
import { User, Lock, AlertCircle } from 'lucide-react';
import { supabase } from './supabase'; // Import the Supabase client

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        setError(error.message);
      } else {
        // User created successfully
        console.log('User created:', user);
        navigate('/dashboard'); // Redirect to login after signup
      }
    } catch (error) {
      setError('Signup failed');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/'); // Redirect to login page
  };

  return (
    <>
      <GlobalStyle />
      <LoginContainer>
        <Title>Create Account</Title>
        <Form onSubmit={handleSignUp}>
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
          <Button type="submit">Sign Up</Button>
        </Form>
        {error && (
          <ErrorMessage>
            <AlertCircle size={16} style={{ marginRight: '5px' }} />
            {error}
          </ErrorMessage>
        )}
        <SignUpRedirect>
          Already have an account?{' '}
          <Button type="button" onClick={handleLoginRedirect}>
            Login
          </Button>
        </SignUpRedirect>
      </LoginContainer>
    </>
  );
}

export default SignUp;
