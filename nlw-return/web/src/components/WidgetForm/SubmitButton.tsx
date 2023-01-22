import { ButtonHTMLAttributes } from "react"

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export function SubmitButton({ ...rest }: Props) {
  return (
    <button
      type="submit"
      className={`
      p-2 
      bg-brand-500 
      rounded-md 
      border-transparent 
      flex-1 
      flex 
      justify-center 
      items-center 
      text-sm 
      transition-colors
      disabled:opacity-50
      hover:bg-brand-300
      hover:disabled:bg-brand-500
      focus:outline-none
      focus:ring-2
      focus:ring-offset-2
      focus:ring-offset-zinc-900
      focus:ring-brand-500
    `}       
    {...rest}   
    >
      Enviar feedback
    </button>
  )
}