import { View, Text,Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

const profile = () => {
  // Vamos criar a página de login, onde caso o usuário não tenha conta uma tela de cadastro
  // Primeiro vamos criar um usuário
  return (
    <View className='bg-primary flex-1 px-10'>
      <View className='flex justify-center items-center flex-1 flex-col gap-5'>
        <Text className='text-light-200 text-xl'>Create account</Text>
        <TextInput placeholder='Username' className='bg-white w-[200px] rounded-lg'/>
        <TextInput placeholder='Password' className='bg-white w-[200px] rounded-lg'/>
        <TouchableOpacity
                className=" bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center  w-[150px]"
              >
                <Text className="text-white font-semibold text-base ">Sign in</Text>
              </TouchableOpacity>
      </View>
    </View>
  )
}

export default profile