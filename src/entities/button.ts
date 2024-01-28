import * as _ from 'lodash';
import * as Phaser from 'phaser';
import ShakePosition from 'phaser3-rex-plugins/plugins/behaviors/shake/ShakePosition';

export enum ButtonColor {
  Red = 'red',
  Blue = 'blue',
  Green = 'green',
  Yellow = 'yellow',
};

export class Button extends Phaser.GameObjects.Sprite {
  private readonly shake: ShakePosition;

  constructor(scene: Phaser.Scene, color, x, y) {
    super(scene, x, y, `button-${color}`, 0);
    scene.add.existing(this);
    this.setDepth(21);
    this.setScale(0.24);
    this.shake = new ShakePosition(this, {
      magnitude: 10,
      duration: 1500,
    });
    this.on('pointerdown', () => this.shake.shake());
  }

  public enable(): void {
    this.setAlpha(1);
    this.setInteractive();
  }

  public disable(): void {
    this.setAlpha(0.25);
    this.disableInteractive();
  }
}
