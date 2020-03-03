'use strict';

import './assets/css/reset.css';
import './assets/css/mosaic.css';
import './assets/css/mosaic-1.css';
import './assets/css/mosaic-2.css';
import './assets/css/mosaic-3.css';
import './assets/css/mosaic-4.css';

import MosaicInteractions from './mosaicInteractions';

export default class Mosaic {
  constructor(root) {
    this.root = root;

    this.options = [
      {
        name: 'Mosaico 1',
        quantity: 4,
        style: 'mosaic-1',
        active: true
      },
      {
        name: 'Mosaico 2',
        quantity: 4,
        style: 'mosaic-2',
        active: false
      },
      {
        name: 'Mosaico 3',
        quantity: 5,
        style: 'mosaic-3',
        active: false
      },
      {
        name: 'Mosaico 4',
        quantity: 6,
        style: 'mosaic-4',
        active: false
      },
    ];

    this.action = new MosaicInteractions(this);
    this.render();
  }
  render() {
    let mosaicItemActive;

    const MOSAIC_OPTIONS = document.createElement('div');
    MOSAIC_OPTIONS.classList.add('mosaic-options');

    for (let i = 0; i < this.options.length; i++) {
      const { name, style, active } = this.options[i];
      const MOSAIC_OPTIONS_ITEM = document.createElement('div');
      MOSAIC_OPTIONS_ITEM.classList.add('mosaic-options-item');
      MOSAIC_OPTIONS_ITEM.addEventListener('click', () => this.action.changeMosaic(this.options[i]), false);
      MOSAIC_OPTIONS_ITEM.title = name;

      if (active) {
        MOSAIC_OPTIONS_ITEM.classList.add('active');
        mosaicItemActive = this.options[i];
      }

      const MOSAIC_OPTIONS_ITEM_IMG = document.createElement('img');
      MOSAIC_OPTIONS_ITEM_IMG.src = `../src/assets/img/mosaic/${style}.jpg`;

      MOSAIC_OPTIONS_ITEM.appendChild(MOSAIC_OPTIONS_ITEM_IMG);
      MOSAIC_OPTIONS.appendChild(MOSAIC_OPTIONS_ITEM);
    }

    const { quantity, style } = mosaicItemActive;

    const MOSAIC_CONTAINER = document.createElement('div');
    MOSAIC_CONTAINER.classList.add('mosaic');
    MOSAIC_CONTAINER.classList.add(style);

    if (mosaicItemActive) {
      for (let i = 0; i < quantity; i++) {
        const MOSAIC_ITEM = document.createElement('div');
        MOSAIC_ITEM.classList.add('mosaic-item');
        MOSAIC_ITEM.id = i;
        MOSAIC_ITEM.draggable = true;
        MOSAIC_ITEM.style.backgroundImage = `url("../src/assets/img/${i}.jpg")`;

        MOSAIC_ITEM.addEventListener('dragstart', this.action.dragStart);
        MOSAIC_ITEM.addEventListener('dragenter', this.action.dragenter);
        MOSAIC_ITEM.addEventListener('drop', this.action.drop);
        MOSAIC_ITEM.addEventListener('dragover', this.action.dragover);
        MOSAIC_ITEM.addEventListener('dragleave', this.action.dragleave);
        MOSAIC_ITEM.addEventListener('dragend', this.action.dragend);
        MOSAIC_ITEM.addEventListener('click', this.action.handleClick);

        const MOSAIC_ITEM_REMOVE = document.createElement('button');
        MOSAIC_ITEM_REMOVE.classList.add('mosaic-item-remove');
        MOSAIC_ITEM_REMOVE.textContent = 'Remover';
        MOSAIC_ITEM_REMOVE.addEventListener('click', () => this.action.removeItem(MOSAIC_ITEM));

        MOSAIC_ITEM.appendChild(MOSAIC_ITEM_REMOVE);
        MOSAIC_CONTAINER.appendChild(MOSAIC_ITEM);
      }
    }

    this.root.innerHTML = '';
    this.root.appendChild(MOSAIC_OPTIONS);
    this.root.appendChild(MOSAIC_CONTAINER);
  }
}
