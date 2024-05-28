import { Feather } from '@expo/vector-icons'
import { TextInput, TouchableOpacity, View } from 'react-native'

interface InputProps {
  updateStudentName: (text: string) => void
  openModal: () => void
}

export function Input({ openModal, updateStudentName }: InputProps) {
  return (
    <View className="flex-row mt-4 bg-zinc-800 py-3 px-4 rounded-xl text-slate-400">
      <Feather name="search" size={24} color="#eee" />
      <TextInput
        testID="search-input"
        className="flex-1 pl-2 font-text text-slate-50 font-semibold"
        placeholder="Pesquisar aluno"
        placeholderTextColor="#eee"
        onChangeText={updateStudentName}
      />
      <TouchableOpacity
        testID="filter-button"
        onPress={openModal}
        activeOpacity={0.9}
      >
        <Feather name="sliders" size={24} color="#eee" />
      </TouchableOpacity>
    </View>
  )
}
