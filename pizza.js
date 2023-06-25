class Pizza {
  constructor() {
    this.movePizza();
  }

  // 피자 렌더링
  renderPizza() {
    this.pos.renderImg();
  }

  // 새로운 피자를 생성
  movePizza() {
    const col = Math.floor(Math.random() * (tileWidth-1) );
    const row = Math.floor(Math.random() * (tileHeight-1));
    this.pos = new Tile(col, row);
  }
}