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








var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : null;
var tn = (o, s) => o ? o.getElementsByTagName(s) : null;
var gi = (o, s) => o ? o.getElementById(s) : null;
var rando = (n) => Math.round(Math.random() * n);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);
var a = (l, r) => r.forEach(a => attr(l, a[0], a[1]));

var svgs = {
  close: `<svg x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(0.85, 0.85)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#e21212" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`,
};

function aninCloseBtn() {
  var l1 = tn(this, 'path')[0];
  var l2 = tn(this, 'path')[1];
  l1.style.transform = "translate(49px, 50px) rotate(45deg) translate(-49px, -50px)";
  l1.style.transition = "all 233ms";
  l2.style.transform = "translate(49px, 50px) rotate(135deg) translate(-49px, -50px)";
  l2.style.transition = "all 233ms";
}

function anoutCloseBtn() {
  var l1 = tn(this, 'path')[0];
  var l2 = tn(this, 'path')[1];
  l1.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
  l1.style.transition = "all 233ms";
  l2.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
  l2.style.transition = "all 233ms";
}

function dragElement() {
  if(this.id == 'resume_head_dragable'){
    var el = this.parentElement.parentElement;
  }else{
    var el = this.parentElement;
  }
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(this.id)) document.getElementById(this.id).onmousedown = dragMouseDown;
  else this.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    el.style.top = (el.offsetTop - pos2) + "px";
    el.style.left = (el.offsetLeft - pos1) + "px";
    el.style.opacity = "0.85";
    el.style.transition = "opacity 700ms";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    el.style.opacity = "1";
  }
}

function createDebateNotesHTML(){
  var id = 'debate_notes_container';
  if(gi(document,id)) gi(document,id).outerHTML = '';

  var rect = document.body.getBoundingClientRect();

  var cont = ele('div');
  a(cont,[['id',id],['style', `padding: 0; position: fixed; top: ${rect.top+5}px; left: ${rect.left+5}px; z-index: ${new Date().getTime()}; width: ${rect.width*0.8}px; border: 1px solid #004471; border-radius: 0.4em; background: rgba(5, 37, 51, 0.6);`]]);
  document.body.appendChild(cont);

  var head = ele('div');
  a(head, [['style', `display: grid; grid-template-columns: 1fr 29px; width: 100%; background: #0a1114; border: 1.6px solid #0a1114; border-top-left-radius: 0.4em; border-top-right-radius: 0.4em; cursor: move;`]]);
  cont.appendChild(head);
  head.onmouseover = dragElement;

  var txt = ele('div');
  a(txt, [['style', `color: #fff; font-size: 1.3em; border-radius: 0.5em; padding: 4px;`]]);
  head.appendChild(txt);
  txt.innerText = 'Video Notes';

  var cls = ele('div');
  a(cls, [['style', `width: 27px; height: 27px; cursor: pointer;`]]);
  head.appendChild(cls);
  cls.innerHTML = svgs.close;
  cls.onmouseenter = aninCloseBtn;
  cls.onmouseleave = anoutCloseBtn;
  cls.onclick = () => cont.outerHTML = '';

  var cbod = ele('div');
  a(cbod,[['id','audio_file_manager_view_cbod'],['style',`background: #0a1114; display: grid; grid-template-rows: auto; grid-gap: 6px; padding: 2px; max-height: ${(screen.availHeight*0.75)}px; overflow-y: auto;`]]);
  cont.appendChild(cbod);

  
}

createDebateNotesHTML()
