import { Feather, Fontisto } from '@expo/vector-icons'
import React from 'react'
import {
  Dimensions,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { twMerge } from 'tailwind-merge'

import { Gender } from '../../app/(home)/types'

interface SexFilterProps {
  closeDrawer: () => void
  updateGender: (genderSelect: 'female' | 'male') => void
  filterGender: () => void
  gender: Gender
}

export function SexFilter({
  closeDrawer,
  updateGender,
  filterGender,
  gender,
}: SexFilterProps) {
  const windowHeight = Dimensions.get('window').height
  const percentScreen = Platform.OS === 'ios' ? 0.3 : 0.25

  const selectedMaleCard = gender.male ? 'border-blue-400' : ''
  const selectedMaleText = gender.male ? 'text-blue-400' : ''

  const selectedFemaleCard = gender.female ? 'border-pink-400' : ''
  const selectedFemaleText = gender.female ? 'text-pink-400' : ''

  return (
    <View className="bg-zinc-900/90 flex-1 blur-2xl">
      <View
        style={[{ height: windowHeight * percentScreen }]}
        className="absolute left-0 right-0 justify-start items-center bg-zinc-50 rounded-t-xl p-6 bottom-0 border border-slate-900 shadow-2xl shadow-slate-900"
      >
        <View className="flex-row items-center border-b border-zinc-200 pb-2">
          <Text className="flex-1 font-subTitle text-xl text-center pl-7">
            Filter
          </Text>
          <TouchableOpacity
            className="w-7 h-7"
            onPress={closeDrawer}
            activeOpacity={0.9}
          >
            <Feather name="x" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <View className="flex-row gap-x-8 mt-8">
          <TouchableOpacity
            className={twMerge(
              'h-20 w-20 border border-slate-400 rounded-xl items-center justify-center gap-y-2',
              selectedMaleCard,
            )}
            onPress={() => updateGender('male')}
            activeOpacity={0.9}
          >
            <Fontisto
              name="male"
              size={32}
              color={gender.male ? '#60a5fa' : '#94a3b8'}
            />
            <Text
              className={twMerge(
                'font-subTitle text-slate-400',
                selectedMaleText,
              )}
            >
              Homem
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={twMerge(
              'h-20 w-20 border border-slate-400 rounded-xl items-center justify-center gap-y-2',
              selectedFemaleCard,
            )}
            onPress={() => updateGender('female')}
            activeOpacity={0.9}
          >
            <Fontisto
              name="female"
              size={32}
              color={gender.female ? '#f472b6' : '#94a3b8'}
            />
            <Text
              className={twMerge(
                'font-subTitle text-slate-400',
                selectedFemaleText,
              )}
            >
              Mulher
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="mt-auto bg-slate-700 w-full p-2 rounded-xl"
          activeOpacity={0.9}
          onPress={filterGender}
        >
          <Text className="text-slate-50 font-subTitle uppercase text-center text-sm">
            Filtrar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
