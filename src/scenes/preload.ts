import { Scene } from 'phaser';
import ProgressBar from '../lib/progress-bar';
import { assets } from '../../assets/manifest';

export default class Preload extends Scene {
  private downloadedSize: number;
  private progressBar: ProgressBar;

  constructor() {
    super({
      key: 'PreloadScene'
    });
  }

  preload(): void {
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    this.add.text(screenCenterX, screenCenterY, 'Loading', {
      fontSize: '48pt',
      fontFamily: 'Public Pixel',
      color: 'white',
    }).setOrigin(0.5);
    assets.images.forEach(({ name, path }) => {
      this.load.image(name, path);
    });
    assets.audio.forEach(({ name, path }) => {
      this.load.audio(name, path);
    });
  }

  create(): void {
    this.scene.start('TitleScreen');
  }
}
