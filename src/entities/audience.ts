import * as _ from 'lodash';

import { AudienceMember, PeopleType } from './audience-member';

export class Audience {
  private static readonly NUM_ROWS = 5;
  private static readonly NUM_SEATS = 10;
  private static readonly ROW_SCALES = {
    0: {
      scale: 0.1,
      pixelsPerSeatX: 50,
      y_offset: 55,
    },
    1: {
      scale: 0.15,
      pixelsPerSeatX: 60,
      y_offset: 55,
    },
    2: {
      scale: 0.175,
      pixelsPerSeatX: 75,
      y_offset: 55,
    },
    3: {
      scale: 0.2,
      pixelsPerSeatX: 95,
      y_offset: 55,
    },
    4: {
      scale: 0.225,
      pixelsPerSeatX: 105,
      y_offset: 55,
    },
  }
  private members: AudienceMember[][] = this.generateAudience();

  constructor(private scene: Phaser.Scene) {
    this.members
  }

  private generateAudience(): AudienceMember[][] {
    return [...new Array(Audience.NUM_SEATS)].map((_value, seatIndex) => {
      return [...new Array(Audience.NUM_ROWS)].map((_value, rowIndex) => {
        const { scale, pixelsPerSeatX, y_offset } = Audience.ROW_SCALES[rowIndex ];
        if (rowIndex === 3) {
          console.log(scale, pixelsPerSeatX, y_offset);
        }
        const type = _.sample(PeopleType);
        const x = 275 + (seatIndex * pixelsPerSeatX) - (rowIndex * 60);
        const y = 380 + (rowIndex * y_offset);
        const member = AudienceMember.create(this.scene, type, x, y, scale);
        member.setDepth(rowIndex * 2)
        return member;
      });
    });
  }
}
