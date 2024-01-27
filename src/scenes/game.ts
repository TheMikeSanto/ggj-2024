import * as Phaser from 'phaser';

import { AudienceMember, PeopleType } from '../entities/audience-member';
import { Button, ButtonColor } from '../entities/button';
import { Comedian } from '../entities/comedian';
import { Audience } from '../entities/audience';

export class Game extends Phaser.Scene {
  private audience: Audience;
  private stage;
  private background: Phaser.GameObjects.Group;
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
    this.background = this.createBackground();
    this.audience = new Audience(this);
    this.stage = this.add.image(510, 840, 'stage');

    this.redButton = new Button(this, ButtonColor.Red, 400, 760);
    this.blueButton = new Button(this, ButtonColor.Blue, 225, 760);
    this.greenButton = new Button(this, ButtonColor.Green, 400, 930);
    this.yellowButton = new Button(this, ButtonColor.Yellow, 225, 930);

    this.comedian = new Comedian(this, 775, 850);
  }

  private createBackground(): Phaser.GameObjects.Group {
    const { height, width } = this.scale;
    const bg = this.add.sprite(width * 0.5, height* 0.5, 'background');
    bg.setDepth(-1);
    const rows = [...new Array(8)].map((value, index) => {
      return this.add.sprite(width * 0.5, height * 0.5, `row-${index + 1}`);
    })
    return this.add.group([
      bg,
      ...rows,
    ])
  }
}
