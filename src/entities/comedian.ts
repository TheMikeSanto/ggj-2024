import * as _ from 'lodash';
import * as Phaser from 'phaser';

export class Comedian extends Phaser.GameObjects.Sprite {

  constructor(scene: Phaser.Scene, x, y) {
    super(scene, x, y, 'dino-2', 0);
    scene.add.existing(this);
    this.setScale(0.75);
  }

  public update(time: number, delta: number): void {
  }
}
