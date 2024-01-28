import * as _ from 'lodash';
import * as Phaser from 'phaser';
import { EaseMoveTo, EaseMoveFrom } from 'phaser3-rex-plugins/plugins/easemove';
import { FadingScore } from './fading-score';
import { Game } from '../scenes/game';

export enum GiggleType {
  hah1 = 'hah-1',
  hah2 = 'hah-2',
  hah3 = 'hah-3',
  heh1 = 'heh-1',
  huh1 = 'huh-1',
};

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
  public peopleType: PeopleType;
  private origin = { x: this.x, y: this.y };
  private isStanding = false;
  private giggleSound: Phaser.Sound.BaseSound;

  public static create(scene: Phaser.Scene, type: PeopleType, x, y, scale = 0.1, giggleType: GiggleType): AudienceMember {
    const member = new AudienceMember(scene, type, x, y, scale, giggleType);
    const chair = scene.add.sprite(member.x, member.y + 50, 'chair');
    chair.setScale(scale * 5);
    chair.setTint(0x9d4109);
    const layer = scene.add.layer();
    layer.add([chair, member]);
    layer.sendToBack(chair);
    return member;
  }
  
  constructor(scene: Phaser.Scene, type, x, y, scale, giggleType: GiggleType) {
    super(scene, x, y, type, 0);
    this.peopleType = type;
    scene.add.existing(this);
    this.setScale(scale);
    this.giggleSound = scene.sound.add(giggleType);
  }

  public giggle(): void {
    this.giggleSound.play();
  }

  public sitDown(): void {
    this.isStanding = false;
    EaseMoveTo(this, AudienceMember.STAND_DURATION, this.x, this.origin.y);
  }

  public standUp(): void {
    this.isStanding = true;
    EaseMoveTo(this, AudienceMember.STAND_DURATION, this.x, this.origin.y - AudienceMember.STAND_DISTANCE);
  }

  public tellJoke(jokeValue: number): void {
    new FadingScore(this.scene, `+${jokeValue}`, this.x, this.y);
  }

  public update(time: number, delta: number): void {
  }
}
