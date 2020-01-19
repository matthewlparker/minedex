export const colors = {
  text: '#2185d0',
  textActive: '#43edf8',
  green: '#2ECC40',
  greenActive: '',
  orange: '#F2711C',
  backgroundMain: '#03090F',
  backgroundLight: 'rgba(2, 27, 45, 0.8)',
  backgroundDark: 'rgba(22, 104, 159, 0.1)',
  border: '#0A5688',
  blue: '#006FCA',
}

export const shadows = {
  textActive: '4px 4px 10px rgba(0, 112, 202, 0.7), -4px -4px 10px rgba(0, 112, 202, 0.7), -4px 4px 10px rgba(0, 112, 202, 0.7), 4px -4px 10px rgba(0, 112, 202, 0.7)',
  borderActive: '0 0 100px 5px rgba(0, 112, 202, 0.8), 0 0 10px 1px rgba(0, 237, 255, 0.6)',
  textColorCustom: rgba => `4px 4px 10px ${rgba}, -4px -4px 10px ${rgba}, -4px 4px 10px ${rgba}, 4px -4px 10px ${rgba}`
}

export const hexToRGBA = (hex, alpha) => {
  let r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
  } else {
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
}