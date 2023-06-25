class Worm {

  constructor() {
    this.wormBody = [new Tile(13, 10), new Tile(13, 11), new Tile(13, 12)];
    // Worm의 현재방향과 다음방향
    this.dir = 'ArrowUp';
    this.dirNext = 'ArrowUp';
  }

  // 지렁이 몸 렌더링
  renderWorm() {
    this.wormBody.forEach((tile) => {
      tile.renderTile();
    })
  }

  moveWorm() {
    // 지렁이의 현재 머리
    const head = this.wormBody[0];

    // 지렁이의 새로운 머리
    let newHead;

    // 다음 방향으로 지렁이를 컨트롤
    this.dir = this.dirNext;

    if (this.dir === "ArrowRight") {
      newHead = new Tile(head.col+1, head.row);
    } else if (this.dir === "ArrowLeft") {
      newHead = new Tile(head.col-1, head.row);
    } else if (this.dir === "ArrowUp") {
      newHead = new Tile(head.col, head.row-1);
    } else if (this.dir === "ArrowDown") {
      newHead = new Tile(head.col, head.row+1);
    }
    
    // 사망판정이 나면 게임오버
    if (this.collisionCheck(newHead)) {
      gameOverFlag = true;
    }
    
    // 머리를 추가
    this.wormBody.unshift(newHead);

    // 피자를 획득하면 점수를 올리고 피자를 재생성
    if (newHead.collisionCheck(pizza.pos)) {
      ctxBg.clearRect(0, 0, cWidth, cHeight)
      pizza.movePizza();
      score += 1;
    } else {
      // 피자를 획득하지 못했다면 꼬리 1칸 제거
      this.wormBody.pop()
    }
    
  }

  collisionCheck(wormHead) {
    // 화면 밖으로 나갔을 때 사망판정
    const leftEdge = (wormHead.col === -1);
    const rightEdge = (wormHead.col === tileWidth );
    const topEdge = (wormHead.row === -1);
    const bottomEdge = (wormHead.row === tileHeight);

    const collisionEdge =  leftEdge || rightEdge || topEdge|| bottomEdge;

    // 자기 몸에 닿았을때 사망판정
    let collisionBody;
    this.wormBody.forEach((tile) => {
      if (wormHead.collisionCheck(tile)){
        collisionBody = true;
      }
    })
    return collisionEdge || collisionBody;
  }

  checkDirection(dirKey) {
    // 현재이동방향과 반대방향 이동을 무시.
    if ((dirKey === "ArrowUp" && this.dir === "ArrowDown") || (dirKey === "ArrowDown" && this.dir === "ArrowUp") || (dirKey === "ArrowLeft" && this.dir === "ArrowRight") || (dirKey === "ArrowRight" && this.dir === "ArrowLeft")) {
      return;
    }
    // 다음 이동방향 지정.
    this.dirNext = dirKey;
  }
}