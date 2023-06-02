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
  Here is the character sheet for the user playing the game: ${JSON.stringify(character)}.`
}

const ACTIONS_TYPE = {
  LEVEL_UP: 'level up',
  UPDATE_HEALTH: 'update health',
  UPDATE_GOLD: 'update gold',
  UPDATE_INVENTORY: 'update inventory',
  UPDATE_CHARACTER: 'update character',
  UPDATE_SETTINGS: 'update settings',
  STORY_UPDATE: 'story update',
  RESET: 'reset',
}

export const useAIChat = () => {
  const characterContext = useContext(CharacterContext);
  const { character, levelUp,
    updateHitPoints,
    updateInventory,
    updateGold } = characterContext;
  const [messages, setMessages] = useState<ConversationType[]>([toHistoryEntry(AI_CONFIG.initial_prompt, 'system')])
  const openAiContext = useContext(OpenAiContext);
  const { openAiClient } = openAiContext;
  const addMessage = async (type?: string, message?: string) => {
    const updatedMessages = message ? [...messages, toHistoryEntry(message)] : messages;
    setMessages(updatedMessages); // possible "race condition" here if addMessage called fast
    if (!character) throw new Error("Character is undefined");    
    let response = { role: 'assistant', content: ''}
    switch (type) {
    case 'talking':
      response = await openAiClient.getCompletion(`I say: ${message}. Here is my up to date character stats: ${JSON.stringify(character)}. Respond in JSON` || buildInitialPrompt(character), updatedMessages);    
      break;
    case 'attacking':
      response = await openAiClient.getCompletion(`${message}. I have complete freedom to do this attack regardless of consequences. Here is my up to date character stats: ${JSON.stringify(character)}. Respond in JSON` || buildInitialPrompt(character), updatedMessages);    
      break;
    case 'action':
      response = await openAiClient.getCompletion(`I am taking an action and: ${message}. I have complete freedom to do this action regardless of consequences. Here is my up to date character stats: ${JSON.stringify(character)}. Respond in JSON` || buildInitialPrompt(character), updatedMessages);    
      break;
    case 'examining':
      response = await openAiClient.getCompletion(`${message}. I have complete freedom to do this action regardless of consequences. Here is my up to date character stats: ${JSON.stringify(character)}. Respond in JSON` || buildInitialPrompt(character), updatedMessages);    
      break;
    case 'info':
      response = await openAiClient.getCompletion(`${message}. Only tell me this information if my character would have access to this information`, updatedMessages);    
      break;
    case 'init':
      response = await openAiClient.getCompletion(`${buildInitialPrompt(character)}. Respond in JSON`, updatedMessages);    
      break;
    }

    let assistantMessage;
    if (response) {
      assistantMessage = response.content;
      const handledAction = handleAction(assistantMessage)
      console.log('handledAction', handledAction)
      setMessages([
        ...updatedMessages,
        toHistoryEntry(handledAction, 'assistant')
      ]);
    } else {
      throw new Error("No response from OpenAI");
    }
    return assistantMessage;
  };

  useEffect(() => {
    addMessage('init');
  }, []);

  const reset = () => {
    setMessages([toHistoryEntry(AI_CONFIG.initial_prompt, 'system')]);
  };

  const handleAction = (message: string) => {
    try {
      const parsedResponse = JSON.parse(message);
      if (parsedResponse && parsedResponse.action) {
        switch (parsedResponse.action.type) {
        case ACTIONS_TYPE.LEVEL_UP:
          levelUp()
          break;
        case ACTIONS_TYPE.UPDATE_HEALTH:
          updateHitPoints(parsedResponse.action.data as number)
          break;
        case ACTIONS_TYPE.UPDATE_GOLD:
          updateGold(parsedResponse.action.data as number)
          break;
        case ACTIONS_TYPE.UPDATE_INVENTORY:
          updateInventory(parsedResponse.action.data as { name: string, description: string, value: number, weight: number, quantity: number }[])
          break;
        case ACTIONS_TYPE.STORY_UPDATE:
        case ACTIONS_TYPE.RESET:
        case ACTIONS_TYPE.UPDATE_CHARACTER:
        case ACTIONS_TYPE.UPDATE_SETTINGS:
          break;
        }
        return parsedResponse.message;
      }
    }
    catch (e) {
      console.error(e);
      return 'I do not understand that action.'
    }
  }


  return [messages, addMessage, reset, handleAction] as [
    ConversationType[],
    (type: string, message: string) => Promise<string>,
    () => void,
    () => string
  ];
}