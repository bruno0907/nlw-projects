import { useEffect, useState } from 'react'
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Link, useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from '@expo/vector-icons/Feather'
import { api } from '../src/lib/api'
import * as SecureStore from 'expo-secure-store'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'

import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'

dayjs.locale(ptBr)

type MemoryType = {
  id: string
  isPublic: boolean
  excerpt: string
  coverUrl: string
  createdAt: string
}

export default function Memories() {
  const router = useRouter()

  const { bottom, top } = useSafeAreaInsets()

  const [memories, setMemories] = useState<MemoryType[]>(null)

  async function handleSignOut() {
    await SecureStore.deleteItemAsync('token')
    router.push('/')
  }

  async function handleFetchMemories() {
    try {
      const token = await SecureStore.getItemAsync('token')
      const response = await api.get('/memories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response) return

      const { data } = response

      setMemories(data)
    } catch (error) {
      Alert.alert('Um erro ocorreu', 'Ocorreu um erro ao buscar as memórias...')
    }
  }

  useEffect(() => {
    handleFetchMemories()
  }, [])

  return (
    <View className="flex-1" style={{ paddingBottom: bottom, paddingTop: top }}>
      <View className="mt-4 flex-row items-center justify-between px-8">
        <NLWLogo />
        <View className="flex-row items-center gap-4">
          <TouchableOpacity
            className="h-10 w-10 items-center justify-center rounded-full bg-purple-500"
            onPress={handleSignOut}
          >
            <Icon name="log-out" size={16} color="#FFF" />
          </TouchableOpacity>
          <Link href="/new" asChild>
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <Icon name="plus" size={16} color="#000" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>
      <ScrollView className="mt-6 space-y-10">
        {memories?.map((memory) => {
          return (
            <View key={memory.id} className="space-y-4">
              <View className="flex-row items-center gap-2">
                <View className="h-px w-5 bg-gray-50" />
                <Text className="font-body text-xs text-gray-100">
                  {dayjs(memory.createdAt).format('D[ de ]MMMM[ de ]YYYY')}
                </Text>
              </View>
              <View className="space-y-4 px-8">
                <Image
                  source={{ uri: memory.coverUrl }}
                  className="aspect-video rounded-lg"
                  alt=""
                />
                <Text className="font-body text-base leading-relaxed text-gray-100">
                  {memory.excerpt}
                </Text>
                <Link href="/memories/id" asChild>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    className="flex-row items-center gap-2"
                  >
                    <Text className="font-body text-sm text-gray-200">
                      Ler mais
                    </Text>
                    <Icon name="arrow-right" size={16} color="#9e9ea0" />
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}
