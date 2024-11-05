import getRandomInt from './utils';
import Archetype from './Archetypes/Archetypes';
import Fighter, { SimpleFighter } from './Figther';
import Race, { Elf } from './Races';
import Energy, { EnergyType } from './Energy';
import { Mage } from './Archetypes';

export default class Character implements Fighter {
  private _name: string;
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _energy: Energy;
 
  constructor(name: string) {
    this._name = 'Tryndamere';
    this._dexterity = getRandomInt(1, 10);
    this._race = new Elf(name, this._dexterity);
    this._archetype = new Mage(name);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._energy = {
      type_: this._archetype.energyType,
      amount: getRandomInt(1, 10),
    };
  }

  get race(): Race {
    return this._race;
  }

  get archetype(): Archetype {
    return this._archetype;
  }

  get lifePoints(): number {
    return this._lifePoints;
  }

  get strength(): number {
    return this._strength;
  }

  get defense(): number {
    return this._defense;
  }

  get dexterity(): number {
    return this._dexterity;
  }

  get energyType(): EnergyType {
    return this._energy.type_; 
  }

  get energyAmount(): number {
    return this._energy.amount;
  }

  get energy(): Energy {
    return { type_: this.energyType, amount: this.energyAmount };
  }

  receiveDamage(attackPoints: number): number {
    const damage = attackPoints - this._defense;
    if (damage > 0) {
      this._lifePoints -= damage;
    } else {
      this._lifePoints -= 1;
    }
    if (this._lifePoints <= 0) {
      this._lifePoints = -1;
    }
    return this._lifePoints;
  }

  attack(enemy: SimpleFighter) {
    enemy.receiveDamage(this._strength);
  }

  levelUp(): void {
    this._maxLifePoints += getRandomInt(1, 10);
    if (this._maxLifePoints > this.race.maxLifePoints) {
      this._maxLifePoints = this.race.maxLifePoints;
    }
    this._strength += getRandomInt(1, 10);
    this._dexterity += getRandomInt(1, 10);
    this._defense += getRandomInt(1, 10);
    this._energy.amount = 10;
    if (this.lifePoints < this._maxLifePoints) {
      this._lifePoints = this._maxLifePoints;
    }
  }
  
  special(): void {
    const bonusStrength = getRandomInt(2, 5);
    const bonusDefense = getRandomInt(2, 5);
    this._strength += bonusStrength;
    this._defense += bonusDefense;
    console.log(`${this._name} activates his ult! dealing extra damage`);
  
    const enemy = new Character('Enemy'); 
    enemy.receiveDamage(this.strength + bonusStrength);
  
    setTimeout(() => {
      const newHp = Math.max(1, this._lifePoints);
      this._lifePoints = newHp;
      this._strength -= bonusStrength;
      this._defense -= bonusDefense;
      console.log(`${this._name} fury is gone, now he's mortal again`);
    }, 1000);
  }
}