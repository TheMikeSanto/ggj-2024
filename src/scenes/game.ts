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
    this.stage = this.add.image(510, 820, 'stage');
    this.stage.setScale(1.1);
    this.stage.setDepth(20);

    this.redButton = new Button(this, ButtonColor.Red, 400, 750);
    this.blueButton = new Button(this, ButtonColor.Blue, 225, 750);
    this.greenButton = new Button(this, ButtonColor.Green, 400, 920);
    this.yellowButton = new Button(this, ButtonColor.Yellow, 225, 920);

    this.comedian = new Comedian(this, 775, 850);
  }

  private createBackground(): Phaser.GameObjects.Group {
    const { height, width } = this.scale;
    const bg = this.add.sprite(width * 0.5, height* 0.5, 'background');
    bg.setDepth(-18);
    bg.setTint(0x40291c);
    const rows = [...new Array(8)].map((value, index) => {
      const row = this.add.sprite(width * 0.5, height * 0.5, `row-${index + 1}`);
      row.setDepth(8 - index * 2);
      row.setTint(0xe66213);
      return row;
    })
    return this.add.group([
      bg,
      ...rows,
    ])
  }
}
