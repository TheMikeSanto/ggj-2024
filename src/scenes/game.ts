import { Scene } from 'phaser';

import { AudienceMember, PeopleType } from '../entities/audience-member';
import { Button, ButtonColor } from '../entities/button';
import { Comedian } from '../entities/comedian';
import { Audience } from '../entities/audience';

export class Game extends Scene {
  private audience: Audience;
  private stage;
  private background;
  private comedian: Comedian;

  private blueButton: Button;

  private greenButton: Button;

  private redButton: Button;

  private yellowButton: Button;

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  create(): void {
    this.audience = new Audience(this);
    this.stage = this.add.image(510, 840, 'stage');

    this.redButton = new Button(this, ButtonColor.Red, 375, 780);
    this.blueButton = new Button(this, ButtonColor.Blue, 225, 780);
    this.greenButton = new Button(this, ButtonColor.Green, 375, 930);
    this.yellowButton = new Button(this, ButtonColor.Yellow, 225, 930);

    this.comedian = new Comedian(this, 775, 850);
  }

  // public update(time: number, delta: number): void {
  //   this.audience.forEach(x => x.update(time, delta));
  // }
}
