import { feedbackTypes } from "../../../utils/feedbackTypes"

import { FeedbackType } from '..'
import { CloseButton } from "../../CloseButton";

type Props = {
  onFeedbackTypeChanged: (key: FeedbackType) => void;
}

export function FeedbackTypeStep({ onFeedbackTypeChanged }: Props) {
  return (
    <>
      <header>
        <span className="text-xl leading6">Deixe seu feedback</span>
        <CloseButton />
      </header>
      <div className="flex py-8 gap-2 w-full">
        {Object.entries(feedbackTypes).map(([key, feedback]) => {
          return (
            <button 
              key={key} 
              className={`
                w-24 
                h-28 
                p-8 
                flex 
                flex-1 
                flex-col 
                justify-center 
                items-center 
                gap-2 
                bg-zinc-800 
                rounded-lg 
                border-2 
                border-transparent 
                hover:border-brand-500 
                focus:border-brand-500 
                focus:outline-none`
              }
              type="button"
              onClick={() => onFeedbackTypeChanged(key as FeedbackType)}
            >
              <img src={feedback.image.src} alt={feedback.image.alt} />
              <span className="text-sm leading-6 text-zinc-100">{feedback.title}</span>
            </button>
          )
        })}
      </div>
    </>
  )
}