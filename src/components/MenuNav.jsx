import React from 'react'

function MenuNav() {
  return (
    <div className='max-w-2xl w-1/3 min-h-screen px-6 py-6'>
        <div className='h-full w-full flex justify-end'>
            <ul className='w-1/4'>
                <li>
                    <a href='/'>Home</a>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default MenuNav