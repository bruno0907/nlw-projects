import bugImageUrl from '../assets/bug.svg'
import ideaImageUrl from '../assets/idea.svg'
import thoughtImageUrl from '../assets/thought.svg'


export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    placeholder: 'Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo...',
    image: {
      src: bugImageUrl,
      alt: 'Imagem de um inseto'
    }
  },
  IDEA: {
    title: 'Idéia',
    placeholder: 'Teve uma ideia de melhoria ou de nova funcionalidade? Conta pra gente!',
    image: {
      src: ideaImageUrl,
      alt: 'Imagem de uma lâmpada'
    }
  },
  OTHER: {  
    title: 'Outro',
    placeholder: 'Queremos te ouvir. O que você gostaria de nos dizer? ',
    image: {
      src: thoughtImageUrl,
      alt: 'Imagem de uma nuvem de pensamento'
    }
  }
}