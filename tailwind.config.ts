import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        'lato' : ["var(--font-lato)"]
      },
      fontSize : {
        title : '16px',
        name : '14px',
        small : '12px'
      },
      padding: {
        horizontal: '32px',
        vertical: '24px',
      },
      margin : {
      vertical : '22px'
      },
      colors: {
        background: "#333333",
        primary: {
          blue: "#2F80ED",
          black: "#4F4F4F",
          white: "#E0E0E0",
          gray: "#828282",
        },
        indicators: {
          orange: "#F8B76B",
          purple: "#8785FF",
          red: "#EB5757",
          yellow: "#F2C94C",
        },
        chats: {
          orange: {
            light: "#FCEED3",
            primary: "#E5A443",
          },
          purple: {
            light: "#EEDCFF",
            primary: "#9B51E0",
          },
          green: {
            light: "#D2F2EA",
            primary: "#43B78D",
          },
        },
        sticker: {
          primary: "#E9F3FF",
          green: {
            primary: "#AFEBDB",
            light: "#CBF1C2",
          },
          orange: {
            primary: "#FDCFA4",
            light: "#F9E9C3",
          },
          purple: {
            primary: "#CFCEF9",
            light: "#F9E0FD",
          },
          blue : {
            primary : '#9DD0ED',
            light :  "#E5F1FF"
          }
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
