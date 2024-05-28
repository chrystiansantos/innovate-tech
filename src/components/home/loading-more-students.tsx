import { ActivityIndicator, View } from 'react-native'

export function LoadingMoreStudents() {
  return (
    <View className="p-8">
      <ActivityIndicator color="#212529" />
    </View>
  )
}
