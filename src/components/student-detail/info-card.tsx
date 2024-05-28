import { ReactElement } from 'react'
import { Text, View } from 'react-native'

interface InfoCardProps {
  icon: ReactElement
  info: string | undefined
}

export function InfoCard({ info, icon }: InfoCardProps) {
  return (
    <View className="my-1 flex-row gap-x-2 shadow-sm shadow-zinc-500 rounded-full bg-zinc-50 border border-zinc-200 p-2">
      {icon}
      <Text className="text-base font-text">{info}</Text>
    </View>
  )
}
