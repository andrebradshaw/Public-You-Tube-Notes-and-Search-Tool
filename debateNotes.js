var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : null;
var tn = (o, s) => o ? o.getElementsByTagName(s) : null;
var gi = (o, s) => o ? o.getElementById(s) : null;
var rando = (n) => Math.round(Math.random() * n);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);


async function getTimestamp() {
  var sharebtn = Array.from(cn(document, 'style-scope ytd-button-renderer style-default size-default')).filter(el => /Share/i.test(el.innerText));
  sharebtn[0].click();
  await delay(1033);
  var time = gi(document, 'start-at-timestamp').value.trim();
  var timestamp = convertTime2Secs(time);
  await delay(333);
  var closer = Array.from(tn(document, 'yt-icon')).filter(el => el.getAttribute('icon') == 'close');
  if (closer && closer[0]) closer[0].click();
  return timestamp;
}

function convertTime2Secs(str) {
  var timehours = /^\d+:\d+:\d+$/.exec(str);
  var timemins = /^\d+:\d+$/.exec(str);
  var hour = timehours ? parseInt(/^(\d+):/.exec(timehours[0])[1]) : 0;
  var mins = timemins ? parseInt(/^(\d+):/.exec(timemins[0])[1]) : 0;
  var secs = timemins ? parseInt(/\d+$/.exec(timemins[0])[0]) : 0;
  return ((hour * (60 * 60)) + (mins * 60) + (secs));
}

var timecolon = (t) => Math.floor(t/60).toString() +':'+ (((t/60) - Math.floor(t/60)) * 60);
//TODO: account for hours

async function test(){
  if(/youtu\.be|youtube\.com\/watch/i.test(window.location.href)){
    var timestamp = await getTimestamp();
    
    console.log(timestamp);
  }
}
test()

function createDebateNotesHTML(){
  var id = 'debate_notes_container';
  if(gi(document,'debate_notes_container')) gi(document,'debate_notes_container').outerHTML = '';

  var cont = ele('div');
  a(cont,[['id','debate_notes_container'],['style',`position: fixed; top: 40px; left: 20px; width: `]]);
  
}
