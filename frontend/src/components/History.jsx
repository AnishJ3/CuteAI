import { useEffect, useState,useRef } from 'react';
import ChatHistory from '../components/History/ChatHistory';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import Alerts from './Alerts';
import { Spinner,Alert,AlertIcon,AlertTitle,useToast, useDisclosure} from '@chakra-ui/react';

function History({ setCurrentChatId, chatWindows, setChatWindows, creatingChat, currentChatId, setCreatingChat, deleteChats, setDeleteChats }) {

  const { isOpen: isClearChatOpen, onOpen: onClearChatOpen, onClose: onClearChatClose } = useDisclosure();
  const clearChatRef = useRef()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const clearChat = async () => {
    try {
      if (deleteChats.length === 0) {
        console.log("No chats to delete");
        return;
      }

      // Use the full URL for your backend
      const response = await axios.delete(`${BACKEND_URL}/deleteChats/`, {
        data: { chat_ids: deleteChats },
      });

      if (response.status === 200) {
        console.log("Chats successfully deleted:", response.data);

        // Update chat windows state
        setChatWindows((prevWindows) => {
          const updatedWindows = prevWindows.filter((chat) => !deleteChats.includes(chat.id));

          // If the current chat was deleted, set currentChatId to the first chat in updatedWindows or null
          if (deleteChats.includes(currentChatId)) {
            setCurrentChatId(updatedWindows.length > 0 ? updatedWindows[0].id : -404);
          }

          return updatedWindows;
        });

        setDeleteChats([]);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleClick = (id) => {
    setCurrentChatId(id);

    if (id !== 1000) {
      setCreatingChat(false);

      let tempChatWindows = chatWindows.filter((chat) => chat.id !== 1000);
      setChatWindows([...tempChatWindows]);
      // setReRender((va) => )
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* History Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p className="text-start ml-4 decoration-sky-500 text-current text-2xl font-bold font-sans text-white">History</p>
      </div>

      <div className='mt-4 h-96 bg-gray-900 overflow-y-auto rounded-md'>
        {/* Chat history */}
        {Array.isArray(chatWindows) && chatWindows.length > 0 ? (
          chatWindows.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => handleClick(chat.id)} // Set the current chat ID on click
              className='cursor-pointer p-2 bg-gray-800 hover:bg-gray-700 m-2 rounded-md'
            >
              {/* Ensure text is a string */}
              <ChatHistory
                chatId={chat.id}
                isActive={true} 
                text={chat.text || "Untitled Chat"}
                deleteChats={deleteChats}
                setDeleteChats={setDeleteChats} // Display text if available; else show a placeholder
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 p-4">No chats available.</p>
        )}
      </div>

      {/* Button at the bottom */}
      <div className='mt-8 flex justify-center items-center'>
        <button className="bg-gray-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center" onClick={() => onClearChatOpen()}>
          <FaTrash className="mr-2" /> {/* Add icon with margin */}
          Clear Chat
        </button>
      </div>
      <Alerts para={{ isOpen: isClearChatOpen, onClose: onClearChatClose }}
        func={clearChat}
        body="Are you sure you want to delete these chats?"
        ref={clearChatRef}
        header="Deleting chats"/>
    </div>
  );
}

export default History;
