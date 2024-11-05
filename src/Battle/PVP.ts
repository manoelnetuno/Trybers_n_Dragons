import Fighter from '../Fighter';
import Battle from './Battle';

class PVP extends Battle {
  private _enemy: Fighter;
  private _maxRounds;

  constructor(protected player: Fighter, enemy: Fighter, maxRounds = 100) {
    super(player);
    this._enemy = enemy;
    this._maxRounds = maxRounds;
  }

  get enemy(): Fighter {
    return this._enemy;
  }

  fight(): number {
    let rounds = 0;
    while (this.player.lifePoints > 0 && this.enemy.lifePoints > 0 && rounds < this._maxRounds) {
      this.player.attack(this.enemy);
      this._enemy.attack(this.player);
      const increment = 1;
      rounds += increment;
    }

    if (this.player.lifePoints > 0) {
      return 1; // player wins
    }
    return -1; // enemy wins
  }
}

export default PVP;