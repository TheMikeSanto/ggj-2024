import * as _ from 'lodash';
import * as Phaser from 'phaser';

export class AudienceMemberEntity extends Phaser.GameObjects.Sprite {

  constructor(scene: Phaser.Scene, x, y) {
    super(scene, x, y, 'blue-1', 4);
    scene.add.existing(this);
    this.setScale(0.3);
  }

  public update(): void {
   
  }
}
