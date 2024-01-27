import { Scene } from 'phaser';

import { AudienceMember, PeopleType } from '../entities/audience-member';
import { Comedian } from '../entities/comedian';

export class Game extends Scene {
  private stage;

  private audience: AudienceMember[];

  private comedian: Comedian;

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  create(): void {
    this.audience =  [...new Array(38)].flatMap((value, index) => {
      return [
        AudienceMember.create(this, PeopleType.blue1, 15 + index * 20, 50),
        AudienceMember.create(this, PeopleType.blue2, 15 + index * 20, 100),
        AudienceMember.create(this, PeopleType.green1, 15 + index * 20, 150),
        AudienceMember.create(this, PeopleType.purple1, 15 + index * 20, 200),
        AudienceMember.create(this, PeopleType.purple2, 15 + index * 20, 250),
        AudienceMember.create(this, PeopleType.red1, 15 + index * 20, 300),
        AudienceMember.create(this, PeopleType.red2, 15 + index * 20, 350),
        AudienceMember.create(this, PeopleType.yellow1, 15 + index * 20, 400),
        AudienceMember.create(this, PeopleType.yellow2, 15 + index * 20, 450),
      ];
    });
    this.audience = [
      ...this.audience,
      AudienceMember.create(this, PeopleType.green1, 700, 350, 1),
    ];
    this.stage = this.add.image(300, 840, 'stage');

    this.add.image(210, 790, 'button-red').setScale(0.15);
    this.add.image(100, 790, 'button-blue').setScale(0.15);
    this.add.image(210, 900, 'button-green').setScale(0.15);
    this.add.image(100, 900, 'button-yellow').setScale(0.15);

    this.comedian = new Comedian(this, 650, 820);
  }

  public update(time: number, delta: number): void {
    this.audience.forEach(x => x.update(time, delta));
  }
}
