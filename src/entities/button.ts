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
    this.setInteractive();
    this.setScale(0.2);
    this.shake = new ShakePosition(this, {});
    this.on('pointerdown', () => this.shake.shake());
  }

  public update(time: number, delta: number): void {
  }
}
