/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        telegram: {
          blue: '#0088cc',
          'blue-dark': '#006ea6',
          'blue-light': '#5ab6f3',
          bg: '#f0f2f5',
          card: '#ffffff',
          text: '#000000',
          'text-secondary': '#707579',
          border: '#e6e6e6',
        },
        whatsapp: {
          green: '#25d366',
          'green-dark': '#128c7e',
          'chat-bg': '#e5ddd5',
          header: '#f0f0f0',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
      }
    },
  },
  plugins: [],
}
