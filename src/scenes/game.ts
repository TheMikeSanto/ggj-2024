import { Scene } from 'phaser';

import { AudienceMember, PeopleType } from '../entities/audience-member';
import { Comedian } from '../entities/comedian';
import { Audience } from '../entities/audience';

export class Game extends Scene {
  private audience: Audience;
  private stage;
  private background;
  private comedian: Comedian;

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  create(): void {
    this.audience = new Audience(this);
    this.stage = this.add.image(510, 840, 'stage');

    this.add.image(210, 790, 'button-red').setScale(0.15);
    this.add.image(100, 790, 'button-blue').setScale(0.15);
    this.add.image(210, 900, 'button-green').setScale(0.15);
    this.add.image(100, 900, 'button-yellow').setScale(0.15);

    this.comedian = new Comedian(this, 850, 820);
  }

  // public update(time: number, delta: number): void {
  //   this.audience.forEach(x => x.update(time, delta));
  // }
}
