import txt from 'raw-loader!./simple.txt';
import pngSource from 'url-loader!./assets/arrow.png';

import arrowSource from 'svg-url-loader!./assets/arrow-right.svg';
import arrowCircleSource from 'svg-url-loader!./assets/arrow-circle-down.svg';

window.addEventListener('load', function() {
    const rootEl = document.getElementById('app');

    var messageEl = document.createElement('div');
    messageEl.textContent = txt;
    rootEl.appendChild(messageEl);

    var png = new Image();
    png.src = pngSource;
    rootEl.appendChild(png);

    var img = new Image();
    img.src = arrowSource;
    img.width = 20;
    img.height = 20;
    rootEl.appendChild(img);

    var img1 = new Image();
    img1.src = arrowCircleSource;
    img1.width = 20;
    img1.height = 20;
    rootEl.appendChild(img1);
});
