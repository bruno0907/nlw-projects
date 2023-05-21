'use client'

import { Camera } from 'lucide-react'
import MediaPicker from '@/components/MediaPicker'
import { FormEvent } from 'react'
import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'

export default function NewMemoryForm() {
  const router = useRouter()

  async function handleCreateMemory(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const fileToUpload = formData.get('coverUrl')

    if (!fileToUpload?.length) {
      alert('Adicione uma capa à sua memória')
      return
    }

    const uploadFormData = new FormData()

    uploadFormData.set('file', fileToUpload)

    const uploadResponse = await api.post('/upload', uploadFormData)

    const coverUrl = uploadResponse.data.fileUrl

    const token = Cookie.get('token')
    const content = formData.get('content')
    const isPublic = formData.get('isPublic')

    if (!token) return
    if (!content) {
      alert('Adicione um conteúdo a sua memória')
      return
    }

    await api.post(
      '/memories',
      {
        coverUrl,
        content,
        isPublic: isPublic ?? false,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    router.push('/memories')
  }

  return (
    <form onSubmit={handleCreateMemory} className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar foto ou vídeo de capa
        </label>

        <label
          htmlFor="isPublic"
          className="flex cursor-pointer select-none items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
          />
          Tornar memória pública
        </label>
      </div>
      <MediaPicker />

      <textarea
        name="content"
        id="content"
        spellCheck="false"
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, videos e relatos sobre essa experiência que você quer lembrar para sempre."
      ></textarea>

      <button
        type="submit"
        className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
      >
        Salvar
      </button>
    </form>
  )
}
