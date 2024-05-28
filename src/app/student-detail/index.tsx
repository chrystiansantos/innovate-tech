import { Feather, Fontisto } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useContext } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

import { InfoCard } from '@/src/components/student-detail/info-card'
import { StudentContext } from '@/src/providers/student-provider'

export default function User() {
  const { studentSelect, selectStudent } = useContext(StudentContext)

  const handleBack = () => {
    selectStudent(null)
    router.back()
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="bg-zinc-100/95 h-screen">
        <View className="relative h-64 bg-zinc-100/95 overflow-hidden items-center justify-center">
          <View className="absolute top-0 left-auto w-full h-64 bg-zinc-900 rounded-bl-3xl rounded-br-3xl">
            <TouchableOpacity className="px-8" onPress={handleBack}>
              <Feather name="chevron-left" color="white" size={28} />
            </TouchableOpacity>
          </View>

          <Image
            className="w-32 h-32 rounded-full"
            alt={studentSelect?.name}
            source={{
              uri: studentSelect?.picture,
            }}
          />
          <Text className="my-2 text-xl font-semibold text-slate-100 font-title">
            {studentSelect?.name}
          </Text>
          <View className="flex-row gap-2 items-center justify-center">
            <Fontisto name={studentSelect?.gender} size={12} color="white" />
            <Text className="text-slate-100 text font-semibold font-text">
              {studentSelect?.gender === 'male' ? 'Homem' : 'Mulher'}
            </Text>
          </View>
        </View>

        <View className="p-8 ">
          <Text className="my-2 text-xl font-semibold text-slate-800 font-subTitle">
            Personal info
          </Text>
          <View>
            <InfoCard
              info={studentSelect?.personalInfo.nationality}
              icon={<Fontisto name="earth" size={24} color="black" />}
            />
            <InfoCard
              info={studentSelect?.personalInfo.email}
              icon={<Feather name="mail" size={24} color="black" />}
            />
            <InfoCard
              info={studentSelect?.personalInfo.born}
              icon={<Feather name="calendar" size={24} color="black" />}
            />
            <InfoCard
              info={studentSelect?.id}
              icon={<Feather name="hash" size={24} color="black" />}
            />
          </View>

          <Text className="my-3 text-xl font-semibold text-slate-800">
            Contact
          </Text>
          <View>
            <InfoCard
              icon={<Feather name="phone" size={24} color="black" />}
              info={studentSelect?.contact.cellPhone}
            />
            <InfoCard
              icon={<Feather name="phone" size={24} color="black" />}
              info={studentSelect?.contact.phone}
            />
          </View>

          <Text className="my-3 text-xl font-semibold text-slate-800">
            Address
          </Text>
          <View className="gap-y-3">
            <InfoCard
              icon={<Feather name="map-pin" size={24} color="black" />}
              info={studentSelect?.address}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
