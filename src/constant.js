export const images = {
  'friends' : {
      url: './images/meetings.jpg',
    title: 'Find a new friends',
    width: '90%',
  },
  'meetings' : {
    url: './images/music-festival.jpg',
    title: 'Meet your friends',
    width: '90%',
  },
};

const gradients = [
  [
    '#fc4a1a;', /* fallback for old browsers */
    '-webkit-linear-gradient(to right, #fc4a1a, #f7b733);', /* Chrome 10-25, Safari 5.1-6 */
    'linear-gradient(to right, #fc4a1a, #f7b733);' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  ],
  [
    '#ff9966;',
    '-webkit-linear-gradient(to right, #ff9966, #ff5e62);',
    'linear-gradient(to right, #ff9966, #ff5e62);'
  ],
  [
    '#7f00ff;',
    '-webkit-linear-gradient(to right, #7f00ff, #e100ff);',
    'linear-gradient(to right, #7f00ff, #e100ff);'
  ],
  [
    '#06beb6;',
    '-webkit-linear-gradient(to right, #06beb6, #48b1bf);',
    'linear-gradient(to right, #06beb6, #48b1bf);'
  ],
  [
    '#007991;',
    '-webkit-linear-gradient(to right, #007991, #78ffd6);',
    'linear-gradient(to right, #007991, #78ffd6);'
  ],
  [
    '#f2994a;',
    '-webkit-linear-gradient(to right, #f2994a, #f2c94c);',
    'linear-gradient(to right, #f2994a, #f2c94c);'
  ],
  [
    '#4568dc;',
    '-webkit-linear-gradient(to right, #4568dc, #b06ab3);',
    'linear-gradient(to right, #4568dc, #b06ab3);'
  ],
  [
    '#ffafbd;',
    '-webkit-linear-gradient(to right, #ffafbd, #ffc3a0);',
    'linear-gradient(to right, #ffafbd, #ffc3a0);'
  ],
  [
    '#dce35b;',
    '-webkit-linear-gradient(to right, #dce35b, #45b649);',
    'linear-gradient(to right, #dce35b, #45b649);'
  ],
  [
    '#ee0979;',
    '-webkit-linear-gradient(to right, #ee0979, #ff6a00);',
    'linear-gradient(to right, #ee0979, #ff6a00);'
  ],
  [
    '#a770ef;',
    '-webkit-linear-gradient(to right, #a770ef, #cf8bf3, #fdb99b);',
    'linear-gradient(to right, #a770ef, #cf8bf3, #fdb99b);'
  ],
  [
    '#f4c4f3;',
    '-webkit-linear-gradient(to right, #f4c4f3, #fc67fa);',
    'linear-gradient(to right, #f4c4f3, #fc67fa);'
  ]
]

export const getRandomGradient = () => {
  const gradientId = Math.floor(Math.random() * (gradients.length - 0)) + 0;
  return gradients[gradientId][2];
}

export default images;
