var yourSheetId = '1suWeQSWoYc2OoWp9cP7a35-yCSke2S9sSwkeFLzfMzA';
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
  var table = s1.getRange(1,1,lr,2).getValues();
  for(var i=1; i<table.length; i++){
    var note_cell = table[i][1];
    if(booleanSearch(str,note_cell)) matches.push(table[i]);
  }
  return matches;
}

function doGet(e) {
  if(e.parameter.link){
    var link = decodeURIComponent(e.parameter.link);
    var notes = decodeURIComponent(e.parameter.notes);
    var row_placement = [[link,notes]];
    var lr = s1.getLastRow(); 
    s1.getRange((lr+1), 1, 1, row_placement[0].length).setValues(row_placement); 
    return HtmlService.createHtmlOutput('<div>'+link+' was sent to your spreadsheet with the following notes <br>'+notes+'</div>');
  }
  if(e.parameter.search){
    var searchBool = decodeURIComponent(e.parameter.search);
    var matches = loopSearch(searchBool);
    var htmlout = matches.length > 0 ? matches.map(function(itm){return '<div><a href="'+itm[0]+'">'+itm[1]+'</a></div>';}) : 'nothing found';
    return HtmlService.createHtmlOutput('<div>'+htmlout+'</div>');
  }
}
