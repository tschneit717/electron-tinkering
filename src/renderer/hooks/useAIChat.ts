import { useContext, useEffect, useState } from "react"
import { OpenAiContext } from "renderer/context/openAI";
import { AI_CONFIG } from "shared/config";
import { ChatCompletionMessageRoles, ConversationType } from "shared/types"

const toHistoryEntry = (message: string, role: ChatCompletionMessageRoles = 'user') => {
  const rv: ConversationType = {
    role,
    content: message,
  };
  return rv;
};


export const useAIChat = () => {
  const [messages, setMessages] = useState<ConversationType[]>([toHistoryEntry(AI_CONFIG.initial_prompt, 'system')])
  const openAiContext = useContext(OpenAiContext);
  const { openAiClient } = openAiContext;
  const addMessage = async (message?: string) => {
    const updatedMessages = message ? [...messages, toHistoryEntry(message)] : messages;
    setMessages(updatedMessages); // possible "race condition" here if addMessage called fast
    const response = await openAiClient.getCompletion(message || AI_CONFIG.initial_prompt, updatedMessages);

    let assistantMessage;
    if (response) {
      assistantMessage = response.content;
      setMessages([
        ...updatedMessages,
        toHistoryEntry(assistantMessage, 'assistant')
      ]);
    } else {
      throw new Error("No response from OpenAI");
    }
    return assistantMessage;
  };

  useEffect(() => {
    addMessage();
  }, []);

  const reset = () => {
    setMessages([toHistoryEntry(AI_CONFIG.initial_prompt, 'system')]);
  };


  return [messages, addMessage, reset] as [
    ConversationType[],
    (message: string) => Promise<string>,
    () => void
  ];
}