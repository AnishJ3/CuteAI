import { ChatBubbleLeftIcon, DocumentDuplicateIcon, FolderIcon, Cog6ToothIcon, QuestionMarkCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'; // Import correct icons
import logo from './a.svg'
import { useState } from 'react';
import axios from 'axios';
import { Outlet, Link } from "react-router-dom";


function Sidebar({setCurrentChatId,setChatWindows, creatingChat, setCreatingChat}) {

  
  const handleClick = () => {
    if (!creatingChat) {
        setCreatingChat(true);
        setCurrentChatId(1000);

        // Ensure the new chat matches the expected structure
        setChatWindows((prevWindows) => [
            { id: 1000, messages: [], text: "New Chat" }, // Add the new chat at the front
            ...prevWindows, // Then spread the previous chats
        ]);

        console.log("New chat window is created");
    }
};


  const logout = async () => {
    
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
    <div className="h-96 w-64 bg-gray-900 text-white">
      {/* Company Logo and Name */}
      <div className="flex items-center p-4">
        <img
          src={logo} // Placeholder for company logo
          alt="Company Logo"
          className="h-10 w-10 flex justify-center items-center"
        />
        <span className="text-xl font-semibold cursor-pointer">CuteAi</span>
      </div>

      {/* Divider */}
      <hr className="border-gray-600" />

      {/* Chat Button */}
      <div className="mt-6">
        <button className="flex items-center p-4 w-full hover:bg-gray-700 focus:outline-none rounded-md" 
        onClick={() => handleClick()} >
          <ChatBubbleLeftIcon className="h-6 w-6 mr-3" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Templates Button */}
      <div className="mt-2">
        <button className="flex items-center justify-between p-4 w-full hover:bg-gray-700 focus:outline-none rounded-md">
          <div className="flex items-center">
            <DocumentDuplicateIcon className="h-6 w-6 mr-3" />
            <span>Templates</span>
          </div>
          <span className="text-sm text-gray-400">Coming Soon</span>
        </button>
      </div>

      {/* My Projects Button */}
      <div className="mt-2">
        <button className="flex items-center justify-between p-4 w-full hover:bg-gray-700 focus:outline-none rounded-md">
          <div className="flex items-center">
            <FolderIcon className="h-6 w-6 mr-3" />
            <span>My Projects</span>
          </div>
          <span className="text-sm text-gray-400">Coming soon</span>
        </button>
      </div>

      {/* Settings Button */}
      <div className="mt-2">
        <button className="flex items-center justify-between p-4 w-full hover:bg-gray-700 focus:outline-none rounded-md">
          <div className="flex items-center">
            <Cog6ToothIcon className="h-6 w-6 mr-3" />
            <span>Settings</span>
          </div>
          <span className="text-sm text-gray-400">Coming soon</span>
        </button>
      </div>

      {/* Updates & FAQ Button */}
      <div className="mt-2">
        <Link to='/FAQ' className="flex items-center p-4 w-full hover:bg-gray-700 focus:outline-none rounded-md" >
          <QuestionMarkCircleIcon className="h-6 w-6 mr-3" />
          <span>Updates & FAQ</span>
        {/* </button> */}
        </Link>
      </div>

      {/* Divider */}
      <hr className="border-gray-600 my-4" />

      {/* Logout Button */}
      <div className="mt-auto">
        <button className="flex items-center p-4 w-full hover:bg-red-700 focus:outline-none rounded-md" onClick={logout}>
          <ArrowRightOnRectangleIcon className="h-6 w-6 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
