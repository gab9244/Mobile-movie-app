import { View, Text, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const MoviesCard = ({id, poster_path, title, vote_average, release_date}: Movie) => {
  return (
    <Link href={`/movie/${id}`}>
      <TouchableOpacity className='w-[30%]'>
        <Image source ={{
          uri: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}`
        }} />
      </TouchableOpacity>
    </Link>
  )
}

export default MoviesCard