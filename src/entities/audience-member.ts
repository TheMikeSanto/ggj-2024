import * as _ from 'lodash';
import * as Phaser from 'phaser';

export enum PeopleType {
  blue1 = 'blue-1',
  blue2 = 'blue-2',
  green1 = 'green-1',
  purple1 = 'purple-1',
  purple2 = 'purple-2',
  red1 = 'red-1',
  red2 = 'red-2',
  yellow1 = 'yellow-1',
  yellow2 = 'yellow-2',
};

export class AudienceMember extends Phaser.GameObjects.Sprite {

  public static create(scene: Phaser.Scene, type: PeopleType, x, y, scale = 0.1): AudienceMember {
    return new AudienceMember(scene, type, x, y, scale);
  }

  constructor(scene: Phaser.Scene, type, x, y, scale) {
    super(scene, x, y, type, 0);
    scene.add.existing(this);
    this.setScale(scale);
  }

  public update(time: number, delta: number): void {
  }
}