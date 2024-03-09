/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,ejs}"],
  theme: {
    colors: {
      'text': 'rgb(var(--text))',
      'background': 'rgb(var(--background))',
      'primary': 'rgb(var(--primary))',
      'secondary': 'rgb(var(--secondary))',
      'accent': 'rgb(var(--accent))',
     },     
  },
  plugins: [],
}