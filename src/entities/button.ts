import * as _ from 'lodash';
import * as Phaser from 'phaser';

export enum ButtonColor {
  Red = 'red',
  Blue = 'blue',
  Green = 'green',
  Yellow = 'yellow',
};

export class Button extends Phaser.GameObjects.Sprite {

  private static readonly DefaultAngle = 0;

  private static readonly DefaultScale = 0.20;

  private static readonly PressedAngle = 2;

  private static readonly PressedScale = 0.19;

  constructor(scene: Phaser.Scene, color, x, y) {
    super(scene, x, y, `button-${color}`, 0);
    scene.add.existing(this);
    this.setInteractive();

    this.on('pointerdown', () => this.setPressedState());
    this.on('pointerup', () => this.setDefaultState());
    this.on('pointerout', () => this.setDefaultState());
    this.setDefaultState()
  }

  public update(time: number, delta: number): void {
  }

  private setDefaultState() {
    this.setAngle(Button.DefaultAngle);
    this.setScale(Button.DefaultScale);
  }

  private setPressedState() {
    this.setAngle(Button.PressedAngle);
    this.setScale(Button.PressedScale);
  }
}
