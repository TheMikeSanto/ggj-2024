import { Scene } from 'phaser';

import { AudienceMemberEntity } from '../entities/audience-member';

export class Game extends Scene {
  private stage;

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  create(): void {
    const audience =  [...new Array(8)].forEach((value, index) => {
      new AudienceMemberEntity(this, 100 + index * 80, 150)
    })
    this.stage = this.add.image(300, 840, 'stage');
  }
}
