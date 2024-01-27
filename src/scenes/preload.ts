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
    assets.forEach(({ name, path }) => {
      this.load.image(name, path);
    });
  }

  create(): void {
    this.scene.start('GameScene');
  }
}
