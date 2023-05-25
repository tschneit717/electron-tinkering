export interface InventoryItem {
  name: string
  description: string
  value: number
  weight: number
  quantity: number
}

export interface CharacterType {
  name: string
  level: number
  class: CharacterClassesEnum
  currentHitpoints: number
  maxHitpoints: number
  gold: number
  inventory: InventoryItem[]
}
export enum CharacterClassesEnum {
  Fighter = 'Fighter',
  Wizard = 'Wizard',
  Rogue = 'Rogue',
  Cleric = 'Cleric',
  Ranger = 'Ranger',
  Paladin = 'Paladin',
  Druid = 'Druid',
  Monk = 'Monk',
  Bard = 'Bard',
  Barbarian = 'Barbarian',
}