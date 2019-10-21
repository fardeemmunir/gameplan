const { colors } = require("tailwindcss/defaultTheme");

/*
@very-light-gray: #666666;
@light-gray: #414141;
@gray: #141414;
@dark-gray: #1E1E1E;
@very-dark-gray: #111;

@cyan: #8df;
@blue: #0af;
@purple: #a8f;
@green: #98EC65;
@red: #FF5555;
@orange: #fc3;
@light-orange: #fc3;
@pink: #f6b;

*/

module.exports = {
  theme: {
    extend: {
      colors: {
        blue: {
          ...colors.blue,
          "500": "#0af"
        }
      }
    }
  }
};
