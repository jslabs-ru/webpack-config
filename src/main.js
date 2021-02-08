import txt from 'raw-loader!./simple.txt';

// import imageSource from 'url-loader!./assets/noop.png';
import imageSource from 'url-loader!./assets/auto.jpg';

console.log(txt);
console.log(imageSource);

window.addEventListener('load', function() {
    const rootEl = document.getElementById('app');
    var img = new Image();
    img.src = imageSource;
    rootEl.appendChild(img);
});
