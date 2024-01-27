import * as _ from 'lodash';
import * as Phaser from 'phaser';

export type PeopleTypes = 'blue-1' | 'blue-2' | 'green-1' | 'purple-1' | 'purple-2'
  | 'red-1' | 'red-2' | 'yellow-1' | 'yellow-2';

export class AudienceMemberEntity extends Phaser.GameObjects.Sprite {

  public static create(scene: Phaser.Scene, type: PeopleTypes, x, y, scale = 0.1): AudienceMemberEntity {
    return new AudienceMemberEntity(scene, type, x, y, scale);
  }

  constructor(scene: Phaser.Scene, type, x, y, scale) {
    super(scene, x, y, type, 0);
    scene.add.existing(this);
    this.setScale(scale);
  }

  public update(time: number, delta: number): void {
  }
}
