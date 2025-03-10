import { EnergyType } from '../Energy';
import Archetype from './Archetypes';

export default class Ranger extends Archetype {
  private _energyType: EnergyType;
  private static _instances = 0;

  constructor(name:string) {
    super(name);
    this._energyType = 'stamina';
    Ranger._instances += 1;
  }

  static createdArchetypeInstances(): number {
    return Ranger._instances;
  }

  get energyType(): EnergyType {
    return this._energyType;
  }
}