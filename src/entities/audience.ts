import * as _ from 'lodash';

import { AudienceMember, PeopleType } from './audience-member';

export class Audience {
  private static readonly NUM_ROWS = 5;
  private static readonly NUM_SEATS = 10;
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
  }
  private members: AudienceMember[][] = this.generateAudience();

  constructor(private scene: Phaser.Scene) {
    this.members
  }

  private generateAudience(): AudienceMember[][] {
    return [...new Array(Audience.NUM_ROWS)].map((_value, rowIndex) => {
      const seats = [...new Array(Audience.NUM_SEATS)].map((_value, seatIndex) => {
        const { scale, pixelsPerSeatX, offsetY } = Audience.ROW_SCALES[rowIndex ];
        const type = _.sample(PeopleType);
        const x = 285 + (seatIndex * pixelsPerSeatX) - (rowIndex * 60);
        const y = 405 + (rowIndex * offsetY);
        const member = AudienceMember.create(this.scene, type, x, y, scale);
        member.setDepth(rowIndex)
        return member;
      });
      return seats;
    });
  }
}
