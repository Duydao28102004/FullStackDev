import React, { useState } from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import { words } from '@/lib/data'

const Navbar = () => {

    const [activeSearch, setActiveSearch] = useState([])

    const handleSearch = (e) => {
        if(e.target.value == ''){
            setActiveSearch([])
            return false
        }
        setActiveSearch(words.filter(w => w.includes(e.target.value)).slice(0,8))
    }

  return (
    <form className='w-[500px] relative'>
        <div className="relative">
            <input type="search" placeholder='Type Here' className='w-full p-4 rounded-full bg-slate-200' onChange={(e) => handleSearch(e)}/>
            <button className='absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-slate-400 rounded-full'>
                <AiOutlineSearch />
            </button>
        </div>

        {
            activeSearch.length > 0 && (
                <div className="absolute top-20 p-4 bg-slate-800 text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2">
                    {
                        activeSearch.map(s => (
                            <span>{s}</span>
                        ))
                    }
                </div>
            )
        }

        <div className="flex items-center space-x-4">
            <img
                src="user-picture"
                alt="User"
                className="w-10 h-10 rounded-full"
            />
            <span className="text-lg">User-name</span>
        </div>

        <CogIcon className="w-6 h-6 cursor-pointer text-gray-300 hover:text-white" />
        <MailIcon className="w-6 h-6 cursor-pointer text-gray-300 hover:text-white" />
        <ChatBubbleLeftIcon className="w-6 h-6 cursor-pointer text-gray-300 hover:text-white" />
    </form>
  )
}
export default Navbar