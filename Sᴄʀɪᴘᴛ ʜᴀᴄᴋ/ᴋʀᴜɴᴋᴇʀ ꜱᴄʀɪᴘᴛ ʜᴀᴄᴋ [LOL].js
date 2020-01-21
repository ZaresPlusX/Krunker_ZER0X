// ==UserScript==
// @name         KrunkerPlus rework VIP
// @namespace    http://tampermonkey.net/
// @version      1.9.8.5
// @description  Best krunker hack
// @author       OVERHAX/THEGUY3ds + Hrt + ttap + Katistic
// @icon         https://www.google.com/s2/favicons?domain=krunker.io
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// @require      https://code.jquery.com/ui/1.12.0/jquery-ui.min.js
// @require      https://greasyfork.org/scripts/372672-everything-hook/code/Everything-Hook.js?version=659315
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.0/jquery-confirm.min.js
// @match        *://krunker.io/*
// @run-at       document-end
// @noframes
// @grant        none
// ==/UserScript==
try {
    document.getElementById("instructions").style.color = "Blue";
    document.getElementById('instructions').innerHTML = 'Hack by OVERHAX | THEGUY3ds. Modified Menu by Katistic.';
} catch {
    if (window.location.href = krunker.io) {
        location.reload(true)
    }
}

// Full Screen -- https://github.com/THEGUY3ds/KRUNKERPLUS/blob/89e9bd9cae68ea8ac824551b33f2f13e852f9829/KrunkerPlusReworked.js#L46
document.fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.documentElement.webkitRequestFullScreen;

function requestFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
}

if (document.fullscreenEnabled) {
    requestFullscreen(document.documentElement);
}

function read(url) {
    return new Promise(resolve => {
        fetch(url).then(res => res.text()).then(res => {
            return resolve(res);
        });
    });
};
// Adblock
document.getElementById("krunkerio_728x90_1").remove();
// Aimdot
// Scope
document.getElementById('aimRecticle').innerHTML = '<img id="recticleImg" src="https://i.redd.it/aa069tp99wh31.png">';
//
var d = document.createElement('div');
d.style.cssText = 'width:8px;height:8px;background-color:#0BDEE8;position:absolute;margin:auto;top:0;right:0;bottom:0;left:0;z-index:200;border-radius:4px';
document.body.appendChild(d);
// end

let shared_state = new Map(Object.entries({
    functions_to_hide: new WeakMap(),
    strings_to_hide: [],
    hidden_globals: [],
    init: false
}));



let conceal_function = function(original_Function, hook_Function) {
    shared_state.get('functions_to_hide').set(hook_Function, original_Function);
};

let conceal_string = function(original_string, hook_string) {
    shared_state.get('strings_to_hide').push({
        from: new RegExp(hook_string.replace(/([\[|\]|\(|\)|\*|\\|\.|\+])/g, '\\$1'), 'g'),
        to: original_string
    });
};

