import * as _ from 'lodash';
import * as Phaser from 'phaser';
import { EaseMoveToDestroy } from 'phaser3-rex-plugins/plugins/easemove';

export class FadingScore extends Phaser.GameObjects.Text {

  private static readonly Distance = 50;

  private static readonly Duration = 1000;

  constructor(scene: Phaser.Scene, text: string, x, y) {
    super(scene, x, y, text, {
      color: 'white',
      fontFamily: 'Public Pixel',
      fontSize: '24pt',
    });
    scene.add.existing(this);
    this.setShadow(5, 5, 'rgba(0,0,0,1)', 0);

    this.setDepth(999);
    EaseMoveToDestroy(this, FadingScore.Duration, x, y - FadingScore.Distance);
  }
}
