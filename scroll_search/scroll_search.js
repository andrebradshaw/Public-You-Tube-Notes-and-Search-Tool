var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var rando = (n) => Math.round(Math.random() * n);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);


function scroller() {
  var windo = cn(document,'style-scope ytd-page-manager')[2] ? cn(document,'style-scope ytd-page-manager')[2] : gi(document,'contents');
  window.scrollTo(0,windo.scrollHeight);
}

function deleteElementsBySearchParams() {
  var matches = Array.from(tn(document,'ytd-video-renderer')).map(el=> /\b27\s{0,1}dollars/i.test(el.innerText));
  console.log(matches.indexOf(true));
}

var parseSearch = (str)=> /\\|\[|\?|\.\+/.test(str) ? str.split(/\s{0,}\band\b\s{0,}/i).map(el=> el.replace(/\s{0,}\bor\b\s{0,}/ig, '|')).map(el=> new RegExp(el,'i')) : str.split(/\s{0,}\band\b\s{0,}/i).map(el=> el.replace(/\s{0,}\bor\b\s{0,}/ig, '|').replace(/"/g,'\\b').replace(/\(/g,'').replace(/\)/g,'')).map(el=> new RegExp(el,'i'));
var regXall = (x,s) => x.map(el=> el.test(s));

regXall(parseSearch('27 dollars'),'asfasfasf 27 dollars asfgasgasg')
//style-scope ytd-item-section-renderer

async function looper(){
  for(var i=0; i<100; i++){
    scroller();
    await delay(rando(555)+533)
  }
}
looper()