const original_toString = Function.prototype.toString;
let hook_toString = new Proxy(original_toString, {
    apply: function(target, _this, _arguments) {
        try {
            var ret = Function.prototype.apply.apply(target, [_this, _arguments]);
        } catch (e) {
            // modify stack trace to hide proxy
            e.stack = e.stack.replace(/\n.*Object\.apply \(<.*/, '');
            throw e;
        }

        let lookup_fn = shared_state.get('functions_to_hide').get(_this);
        if (lookup_fn) {
            return Function.prototype.apply.apply(target, [lookup_fn, _arguments]);
        }

        for (var i = 0; i < shared_state.get('strings_to_hide').length; i++) {
            ret = ret.replace(shared_state.get('strings_to_hide')[i].from, shared_state.get('strings_to_hide')[i].to);
        }
        return ret;
    }
});
Function.prototype.toString = hook_toString;
conceal_function(original_toString, hook_toString);
//

var distance, cnBSeen, canSee, pchObjc, objInstances, recoilAnimY, mouseDownL, penetrable, mouseDownR, ammos, weaponIndex, inputs, getWorldPosition;
console.json = object => console.log(JSON.stringify(object, undefined, 2));
const defined = object => typeof object !== "undefined";
// move buttons
document.getElementById('subLogoButtons').remove(); //Onload
document.getElementById('aContainer').innerHTML = '<div id="subLogoButtons1"><div class="button small buttonP" id="menuBtnHost" onmouseenter="playTick()" onclick="openHostWindow()">Host Game</div><div class="button small buttonR" id="menuBtnBrowser" onmouseenter="playTick()" onclick="showWindow(2)">Server Browser</div><div id="inviteButton" class="button small" onmouseenter="playTick()" onclick="copyInviteLink()">Invite</div><div class="button small" id="menuBtnJoin" onmouseenter="playTick()" onclick="showWindow(24)">Join</div></div>';
//Ingame menu
document.getElementById('texts3DHolder').innerHTML = '1 = AIMBOT | 2 = AUTORELOAD | 3 = CHARMS | 4 = ESP | 5 = SEE THRU WALL | ALT = SPEEDHACK | Z = TELEPORT';
document.getElementById("texts3DHolder").style.color = "White";
//Hide old menu
document.getElementById('mapInfoHolder').style.display = 'none';

//const g = document.getElementById('mapInfoHolder').children[3];
const e = document.getElementById('mapInfoHolder').children[3];

//console.log(g)
console.log(e)

//const a = document.createElement('form');
const n = document.createElement('table');

//a.setAttribute('style', 'width: 1200px; height: 240px; line-height: 90%;')
n.setAttribute('style', 'width: 1400px; height: 200px; line-height: 90%;')

//a.innerHTML = 'haxxx';

n.innerHTML = '<label style=\"color: white; font-size: small;\"><div><span style="color:#ff0000;">K</span><span style="color:#ff1900;">R</span><span style="color:#ff3300;">U</span><span style="color:#ff4c00;">N</span><span style="color:#ff6600;">K</span><span style="color:#ff7f00;">E</span><span style="color:#ff9900;">R</span><span style="color:#ffb200;">P</span><span style="color:#ffcc00;">L</span><span style="color:#ffe500;">U</span><span style="color:#ffff00;">S</span><span style="color:#bfff00;"> </span><span style="color:#80ff00;">X</span><span style="color:#40ff00;"> </span><span style="color:#00ff00;">K</span><span style="color:#00ff33;">a</span><span style="color:#00ff66;">t</span><span style="color:#00ff99;">i</span><span style="color:#00ffcc;">s</span><span style="color:#00ffff;">t</span><span style="color:#00ccff;">i</span><span style="color:#0099ff;">c</span><span style="color:#0066ff;"> </span><span style="color:#0033ff;">X</span><span style="color:#0000ff;"> </span><span style="color:#1c00ff;">O</span><span style="color:#3800ff;">V</span><span style="color:#5300ff;">E</span><span style="color:#6f00ff;">R</span><span style="color:#8b00ff;">H</span><span style="color:#a800bf;">A</span><span style="color:#c50080;">X</span><span style="color:#e20040;"> </span><span style="color:#ff0000;">|</span><span style="color:#ff1900;"> </span><span style="color:#ff3300;">T</span><span style="color:#ff4c00;">H</span><span style="color:#ff6600;">E</span><span style="color:#ff7f00;">G</span><span style="color:#ff9900;">U</span><span style="color:#ffb200;">Y</span><span style="color:#ffcc00;">3</span><span style="color:#ffe500;">d</span><span style="color:#ffff00;">s</span></div><a></label><input type=\"checkbox\" name=\"aimbot\" value=\"true\" id=\"aimbot\" checked><label style=\"color: white; font-size: medium;\" for=\"aimbot\"> AIMBOT (1) </label><input type=\"checkbox\" name=\"autoreload\" value=\"true\" id=\"autoreload\" checked><label style=\"color: white; font-size: medium;\" for=\"autoreload\"> AUTORELOAD (2) </label><input type=\"checkbox\" name=\"charms\" value=\"true\" id=\"charms\" checked><label style=\"color: white; font-size: medium;\" for=\"charms\"> CHARMS (3) </label><input type=\"checkbox\" name=\"esp\" value=\"true\" id=\"esp\" checked><label style=\"color: white; font-size: medium;\" for=\"esp\"> ESP (4) </label><input type=\"checkbox\" name=\"seethruwall\" value=\"true\" id=\"seethruwall\"><label style=\"color: white; font-size: medium;\" for=\"seethruwall\"> SEE THRU WALL (5) </label><input type=\"checkbox\" name=\"speedhack\" value=\"true\" id=\"speedhack\" checked><label style=\"color: white; font-size: medium;\" for=\"speedhack\"> SPEEDHACK (6) </label><br><label style=\"color: white; font-size: medium;\"><a></label><input type=\"checkbox\" name=\"infiniteammo\" type="text" value="true" id=\"infiniteammo\"><label style=\"color: white; font-size: medium;\" for=\"infiniteammo\"> Infinite Ammo (8) </label><input type=\"checkbox\" name=\"norecoil\" type="text" value="true" id=\"norecoil\"><label style=\"color: white; font-size: medium;\" for=\"norecoil\"> No Recoil (9) </label>      <input type=\"checkbox\" name=\"nospread\" type="text" value="true" id=\"nospread\"><label style=\"color: white; font-size: medium;\" for=\"nospread\"> No Spread (10) </label>      <input type=\"checkbox\" name=\"rapidfire\" type="text" value="true" id=\"rapidfire\"><label style=\"color: white; font-size: medium;\" for=\"rapidfire\"> Rapid Fire (11) </label><input type=\"checkbox\" name=\"fastreload\" type="text" value="true" id=\"fastreload\"><label style=\"color: white; font-size: medium;\" for=\"fastreload\"> Fast Reload (12) </label><input type=\"checkbox\" name=\"thirdperson\" type="text" value="true" id=\"thirdperson\"><label style=\"color: white; font-size: medium;\" for=\"thirdperson\"> Third Person (13) </label><input type=\"checkbox\" name=\"forcescope\" type="text" value="true" id=\"forcescope\" checked><label style=\"color: white; font-size: medium;\" for=\"forcescope\"> Force Scope (14) </label><input type=\"checkbox\" name=\"supergun\" type="text" value="true" id=\"supergun\"><label style=\"color: white; font-size: medium;\" for=\"supergun\"> Super Gun (15) </label>';
//document.getElementById('mapInfoHolder').replaceChild(g, a);
document.getElementById('mapInfoHolder').replaceChild(n, e);

const toggles = {
    aimbot: document.getElementById('aimbot'),
    autoreload: document.getElementById('autoreload'),
    esp: document.getElementById('esp'),
    charms: document.getElementById('charms'),
    seethruwall: document.getElementById('seethruwall'),
    speedhack: document.getElementById('speedhack'),
    infiniteammo: document.getElementById('infiniteammo'),
    norecoil: document.getElementById('norecoil'),
    nospread: document.getElementById('nospread'),
    rapidfire: document.getElementById('rapidfire'),
    fastreload: document.getElementById('fastreload'),
    thirdperson: document.getElementById('thirdperson'),
    forcescope: document.getElementById('forcescope'),
    supergun: document.getElementById('supergun'),
};
// In game menu
// Messege
$("#chatHolder").append(`
<hr>
<div class="chatItem"><span style="color:#04A7DB">Dear user before we get found enjoy! | <span class="chatMsg"><span style="color:#04DB9D"> | Our latest discord always on our website!<span class="chatMsg"><span style="color:#DAE110"> | Working on 1.9.6<span class="chatMsg"> | OVERHAX KRUNKERPLUS VIP <span class="chatMsg"><span style="color:#F18938"> | OVERHAX.ML</span></span></span></span></span></div>
<hr>
`);
// Drag

$(function() {
    $("#myForm").draggable();
});
// Form
$("body").append(`

<body>

<div class="chat-popup" id="myForm">
  <form action="https://discord.gg/HcHBg5v" target="_blank" class="form-container">
    <a>K+ VIP MENU V1</a>
    <label style=\"color: white; font-size: small;\"><div><span style="color:#ff0000;">K</span><span style="color:#ff1900;">R</span><span style="color:#ff3300;">U</span><span style="color:#ff4c00;">N</span><span style="color:#ff6600;">K</span><span style="color:#ff7f00;">E</span><span style="color:#ff9900;">R</span><span style="color:#ffb200;">P</span><span style="color:#ffcc00;">L</span><span style="color:#ffe500;">U</span><span style="color:#ffff00;">S</span><a></label>
    </label>
    <br>
    <input type=\"checkbox\" name=\"aimbot\" type="text" value="true" id=\"aimbot\" checked><label style=\"color: white; font-size: medium;\" for=\"aimbot\"> AIMBOT (1) </label><input type=\"checkbox\" name=\"autoreload\" value=\"true\" id=\"autoreload\" checked><label style=\"color: white; font-size: medium;\" for=\"autoreload\"> AUTORELOAD (2) </label><input type=\"checkbox\" name=\"charms\" value=\"true\" id=\"charms\" checked><label style=\"color: white; font-size: medium;\" for=\"charms\"> CHARMS (3) </label><input type=\"checkbox\" name=\"esp\" value=\"true\" id=\"esp\" checked><label style=\"color: white; font-size: medium;\" for=\"esp\"> ESP (4) </label><input type=\"checkbox\" name=\"seethruwall\" value=\"true\" id=\"seethruwall\"><label style=\"color: white; font-size: medium;\" for=\"seethruwall\"> SEE THRU WALL (5) </label>
    <br><label style=\"color: white; font-size: medium;\"><a></label>
   <hr>
    <br>
   <h3> ⚠️ Exploits Bannable⚠️</h3>
     <p> SpeedHax v1 W+ALT</p>
     <p> Teleport Z</p>
     <br>
     <!><div class="settName" title="">Field of View <input type="number" class="sliderVal" id="Fov hack" min="0" max="120" value="140" onkeypress="return delayExecute(&quot;fov&quot;, this)" style="border-width:0px"></!>
        <div class="slidecontainer">
        <input type="range" id="Fov hack" min="0" max="120" step="5" value="100" class="sliderM" oninput="setSetting(&quot;fov&quot;, this.value)"></div></div>
     <br>
      <!--<div class="settName" title="">Speedhack V2<input type="number" class="sliderVal" id="speed" min="0" max="200" value="1.25" onkeypress="return delayExecute(&quot;speed&quot;, this)" style="border-width:0px"> -->
     <br>
      <hr>
      <input type=\"checkbox\" name=\"infiniteammo\" type="text" value="true" id=\"infiniteammo\"><label style=\"color: white; font-size: medium;\" for=\"infiniteammo\"> Infinite Ammo (7) </label>
      <input type=\"checkbox\" name=\"norecoil\" type="text" value="true" id=\"norecoil\"><label style=\"color: white; font-size: medium;\" for=\"norecoil\"> No Recoil (9) </label>
      <input type=\"checkbox\" name=\"nospread\" type="text" value="true" id=\"nospread\"><label style=\"color: white; font-size: medium;\" for=\"nospread\"> No Spread (10) </label>
      <input type=\"checkbox\" name=\"rapidfire\" type="text" value="true" id=\"rapidfire\"><label style=\"color: white; font-size: medium;\" for=\"rapidfire\"> Rapid Fire (11) </label>
      <input type=\"checkbox\" name=\"fastreload\" type="text" value="true" id=\"fastreload\"><label style=\"color: white; font-size: medium;\" for=\"fastreload\"> Fast Reload (12) </label>
      <input type=\"checkbox\" name=\"thirdperson\" type="text" value="true" id=\"thirdperson\"><label style=\"color: white; font-size: medium;\" for=\"thirdperson\"> Third Person (13) </label>
      <input type=\"checkbox\" name=\"forcescope\" type="text" value="true" id=\"forcescope\" checked><label style=\"color: white; font-size: medium;\" for=\"forcescope\"> Force Scope (14) </label>
      <input type=\"checkbox\" name=\"supergun\" type="text" value="true" id=\"supergun\"><label style=\"color: white; font-size: medium;\" for=\"supergun\"> Super Gun (15) </label>

    <br><label style=\"color: white; font-size: medium;\"><a></label>
    <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
   <hr>
  </form>
</div>

<script>
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
</script>

</body>
`);
// Button
$("body").append(`
<div class="nsi" id="Menus" style="position: fixed; bottom: 20px; z-index: 50; right: 130px;"><html><a><body><button class="open-button" onclick="openForm()">Menu</button></div><html><a><body><
`);
//var fov = document.getElementById('Fov hack').value;
//var speed = document.getElementById('speed').value;

// Ui Change
$("head").append(`
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {font-family: Arial, Helvetica, sans-serif;}
* {box-sizing: border-box;}

/* Button used to open the chat form - fixed at the bottom of the page */
.open-button {
  background-color: #555;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  position: fixed;
  bottom: 23px;
  right: 0;
  width: 220px;
}

/* The popup chat - hidden by default */
.chat-popup {
  display: none;
  position: fixed;
  bottom: 30;
  right: 0;
  z-index: 9;
  draggable: true;
}

/* Add styles to the form container */
.form-container {
  max-width: 400px;
  padding: 10px;
  background-color: blue;
}

/* Full-width textarea */
.form-container textarea {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
  resize: none;
  min-height: 300px;
}

/* When the textarea gets focus, do something */
.form-container textarea:focus {
  background-color: #ddd;
  outline: none;
}

/* Set a style for the submit/send button */
.form-container .btn {
  background-color: #58D68D;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom:10px;
  opacity: 0.8;
}

/* Add a red background color to the cancel button */
.form-container .cancel {
  background-color: red;
}

/* Add some hover effects to buttons */
.form-container .btn:hover, .open-button:hover {
  opacity: 1;
}

</style>
</head>

</html>
`);
// In game menu

// new offsets skidlamer
const original_encode = TextEncoder.prototype.encodeInto; // skidLamer
let hook_encode = new Proxy(original_encode, {
    apply: function(target, _this, _arguments) {
        let game = false;
        try {
            if (_arguments[0].length > 1000) {
                cnBSeen = _arguments[0].match(/this\['recon']=!0x1,this\['(\w+)']=!0x1/)[1];
                canSee = _arguments[0].match(/,this\['(\w+)'\]=function\(\w+,\w+,\w+,\w+,\w+\){if\(!\w+\)return!\w+;/)[1];
                pchObjc = _arguments[0].match(/\(\w+,\w+,\w+\),this\['(\w+)'\]=new \w+\['\w+'\]\(\)/)[1];
                objInstances = _arguments[0].match(/\[\w+\]\['\w+'\]=!\w+,this\['\w+'\]\[\w+\]\['\w+'\]&&\(this\['\w+'\]\[\w+\]\['(\w+)'\]\['\w+'\]=!\w+/)[1];
                //isYou = _arguments[0].match(/,this\['\w+'\]=!\w+,this\['\w+'\]=!\w+,this\['(\w+)'\]=\w+,this\['\w+'\]\['length'\]=\w+,this\[/)[1];
                recoilAnimY = _arguments[0].match(/\w*1,this\['\w+'\]=\w*0,this\['\w+'\]=\w*0,this\['\w+'\]=\w*1,this\['\w+'\]=\w*1,this\['\w+'\]=\w*0,this\['\w+'\]=\w*0,this\['(\w+)'\]=\w*0,this\['\w+'\]=\w*0,this\['\w+'\]=\w*0,this\['\w+'\]=\w*0,/)[1];
                mouseDownL = _arguments[0].match(/this\['\w+'\]=function\(\){this\['(\w+)'\]=\w*0,this\['(\w+)'\]=\w*0,this\['\w+'\]={}/)[1];
                mouseDownR = _arguments[0].match(/this\['\w+'\]=function\(\){this\['(\w+)'\]=\w*0,this\['(\w+)'\]=\w*0,this\['\w+'\]={}/)[2];
                getWorldPosition = _arguments[0].match(/\['camera']\['(\w+)']\(\);if/)[1];
                noDisconnect = _arguments[0].match(/\['send']\('rt'\)/)[1];
                didJump = _arguments[0].match(/{\w+\['\w+']&&\w+\['\w+']\['\w+']&&\w+\?this\['jump']\(\w+\):\(\w+\['(\w+)']&&!\w+&&\(\w+/)[1];
                didShoot = _arguments[0].match(/0x0,this\['(\w+)']=!0x1,this\['lodActive']=!0x1/)[1];
                ammos = _arguments[0].match(/{!\w+\['reloadTimer']&&\w+\['(\w+)']/)[1];
                nAuto = _arguments[0].match(/'(\w+)':!0x0,'burst':/)[1];
                weaponIndex = _arguments[0].match(/\['reloadTimer']&&\w+\['\w+']\[\w+\['(\w+)']/)[1];

                const procInputRegex = _arguments[0].match(/this\['(\w+)']=function\((\w+),(\w+),\w+,\w+\){(this)/);
                const reloadRegex = _arguments[0].match(/{!\w+\['reloadTimer']&&\w+\['(\w+)']\[\w+\['(\w+)']]/);
                procInputs = procInputRegex[3];
                weaponIndex = reloadRegex[2];
                game = true;
            }

        } catch (e) {
            // modify stack trace to hide proxy
            e.stack = e.stack.replace(/\n.*Object\.apply \(<.*/, '');
            throw e;
        }
        if (game) TextEncoder.prototype.encodeInto = original_encode;

        return Function.prototype.apply.apply(target, [_this, _arguments]);
    }
});
TextEncoder.prototype.encodeInto = hook_encode;
conceal_function(original_encode, hook_encode);
let render = function(c) {
        //DEFINES
        const args = arguments.callee.caller.caller.arguments;
        const me = args[3];

        if (!me) return;
        const scale = args[0];
        const world = args[1];
        const renderer = args[2];
        const scale2 = args[4];
        const canvas = document.getElementById('game-overlay');
        const ctx = canvas.getContext("2d");
        const consts = {
            "cameraHeight": 1.5,
            "playerHeight": 11,
            "cameraHeight": 1.5,
            "headScale": 2,
            "crouchDst": 3,
            "camChaseTrn": 0.0022,
            "camChaseSpd": 0.0012,
            "camChaseSen": 0.2,
            "camChaseDst": 24,
            "recoilMlt": 0.3,
            "nameOffset": 0.6,
            "ammos": 0x1c,
            "nameOffsetHat": 0.8,
        };
        const fonts = {
            ssBig: '30px\x20Comic Sans',
            ssSmall: '20px\x20Comic Sans',
            gmBig: '30px\x20Comic Sans',
            gmSmall: '20px\x20Comic Sans'
        }
        let settings = {
            isViews: false,
            espMode: 4,
            espColor: 0,
            espFontSize: 14,
            tracers: true,
            isSliding: false,
            distance: Infinity,
            scopingOut: false,
            canShoot: true,
        }
        const input = {
            speed: 1,
            ydir: 2,
            xdir: 3,
            shoot: 5,
            scope: 6,
            jump: 7,
            crouch: 8,
            reload: 9,
            weapon: 10,
        };
        if (!defined(args[1].procInputs)) {
            args[1].procInputs = args[1][procInputs]
            args[1][procInputs] = function() {
                const inputs = arguments[0];
                onTick(this, args[1], inputs, args[2]);
                return args[1].procInputs(...arguments);
            };
        };
        //console.dir(window)
        let fullWidth = window.innerWidth;
        let fullHeight = window.innerHeight;
        let scaledWidth = canvas.width / scale;
        let scaledHeight = canvas.height / scale;
        let camPos = renderer['camera'][getWorldPosition]();
        const Pi = Math.PI / 2;
        const PI2 = 2 * Math.PI;
        let controls = world.controls;
        let players = world.players.list;
        let entities = players.filter(x => {
            return x.active && !x[canSee]
        });

        const downKeys = new Set();
        const upKeys = new Set();

        /**************************************************************/
        //<FUNCTIONS>
        let keyDown = (code) => {
            return downKeys.has(code);
        }

        let keyUp = (code) => {
            if (upKeys.has(code)) {
                upKeys.delete(code);
                return true;
            }
            return false;
        }
        //FUNCTIONS
        let getDistance3D = (fromX, fromY, fromZ, toX, toY, toZ) => {
            var distX = fromX - toX,
                distY = fromY - toY,
                distZ = fromZ - toZ;
            return Math.sqrt(distX * distX + distY * distY + distZ * distZ);
        }

        let getDistance = (player1, player2) => {
            return getDistance3D(player1.x, player1.y, player1.z, player2.x, player2.y, player2.z);
        }

        let getDirection = (fromZ, fromX, toZ, toX) => {
            return Math.atan2(fromX - toX, fromZ - toZ);
        }

        let getXDir = (fromX, fromY, fromZ, toX, toY, toZ) => {
            var dirY = Math.abs(fromY - toY),
                dist = getDistance3D(fromX, fromY, fromZ, toX, toY, toZ);
            return Math.asin(dirY / dist) * (fromY > toY ? -1 : 1);
        }

        let getAngleDist = (start, end) => {
            return Math.atan2(Math.sin(end - start), Math.cos(start - end));
        }

        let get = (entity, string) => {
            if (defined(entity) && entity && entity.active) {
                switch (string) {
                    case 'objInstances':
                        return entity[objInstances];
                    case 'inView':
                        return null == world[canSee](me, entity.x, entity.y - entity.crouchVal * consts.crouchDst, entity.z); //|| entity[cnBSeen];
                    case 'isFriendly':
                        return (me && me.team ? me.team : me.spectating ? 0x1 : 0x0) == entity.team;
                    case 'recoilAnimY':
                        return entity[recoilAnimY];
                }
            }
            return null;
        }

        let getTarget = () => {
            if (!defined(distance)) distance = Infinity;
            for (const entity of players.filter(x => {
                    return x.active && !get(x, "canSee") && get(x, "inView") && !get(x, "isFriendly") && x.health > 0
                })) {
                if (defined(entity[objInstances])) {
                    const entityPos = entity[objInstances].position;
                    if (renderer.frustum.containsPoint(entityPos)) {
                        const dist = entityPos.distanceTo(me);
                        if (dist <= distance) {
                            me.distance = dist;
                            return entity;
                        }
                    }
                }
            }
            distance = Infinity;
            return null
        }
        // Cam locked fix by https://github.com/Katistic
        let camLookAt = (target) => {
            if (!defined(controls) || target === null || (target.x + target.y + target.z2) == 0) return void(controls.target = null);
            let offset1 = ((consts.playerHeight - consts.cameraHeight) - (target.crouchVal * consts.crouchDst));
            let offset2 = consts.playerHeight - consts.headScale / 2 - target.crouchVal * consts.crouchDst;
            let recoil = (get(me, "recoilAnimY") * consts.recoilMlt) * 25;
            let xdir = getXDir(controls.object.position.x, controls.object.position.y, controls.object.position.z, target.x, (target.y + offset1), target.z) - ((recoil / 100) * 4);
            let ydir = getDirection(controls.object.position.z, controls.object.position.x, target.z, target.x);
            controls.target = {
                xD: xdir,
                yD: ydir,
                x: target.x + consts.camChaseDst * Math.sin(ydir) * Math.cos(xdir),
                y: target.y - consts.camChaseDst * Math.sin(xdir),
                z: target.z + consts.camChaseDst * Math.cos(ydir) * Math.cos(xdir)
            }
        }
        let world2Screen = (camera, position) => {
            let pos = position.clone();
            pos.project(camera);
            pos.x = (pos.x + 1) / 2;
            pos.y = (-pos.y + 1) / 2;
            pos.x *= scaledWidth;
            pos.y *= scaledHeight;
            return pos;
        }

        let pixelTranslate = (ctx, x, y) => {
            ctx.translate(~~x, ~~y);
        }

        let pixelDifference = (pos1, Pos2, multi) => {
            const hDiff = ~~(pos1.y - Pos2.y);
            return [hDiff, ~~(hDiff * multi)]
        }

        let text = (txt, font, color, x, y) => {
            ctx.save();
            pixelTranslate(ctx, x, y);
            ctx.fillStyle = color;
            ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
            ctx.font = font;
            ctx.lineWidth = 1;
            ctx.strokeText(txt, 0, 0);
            ctx.fillText(txt, 0, 0);
            ctx.restore();
        }

        let rect = (x, y, ox, oy, w, h, color, fill) => {
            ctx.save();
            pixelTranslate(ctx, x, y);
            ctx.beginPath();
            fill ? ctx.fillStyle = color : ctx.strokeStyle = color;
            ctx.rect(ox, oy, w, h);
            fill ? ctx.fill() : ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }

        let line = (x1, y1, x2, y2, lW, sS) => {
            ctx.save();
            ctx.lineWidth = lW + 2;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = "rgba(0, 0, 0, 0.25)";
            ctx.stroke();
            ctx.lineWidth = lW;
            ctx.strokeStyle = sS;
            ctx.stroke();
            ctx.restore();
        }

        let image = (x, y, img, ox, oy, w, h) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.beginPath();
            ctx.drawImage(img, ox, oy, w, h);
            ctx.closePath();
            ctx.restore();
        }

        let getTextMeasurements = (arr) => {
            for (let i = 0; i < arr.length; i++) {
                arr[i] = ~~ctx.measureText(arr[i]).width;
            }
            return arr;
        }

        let byte2Hex = (n) => {
            var chars = "0123456789ABCDEF";
            return String(chars.substr((n >> 4) & 0x0F, 1)) + chars.substr(n & 0x0F, 1);
        }

        let rgba2hex = (r, g, b, a = 255) => ("#").concat(byte2Hex(r), byte2Hex(g), byte2Hex(b), byte2Hex(a));

        // Switches

        if (controls.keys[49]) {
            controls.keys[49] = 0
            SOUND.play('tick_0', 0.1)
            toggles.aimbot.checked = !(toggles.aimbot.checked)
        } else if (controls.keys[50]) {
            controls.keys[50] = 0
            SOUND.play('tick_0', 0.1)
            toggles.autoreload.checked = !(toggles.autoreload.checked)
        } else if (controls.keys[51]) {
            controls.keys[51] = 0
            SOUND.play('tick_0', 0.1)
            toggles.charms.checked = !(toggles.charms.checked)
        } else if (controls.keys[52]) {
            controls.keys[52] = 0
            SOUND.play('tick_0', 0.1)
            toggles.esp.checked = !(toggles.esp.checked)
            console.log(toggles.esp.checked)
        } else if (controls.keys[53]) {
            controls.keys[53] = 0
            SOUND.play('tick_0', 0.1)
            toggles.seethruwall.checked = !(toggles.seethruwall.checked)
            console.log(toggles.seethruwall.checked)
        } else if (controls.keys[54]) {
            controls.keys[54] = 0
            SOUND.play('tick_0', 0.1)
            toggles.speedhack.checked = !(toggles.speedhack.checked)
            console.log(toggles.speedhack.checked)
        } else if (controls.keys[55]) {
            controls.keys[55] = 0
            SOUND.play('tick_0', 0.1)
            toggles.infiniteammo.checked = !(toggles.infiniteammo.checked)
            console.log(toggles.infiniteammo.checked)
        } else if (controls.keys[56]) {
            controls.keys[56] = 0
            SOUND.play('tick_0', 0.1)
            toggles.norecoil.checked = !(toggles.norecoil.checked)
            console.log(toggles.norecoil.checked)
        } else if (controls.keys[57]) {
            controls.keys[57] = 0
            SOUND.play('tick_0', 0.1)
            toggles.nospread.checked = !(toggles.nospread.checked)
            console.log(toggles.nospread.checked)
        } else if (controls.keys[58]) {
            controls.keys[58] = 0
            SOUND.play('tick_0', 0.1)
            toggles.infiniteammo.checked = !(toggles.rapidfire.checked)
            console.log(toggles.rapidfire.checked)
        } else if (controls.keys[59]) {
            controls.keys[59] = 0
            SOUND.play('tick_0', 0.1)
            toggles.norecoil.checked = !(toggles.fastreload.checked)
            console.log(toggles.fastreload.checked)
        } else if (controls.keys[60]) {
            controls.keys[60] = 0
            SOUND.play('tick_0', 0.1)
            toggles.nospread.checked = !(toggles.thirdperson.checked)
            console.log(toggles.thirdperson.checked)
        } else if (controls.keys[61]) {
            controls.keys[61] = 0
            SOUND.play('tick_0', 0.1)
            toggles.forcescope.checked = !(toggles.forcescope.checked)
            console.log(toggles.forcescope.checked)
        } else if (controls.keys[62]) {
            controls.keys[62] = 0
            SOUND.play('tick_0', 0.1)
            toggles.supergun.checked = !(toggles.supergun.checked)
            console.log(toggles.supergun.checked)
        }

        //ONTICK STUFF
        var sniper = me.weapon.name = "Sniper Rifle"
        console.dir(me); //stuff for me to read
        console.dir(world); //stuff for me to read
        world.config.deltaMlt = 1.05;
        me.name = 'spoofed name?'; //Bypass ban vote ? Pls test
        //world.config.strafeSpd = 99;
        //world.config.gravMlt = 0.85;
        world.forcePos = false
        //renderer.camera.fov = fov;
        // SuperGun
        if (toggles.supergun.checked) {
            world.config.deltaMlt = 3;
            me.weapon.rate = 99;
            me.weapon.spread = 0;
            me.weapon.reload = 99;
            me.recoilForce = 0;
            me.weapon.rate = 1.85
            me.weapon.name = "Alien Blaster";
            me.weapon.src = "weapon_13";
            me.weapon.icon = "icon_13";
            me.weapon.sound = "weapon_13";
        }

        //Force scope
        if (toggles.forcescope.checked) {
            me.weapon.scope = true;
        } else {
            me.weapon.scope = false;
        }
        //Force scope fixes
        if (me.weapon.name === "Sniper Rifle" || me.weapon.name === "Semi Auto") {
            me.weapon.scope = true;
        }
        if (sniper === 1) {
            me.weapon.scope = false;
        }
        // Rapid fire
        if (toggles.rapidfire.checked) {
            me.weapon.rate = 1.85
        } else {
            toggles.rapidfire.checked = false
        }
        // Fast reload
        if (toggles.fastreload.checked) {
            me.weapon.reload = 99;
        } else {
            me.weapon.reload = 1500;
        }
        // Third person
        if (toggles.thirdperson.checked) {
            world.config.thirdPerson = true;
        } else {
            world.config.thirdPerson = false;
        }
        // Infinite Ammo
        if (toggles.infiniteammo.checked) {
            me.weapon.ammo = 999999;
            toggles.infiniteammo.checked = false;
        } else {
            toggles.infiniteammo.checked = false;
        }
        // No recoil
        if (toggles.norecoil.checked) {
            me.recoilForce = 0;
        } else {
            me.recoilForce = 1.0864234889210899e-25;
        }
        // No spread
        if (toggles.nospread.checked) {
            me.weapon.spread = 0;
        } else {
            me.weapon.spread = 100.00000000519312;
        }
        // target update
        if (defined(controls.target) && controls.target !== null) {
            controls.object.rotation.y = controls.target.yD;
            controls[pchObjc].rotation.x = controls.target.xD;
            controls[pchObjc].rotation.x = Math.max(-Pi, Math.min(Pi, controls[pchObjc].rotation.x));
            controls.yDr = controls[pchObjc].rotation.x % Math.PI;
            controls.xDr = controls.object.rotation.y % Math.PI;
        } else controls.target = null;

        // Shoot through somewalls by https://github.com/Katistic
        for (i = 0; i < world.map.manager.objects.length; i++) {
            object = world.map.manager.objects[i]
            if (defined(object.transparent) && defined(object.penetrable) && object.penetrable) {
                object.transparent = true;
                settings.isViews = true;
            }
        }
        /*if (toggles.speedhack.checked) {
            world.config.deltaMlt = speed;
        } else {
            world.config.deltaMlt = 1.05;
        }*/

        //Trigger Bot
        if (toggles.aimbot.checked) {
            const target = getTarget();
            if (target) {
                camLookAt(target); //Removed me.aimVal = 99 to scope faster
                if (me[didShoot]) {
                    controls[mouseDownL] = 0;
                } else if (!me.aimVal) {
                    controls[mouseDownL] = 1;
                    controls[mouseDownR] = 1;
                } else {
                    controls[mouseDownR] = 1;
                }
            } else if (settings.isViews = true) {
                if (controls.target) {
                camLookAt(null);
                controls[mouseDownR] = 0;
                controls[mouseDownL] = 0;
                }
                }
            }




        // Update-proof autoreload https://github.com/Katistic
        if (toggles.autoreload.checked) {
            if (document.getElementById("ammoVal").innerHTML.split("<")[0] == "0 ") {
                controls.keys[controls.reloadKey] = 1
            } else {
                controls.keys[controls.reloadKey] = 0
            }
        }

        // Autobhop - Slide
        if (controls.keys[controls.jumpKey] = 1) {
            controls.keys[controls.jumpKey] = !controls.keys[controls.jumpKey];
            if (settings.isSliding) {
                controls.keys[controls.crouchKey] = 1;
                return;
            }
            if (me.yVel < -0.04 && me.canSlide) {
                settings.isSliding = true;
                setTimeout(() => {
                    settings.isSliding = false;
                    controls.keys[controls.crouchKey] = 0;
                }, 350);
                controls.keys[controls.crouchKey] = 1;
            }
        }


        //ESP / Chams
        let rgb = nextColor()
        entities.map((entity, index, array) => {
            if (defined(entity[objInstances])) {

                //Chams
                if (toggles.esp.checked) {
                    entity[cnBSeen] = true;
                } else {
                    entity[cnBSeen] = false;
                }
                for (let i = 0; i < entity[objInstances].children.length; i++) {
                    const object3d = entity[objInstances].children[i];
                    for (let j = 0; j < object3d.children.length; j++) {
                        const mesh = object3d.children[j];
                        if (mesh && mesh.type == "Mesh") {
                            if (toggles.charms.checked) {

                                const material = mesh.material;
                                material.alphaTest = 1;
                                material.depthTest = false;
                                material.fog = false;
                                material.emissive = rgb;
                                material.wireframe = true;
                            } else {
                                const material = mesh.material;
                                material.alphaTest = 0;
                                material.depthTest = true;
                                material.fog = true;
                                material.emissive.g = 0;
                                material.wireframe = false;
                            }
                            if (toggles.seethruwall.checked) {
                                const material = mesh.material;
                                material.depthTest = false;
                                material.fog = false;
                                material.emissive.w = 1;
                                material.colorWrite = true;
                                material.transparent = true;
                                material.opacity = 1.0;
                            } else {
                                const material = mesh.material;
                                material.alphaTest = 0;
                                material.depthTest = true;
                                material.fog = true;
                                material.emissive.g = 0;
                                material.wireframe = false;
                            }
                            if (entity.name.includes("  ||  ")) {
                                let d2e = getDistance(me, entity).toString();
                                entity.name = entity.ogname + " Distance   ||  " + d2e.slice(0, d2e.indexOf(".") - 1);
                            } else {
                                entity.ogname = entity.name
                                let d2e = getDistance(me, entity).toString();
                                entity.name = entity.ogname + " Distance  ||  " + d2e.slice(0, d2e.indexOf(".") - 1);
                            }
                        }
                    }
                }
            }
        });
    }

  
// Lagswitch/teleport
var sendPacket = true;

function invert() {
    javascript: (
        function() {
            // the css we are going to inject
            var css = 'html {-webkit-filter: invert(100%);' +
                '-moz-filter: invert(100%);' +
                '-o-filter: invert(100%);' +
                '-ms-filter: invert(100%); }',

                head = document.getElementsByTagName('head')[0],
                style = document.createElement('style');

            // a hack, so you can "invert back" clicking the bookmarklet again
            if (!window.counter) {
                window.counter = 1;
            } else {
                window.counter++;
                if (window.counter % 2 == 0) {
                    var css = 'html {-webkit-filter: invert(0%); -moz-filter:    invert(0%); -o-filter: invert(0%); -ms-filter: invert(0%); }'
                }
            };

            style.type = 'text/css';
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }

            //injecting the css to the head
            head.appendChild(style);
        }());
}

document.addEventListener('keydown', (e) => {
    if (e.code == "KeyZ") {

        if (sendPacket) {
            invert();
            sendPacket = false;
        } else {
            invert();
            sendPacket = true;
        }
    }
});

document.addEventListener('mousedown', (e) => {
    if (e.button == 0) {
        if (!sendPacket) {
            invert();
            sendPacket = true;
        }
    }
});

window.WebSocket = class Socket extends WebSocket {
    constructor(...args) {
        super(...args)
        this.sendQueue = new Map();
        console.log("Created Websocket, URL:", args[0]);

    }

    send(...args) {
        //super.send(...args);

        this.sendQueue.set(performance.now(), args[0]);

        if (sendPacket) {
            document.title = "Normal";
            this.sendQueue.forEach(pkt => super.send(pkt));
            this.sendQueue.clear();
        } else {
            document.title = "Lag mode";
            this.sendQueue.forEach((packet, ts) => {
                if (performance.now() - ts > 4500) {
                    super.send(packet);
                    this.sendQueue.delete(ts);
                }
            });
        }
        console.log("Intercepted ARgs: ", args)
    }
}
//Hook 1
// rgb
var r = 255;
var g = 0;
var b = 0;

let nextRGB = () => {
    const amnt = 3;
    if (r >= 255 && g < 255 && b <= 0) {
        g = g + amnt;
    }
    if (g >= 255 && r > 0 && b <= 0) {
        r = r - amnt;
    }
    if (g >= 255 && b < 255 && r <= 0) {
        b = b + amnt;
    }
    if (b >= 255 && g > 0 && r <= 0) {
        g = g - amnt;
    }
    if (b >= 255 && r < 255 && g <= 0) {
        r = r + amnt;
    }
    if (r == 255 && b > 0 && g <= 0) {
        b = b - amnt;
    }
}

let nextColor = () => {
    nextRGB();
    return getColor();
}

let getColor = () => {
    return {
        r: r / 255,
        g: g / 255,
        b: b / 255
    };
}
//
const clearRect = CanvasRenderingContext2D.prototype.clearRect.noDisconnect;
const original_clearRect = CanvasRenderingContext2D.prototype.scale;
let hook_clearRect = new Proxy(original_clearRect, {
    apply: function(target, _this, _arguments, noDisconnect) {
        try {
            var ret = Function.prototype.apply.apply(target, [_this, _arguments, noDisconnect]);
        } catch (e) {
            // modify stack trace to hide proxy
            e.stack = e.stack.replace(/\n.*Object\.apply \(<.*/, '');
            throw e;
        }

        render(_this, noDisconnect);

        return ret;
    }
});
CanvasRenderingContext2D.prototype.scale = hook_clearRect;
conceal_function(original_clearRect, hook_clearRect);
