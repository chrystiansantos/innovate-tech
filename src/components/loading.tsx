import React from 'react'
import { Image, Text, View } from 'react-native'

export function Loading() {
  return (
    <View className="flex-1 items-center justify-center">
      <Image
        className="w-[300px] h-[300px] -mt-16"
        source={require('../assets/logo.png')}
        alt=""
      />
      <Text className="uppercase font-subTitle text-3xl tracking-[8px]">
        Innovate Tech
      </Text>
    </View>
  )
}
