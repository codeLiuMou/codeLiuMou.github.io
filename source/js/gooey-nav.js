/* SVG gooey 滤镜注入 */
(function () {
  if (document.getElementById('gooey-filter-svg')) return;
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.id = 'gooey-filter-svg';
  svg.setAttribute('style', 'position:absolute;width:0;height:0;pointer-events:none;');
  svg.innerHTML =
    '<defs>' +
    '<filter id="gooey">' +
    '<feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />' +
    '<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="gooey" />' +
    '<feComposite in="SourceGraphic" in2="gooey" operator="atop" />' +
    '</filter>' +
    '</defs>';
  document.body.appendChild(svg);
})();
