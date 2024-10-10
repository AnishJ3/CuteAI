import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToast, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Button, Alert, AlertIcon, Skeleton } from '@chakra-ui/react';

// Set axios defaults to handle cookies and CSRF
// axios.defaults.withCredentials = true;
// axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
// axios.defaults.xsrfCookieName = "csrftoken";

const getCsrfToken = () => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === 'csrftoken') return value;
    }
    return null;
};

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAlert, setIsAlert] = useState(false);
    const [skeletonValid, setSkeletonValid] = useState(true);
    const [isToast, setIsToast] = useState(false);
    const toast = useToast();
    const [csrftoken, setCsrfToken] = useState("")
    const id = 'test-toast';

    useEffect(() => {
        
        if(localStorage.getItem('access_token'))
        {
            setIsAuthenticated(true)
        }
        else
        {
            setIsAuthenticated(false)
        }
    }, []);


    const handleSubmit = async () => {
        console.log("submitted");
        try {
            // const csrfToken = getCsrfToken(); // Get CSRF token from cookies
            const response = await axios.post('http://localhost:8000/token/', {
                username: username,
                password: password,
            },
            
                {headers: 
                    {'Content-Type': 'application/json'},
                     withCredentials: true
                }
            );

            if (response.status === 200) {
                // Successful login
                setUsername('');
                setPassword('');
                setIsAlert(false);
                console.log(response)

                // const data = await axios.post('http://localhost:8000,token/' , )
                // localStorage.clear();
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                console.log(response.data.access)
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
                setSkeletonValid(false);
                setIsToast(true);
                setIsAuthenticated(true);
                window.location.replace('/');
            }
        } catch (error) {
            // Handle failed login
            setIsAlert(true);
            setError("Wrong username or password.");
            console.error('Login failed:', error);
        }
    };

    const logout = async () => {

        
            try {
                // axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
                const { data } = await axios.post(
                    'http://localhost:8000/logout/',
                    {
                        refresh_token: localStorage.getItem('refresh_token'), // Send the refresh token
                    },
                    {
                        withCredentials: true, // Ensure cookies are sent with the request
                        headers: {
                            'Content-Type': 'application/json', // Set Content-Type header
                        },
                    }
                );
        
                // Clear tokens and redirect after successful logout
                localStorage.clear();
                axios.defaults.headers.common['Authorization'] = null;
                window.location.href = '/login';
            } catch (e) {
                console.error('Logout not working', e);
                // Handle errors appropriately, such as displaying an error message
            }


            
            try {
                const { data } = await axios.post(
                    'http://localhost:8000/logout/',
                    {
                        refresh_token: localStorage.getItem('refresh_token'), // Send the refresh token
                    },
                    {
                        withCredentials: true, // Ensure cookies are sent with the request
                        headers: {
                            'Content-Type': 'application/json', // Set Content-Type header
                        },
                    }
                );
        
                // Clear tokens and redirect after successful logout
                localStorage.clear();
                axios.defaults.headers.common['Authorization'] = null;
                window.location.href = '/login';
            } catch (e) {
                console.error('Logout not working', e);
                // Handle errors appropriately, such as displaying an error message
            }
    };

    return (
        <div>
            {!isAuthenticated ? (
                <div>
                    {isAlert && (
                        <Alert status='error'>
                            <AlertIcon />
                            {error}
                        </Alert>
                    )}

                    <Skeleton isLoaded={skeletonValid}>
                        <FormControl m={10} isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
                            <FormLabel>Password</FormLabel>
                            <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            <Button type='submit' onClick={handleSubmit}>
                                Submit
                            </Button>
                        </FormControl>
                    </Skeleton>

                    {isToast &&
                        !toast.isActive(id) &&
                        toast({
                            id,
                            title: 'Successfully logged in.',
                            description: 'Please continue browsing',
                            status: 'success',
                            duration: 9000,
                            isClosable: true,
                        })}
                </div>
            ) : (
                <div>
                    <h1>You are logged in!</h1>
                    {/* <Button onClick={whoami}>WhoAmI</Button> */}
                    <Button onClick={logout}>Log out</Button>
                </div>
            )}
        </div>
    );
};

export default Login;
