const colors = ["#25a18e", "#0047b2", "#00a5cf", "#8b7bc5", "#bd4f6c"];

function difficultyToColor(difficulty: number) {
  switch (difficulty) {
    case 1:
      return colors[0];
    case 2:
      return colors[1];
    case 3:
      return colors[2];
    case 4:
      return colors[3];
    case 5:
      return colors[4];
    default:
      return "#eee";
  }
}

export default difficultyToColor;
