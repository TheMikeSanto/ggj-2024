import * as Phaser from 'phaser';
import { EaseMoveTo } from 'phaser3-rex-plugins/plugins/easemove';

export class Curtains extends Phaser.GameObjects.Group {
  private duration = 500;
  private topCurtain: Phaser.GameObjects.Sprite;
  private leftCurtain: Phaser.GameObjects.Sprite;
  private rightCurtain: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene) {
    super(scene, []);
    const gameWidth = <number> scene.game.config.width;

    this.topCurtain = scene.add.sprite(this.screenCenterX, 0, 'curtains-top')
      .setOrigin(0.5, 0)
      .setDepth(1001)
      .setTint(0x930505)
      .setDisplaySize(1024, 650);
    this.leftCurtain = scene.add.sprite(0, 0,'curtains-left')
      .setOrigin(0, 0)
      .setDepth(1000)
      .setTint(0x930505)
      .setDisplaySize(512, 650);
    this.rightCurtain = scene.add.sprite(500, 0, 'curtains-right')
      .setOrigin(0, 0)
      .setDepth(1000)
      .setTint(0x930505)
      .setDisplaySize(512, 650);
    this.setDepth(1000);
    this.add(this.topCurtain);
    this.add(this.leftCurtain);
    this.add(this.rightCurtain);
  }

  public close(): Promise<void> {
    return new Promise<void>((resolve) => {
      EaseMoveTo(this.topCurtain, this.duration, this.screenCenterX, 0)

      setTimeout(() => {
        EaseMoveTo(this.leftCurtain, this.duration, 0, 0, 'bounce');
        EaseMoveTo(this.rightCurtain, this.duration, 500, 0, 'bounce');
      }, this.duration / 4);

      setTimeout(() => resolve(), this.duration * 2);
    });
  }

  public open(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      EaseMoveTo(this.leftCurtain, this.duration, -512, 0);
      EaseMoveTo(this.rightCurtain,this.duration, 1025, 0);
      setTimeout(() => EaseMoveTo(
        this.topCurtain,
        this.duration,
        this.screenCenterX,
        -1024,
      ), this.duration / 4)
      setTimeout(() => resolve(), this.duration * 2);
    });
  }

  private get screenCenterX(): number {
    return this.scene.cameras.main.worldView.x + this.scene.cameras.main.width / 2;
  }
}