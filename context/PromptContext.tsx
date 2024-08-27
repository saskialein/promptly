import { createContext, ReactNode, useContext, useState } from 'react';

type PromptContextType = {
  prompt: string;
  setPrompt: (prompt: string) => void;
}

const PromptContext = createContext<PromptContextType | undefined>(undefined)

export const usePrompt = () => useContext(PromptContext) as PromptContextType

type PromptProviderProps = {
    children: ReactNode
}

export const PromptProvider = ({ children }: PromptProviderProps) => {
  const [prompt, setPrompt] = useState('');

  return (
    <PromptContext.Provider value={{ prompt, setPrompt }}>
      {children}
    </PromptContext.Provider>
  );
};