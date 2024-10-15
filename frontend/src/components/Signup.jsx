import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Spinner,Alert,AlertIcon,AlertTitle,useToast} from '@chakra-ui/react';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
`;

const FormContainer = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

const FormTitle = styled.h1`
  margin-bottom: 1rem;
  text-align: center;
  font-size: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #5c6bc0;
    box-shadow: 0 0 5px rgba(92, 107, 192, 0.5);
  }
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: #5c6bc0;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #3949ab;
  }
`;

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  color: #5c6bc0;
  cursor: pointer;
  text-align: center;
  margin-top: 1rem;
`;

const Signup = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isClick, setIsClick] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isError,setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const toast = useToast()

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
      window.location.href = '/';
    }
  }, []);

  const Login = async () => {
    console.log('submitted');
    try {
      const response = await axios.post(`${BACKEND_URL}/token/`, {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        setIsAuthenticated(true);
        setIsError(false)
        // toast({
        //   title: 'Login successful.',
        //   description: "You've successfully logged in.",
        //   status: 'success',
        //   duration: 3000,
        //   isClosable: true,
        // });
        localStorage.setItem('login_success', 'true');
        window.location.replace('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setIsError(true)
      setErrorMessage("Your credentials are invalid. Please try again with another username or password.")

    } finally {
      setIsClick(false); // Stop spinner after login completes
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    setIsClick(true); // Start spinner
    if (isLogin) {
      setTimeout(async () => {
        await Login(); // Ensure `Login` completes before stopping the spinner
      }, 1000); // Simulate a delay for spinner test
    } else {
      setTimeout(async () => {
        try {
          if (confirm !== password) {
            setIsClick(false); // Stop spinner in case of mismatch
            return;
          }

          const response = await axios.post(`${BACKEND_URL}/signup/`, {
            username,
            password,
          });

          if (response.status === 201) {
            await Login(); // Attempt login after successful signup
          }
        } catch (error) {
          console.error('Signup failed:', error);
          setIsError(true)
          setErrorMessage("A user already exists with these credentials")
        } finally {
          setIsClick(false); // Stop spinner after signup completes
        }
      }, 0); // Simulate a delay for spinner test
    }
  };

  return (
    <Container>
      <div className='flex  flex-col justify-center items-center'>
        <div className='mb-3'>
      {isError && (
        <>
          <Alert status='error'>
              <AlertIcon />
              <AlertTitle>{errorMessage}</AlertTitle>
          </Alert>
        </>
      )}
      </div>

      
      <FormContainer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      > 
        <FormTitle>{isLogin ? 'Login' : 'Sign Up'}</FormTitle>
        <Form onSubmit={handleSubmit}>
          <Input type="text" placeholder="Username" onChange={(e) => setUserName(e.target.value)} required />
          <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          {!isLogin && <Input type="password" placeholder="Confirm Password" onChange={(e) => setConfirm(e.target.value)} required />}
          <Button type="submit">
            {!isClick ? (isLogin ? 'Login' : 'Sign Up') : <Spinner color="red.500" />} {/* Display spinner during request */}
          </Button>
        </Form>
        <ToggleButton onClick={toggleForm}>
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
        </ToggleButton>
      </FormContainer>
      </div>

    </Container>
  );
};

export default Signup;
