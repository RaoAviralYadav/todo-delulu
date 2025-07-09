import React from 'react'

export const Navbar = () => {
    return (
        <nav>
            <div className='flex items-center justify-between bg-gray-900 p-4'>
                <div className='text-white text-2xl font-bold'>To Do Delulu</div>
                <ul className='flex space-x-4'>
                    <li><a href="#" className='text-gray-300 hover:text-white transition-all hover:font-bold'>Home</a></li>
                    <li><a href="#" className='text-gray-300 hover:text-white transition-all hover:font-bold'>About</a></li>
                    <li><a href="#" className='text-gray-300 hover:text-white transition-all hover:font-bold'>Contact</a></li>
                    
                </ul>
            </div>
        </nav>
    )
}
export default Navbar
