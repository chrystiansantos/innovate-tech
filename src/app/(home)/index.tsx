import React from 'react'
import {
  FlatList,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import { Input } from '@/src/components/home/input'
import { StudentCard } from '@/src/components/home/student-card'

import { BottomDrawer } from '../../components/bottom-drawer'
import { Loading } from '../../components/home/loading'
import { LoadingMoreStudents } from '../../components/home/loading-more-students'
import { SexFilter } from '../../components/home/sex-filter'
import { useHomeController } from './home-controller'

export default function Home() {
  const {
    open,
    handleNavigation,
    handleOpenModal,
    handleCloseModal,
    students,
    handleUpdateStudentName,
    gender,
    handleUpdateGenderFilter,
    handleFilterGender,
    loadMore,
    isLoading,
  } = useHomeController()

  if (isLoading) {
    return <Loading />
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-zinc-100/95">
        <View className="h-32 bg-zinc-900 rounded-b-3xl px-8">
          <Text
            testID="title"
            className="text-xl font-bold font-title text-slate-300"
          >
            Innovate Tech
          </Text>
          <Input
            openModal={handleOpenModal}
            updateStudentName={handleUpdateStudentName}
          />
        </View>
        <View className="py-4 px-8">
          <Text
            testID="students-title"
            className="text-zinc-900 font-medium font-subTitle text-xl"
          >
            Alunos
          </Text>
        </View>
        <View className="px-8 flex-1">
          <FlatList
            testID="list-students"
            data={students}
            renderItem={({ item }) => (
              <StudentCard
                key={item.id}
                navigationUserDetail={handleNavigation}
                student={item}
              />
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View className="h-1" />}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            initialNumToRender={20}
            ListFooterComponent={() => <LoadingMoreStudents />}
          />
        </View>
        <BottomDrawer open={open} closeDrawer={handleCloseModal}>
          <SexFilter
            updateGender={handleUpdateGenderFilter}
            closeDrawer={handleCloseModal}
            filterGender={handleFilterGender}
            gender={gender}
          />
        </BottomDrawer>
      </View>
    </TouchableWithoutFeedback>
  )
}
