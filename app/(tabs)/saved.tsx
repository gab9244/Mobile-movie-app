import { View, Text,Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'

const saved = () => {
  return (
    <View className='bg-primary flex-1 '>
             <Image source={images.bg} className="absolute w-full z-0" />
      
          <View className='flex justify-center items-center flex-1 flex-col gap-5'>
            <Image source={icons.save} className='size-10' tintColor={"#fff"}></Image>
            <Text className='text-gray-500 text-base'>Saved</Text>
          </View>
        </View>
  )
}

export default saved