export default class MosaicInteractions {
  constructor(props) {
    this.props = props
  }
  handleClick() {
    console.log('Abrir modal da imagem');
  }
  removeItem($mosaicItem) {
    event.preventDefault();
    event.stopPropagation();
    $mosaicItem.style.backgroundImage = '';
  }
  changeMosaic(option) {
    this.props.options.map(item => {
      item.active = false;
    });
    option.active = true;
    this.props.render();
  }
  dragStart(event) {
    event.dataTransfer.setData('Text', event.target.id);
  }
  dragenter(event) {
    if (event.target.className !== 'mosaic-item') return false;
    event.target.style.opacity = 0.4;
  }
  drop(event) {
    event.preventDefault();
    if (event.target.className !== 'mosaic-item') return false;

    event.target.style.opacity = 1;
    const DATA = event.dataTransfer.getData('Text'),
      PRESS_BACKGROUND = document.getElementById(DATA).style.backgroundImage,
      DROP_BACKGROUND = event.target.style.backgroundImage;

    document.getElementById(DATA).style.backgroundImage = DROP_BACKGROUND;
    event.target.style.backgroundImage = PRESS_BACKGROUND;
  }
  dragover(event) {
    event.preventDefault();
  }
  dragleave(event) {
    if (event.target.className !== 'mosaic-item') return false;
    event.target.style.opacity = 1;
  }
  dragend(event) {
    if (event.target.className !== 'mosaic-item') return false;
    event.target.style.opacity = 1;
  }
}
