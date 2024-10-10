
import logo from './a.svg'

function Navbar() {
    return (
      <nav className="bg-gray-800 p-2 rounded-full">
        <div className="container mx-auto flex justify-between items-center">
          {/* <div className="text-white text-xl justify-start right-60 font-bold ">
            MyLogo
          </div> */}

        <div>
      <img 
        src={logo} // Replace with your logo URL
        alt="Logo"
        className="h-10 cursor-pointer ml-2"
        
      />
    </div>
  
          <div className="flex space-x-6 justify-center items-center">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-700 text-white p-2 rounded-full pl-10 focus:outline-none"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
  
            {/* Notification */}
            <div className="relative">
              <button className="text-white hover:text-gray-400">
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M12 22s2-2 2-4h-4s2 2 2 4z" />
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-2 9-2 9h16s-2-2-2-9z" />
                </svg>
              </button>
            </div>
  
            {/* Doubt */}
            <div className="relative">
              <button className="text-white hover:text-gray-400">
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M9 9h.01" />
                  <path d="M12 15h.01" />
                  <path d="M12 9.5c-2.5 1-2 4.5-1 5.5 2 2 4-2 4-2m-5 5h2v2H9v-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }
  
  export default Navbar;
  