import * as _ from 'lodash';
import * as Phaser from 'phaser';
import { EaseMoveTo, EaseMoveFrom } from 'phaser3-rex-plugins/plugins/easemove';

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
  private static readonly STAND_DISTANCE = 50;
  private static readonly STAND_DURATION = 500;
  private origin = { x: this.x, y: this.y };
  private isStanding = false;

  public static create(scene: Phaser.Scene, type: PeopleType, x, y, scale = 0.1): AudienceMember {
    const member = new AudienceMember(scene, type, x, y, scale);
    const chair = scene.add.sprite(member.x, member.y + 50, 'chair');
    chair.setScale(scale * 5);
    chair.setTint(0x9d4109);
    const layer = scene.add.layer();
    layer.add([chair, member]);
    layer.sendToBack(chair);
    return member;
  }

  constructor(scene: Phaser.Scene, type, x, y, scale) {
    super(scene, x, y, type, 0);
    scene.add.existing(this);
    this.setScale(scale);
  }

  public sitDown(): void {
    this.isStanding = false;
    EaseMoveTo(this, AudienceMember.STAND_DURATION, this.x, this.origin.y);
  }

  public standUp(): void {
    this.isStanding = true;
    EaseMoveTo(this, AudienceMember.STAND_DURATION, this.x, this.origin.y - AudienceMember.STAND_DISTANCE);
  }

  public update(time: number, delta: number): void {
  }
}
