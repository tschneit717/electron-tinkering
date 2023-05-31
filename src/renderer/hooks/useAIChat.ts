import { useContext, useEffect, useState } from "react"
import { CharacterContext } from "renderer/context/characterContext";
import { OpenAiContext } from "renderer/context/openAI";
import { CharacterType } from "shared/character";
import { AI_CONFIG } from "shared/config";
import { ChatCompletionMessageRoles, ConversationType } from "shared/types"

const toHistoryEntry = (message: string, role: ChatCompletionMessageRoles = 'user') => {
  const rv: ConversationType = {
    role,
    content: message,
  };
  return rv;
};

const buildInitialPrompt = (character: CharacterType) => {
  return `${AI_CONFIG.initial_prompt} .
  Here is the character sheet for the user playing the game: ${JSON.stringify(character)}
  
  You are always to refer to this character information when asked a question about who the player is`
}

const ACTIONS_TYPE = {
  LEVEL_UP: 'level up',
  UPDATE_HEALTH: 'update health',
  UPDATE_GOLD: 'update gold',
  UPDATE_INVENTORY: 'update inventory',
  UPDATE_CHARACTER: 'update character',
  UPDATE_SETTINGS: 'update settings',
  RESET: 'reset',
}

export const useAIChat = () => {
  const characterContext = useContext(CharacterContext);
  const { character } = characterContext;
  const [messages, setMessages] = useState<ConversationType[]>([toHistoryEntry(AI_CONFIG.initial_prompt, 'system')])
  const openAiContext = useContext(OpenAiContext);
  const { openAiClient } = openAiContext;
  const addMessage = async (message?: string) => {
    const updatedMessages = message ? [...messages, toHistoryEntry(message)] : messages;
    setMessages(updatedMessages); // possible "race condition" here if addMessage called fast
    if (!character) throw new Error("Character is undefined");    
    const response = await openAiClient.getCompletion(message || buildInitialPrompt(character), updatedMessages);

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

  const handleAction = (message: string) => {
    try {
      const parsedResponse = JSON.parse(message);
      const response = {};
      if (parsedResponse && parsedResponse.action) {
        switch (parsedResponse.action) {
        case ACTIONS_TYPE.LEVEL_UP:
          
          break;
        case ACTIONS_TYPE.UPDATE_HEALTH:
          break;
        case ACTIONS_TYPE.UPDATE_GOLD:
          break;
        case ACTIONS_TYPE.UPDATE_INVENTORY:
          break;
        case ACTIONS_TYPE.UPDATE_CHARACTER:
          break;
        case ACTIONS_TYPE.UPDATE_SETTINGS:
          break;
        case ACTIONS_TYPE.RESET:
          reset();
          break;
        default:
          break;
        }
      }
    }
    catch (e) {
      console.log(e);
    }
  }


  return [messages, addMessage, reset, handleAction] as [
    ConversationType[],
    (message: string) => Promise<string>,
    () => void,
    () => void
  ];
}