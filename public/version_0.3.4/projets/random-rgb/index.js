const h3 = document.querySelector('h3');
const body = document.querySelector('body');
const loop = () => {
  setTimeout(() => {
    const rgb = () => {
      let num = Math.round(0xffffff * Math.random());
      let r = num >> 16;
      let g = num >> 8 & 255;
      let b = num & 255;
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    };
    h3.innerHTML = rgb();
    body.style.background = rgb();
    loop();
  }, 2000);
};
loop();