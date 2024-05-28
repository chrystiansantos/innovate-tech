import { Feather } from '@expo/vector-icons'
import { Image, Text, TouchableOpacity, View } from 'react-native'

import { Student } from '@/src/providers/student-provider'

interface StudentCardProps {
  student: Student
  navigationUserDetail: (student: Student) => void
}

export function StudentCard({
  student,
  navigationUserDetail,
}: StudentCardProps) {
  return (
    <TouchableOpacity
      className="h-20"
      activeOpacity={0.9}
      onPress={() => navigationUserDetail(student)}
    >
      <View className="flex-1 w-full">
        <View
          className={`flex-row border border-zinc-400 rounded-xl items-center py-2 border-l-8 rounded-l-md bg-white/50 ${student.gender === 'male' ? 'border-l-blue-400' : 'border-l-pink-400'}`}
        >
          <Image
            className="w-14 h-14 rounded-full ml-2"
            source={{ uri: student.picture }}
            alt={student.name}
          />
          <View className="h-12 justify-between flex-1 ml-2">
            <Text className="font-semibold text-base text-slate-900 font-title">
              {student.name}
            </Text>
            <View className="flex-row justify-between items-center">
              <Text className="font-medium text-slate-600 text-sm font-subTitle capitalize">
                {student.gender}
              </Text>
              <Text className="font-medium text-slate-600 text-xs font-subTitle">
                {student.born}
              </Text>
            </View>
          </View>
          <View className="mx-2">
            <Feather name="chevron-right" size={28} color="black"></Feather>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
