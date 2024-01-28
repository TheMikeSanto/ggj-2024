import * as Phaser from 'phaser';

export class TitleScreen extends Phaser.Scene {

  constructor() {
    super({ key: 'TitleScreen'});
  }

  public create(): void {
    const logo = this.add.image(512, 512, 'logo');
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const text = this.add.text(screenCenterX, 75, 'Touch to start', {
      fontSize: '32pt',
      fontFamily: 'Public Pixel',
      color: 'white',
    }).setOrigin(0.5);
    setInterval(() => {
      text.alpha > 0
        ? text.setAlpha(0)
        : text.setAlpha(1);
    }, 1000);
    this.input.on('pointerdown', () => this.scene.start('GameScene'));
    this.input.on('pointerdownoutside', () => this.scene.start('GameScene'));
  }
}
