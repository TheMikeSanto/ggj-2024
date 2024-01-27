import * as _ from 'lodash';

import { AudienceMember, PeopleType } from './audience-member';

export class Audience {
  private static readonly NUM_ROWS = 5;
  private static readonly NUM_SEATS = 10;
  private members: AudienceMember[][] = this.generateAudience();

  constructor(private scene: Phaser.Scene) {
    this.members
  }

  private generateAudience(): AudienceMember[][] {
    return [...new Array(Audience.NUM_SEATS)].map((_value, seatIndex) => {
      return [...new Array(Audience.NUM_ROWS)].map((_value, rowIndex) => {
        console.log(PeopleType);
        const type = _.sample(PeopleType);
        console.log(type);
        const x = 100 + seatIndex * 55;
        const y = 100 + rowIndex * 50;
        const scale = 0.2;
        return AudienceMember.create(this.scene, type, x, y, scale);
      });
    });
  }
}
