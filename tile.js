class Tile{

  constructor(col, row) {
    this.col = col;
    this.row = row;
    this.posX = this.col * tileSize;
    this.posY = this.row * tileSize;
  }

  // 타일(지렁이 몸) 렌더링
  renderTile(bg = 'green') {
    ctx.fillStyle = bg;
    ctx.fillRect(this.posX, this.posY, tileSize, tileSize)
  }
  
  // 이미지(피자) 렌더링
  renderImg(bg = './img/pizza.png') {
    const image = new Image(tileSize, tileSize);
    image.src = bg;
    image.addEventListener('load', () => {
      ctxBg.drawImage(image, this.posX, this.posY, tileSize, tileSize);
    })
  }
  
  // 타일간의 충돌 체크
  collisionCheck(target) {
    return this.col === target.col && this.row === target.row;
  }
}