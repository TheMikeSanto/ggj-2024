import * as _ from 'lodash';
import * as Phaser from 'phaser';

export class AudienceMemberEntity extends Phaser.GameObjects.Sprite {

  constructor(scene: Phaser.Scene, x, y) {
    super(scene, x, y, 'player', 4);
    scene.physics.add.existing(this);
    scene.add.existing(this);
  }

  public update(): void {
   
  }
}
