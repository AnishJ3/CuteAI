import React, { useState,useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useEditable } from '@chakra-ui/react';
// import { useRouter } from 'next/navigation'; // Import the useRouter hook
import axios  from 'axios';

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
  const [username,setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [skeletonValid, setSkeletonValid] = useState(true);
//   const router = useRouter(); // Get the router instance

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  useEffect( () =>{

    if (localStorage.getItem('access_token') !== null) {
        window.location.href = '/';
      }
  },[])

  const Login = async() =>{

    console.log("submitted");
    try 
    {
        // const csrfToken = getCsrfToken(); // Get CSRF token from cookies
        const response = await axios.post(`${BACKEND_URL}/token/`, {
            username: username,
            password: password,
        },
        
            {headers: 
                {'Content-Type': 'application/json'},
                withCredentials: true
            }
        );

        if (response.status === 200) 
        {
            // Successful login
            setUserName('');
            setPassword('');
            // setIsAlert(false);
            console.log(response)

            // const data = await axios.post('http://localhost:8000,token/' , )
            // localStorage.clear();
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            console.log(response.data.access)
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
            setSkeletonValid(false);
            // setIsToast(true);
            setIsAuthenticated(true);
            window.location.replace('/');
        }
    }
            
    catch(error) {
        // Handle failed login
        // setIsAlert(true);
        // setError("Wrong username or password.");
        console.error('Login failed:', error);
    }

  }

  const handleSubmit = async(e) => {
    e.preventDefault(); // Prevent the default form submission
    // Redirect to the /auth/hy page on login

    if (isLogin) 
    {
    
        Login()
        
    } 
    else 
    {
    // Handle sign-up logic here (e.g., API call to register the user)
    // You can add validation for email and password here.
        // Placeholder for sign-up handling

        try
        {
            if(confirm !== password)
            {   

                return;
            }
            

            const response = await axios.post(`${BACKEND_URL}/signup/`, {
                username: username,
                password: password,
            },
            
                {headers: 
                    {'Content-Type': 'application/json'},
                        withCredentials: true
                }
            );
    
            if(response.status === 201)
            {
                // const resp =

                Login();

            }

        }
        catch(error)
        {
            console.error('Signup failed:',error);
        }

    }
};

  return (
    <Container>
      <FormContainer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <FormTitle>{isLogin ? 'Login' : 'Sign Up'}</FormTitle>
        <Form onSubmit={handleSubmit}> {/* Attach the handleSubmit function */}
          <Input type="text" placeholder="Username" onChange = {(e) => setUserName(e.target.value)} required />
          <Input type="password" placeholder="Password" onChange = {(e) => setPassword(e.target.value)} required />
          {!isLogin && <Input type="password" placeholder="Confirm Password" onChange = {(e) => setConfirm(e.target.value)} required />}
          <Button type="submit">{isLogin ? 'Login' : 'Sign Up'}</Button>
        </Form>
        <ToggleButton onClick={toggleForm}>
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
        </ToggleButton>
      </FormContainer>
    </Container>
  );
};

export default Signup; // Ensure this is the default export