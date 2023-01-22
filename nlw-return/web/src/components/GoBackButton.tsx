import { ArrowLeft } from "phosphor-react";

type Props = {
  onGoBackRequest: () => void;
}

export function GoBackButton({ onGoBackRequest }: Props) {
  return (
    <button 
      className="absolute top-5 left-5 text-zinc-400 hover:text-zinc-100" 
      title="Voltar passo do formulário de feedback"
      onClick={onGoBackRequest}
    >
      <ArrowLeft weight="bold" className="h-4 w-4"/>
    </button>
  )
}