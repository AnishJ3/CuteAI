import Nav from "./Nav";
import History from "./History";
import Sidebar from "./sidebar/Sidebar";
import { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import { Spinner,Alert,AlertIcon,AlertTitle,useToast, useDisclosure} from '@chakra-ui/react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button
} from '@chakra-ui/react'

// import dotenv from 'dotenv';

// Load environment variables
// dotenv.config();
// require('dotenv').config()/



function Display() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Load BACKEND_URL from .env file

  const [messages, setMessages] = useState([]); // State to hold messages
  const [input, setInput] = useState(""); // State to hold current input
  const [queries, setQueries] = useState([]);
  const [chatWindows, setChatWindows] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(-404);
  const [creatingChat, setCreatingChat] = useState(false);
  const [deleteChats, setDeleteChats] = useState([])
  const {isLogoutOpen, onLogoutOpen, onLogoutClose} = useDisclosure()
  const logoutRef = useRef()
  const toast = useToast()

  useEffect(() => {
    if (localStorage.getItem('access_token') === null) {
      window.location.href = '/login';
    }

    if (localStorage.getItem('login_success') === 'true') {
      // toast.success('Login successful!');
      toast({
        title: 'Login successful.',
        description: "You've successfully logged in.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setTimeout(() =>{

        localStorage.removeItem('login_success'); // Remove flag after showing toast
      },[5000])
    }

  }, [currentChatId]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.post(`${BACKEND_URL}/getChats/`, {}, {
          headers: {
            // Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        const chats = response.data.map(chat => ({
          text: chat.chat_title,
          id: chat.chat_id,
          chat_id: chat.chat_id,
          timestamp: new Date(chat.timestamp),
        }));

        chats.sort((a, b) => b.timestamp - a.timestamp);
        setCurrentChatId(chats.length > 0 ? chats[0].id : -404);
        setQueries(chats);
        setChatWindows(chats.map(chat => ({ id: chat.chat_id, messages: [], text: chat.text })));

      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, []);

  
  useEffect(() => {
    if (currentChatId !== null) {
      axios.post(`${BACKEND_URL}/getChatHistory/`, { chat_id: currentChatId })
        .then((res) => {
          if (res.status === 200) {
            setMessages(res.data);
          } else {
            console.log('Chat history not found');
          }
        })
        .catch(() => {
          console.log('Chat ID not found');
        });
    }
  }, [currentChatId]);

  const setChatParentId = (chat_id, newId, input) => {
    setChatWindows((prevWindows) => {
      const index = prevWindows.findIndex((chat) => chat.id === chat_id);
  
      if (index === -1) return prevWindows;
  
      const newChat = { ...prevWindows[index], id: newId, text: input };
  
      const updatedArray = [
        ...prevWindows.slice(0, index),
        newChat,
        ...prevWindows.slice(index + 1),
      ];
  
      return updatedArray;
    });
  
    setCurrentChatId(newId);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission

    if (input.trim()) {
      if (currentChatId === 1000) {
        axios.post(`${BACKEND_URL}/newChat/`)
          .then((res) => {
            if (res.status === 201) {
              const newChatId = res.data.chat_id;
              setChatParentId(1000, newChatId, input);
              axios.put(`${BACKEND_URL}/changeTitle/`, { chat_id: newChatId, chat_title: input })
                .then((res) => {
                  if (res.status === 200) {}
                })
                .catch((err) => console.log('Error updating chat title:', err));

              axios.post(`${BACKEND_URL}/newChatHistory/`, { prompt: input, chat_id: newChatId })
                .then((res) => {
                  if (res.status === 201) {
                    const updatedMessage = {
                      prompt: input,
                      answer: res.data.answer,
                      chat_id: newChatId,
                    };
                    setMessages((prevmessages) => [...prevmessages, updatedMessage]);
                    setCreatingChat(false);
                  } else {
                    console.log('Chat cannot be added to history');
                  }
                })
                .catch((err) => console.log('Error adding to chat history:', err));
            }
          })
          .catch((err) => console.log("Cannot create new chat", err));
      } else {
        axios.post(`${BACKEND_URL}/newChatHistory/`, { prompt: input, chat_id: currentChatId })
          .then((res) => {
            if (res.status === 201) {
              const updatedMessage = {
                prompt: input,
                answer: res.data.answer,
                chat_id: currentChatId,
              };
              setMessages((prevmessages) => [...prevmessages, updatedMessage]);
              setCreatingChat(false);
            } else {
              console.log('Chat cannot be added to history');
            }
          });
      }

      setInput(""); // Clear the input field
    }
  };

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden">
      <div className="bg-gray-900 border-gray-600 p-4 h-screen w-1/5">
        <Sidebar setCurrentChatId={setCurrentChatId} setChatWindows={setChatWindows} creatingChat={creatingChat} setCreatingChat={setCreatingChat} />
      </div>

      <div className="centered-div w-4/5 bg-gray-900 border border-gray-500 p-4 h-screen rounded-lg flex flex-col">
        <div className="mb-5">
          <Nav />
        </div>

        {/* Display messages in the blank space */}
        <div className="flex-1 bg-black rounded-md overflow-y-auto p-4">
          {messages.length === 0 && chatWindows.length === 0 && currentChatId=== -404 ? (
            <div className="text-white text-center">
              Please click on new chat to start a new chat.
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className="mb-6">
                <div
                  className="bg-blue-600 text-white self-start p-2 rounded-md mb-2"
                  style={{ maxWidth: "100%", wordWrap: "break-word" }}
                >
                  {msg.prompt}
                </div>
                {msg.answer && (
                  <div
                    className="bg-gray-700 text-white self-end p-2 rounded-md"
                    style={{ maxWidth: "100%", wordWrap: "break-word" }}
                  >
                    {msg.answer}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {
          !(messages.length === 0 && chatWindows.length === 0) &&

          (<form onSubmit={handleSubmit} className="flex items-center p-4 bg-gray-900 border-t border-gray-900">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border border-gray-900 rounded-lg mr-2 text-black"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200"
          >
            Send
          </button>
        </form>)
        }
      </div>

      <div className="bg-gray-900 border-white p-4 h-screen w-1/3">
        <History setCurrentChatId={setCurrentChatId} chatWindows={chatWindows} currentChatId = {currentChatId} setChatWindows={setChatWindows} setCreatingChat={setCreatingChat} creatingChat={creatingChat} deleteChats={deleteChats} setDeleteChats={setDeleteChats} />
      </div>

      
    </div>
  );
}

export default Display;
