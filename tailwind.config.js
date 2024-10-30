module.exports = {
  content: ["./public/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      backgroundImage: {
        gradient:
          "linear-gradient(303.79deg, #F0C3FC -53.74%, #D7BEFC -4.64%, #BCB1FC 40.96%, #A1AEFC 83.05%, #94BDFC 127.47%, #8EC5FC 170.73%)",
        "dark-gradient":
          "linear-gradient(303.79deg, #1E1E2F -53.74%, #27273D -4.64%, #3D3D58 40.96%, #5A5A7E 83.05%, #7B7B9B 127.47%, #9C9CA5 170.73%)",
      },
      colors: {
        primary: "#2578F4",
        "primary-dark": "#1A5BB4",

        pink: "#EF5DA8",
        "pink-dark": "#C95C86",

        blue: "#5D5FEF",
        "blue-dark": "#3E3FA9",

        gray: "#8F99A3",
        "gray-lighter": "rgba(32, 36, 39, 0.05)",
        "gray-light": "rgba(32, 36, 39, 0.07)",
        "gray-dark": "#202427",
      },
    },
  },
  plugins: [],
};
