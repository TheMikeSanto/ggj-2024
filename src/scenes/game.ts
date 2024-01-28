import * as Phaser from 'phaser';

import { Audience } from '../entities/audience';
import { Button, ButtonColor } from '../entities/button';
import { Comedian } from '../entities/comedian';
import { FadingScore } from '../entities/fading-score';

export class Game extends Phaser.Scene {
  private audience: Audience;
  private stage;
  private background: Phaser.GameObjects.Group;
  private comedian: Comedian;
  private currentLoop: Phaser.Time.TimerEvent;
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

    this.comedian = new Comedian(this, 900, 850);

    this.redButton = new Button(this, ButtonColor.Red, 350, 750);
    this.blueButton = new Button(this, ButtonColor.Blue, 175, 750);
    this.greenButton = new Button(this, ButtonColor.Green, 350, 920);
    this.yellowButton = new Button(this, ButtonColor.Yellow, 175, 920);

    this.redButton.on('pointerdown', () => this.endRound('red'));

    this.blueButton.on('pointerdown', () => this.endRound('blue'));

    this.greenButton.on('pointerdown', () => this.endRound('green'));

    this.yellowButton.on('pointerdown', () => this.endRound('yellow'));

    this.doGameLoop();
  }

  private createBackground(): Phaser.GameObjects.Group {
    const { height, width } = this.scale;
    const bg = this.add.sprite(width * 0.5, height* 0.5, 'background');
    const lights = this.add.sprite(width * 0.5, height * 0.5, 'lights');
    bg.setDepth(-18);
    bg.setTint(0x40291c);
    lights.setDepth(-17);
    lights.setTint(0x754b33);
    return this.add.group([
      bg,
      lights,
    ]);
  }

  private doGameLoop(): void {
    const excitedMembers = this.audience.makeEmStand();
    [this.redButton, this.blueButton, this.greenButton, this.yellowButton].forEach(button => {
      button.enable();
    });

    this.currentLoop = this.time.addEvent({
      delay: 5000,
      startAt: 0,
      callback: () => this.endRound(),
    });
  }

  private endRound(color?: string): void {
    this.currentLoop.remove();
    this.audience.makeEmSit();
    if (color) {
      this.audience.tellJoke(color);
      this.comedian.speak();
    }
    [this.redButton, this.blueButton, this.greenButton, this.yellowButton].forEach(button => {
      button.disable();
    });
    this.time.addEvent({
      delay: 1000,
      callback: () => this.doGameLoop()
    });
  }
}
