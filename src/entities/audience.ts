import * as _ from 'lodash';

import { AudienceMember, GiggleType, PeopleType } from './audience-member';

export class Audience {
  private static readonly NUM_ROWS = 5;
  private static readonly NUM_SEATS = 10;
  private static readonly NUM_STANDERS = 15;
  private static readonly ROW_SCALES = {
    0: {
      scale: 0.2,
      pixelsPerSeatX: 65,
      offsetY: 50,
    },
    1: {
      scale: 0.225,
      pixelsPerSeatX: 75,
      offsetY: 50,
    },
    2: {
      scale: 0.25,
      pixelsPerSeatX: 85,
      offsetY: 50,
    },
    3: {
      scale: 0.275,
      pixelsPerSeatX: 95,
      offsetY: 50,
    },
    4: {
      scale: 0.3,
      pixelsPerSeatX: 100,
      offsetY: 50,
    },
  };
  private booSounds;
  private excitedMembers: AudienceMember[] = [];
  private members: AudienceMember[][] = this.generateAudience();

  constructor(private scene: Phaser.Scene) {
    this.booSounds = [
      this.scene.sound.add('boo1').setVolume(0.5),
      this.scene.sound.add('boo2').setVolume(0.5),
      this.scene.sound.add('boo3').setVolume(0.5),
    ];
  }

  public boo(): void {
    _.sample(this.booSounds).play();
  }

  public makeEmStand(): AudienceMember[] {
    const members = _(this.members)
      .flatten()
      .sampleSize(Audience.NUM_STANDERS)
      .value();
    members.forEach(member => member.standUp());
    this.excitedMembers = members;
    return members;
  }

  public makeEmSit(): void {
    this.excitedMembers.forEach(member => member.sitDown());
  }

  public tellJoke(type: string, scorePerJoke: number): number {
    this.excitedMembers.forEach(member => member.sitDown());
    const members = this.excitedMembers.filter(member => member.peopleType.includes(type));
    members.forEach((member, index) => {
      member.tellJoke(scorePerJoke);
      setTimeout(() => member.giggle(), index * 200);
    });
    return members.length * scorePerJoke;
  }

  private generateAudience(): AudienceMember[][] {
    return [...new Array(Audience.NUM_ROWS)].map((_value, rowIndex) => {
      const seats = [...new Array(Audience.NUM_SEATS)].map((_value, seatIndex) => {
        const { scale, pixelsPerSeatX, offsetY } = Audience.ROW_SCALES[rowIndex ];
        const type = _.sample(PeopleType);
        const x = 285 + (seatIndex * pixelsPerSeatX) - (rowIndex * 60);
        const y = 405 + (rowIndex * offsetY);
        const giggleSound = _.sample(GiggleType)
        const member = AudienceMember.create(this.scene, type, x, y, scale, giggleSound);
        member.setDepth(rowIndex)
        return member;
      });
      return seats;
    });
  }
}
