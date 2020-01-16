const colors = [
  "#bd4f6c",
  "#bf5c96",
  "#b070bf",
  "#8f88e2",
  "#539ff9",
  "#00acf7",
  "#00ace0",
  "#00aac5",
  "#00a6a9",
  "#25a18e"
];

function difficultyToColor(difficulty: number) {
  return colors[difficulty + 4];
}

export default difficultyToColor;
