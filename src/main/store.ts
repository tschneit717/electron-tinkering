import Ajv, { JSONSchemaType } from 'ajv'
import Store, { type Schema }  from 'electron-store';

type SchemaType = {
  character: {
    name: string,
    level: number,
    class: string,
    race: string,
    currentHitpoints: number,
    maxHitpoints: number,
    gold: number,
    inventory: {
      name: string,
      description: string,
      value: number,
      weight: number,
      quantity: number,
    }[]
  },
  settings: {
    openai: unknown
  },
  messages: {
    role: string,
    content: string
  }[]
}

const schema = {
  type: 'object',
  properties: {
    character: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        level: { type: 'number' },
        class: { type: 'string' },
        race: { type: 'string' },
        currentHitpoints: { type: 'number' },
        maxHitpoints: { type: 'number' },
        gold: { type: 'number' },
        inventory: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              description: { type: 'string' },
              value: { type: 'number' },
              weight: { type: 'number' },
              quantity: { type: 'number' },
            },
            required: []
          }
        },
      },
      required: []
    },
    settings: {
      type: 'object',
      properties: {
        openai: { type: 'object' }
      },
      required: []
    },
    messages: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          role: { type: 'string' },
          content: { type: 'string' }
        },
        required: []
      }
    }
  },
  required: ['character', 'settings', 'messages']
} as unknown as Schema<SchemaType>

const store = new Store({
  defaults: {
    character: {
      name: '',
      level: 0,
      class: '',
      race: '',
      currentHitpoints: 0,
      maxHitpoints: 0,
      gold: 0,
      inventory: []
    },
    settings: {
      openai: {}
    },
    messages: []
  }
});

export const get = (key: string) => {
  return store.get(key)
};
export const set = (key: string, value: string | object) => {
  return  store.set(key, value)
};
export const deleteKey = (key: keyof SchemaType) => store.delete(key);