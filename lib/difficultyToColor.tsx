function difficultyToColor(difficulty: number) {
  switch (difficulty) {
    case 1:
      return "#C45AB3";
    case 2:
      return "#D0FCB3";
    case 3:
      return "#7D7ABC";
    case 4:
      return "#EF767A";
    case 5:
      return "#CC5A71";
    default:
      return "#eee";
  }
}

export default difficultyToColor;
