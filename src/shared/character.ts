export interface InventoryItem {
  name?: string
  item? : string
  quantity?: number
}

export interface CharacterType {
  name: string
  level: number
  class: CharacterClassesEnum
  race: CharacterRacesEnum
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

export enum CharacterRacesEnum {
  Human = 'Human',
  Elf = 'Elf',
  Dwarf = 'Dwarf',
  Halfling = 'Halfling',
  Gnome = 'Gnome',
  HalfElf = 'Half-Elf',
  HalfOrc = 'Half-Orc',
  Dragonborn = 'Dragonborn',
  Tiefling = 'Tiefling'
}