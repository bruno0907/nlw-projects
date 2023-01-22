import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../Loading";

type Props = {
  onScreenshotRequest: (screenshot: string | null) => void
  screenshot: string | null;
}

export function ScreenshotButton({ onScreenshotRequest, screenshot }: Props) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true)
    const canvas = await html2canvas(document.querySelector('html')!)
    const base64image = canvas.toDataURL('image/png')
    onScreenshotRequest(base64image)
    setIsTakingScreenshot(false)
  }

  if (screenshot) {
    return (
      <button 
        type="button"
        className={`
          p-1
          w-10
          h-10
          rounded-md
          border-transparent
          flex
          justify-end
          items-end
          text-zinc-400
          hover:text-zinc-100
          transition-colors          
        `}
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: 'right bottom',
          backgroundSize: 180,
          border: 'solid 1px #52525B'
        }}
        onClick={() => onScreenshotRequest(null)}
      >
        <Trash weight="fill"/>
      </button>
    )
  }

  return (
    <button
      type="button"
      className={`
        rounded-md      
        p-2
        bg-zinc-800
        hover:bg-zinc-700
        transition-colors
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-offset-zinc-900
        focus:ring-brand-500
      `}
      onClick={handleTakeScreenshot}
      
    >
      {isTakingScreenshot ? <Loading/> : <Camera className="w-6 h-6"/>}
    </button>
  )
}