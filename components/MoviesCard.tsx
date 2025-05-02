import { View, Text, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { icons } from '@/constants/icons'

const MoviesCard = ({id, poster_path, title, vote_average, release_date}: Movie) => {
  return (
    <Link href = {`./movies/${id}`} asChild>
      <TouchableOpacity className='w-[30%]'>
        <Image source ={{
          uri: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}`: `https://placehold.co/600x400/1a1a1a/ffffff.png`
        }} 
        className='w-full h-52 rounded-lg'
        resizeMode='cover'
        />
        {/*numberOfLines determina a quantidade de linhas que o texto que o componente Text pode ter, caso o texto passe do limite determinado o resto do texto é substituído por três pontos(...)   */}
        <Text className='text-sm font-bold text-white mt-2' numberOfLines={1}>{title}</Text>

{/* É neste View que a noda do filme é mostrada */}
        <View className='flex-row items-center justify-start gap-x-1'>
          <Image source={icons.star} className='size-4'/>
          {/* Este Text mostra o valor arredondado da votação do filme em questão */}
          <Text className='text-xs text-white'>{Math.round(vote_average / 2 )}</Text>

        </View>
        {/* Neste View é mostrado ano que o filme foi lançado, usamos split para pegar apenas a primeira parte da data de lançamento */}
        <View className='flew-row items-center'>
        <Text className='text-xs text-light-300 font-medium mt-1'>
          {release_date?.split('-')[0]}
        </Text>
        {/* <Text className='text-xs font-light text-light-300 uppercase '>Movie</Text> */}
        </View>
      </TouchableOpacity>
    </Link>
  )
}

export default MoviesCard