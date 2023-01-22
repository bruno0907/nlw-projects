
import { FormEvent, useState } from "react";
import { FeedbackType } from "..";
import { feedbackTypes } from "../../../utils/feedbackTypes";
import { CloseButton } from "../../CloseButton";
import { GoBackButton } from "../../GoBackButton";
import { ScreenshotButton } from "../ScreenshotButton";

import { SubmitButton } from "../SubmitButton";

type Props = {
  feedbackType: FeedbackType
  onFeedbackRestartRequest: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({ feedbackType, onFeedbackRestartRequest, onFeedbackSent }: Props) {
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState('')
  const { image, title, placeholder } = feedbackTypes[feedbackType] 

  function handleSubmitFeedback(e: FormEvent) {
    e.preventDefault()

    console.log({
      screenshot,
      comment
    })

    onFeedbackSent()
  }

  return (
    <>
      <header>
        <GoBackButton onGoBackRequest={onFeedbackRestartRequest} />
        <span className="text-xl leading-6 flex items-center gap-2">
          <img src={image.src} alt={image.alt} className="w-6 h-6 ml-auto" />
          {title}
        </span>
        <CloseButton />
      </header>
      <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
        <textarea 
          name="feedback" 
          id="feedback"
          placeholder={placeholder}
          onChange={({ target }) => setComment(target.value)}
          value={comment}
          className={`
            min-w-[304px]
            w-full
            min-h-[112px]
            my-1
            text-sm
            placeholder-zinc-400
            text-zinc-100            
            bg-transparent
            border-1 
            border-zinc-600 
            rounded-md            
            hover:border-brand-500 
            focus:border-brand-500
            focus:ring-brand-500
            focus:ring-1            
            focus:outline-none
            resize-none
            scrollbar
          `}
        />

        <footer className="flex gap-2">
          <ScreenshotButton 
            onScreenshotRequest={setScreenshot} 
            screenshot={screenshot}
          />
          <SubmitButton disabled={!comment} />
        </footer>
        
      </form>
    </>
  )
}