import { Text } from 'react-native'

interface TitleInfo {
  title: string | undefined
}

export function TitleInfo({ title }: TitleInfo) {
  return (
    <Text className="my-2 text-xl font-semibold text-slate-800 font-subTitle">
      {title}
    </Text>
  )
}
