import { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  Alert,
  Image,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Link, useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import * as SecureStore from 'expo-secure-store'

import Icon from '@expo/vector-icons/Feather'
import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import { api } from '../src/lib/api'

export default function NewMemory() {
  const router = useRouter()

  const { bottom, top } = useSafeAreaInsets()

  const [isPublic, setIsPublic] = useState(false)
  const [content, setContent] = useState('')
  const [preview, setPreview] = useState<null | string>(null)

  async function openImagePicker() {
    const previewImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (previewImage.canceled) return

    setPreview(previewImage.assets[0].uri)
  }

  async function handleCreateNewMemory() {
    const token = await SecureStore.getItemAsync('token')

    if (!preview) {
      Alert.alert('Selecione uma imagem ou vídeo de capa para a sua memória!')
      return
    }

    const uploadFormData = new FormData()

    const coverFile: any = {
      uri: preview,
      name: 'coverFile.jpg',
      type: 'image/jpeg',
    }

    uploadFormData.append('file', coverFile)

    try {
      const uploadResponse = await api.post('/upload', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      const coverUrl = uploadResponse.data.fileUrl

      await api.post(
        '/memories',
        {
          content,
          isPublic,
          coverUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      router.push('/memories')
    } catch (error) {
      Alert.alert('Ocorreu um erro', 'Não foi possível salvar sua capa')
      console.error(error)
    }
  }

  return (
    <View
      className="flex-1 px-8"
      style={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="mt-4 flex-row items-center justify-between">
        <NLWLogo />
        <Link href="/memories" asChild>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
            <Icon name="arrow-left" size={16} color="#FFF" />
          </TouchableOpacity>
        </Link>
      </View>

      <ScrollView className="my-6 space-y-6">
        <View className="flex-row items-center gap-2">
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            thumbColor={isPublic ? '#9b79ea' : '$9e9ea0'}
            trackColor={{ false: '#767577', true: '#372560' }}
          />
          <Text className="font-body text-base text-gray-200">
            Tornar memória pública
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="h-32 items-center justify-center rounded-lg border border-dashed border-gray-500 bg-black/20"
          onPress={openImagePicker}
        >
          {preview ? (
            <Image
              source={{ uri: preview }}
              alt="cover"
              className="h-full w-full rounded-lg object-cover"
            />
          ) : (
            <View className="flex-row items-center gap-2">
              <Icon name="image" color="rgb(158 158 160)" size={16} />
              <Text className="font-body text-sm text-gray-200">
                Adicionar foto ou vídeo de capa
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          multiline
          className="p-0 font-body text-lg text-gray-50"
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre"
          placeholderTextColor="#565650"
          textAlignVertical="top"
          value={content}
          onChangeText={setContent}
        />
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.7}
        className="mb-5 mt-auto items-center rounded-full bg-green-500 px-5 py-2"
        onPress={handleCreateNewMemory}
      >
        <Text className="font-alt text-sm uppercase text-black">Salvar</Text>
      </TouchableOpacity>
    </View>
  )
}
