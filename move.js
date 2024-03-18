var field = document.getElementById('field');
var field_minx = field.getBoundingClientRect().x;
var field_maxx = field.getBoundingClientRect().right;
var field_miny = field.getBoundingClientRect().y;
var field_maxy = field.getBoundingClientRect().bottom;

function onMouseDown(event,eName) {
    let elem = document.getElementById(eName.id);
    let shiftX = event.clientX - elem.getBoundingClientRect().left;
    let shiftY = event.clientY - elem.getBoundingClientRect().top;
    elem.style.zIndex = 10;
    moveAt(event.pageX, event.pageY);


    function moveAt(pageX, pageY) {
        let wid = elem.getBoundingClientRect().width;
        let hei = elem.getBoundingClientRect().height;
        if (pageX - shiftX<field_minx) {elem.style.left = field_minx + 'px';}
        else if (pageX - shiftX >field_maxx - wid) {elem.style.left = (field_maxx-wid) + 'px';}
        else {elem.style.left = pageX - shiftX + 'px';}
        if (pageY - shiftY<field_miny) {elem.style.top = field_miny + 'px';}
        else if (pageY - shiftY>field_maxy - hei) {elem.style.top = (field_maxy - hei) + 'px';}
        else {elem.style.top = pageY - shiftY + 'px';}
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    function onKeyDown(event) {
        if (event.code=='ArrowLeft'||event.code == 'ArrowRight') {
            let st = window.getComputedStyle(elem, null);
            let trans = parseInt(st.getPropertyValue('rotate'));
            console.log(trans);
            let rotate=0;
            if (!isNaN(trans)) rotate=trans;
            if (event.code == 'ArrowLeft') {rotate -=5;}
            if (event.code == 'ArrowRight') {rotate +=5;}
            if (rotate>360) rotate-=360;
            if (rotate<0) rotate+=360;
            elem.style.rotate = rotate+'deg';
        }

    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('keydown', onKeyDown);

    document.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('keydown', onKeyDown);
        document.onmouseup = null;
        //document.getElementById('degree_indicator').style.opacity = 0;
        checkPositions(elem);
    }

    elem.ondragstart = function () {
        return false;
    }
}

window.addEventListener('DOMContentLoaded', onLoad);

function onLoad(){
    let items = field.childElementCount;
    for (var i=0; i<items; i++) {
        let tmp = field.children.item(i);
        tmp.style.rotate = Math.floor(Math.random()*72)*5 +'deg';
        tmp.style.top = Math.floor((field_maxy - field_miny - tmp.getBoundingClientRect().height)*Math.random()) + field_miny + 'px';
        tmp.style.left = Math.floor((field_maxx - field_minx - tmp.getBoundingClientRect().width)*Math.random()) + field_minx + 'px';
    }
    let tmp = document.getElementsByClassName('checked');
    for (let i = tmp.length-1; i>=0; i--) {
        changeCheck(tmp.item(i));
    }
    window.removeEventListener("DOMContentLoaded", onLoad);
}

function checkPositions(elem) {
    switch (elem.id) {
        case 'head': {
            let dx = field.children.namedItem('head').getBoundingClientRect().left - field.children.namedItem('chest').getBoundingClientRect().left;
            let dy = field.children.namedItem('head').getBoundingClientRect().top - field.children.namedItem('chest').getBoundingClientRect().top;
            if ( dx >= -9 && dx <= 11 && dy >= -30 & dy <= -10) setPosition('head','chest', 1, -20)
            else if (document.getElementById('head_chest').classList.contains('checked')) changeCheck(document.getElementById('head_chest'));

            dx = field.children.namedItem('head').getBoundingClientRect().left - field.children.namedItem('collar').getBoundingClientRect().left;
            dy = field.children.namedItem('head').getBoundingClientRect().top - field.children.namedItem('collar').getBoundingClientRect().top;
            if ( dx >= -16 && dx <= -6 && dy >= -24 & dy <= 14) setPosition('head','collar', -11, -19)
            else if (document.getElementById('collar_head').classList.contains('checked')) changeCheck(document.getElementById('collar_head'));
            break;
        }
        case 'chest': {
            let dx = field.children.namedItem('chest').getBoundingClientRect().left - field.children.namedItem('head').getBoundingClientRect().left;
            let dy = field.children.namedItem('chest').getBoundingClientRect().top - field.children.namedItem('head').getBoundingClientRect().top;
            if ( dx >= -11 && dx <= 9 && dy >= 10 & dy <= 30) setPosition('chest','head', -1, 20)
            else if (document.getElementById('head_chest').classList.contains('checked')) changeCheck(document.getElementById('head_chest'));

            dx = field.children.namedItem('chest').getBoundingClientRect().left - field.children.namedItem('croup').getBoundingClientRect().left;
            dy = field.children.namedItem('chest').getBoundingClientRect().top - field.children.namedItem('croup').getBoundingClientRect().top;
            if ( dx >= -63 && dx <= -53 && dy >= -8 & dy <= 2) setPosition('chest','croup', -58, -3)
            else if (document.getElementById('chest_croup').classList.contains('checked')) changeCheck(document.getElementById('chest_croup'));

            dx = field.children.namedItem('chest').getBoundingClientRect().left - field.children.namedItem('ball').getBoundingClientRect().left;
            dy = field.children.namedItem('chest').getBoundingClientRect().top - field.children.namedItem('ball').getBoundingClientRect().top;
            if ( dx >= -30 && dx <= -20 && dy >= -34 & dy <= -24) setPosition('chest','ball', -25, -29)
            else if (document.getElementById('ball_chest').classList.contains('checked')) changeCheck(document.getElementById('ball_chest'));
            break;
        }
        case 'collar': {
            let dx = field.children.namedItem('collar').getBoundingClientRect().left - field.children.namedItem('head').getBoundingClientRect().left;
            let dy = field.children.namedItem('collar').getBoundingClientRect().top - field.children.namedItem('head').getBoundingClientRect().top;
            if ( dx >= 6 && dx <= 16 && dy >= 14 & dy <= 24) setPosition('collar','head', 11, 19)
            else if (document.getElementById('collar_head').classList.contains('checked')) changeCheck(document.getElementById('collar_head'));

            dx = field.children.namedItem('collar').getBoundingClientRect().left - field.children.namedItem('leash').getBoundingClientRect().left;
            dy = field.children.namedItem('collar').getBoundingClientRect().top - field.children.namedItem('leash').getBoundingClientRect().top;
            if ( dx >= -35 && dx <= -25 && dy >= 37 & dy <= 47) setPosition('collar','leash', -30, 42)
            else if (document.getElementById('leash_collar').classList.contains('checked')) changeCheck(document.getElementById('leash_collar'));
            break;
        }
        case 'leash': {
            let dx = field.children.namedItem('leash').getBoundingClientRect().left - field.children.namedItem('collar').getBoundingClientRect().left;
            let dy = field.children.namedItem('leash').getBoundingClientRect().top - field.children.namedItem('collar').getBoundingClientRect().top;
            if ( dx >= 25 && dx <= 35 && dy >= -47 & dy <= -37) setPosition('leash','collar', 30, -42)
            else if (document.getElementById('leash_collar').classList.contains('checked')) changeCheck(document.getElementById('leash_collar'));
            break;
        }
        case 'croup': {
            let dx = field.children.namedItem('croup').getBoundingClientRect().left - field.children.namedItem('chest').getBoundingClientRect().left;
            let dy = field.children.namedItem('croup').getBoundingClientRect().top - field.children.namedItem('chest').getBoundingClientRect().top;
            if ( dx >= 53 && dx <= 63 && dy >= -2 & dy <= 8) setPosition('croup','chest', 58, 3)
            else if (document.getElementById('chest_croup').classList.contains('checked')) changeCheck(document.getElementById('chest_croup'));

            dx = field.children.namedItem('croup').getBoundingClientRect().left - field.children.namedItem('tail').getBoundingClientRect().left;
            dy = field.children.namedItem('croup').getBoundingClientRect().top - field.children.namedItem('tail').getBoundingClientRect().top;
            if ( dx >= -43 && dx <= -33 && dy >= -8 & dy <= 2) setPosition('croup','tail', -38, -3)
            else if (document.getElementById('croup_tail').classList.contains('checked')) changeCheck(document.getElementById('croup_tail'));
            break;
        }
        case 'tail': {
            dx = field.children.namedItem('tail').getBoundingClientRect().left - field.children.namedItem('croup').getBoundingClientRect().left;
            dy = field.children.namedItem('tail').getBoundingClientRect().top - field.children.namedItem('croup').getBoundingClientRect().top;
            if ( dx >= 33 && dx <= 43 && dy >= -2 & dy <= 8) setPosition('tail','croup', 38, 3)
            else if (document.getElementById('croup_tail').classList.contains('checked')) changeCheck(document.getElementById('croup_tail'));
            break;
        }
        case 'ball': {
            let dx = field.children.namedItem('ball').getBoundingClientRect().left - field.children.namedItem('chest').getBoundingClientRect().left;
            let dy = field.children.namedItem('ball').getBoundingClientRect().top - field.children.namedItem('chest').getBoundingClientRect().top;
            if ( dx >= 20 && dx <= 30 && dy >= 24 & dy <= 34) setPosition('ball','chest', 25, 29)
            else if (document.getElementById('ball_chest').classList.contains('checked')) changeCheck(document.getElementById('ball_chest'));
            break;
        }
    }
    if (checkCheckers()) onWin();
}

function checkCheckers() {
    if (document.getElementsByClassName('checked').length==6) return true;
    return false;
}

function setPosition(el1, el2, dx, dy) {
    field.children.namedItem(el1).style.left = field.children.namedItem(el2).getBoundingClientRect().left + dx + 'px';
    field.children.namedItem(el1).style.top = field.children.namedItem(el2).getBoundingClientRect().top + dy + 'px';
    field.children.namedItem(el1).style.rotate = 0 + 'deg';
    field.children.namedItem(el2).style.rotate = 0 + 'deg';
    let toChange = document.getElementById(el1+"_"+el2);
    if (!toChange) toChange = document.getElementById(el2+"_"+el1);
    if (toChange.classList.contains('unchecked')) {changeCheck(toChange);return true;}
    return false;
}

function changeCheck(elem) {
    if (elem) {
        elem.classList.toggle('checked');
        elem.classList.toggle('unchecked');
        return true;
    }
    return false;
}

function onWin() {
    let tail = document.getElementById('ball');
    let dr=5;
    let rot = 0;
    let start = Date.now();
    let timer = setInterval(function() {
        let timePassed = Date.now() - start;
        tail.style.rotate = rot + 'deg';
        rot += dr;
        if (timePassed > 7200) clearInterval(timer);
    }, 10);
    console.log('You make picture!');
}