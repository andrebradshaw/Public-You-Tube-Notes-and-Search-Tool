var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var rando = (n) => Math.round(Math.random() * n);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);

var appsScriptWebAppLink = '________________________';

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

function closeView() {
  this.parentElement.parentElement.outerHTML = '';
}

function dragElement() {
  var el = this.parentElement;
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

function convertTime2Secs(str) {
  var timehours = /^\d+:\d+:\d+$/.exec(str);
  var timemins = /^\d+:\d+$/.exec(str);
  var hour = timehours ? parseInt(/^(\d+):/.exec(timehours[0])[1]) : 0;
  var mins = timemins ? parseInt(/^(\d+):/.exec(timemins[0])[1]) : 0;
  var secs = timemins ? parseInt(/\d+$/.exec(timemins[0])[0]) : 0;
  return ((hour * (60 * 60)) + (mins * 60) + (secs));
}

function createYTnotesHTML() {
  if (gi(document, 'youtube_note_search_container')) gi(document, 'youtube_note_search_container').outerHTML = '';
  var docRec = document.body.getBoundingClientRect();
  var docW = docRec.right - docRec.left;
  var contWidth = Math.ceil(docW*0.4);

  var cont = ele('div');
  attr(cont, 'id', 'youtube_note_search_container');
  attr(cont, 'style', `position: fixed; top: 5%; left: 10%; width: ${contWidth}px; z-index: ${new Date().getTime()};`);
  document.body.appendChild(cont);


  var head = ele('div');
  attr(head, 'style', `display: grid; grid-template-columns: ${contWidth-32}px ${32}px; background: #063842; border: 1.3px solid #021c21; border-top-left-radius: 0.3em; border-top-right-radius: 0.3em; cursor: move;`);
  cont.appendChild(head);
  head.onmouseover = dragElement;

  var htxt = ele('div');
  attr(htxt, 'style', `grid-area: 1 / 1; color: #fff; padding: 9px;`);
  head.appendChild(htxt);
  htxt.innerText = 'Source Notes';

  var cls = ele('div');
  attr(cls, 'style', `grid-area: 1 / 2; width: 32px; height: 32px; cursor: pointer;`);
  head.appendChild(cls);
  cls.innerHTML = `<svg x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(0.85, 0.85)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#e21212" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`;
  cls.onmouseenter = aninCloseBtn;
  cls.onmouseleave = anoutCloseBtn;
  cls.onclick = closeView;

  var cbod = ele('div');
  attr(cbod, 'style', `display: grid; grid-template-rows: auto; grid-gap: 10px; border: 1.3px solid #021c21; border-bottom-left-radius: 0.3em; border-bottom-right-radius: 0.3em; background: #9c9c9c; padding: 12px;`);
  cont.appendChild(cbod);

  var c3 = ele('div');
  attr(c3, 'style', `display: grid; grid-template-columns: 89%; grid-gap: 2%;`);
  cbod.appendChild(c3);

  var c1 = ele('div');
  attr(c1, 'style', `display: grid; grid-template-columns: 89% 9%; grid-gap: 2%;`);
  cbod.appendChild(c1);

  var c2 = ele('div');
  attr(c2, 'style', `display: grid; grid-template-columns: 89% 9%; grid-gap: 2%;`);
  cbod.appendChild(c2);

  var user = ele('input');
  attr(user, 'id', 'save_user_val');
  attr(user, 'placeholder', 'username - if you wish to share');
  attr(user, 'style', `grid-area: 1 / 1; border: 1px solid transparent; border-radius: 0.3em; padding: 2px;`);
  c3.appendChild(user);

  var setnote = ele('input');
  attr(setnote, 'id', 'save_note_val');
  attr(setnote, 'placeholder', 'Save note');
  attr(setnote, 'style', `grid-area: 1 / 1; border: 1px solid transparent; border-radius: 0.3em; padding: 2px;`);
  c1.appendChild(setnote);
  setnote.onkeyup = enterSearch;

  var setbtn = ele('div');
  attr(setbtn, 'style', `grid-area: 1 / 2; background: transparent; max-width: 32px; max-height: 32px; cursor: pointer;`);
  setbtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 294.156 294.156" style="enable-background:new 0 0 294.156 294.156;" xml:space="preserve"><g><path fill="#086173" d="M227.002,108.256c-2.755-41.751-37.6-74.878-80.036-74.878c-42.447,0-77.298,33.141-80.038,74.907   C28.978,113.059,0,145.39,0,184.184c0,42.234,34.36,76.595,76.595,76.595h116.483c3.313,0,6-2.687,6-6s-2.687-6-6-6H76.595   C40.977,248.778,12,219.801,12,184.184c0-34.275,26.833-62.568,61.087-64.411c3.184-0.171,5.678-2.803,5.678-5.991   c0-0.119-0.003-0.236-0.01-0.355c0.09-37.536,30.654-68.049,68.211-68.049c37.563,0,68.132,30.518,68.211,68.063   c-0.005,0.116-0.009,0.238-0.009,0.329c0,3.196,2.505,5.831,5.696,5.992c34.37,1.741,61.292,30.038,61.292,64.421   c0,19.526-8.698,37.801-23.864,50.138c-2.571,2.091-2.959,5.87-0.868,8.44c2.091,2.571,5.87,2.959,8.44,0.868   c17.98-14.626,28.292-36.293,28.292-59.447C294.156,145.269,265.08,112.926,227.002,108.256z"/><path fill="#086173" d="M140.966,141.078v76.511c0,3.313,2.687,6,6,6s6-2.687,6-6v-76.511c0-3.313-2.687-6-6-6S140.966,137.765,140.966,141.078z"/><path fill="#086173" d="M181.283,152.204c1.536,0,3.071-0.586,4.243-1.757c2.343-2.343,2.343-6.142,0-8.485l-34.317-34.317   c-2.343-2.343-6.143-2.343-8.485,0l-34.317,34.317c-2.343,2.343-2.343,6.142,0,8.485c2.343,2.343,6.143,2.343,8.485,0   l30.074-30.074l30.074,30.074C178.212,151.618,179.748,152.204,181.283,152.204z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>`;
  c1.appendChild(setbtn);
  setbtn.onclick = createNotesHTML;
  setbtn.onmouseenter = btnhoverin;
  setbtn.onmouseleave = btnhoverout;

  var searchnote = ele('input');
  attr(searchnote, 'id', 'search_note_val');
  attr(searchnote, 'placeholder', 'Search notes');
  attr(searchnote, 'style', `grid-area: 1 / 1; border: 1px solid transparent; border-radius: 0.3em; padding: 2px; `);
  c2.appendChild(searchnote);
  searchnote.onkeyup = enterSearch;

  var searchbtn = ele('div');
  attr(searchbtn, 'style', `grid-area: 1 / 2; background: transparent; max-width: 32px; max-height: 32px; cursor: pointer;`);
  searchbtn.innerHTML = `<svg enable-background="new 0 0 129 129" viewBox="0 0 129 129" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><g><path fill="#086173" d="M51.6,96.7c11,0,21-3.9,28.8-10.5l35,35c0.8,0.8,1.8,1.2,2.9,1.2s2.1-0.4,2.9-1.2c1.6-1.6,1.6-4.2,0-5.8l-35-35   c6.5-7.8,10.5-17.9,10.5-28.8c0-24.9-20.2-45.1-45.1-45.1C26.8,6.5,6.5,26.8,6.5,51.6C6.5,76.5,26.8,96.7,51.6,96.7z M51.6,14.7   c20.4,0,36.9,16.6,36.9,36.9C88.5,72,72,88.5,51.6,88.5c-20.4,0-36.9-16.6-36.9-36.9C14.7,31.3,31.3,14.7,51.6,14.7z"/></g></svg>`;
  c2.appendChild(searchbtn);
  searchbtn.onclick = searchNotes;
  searchbtn.onmouseenter = btnhoverin;
  searchbtn.onmouseleave = btnhoverout;

}

function btnhoverin() {
  this.style.transform = 'scale(1.2, 1.2)';
  this.style.transition = 'all 111ms';
}

function btnhoverout() {
  this.style.transform = 'scale(1, 1)';
  this.style.transition = 'all 111ms';
}

function enterSearch(e) {
  if (e.key == 'Enter') {
    if (this.getAttribute('id') == 'search_note_val') searchNotes();
    if (this.getAttribute('id') == 'save_note_val') createNotesHTML();
  }
}

function searchNotes() {
  var search_input = gi(document, 'search_note_val').value;
  var search_notes = `${appsScriptWebAppLink}?search=${encodeURIComponent(search_input)}`;
  if (search_input) window.open(search_notes);
}

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

async function createNotesHTML() {
  if(/youtu\.be|youtube\.com\/watch/i.test(window.location.href)){
    var timestamp = await getTimestamp();
    var videoId = reg(/youtube\.com\/watch\?v=(.+?)(\?|$)/.exec(window.location.href), 1) ? reg(/youtube\.com\/watch\?v=(.+?)(\?|$)/.exec(window.location.href), 1) : reg(/youtu\.be\/(.+?)(\?|$)/.exec(window.location.href), 1);
    var linkOutput = encodeURIComponent(`https://youtu.be/${videoId}?t=${timestamp}`);
  }else{
    var linkOutput = encodeURIComponent(window.location.href)
  }
  var notes = gi(document, 'save_note_val').value.trim();
  var username = gi(document, 'save_user_val').value.trim();
  var send_to_sheets = `${appsScriptWebAppLink}?link=${linkOutput}&notes=${notes}&user=${username}`;
  if (notes) window.open(send_to_sheets);
}

createYTnotesHTML()
