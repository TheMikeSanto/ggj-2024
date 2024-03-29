import * as Phaser from 'phaser';

import { Audience } from '../entities/audience';
import { Button, ButtonColor } from '../entities/button';
import { Comedian } from '../entities/comedian';
import { Curtains } from '../entities/curtains';

export class Game extends Phaser.Scene {
  private audience: Audience;
  private stage;
  private background: Phaser.GameObjects.Group;
  private bgMusic;
  private comedian: Comedian;
  private currentLoop: Phaser.Time.TimerEvent;
  private curtains: Curtains;
  private blueButton: Button;
  private jokeValue = 500;
  private greenButton: Button;
  private redButton: Button;
  private roundDuration = 2000;
  private score: number = 0;
  private scoreCounter: Phaser.GameObjects.Text;
  private yellowButton: Button;

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  create(): void {
    this.background = this.createBackground();
    this.curtains = new Curtains(this);
    this.audience = new Audience(this);
    this.scoreCounter = this.createScoreCounter();
    this.stage = this.add.image(510, 820, 'stage');
    this.stage.setScale(1.1);
    this.stage.setDepth(20);
    this.comedian = new Comedian(this, 900, 850);
    this.redButton = new Button(this, ButtonColor.Red, 350, 750)
      .on('pointerdown', () => this.endRound('red'));
    this.blueButton = new Button(this, ButtonColor.Blue, 175, 750)
      .on('pointerdown', () => this.endRound('blue'));
    this.greenButton = new Button(this, ButtonColor.Green, 350, 920)
      .on('pointerdown', () => this.endRound('green'));
    this.yellowButton = new Button(this, ButtonColor.Yellow, 175, 920)
      .on('pointerdown', () => this.endRound('yellow'));
    setTimeout(() => {
      this.bgMusic = this.sound.add('music').setVolume(0.1).setLoop(true).play();
      this.sound.add('cheer').setVolume(0.3).play();
      this.doGameLoop();
    }, 1000);
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

  private createScoreCounter(): Phaser.GameObjects.Text {
    const bubble = this.add.graphics({ x: 5, y: 5 });
    bubble.fillStyle(0x111111, 1);
    bubble.fillRoundedRect(6, 6, 300, 80, 16);
    bubble.setDepth(10);
    const text = this.add.text(30, 35, this.score.toString(), {
      fontSize: '32pt',
      fontFamily: 'Public Pixel',
      color: 'white',
    });
    text.setDepth(11);
    return text;
  }

  private async doGameLoop(): Promise<void> {
    await this.curtains.open();
    this.audience.makeEmStand();
    [this.redButton, this.blueButton, this.greenButton, this.yellowButton].forEach(button => {
      button.enable();
    });

    this.currentLoop = this.time.addEvent({
      delay: this.roundDuration,
      startAt: 0,
      callback: () => this.endRound(),
    });
  }

  private endRound(jokeType?: string): void {
    this.currentLoop.remove();
    this.audience.makeEmSit();
    if (jokeType) {
      this.comedian.speak();
      this.score += this.audience.tellJoke(jokeType, this .jokeValue);
      this.scoreCounter.setText(this.score.toString());
    } else {
      this.audience.boo();
    }
    [this.redButton, this.blueButton, this.greenButton, this.yellowButton].forEach(button => {
      button.disable();
    });
    this.time.addEvent({
      delay: 1000,
      callback: () => this.doGameLoop()
    });
  }

  public update(time, delta) {
    this.audience.update(time, delta);
  }
}
