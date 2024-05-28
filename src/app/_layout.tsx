import '../../msw.polyfills'

import { ENABLE_MOCK } from '@env'
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { QueryClientProvider } from '@tanstack/react-query'
import { Slot } from 'expo-router'
import { SafeAreaView, StatusBar, View } from 'react-native'

import { Loading } from '../components/loading'
import { StudentProvider } from '../providers/student-provider'
import { queryClient } from '../services/react-query'

async function enableMocking() {
  if (ENABLE_MOCK === 'true') {
    await import('../../msw.polyfills')
    const { server } = await import('../api/mock/index')
    server.listen()
  }
}

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  })

  if (!fontsLoaded) {
    return <Loading />
  }

  enableMocking()
    .then()
    .catch(() => {
      return <Loading />
    })

  return (
    <View className="flex-1">
      <StatusBar barStyle="default" />
      <QueryClientProvider client={queryClient}>
        <SafeAreaView
          className="bg-zinc-900 flex-1"
          style={{
            paddingTop: (StatusBar.currentHeight || 0) + 20,
          }}
        >
          <StudentProvider>
            <Slot />
          </StudentProvider>
        </SafeAreaView>
      </QueryClientProvider>
    </View>
  )
}
