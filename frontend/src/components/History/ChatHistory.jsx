

function ChatHistory({text,deleteChats, setDeleteChats,chatId}) {

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      // If checked, add chatId to deleteChats
      setDeleteChats((prev) => [...prev, chatId]);
    } else {
      // If unchecked, remove chatId from deleteChats
      setDeleteChats((prev) => prev.filter((id) => id !== chatId));
    }

    console.log(deleteChats)
  };


  return (
    <div>
        <ul className=" space-y-2  overflow-y-auto hover:bg-gray-800 cursor-pointer p-4 rounded-md ">
          {/* List Item 1 */}
          <li className="flex items-start space-x-4 rounded-md  ">
            <input type="checkbox" className="mt-2" onChange={handleCheckboxChange}/>
            <div>
              <p className="font-bold text-pretty justify-center items-center flex text-white">{text}</p>
              {/* <p className="text-sm text-white ">{text}</p> */}
            </div>
          </li>
        </ul>
      
    </div>
  )
}

export default ChatHistory
