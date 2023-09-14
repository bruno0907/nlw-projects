import { api } from "@/lib/axios";

import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type PromptProps = {
  id: string;
  title: string;
  template: string;
}

export function PromptSelect() {
  const [promptOptions, setPromptOptions] = useState<PromptProps[]>([]);

  useEffect(() => {
    api.get('/prompts')
      .then(response => setPromptOptions(response.data))
      .catch(e => console.error(e))
  }, [])

  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt..." />
      </SelectTrigger>
      <SelectContent>
        {/* <SelectItem value="title">Título do Youtube</SelectItem>
        <SelectItem value="description">Descrição do Youtube</SelectItem> */}
        {promptOptions.map(prompt => <SelectItem key={prompt.id} value={prompt.template}>{prompt.title}</SelectItem>)}
      </SelectContent>
    </Select>
  )
}
