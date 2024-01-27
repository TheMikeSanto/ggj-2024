import { Scene } from 'phaser';

import { AudienceMemberEntity } from '../entities/audience-member';

export class Game extends Scene {
  private stage;

  private audience: AudienceMemberEntity[];

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  create(): void {
    this.audience =  [...new Array(38)].flatMap((value, index) => {
      return [
        AudienceMemberEntity.create(this, 'blue-1', 15 + index * 20, 50),
        AudienceMemberEntity.create(this, 'blue-2', 15 + index * 20, 100),
        AudienceMemberEntity.create(this, 'green-1', 15 + index * 20, 150),
        AudienceMemberEntity.create(this, 'purple-1', 15 + index * 20, 200),
        AudienceMemberEntity.create(this, 'purple-2', 15 + index * 20, 250),
        AudienceMemberEntity.create(this, 'red-1', 15 + index * 20, 300),
        AudienceMemberEntity.create(this, 'red-2', 15 + index * 20, 350),
        AudienceMemberEntity.create(this, 'yellow-1', 15 + index * 20, 400),
        AudienceMemberEntity.create(this, 'yellow-2', 15 + index * 20, 450),
      ];
    });
    this.audience = [...this.audience, AudienceMemberEntity.create(this, 'green-1', 700, 350, 1)];
    this.stage = this.add.image(300, 840, 'stage');

    this.add.image(210, 790, 'button-red').setScale(0.15);
    this.add.image(100, 790, 'button-blue').setScale(0.15);
    this.add.image(210, 900, 'button-green').setScale(0.15);
    this.add.image(100, 900, 'button-yellow').setScale(0.15);
  }

  public update(time: number, delta: number): void {
    this.audience.forEach(x => x.update(time, delta));
  }
}
