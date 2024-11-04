import { EnergyType } from '../Energy';

export default abstract class Archetype {
  private name_: string;
  private special_: number;
  private cost_: number;

  constructor(name: string) {
    this.name_ = name;
    this.cost_ = 0;
    this.special_ = 0;
  }

  static createdArchetypeInstances(): number {
    throw new Error('Not Implemented');
  }

  get name(): string {
    return this.name_;
  }

  get cost(): number {
    return this.cost_;
  }

  get special(): number {
    return this.special_;
  }

  abstract get energyType(): EnergyType;
}