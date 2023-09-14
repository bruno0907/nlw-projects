import { Label } from "@radix-ui/react-label";
import { Separator } from "@radix-ui/react-separator";
import { Check, FileVideo, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import { loadFFmpeg } from "@/lib/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { Progress } from "./ui/progress";
import { api } from "@/lib/axios";

type Status = 'converting' | 'uploading' | 'transcribing' | 'waiting' | 'success';

interface VideoImportFormatProps {
  onVideoUploaded: (id: string) => void;
}

const statusMessages = {
  converting: 'Convervendo...',
  uploading: 'Carregando...',
  transcribing: 'Transcrevendo...',
  success: 'Sucesso!'
}

export function VideoInputFormat({ onVideoUploaded }: VideoImportFormatProps) {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState<Status>('waiting');

  const promptInputRef = useRef<HTMLTextAreaElement>(null);

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget

    if(!files) return;

    const selectedFile = files[0];

    setVideoFile(selectedFile);
  }

  async function convertVideoToAudio(video: File) {
    try {
      console.log('Init conversion')

      setLoadingProgress(0)
      setStatusMessage('converting')

      const ffmpeg = await loadFFmpeg()

      await ffmpeg.writeFile('input.mp4', await fetchFile(video));

      ffmpeg.on('progress', progress => {
        console.log('Convesion progress ' + Math.round(progress.progress * 25))
        setLoadingProgress(prevState => prevState + (Math.round(progress.progress * 25)))
      });

      await ffmpeg.exec([
        '-i',
        'input.mp4',
        '-map',
        '0:a',
        '-b:a',
        '20k',
        '-acodec',
        'libmp3lame',
        'output.mp3'
      ])

      const data = await ffmpeg.readFile('output.mp3');

      const audioFileBlob = new Blob([data], { type: 'audio/mpeg' });
      const audioFile = new File([audioFileBlob], 'audio.mp3', {
        type: 'audio/mpeg',
      })

      console.log('End conversion')

      return audioFile

    } catch (error) {
      console.error(error)
    }
  }

  async function handleUploadVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const prompt = promptInputRef.current?.value;

    if(!videoFile) return;

    const audioFile = await convertVideoToAudio(videoFile)

    const formData = new FormData();
    formData.append('file', audioFile!)

    setStatusMessage('uploading')
    const response = await api.post('/videos', formData);

    const videoId = response.data.video.id

    setStatusMessage('transcribing')
    const transcription = await api.post(`/videos/${videoId}/transcription`, {
      prompt
    })
    console.log({ transcription })
    setStatusMessage('success')
    setLoadingProgress(0)

    onVideoUploaded(videoId)
  }

  const previewURL = useMemo(() => {
    if(!videoFile) return;

    return URL.createObjectURL(videoFile);
  }, [videoFile])

  return (
    <form className="space-y-6" onSubmit={handleUploadVideo}>
      <label
        htmlFor="video"
        className="relative cursor-pointer border w-full flex rounded-md aspect-video border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5 overflow-hidden"
      >
        {!previewURL ? (
          <>
            <FileVideo className="w-4 h-4" />
            Selecione um vídeo
          </>
        ) : (
          <video src={previewURL} controls={false} className="pointer-events-none absolute inset-0 aspect-video"/>
        )}
      </label>
      <input type="file" id="video" accept="video/mp4" className="sr-only" onChange={handleFileSelected} />

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="transcription-prompt">Prompt de transcrição</Label>
        <Textarea
          id="transcription-prompt"
          className="h-20 leading-relaxed resize-none"
          placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula"
          ref={promptInputRef}
          disabled={statusMessage !== 'waiting'}
        />
      </div>

      {(statusMessage === 'waiting' || statusMessage === 'success') ? (
        <Button
          type="submit"
          className="w-full data-[success=true]:bg-emerald-400"
          disabled={statusMessage !== 'waiting'}
          data-success={statusMessage === 'success'}
        >
            {statusMessage === 'success' && (
              <>
                {statusMessages.success}
                <Check className="w4 h4 ml-2" />
              </>
            )}
            {statusMessage === 'waiting' && (
              <>
                Carregar vídeo
                <Upload className="w-4 h-4 ml-2" />
              </>
            )}
        </Button>
      ) : (
        <>
          <span className="block text-sm text-muted-foreground">{statusMessages[statusMessage]}</span>
          <Progress value={loadingProgress} />
        </>
      )}

    </form>
  )
}
