/*It's now krunker version 1.9.9 and the game have changed lot. You can't anymore alter game script anymore because of the new anticheat. Everything must now be done by hooks after it checks if the game script has changed.
In any case we need get our hack working by Obfuscating it. The game codes never change but the anticheat does change and keep changing. The simple old codes as 3RD GUY, GUI, ESP, PERFECRT ESP BOX will keep always working.
Getting the simple information is so important for coming project.
*/

##################################
//3rd person code.
(/(\w+)\[\'config\'\]\[\'thirdPerson\'\]/g, `${getHack}("3rd Person").status`);
##################################
//GUI
var GUI = document.createElement('div');
GUI.style = "float:right;width:100%;background-color: rgba(0,0,0,0.25);border-radius:5%;text-align:center;margin-top:5%;";

function guiReload() {
    GUI.innerHTML = "";
    if(unsafeWindow[getHack]("GUI").status) {
        GUI.innerHTML += "<br><h2 style='color:#A882DC;'>ℤ𝔼ℝ𝟘𝕏</h2><hr>";
        unsafeWindow[hacks].forEach(function(hack) {
            GUI.innerHTML += `<h3><span style='float:left;margin-left:10%;color:#FFBD48'>[${hack.keybind}]</span><span style='margin-left:-10%;color:${hack.status ? "#98EA2F" : "#FF4040"};'>${hack.name}</span></h3>`;
        });
        GUI.innerHTML += "<br>";
    }
}
##################################
//GUI stats
unsafeWindow[hacks] = [];
unsafeWindow[hacks].push(new hack("x", "1", true));
unsafeWindow[hacks].push(new hack("x", "2", true));
unsafeWindow[hacks].push(new hack("x", "3", true));
unsafeWindow[hacks].push(new hack("x", "4", true));
unsafeWindow[hacks].push(new hack("x", "5", true));
unsafeWindow[hacks].push(new hack("x", "6", false)); 
unsafeWindow[hacks].push(new hack("x", "7", true));

window.addEventListener('keydown', (key) => {
    unsafeWindow[hacks].forEach(function(hack) {
        if(hack.keybind === String.fromCharCode(key.keyCode)) {
            hack.status = !hack.status;
        }
    });
});
// Basic gui information
##################################
/* AutoReload */
        if(${myself} && ${myself}.ammos[${myself}.weaponIndex] === 0 && ${getHack}("AutoReload").status) {
          ${inputs}[9] = 1;
        }
      `
    );
##################################
/* BHop */
        if(${control}['keys'][${control}['moveKeys'][0]] && ${getHack}("BHop").status) {
          ${control}['keys'][${control}['jumpKey']] = !${control}['keys'][${control}['jumpKey']];
        }
##################################
