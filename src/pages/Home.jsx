import React from 'react'
import Feed from '../components/Feed'
import MenuNav from '../components/MenuNav'
import RecomendationNav from '../components/RecomendationNav'

function Home() {
  return (
    <div className='flex justify-start bg-gray-100'>
      <MenuNav />
      <Feed />
      <RecomendationNav />
    </div>
  )
}

export default Home