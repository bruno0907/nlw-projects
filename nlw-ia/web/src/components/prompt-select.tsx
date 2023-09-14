import { api } from "@/lib/axios";

import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface PromptProps {
  id: string;
  title: string;
  template: string;
}

interface PromptSelectProps {
  onPromptSelect: (template: string) => void;
}

export function PromptSelect({ onPromptSelect }: PromptSelectProps) {
  const [promptOptions, setPromptOptions] = useState<PromptProps[]>([]);

  useEffect(() => {
    api.get('/prompts')
      .then(response => setPromptOptions(response.data))
      .catch(e => console.error(e))
  }, [])

  return (
    <Select onValueChange={onPromptSelect}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt..." />
      </SelectTrigger>
      <SelectContent>
        {promptOptions.map(prompt => {
          return (
            <SelectItem key={prompt.id} value={prompt.template}>{prompt.title}</SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
