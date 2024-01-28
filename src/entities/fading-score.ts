import * as _ from 'lodash';
import * as Phaser from 'phaser';
import { EaseMoveToDestroy } from 'phaser3-rex-plugins/plugins/easemove';
import FadeOutDestroy from 'phaser3-rex-plugins/plugins/fade-out-destroy';

export class FadingScore extends Phaser.GameObjects.Text {

  private static readonly Distance = 50;

  private static readonly Duration = 2500;

  constructor(scene: Phaser.Scene, text: string, x, y) {
    super(scene, x, y, text, {
      color: 'white',
      fontFamily: 'Public Pixel',
      fontSize: '36pt',
    });
    scene.add.existing(this);
    this.setShadow(5, 5, 'rgba(0,0,0,1)', 0)

    this.setDepth(999);
    EaseMoveToDestroy(this, FadingScore.Duration, x, y - FadingScore.Distance);
  }
}
