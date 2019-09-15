var yourSheetId = '__________________________';
var targetSheetName = 'Sheet1';

var ss = SpreadsheetApp.openById(yourSheetId);
var s1 = ss.getSheetByName(targetSheetName);

function parseAsRegexArr(bool) {
  if(/\\|\[|\?|\.\+/.test(bool)){
    return bool.split(/\s*AND\s*/).map(function(el){return new RegExp(el,'ig')});
  } else {
    function rxReady(s) {
      return s ? s.replace(/"/g, '\\b').trim().replace(/\)/g, '').replace(/\(/g, '').replace(/\s+/g, '.{0,2}').replace(/\//g, '\\/').replace(/\+/g, '\\+').replace(/\s*\*\s*/g, '.{0,30}') : s;
    }

    function checkSimpleOR(s) {
      return /\bor\b/i.test(s) && /\(/.test(s) === false && /\b\s+and\s\b/.test(s) === false;
    }

    function checkAndOrSimple(s){
      return [/\bor\b/i,/\band\b/i].every(
        function(el){ return el.test(s) } 
      ) && /\(/.test(s) === false;
    }
    if(checkAndOrSimple(bool)){
      var x = bool.replace(/\s+OR\s+|\s*\|\s*/gi, '|').replace(/\//g, '\\/').replace(/"/g, '\\b').replace(/\s+/g, '.{0,2}').replace(/\s*\*\s*/g, '.{0,30}').split(/\band\b/).map(function(el){ return new RegExp(el.trim(), 'i')});
      console.log(x);
      return x;
    } else if (checkSimpleOR(bool)) {
      var x = new RegExp(bool.replace(/\s+OR\s+|\s*\|\s*/gi, '|').replace(/\//g, '\\/').replace(/"/g, '\\b').replace(/\s+/g, '.{0,2}').replace(/\s*\*\s*/g, '.{0,30}'), 'i');
      var xArr = [x];
      console.log(xArr);
      return xArr;
    } else {
      var orx = "\\(.+?\\)|(\\(\\w+\\s{0,1}OR\\s|\\w+\\s{0,1}OR\\s)+((\\w+\s)+?|(\\w+)\\)+)+?";
      var orMatch = bool ? bool.match(new RegExp(orx, 'g')) : [];
      var orArr = orMatch ? orMatch.map(function(b) {
        return rxReady(b.replace(/\s+OR\s+|\s*\|\s*/gi, '|'))
      }) : [];
      var noOrs = bool ? bool.replace(new RegExp(orx, 'g'), '').split(/\s+[AND\s+]+/i) : bool;
      var ands = noOrs ? noOrs.map(function(a) {
        return rxReady(a)
      }) : [];
      var xArr = ands.concat(orArr).filter(function(i) {
        return i != ''
      }).map(function(x) {
        return new RegExp(x, 'i')
      });
      console.log(xArr);
      return xArr;
    }
  }
}

function booleanSearch(bool, target) {
  var arr = parseAsRegexArr(bool);
  return arr.every(function(x) {
    return x.test(target);
  });
}

function loopSearch(str){
  var lr = s1.getLastRow();
  var matches = [];
  var table = s1.getRange(1,1,lr,3).getValues();
  for(var i=1; i<table.length; i++){
    var note_cell = table[i][1];
    if(booleanSearch(str,note_cell)) matches.push(table[i]);
  }
  return matches;
}


function searchResultsHTMLTemplate(results,table){
  var cont_s = '<div style="background: #1c1c1c; color: #f5f5f5; border-radius: 0.3em;">';
  var res;

  var cont_e = '</div>';
}

function doGet(e) {
  if(e.parameter.link){
    var link = decodeURIComponent(e.parameter.link);
    var notes = decodeURIComponent(e.parameter.notes);
    var user = decodeURIComponent(e.parameter.user);
    
    var row_placement = [[link,notes,user]];
    var lr = s1.getLastRow(); 
    s1.getRange((lr+1), 1, 1, row_placement[0].length).setValues(row_placement); 
    return HtmlService.createHtmlOutput('<div style="background: #1c1c1c; color: #ffffff;  height: 800px; width: 100%; padding: 20px;">'+link+' was sent to your spreadsheet with the following notes <br>'+notes+'</div>');
  }
  if(e.parameter.search){
    var searchBool = decodeURIComponent(e.parameter.search);
    var matches = loopSearch(searchBool);
    var htmlout = matches.length > 0 ? [['Link','Note','Submitted By']].concat(matches)
    .map(function(itm){
      return '<div style="display: grid; grid-template-columns: 80% 8%; grid-gap: 1%; border-bottom: 1px solid #d1d1d1;">'+
        '<div class="note" style="grid-area: 1 / 1; color: #f7f7f7;" dataurl="'+itm[0]+'">'+itm[1]+'</div>'+
          '<div style="grid-area: 1 / 2; border-left: 1px solid #d1d1d1; text-align: right;">'+itm[2]+'</div>'+
            '</div>'; //'<div style="grid-area: 1 / 1;"><a style="color: #ffa91f;" href="'+itm[0]+'">'+itm[1]+'</a></div>'+
    }).reduce(function(a,b){return a+b}) : 'nothing found';
    var output = '<div style="background: #1f1f1f; color: #ffffff; height: 680px; width: 97%; padding: 20px; border-radius: 0.3em;">'+htmlout+'</div>'+
'<script>'+
' var reg = (o, n) => o ? o[n] : ""; '+
' var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);'+
' var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);'+
' var gi = (o, s) => o ? o.getElementById(s) : console.log(o);'+
' var rando = (n) => Math.round(Math.random() * n);'+
' var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);'+
' var delay = (ms) => new Promise(res => setTimeout(res, ms));'+
' var ele = (t) => document.createElement(t);'+
' var attr = (o, k, v) => o.setAttribute(k, v);'+
' var tbody = Array.from(cn(document,"note"));'+
' tbody.shift();'+
  ' tbody.forEach(el=> { '+
    ' el.style.color = "#ffa91f"; '+
      ' el.style.cursor = "pointer";'+
        ' el.onmouseenter = ()=> {el.style.background = "#2e2d2d"; el.style.transition = "all 113ms";};'+
          ' el.onmouseleave = ()=> {el.style.background = "#1f1f1f"; el.style.transition = "all 113ms";};'+
            ' el.onclick = opener;});'+
' function opener(){ window.open(this.getAttribute("dataurl")); }'+

'</script>';
    return HtmlService.createHtmlOutput(output);
  }
}
