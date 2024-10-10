

import { FaUpload, FaMicrophone, FaPaperPlane } from 'react-icons/fa'; // Import icons from react-icons

function Input() {
  return (
    <div >
    <div className="flex items-center p-4 border rounded-lg shadow-md bg-black text-black">
      {/* Upload Icon */}
      <div className="cursor-pointer p-2 hover:bg-gray-200 rounded-full">
        <FaUpload className="text-gray-600" size={24} />
      </div>

      {/* Voice Message Icon */}
      <div className="cursor-pointer p-2 hover:bg-gray-200 rounded-full mx-2">
        <FaMicrophone className="text-gray-600" size={24} />
      </div>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Type your message..."
        className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Send Button */}
      <button className="p-2 ml-2 text-gray-600 text-white rounded-full hover:bg-blue-600">
        <FaPaperPlane size={24} />
      </button>

      
    </div>
    <div className='flex justify-center items-center h-full'>
    <p>Cuteai © 2024</p>
    </div>

    </div>
    
  );
}

export default Input;

