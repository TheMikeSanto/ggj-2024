import * as _ from 'lodash';
import * as Phaser from 'phaser';
import FadeOutDestroy from 'phaser3-rex-plugins/plugins/fade-out-destroy.js';

export class Comedian extends Phaser.GameObjects.Sprite {

  private static readonly CharacterSet = " $0123456789?@ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  private mumble1: Phaser.Sound.BaseSound;
  private mumble2: Phaser.Sound.BaseSound;
  private mumble3: Phaser.Sound.BaseSound;
  private mumble4: Phaser.Sound.BaseSound;

  constructor(scene: Phaser.Scene, x, y) {
    super(scene, x, y, 'dino-2', 0);
    scene.add.existing(this);
    this.setDepth(21);
    this.setScale(0.95);

    this.mumble1 = scene.sound.add('mumble-1');
    this.mumble2 = scene.sound.add('mumble-2');
    this.mumble3 = scene.sound.add('mumble-3');
    this.mumble4 = scene.sound.add('mumble-4');
  }

  public speak() {
    const origin = { x: this.x - 425, y: this.y - 170 };

    const group = new Phaser.GameObjects.Group(this.scene);

    const bubble = this.scene.add.graphics(origin);
    bubble.fillStyle(0x111111, 1);
    bubble.fillRoundedRect(6, 6, 300, 80, 16);

    const what = _(Comedian.CharacterSet)
                  .split('')
                  .sampleSize(8)
                  .join('');

    const text = this.scene.add.text(origin.x + 25, origin.y + 25, what, {
      fontFamily: 'Dinotopian',
      fontSize: '24pt',
      color: 'white',
    });

    group.add(bubble);
    group.add(text);
    group.setDepth(999);

    _.sample([this.mumble1, this.mumble2, this.mumble3, this.mumble4]).play();

    FadeOutDestroy(bubble, 5000);
    FadeOutDestroy(text, 5000);
  }
}
