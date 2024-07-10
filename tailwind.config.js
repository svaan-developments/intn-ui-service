/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {

      zIndex: {
        '1': '1', // Add your custom z-index value here
      },
      colors: {
        primary: "#13357B",
        white: "#FFFFFF",
        boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.07)",
        green: "(146.73deg, #42E165 18.69%, #00800D 80.92%)",
        gray:  "#F5F5F5",  
       lightgray:"#9F9F9F",
        blue: "#DFEAFF",
        buleborder: "#9FBCF4",
        grayborder: "#D9D9D9",
        backgroundgreen: "#D9ECDB",
        lightblack: "#454545",
        blacklight1:"#595959",
        blacklight: "#212121",
        blacknormal: "#343434",
        blacklig: "#141414",
        blackf: "#1F1F1F",
        lightblue:"#ECF2FF",
        yellow: "#F1E58A",
        gray1: "#F2F2F2",
        lightblue1:"#BAD1FF",
        graylight: "#555353",
        
        brown: "#9E6817",
        lightblue1:"#DFEAFF",
        gray1border: "#E6E6E6",
        black: "#242424",
        blackdark:"262626",
        red:"#FFC6C6",
        blacknormal1:"#292929",
        brown1:"#3C1A00",
        redlight:"#FFECEC",
        yellowborder:"#E3DA98",
        bluecolor:"#487FEA",
        bluedark:"#487FEA",
        yellow:"#F1E58A",
        yellowborder1:"#E3DA98",
      },
      flexBasis: {
        '50': '50%',
        '52': '52%',
        '26':'26%',
        '76':'76%',
        '32':'32%',
        '40':'40%',
        '35':'35%',
        '49':"49%",
        '34':'34%',
        '28':'28%',
        '30':'30%',
        '27':'27%',
        '31':'31%',




      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
    
    
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }

    
  },

  
  plugins: [],
};
