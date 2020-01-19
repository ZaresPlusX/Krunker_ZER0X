//<edit>
class Utilities {
    constructor() {
        this.exports;
        this.ui;
        this.me;
        this.world;
        this.socket;
        this.server;
        this.downKeys = new Set();
        this.upKeys = new Set();
        this.menus = new Map();
        this.features = [];
        this.colors = {
            aqua: '#7fdbff',
            blue: '#0074d9',
            lime: '#01ff70',
            navy: '#001f3f',
            teal: '#39cccc',
            olive: '#3d9970',
            green: '#2ecc40',
            red: '#ff4136',
            maroon: '#85144b',
            orange: '#ff851b',
            purple: '#b10dc9',
            yellow: '#ffdc00',
            fuchsia: '#f012be',
            greyDark: '#808080',
            greyMed: '#a9a9a9',
            greyLight: '#d3d3d3',
            white: '#ffffff',
            black: '#000000',
            silver: '#dddddd',
            hostile: '#eb5656',
            friendly: '#9eeb56',
        };
        this.settings = {
            showMenu: true,
            autoAimWalls: 0,
            aimOffset: -0.6,
            espMode: 4,
            espFontSize: 100,
            canShoot: true,
            scopingOut: false,
            isSliding: false,
            delta: 1,
        }
        this.activeMenuIndex = 0;
        this.activeLineIndex = 0;
        this.canvas = null;
        this.ctx = null;
        let interval_ui = setInterval(() => {
            if (document.getElementById("inGameUI") !== null) {
                clearInterval(interval_ui);
                this.onLoad();
            }
        }, 100);
    }

    onLoad() {
        this.menus
            .set('Krunker Zares', [this.newFeature('Self', []), this.newFeature('Weapon', []), this.newFeature('Visual', []), this.newFeature('Settings', [])])
            .set('Self', [this.newFeature('AutoBhop', ['Off', 'Auto Jump', 'Key Jump', 'Auto Slide', 'Key Slide']), this.newFeature('ZaresSettings', ['Off', 'On'])])
            .set('Weapon', [this.newFeature('AutoAim', ['Off', 'Aim Assist', 'Aim Bot', 'Trigger Bot']), this.newFeature('AutoReload', ['Off', 'On']), this.newFeature('Aim Through Walls', ['Off', 'On']), this.newFeature('UseDeltaForce', ['Off', 'On'])])
            .set('Visual', [this.newFeature('EspMode', ['Off', 'Full', '2d', 'Walls']), this.newFeature('Tracers', ['Off', 'On'])])
            .set('Settings', [this.newFeature('Reset', [], this.resetSettings), this.newFeature('Save game.js', [], _ => {
                self.saveAs(new Blob([self.GameScript], {
                    type: "text/plain;charset=utf-8"
                }), `game.js`)
            })])
        // EventListeners and Hooks ...
        addEventListener("keydown", e => {
            if ("INPUT" == window.document.activeElement.tagName) return;
            const key = e.key.toUpperCase();
            const code = e.code;
            if (!this.downKeys.has(code)) this.downKeys.add(code);
        });
        addEventListener("keyup", e => {
            const key = e.key.toUpperCase();
            const code = e.code;
            if (this.downKeys.has(code)) this.downKeys.delete(code);
            if (!this.upKeys.has(code)) this.upKeys.add(code);

            if (key === "L") {
                console.dir(self);
                console.dir(this.me);
                console.dir(this.world);
                console.dir(this.server);
                this.server.serverConfig[23].def === "false" ? this.server.serverConfig[23].def = "true" : this.server.serverConfig[23].def = "false";
            }
        })
    }

    keyDown(code) {
        return this.downKeys.has(code);
    }

    keyUp(code) {
        if (this.upKeys.has(code)) {
            this.upKeys.delete(code);
            return true;
        }
        return false;
    }

    byte2Hex(n) {
        var chars = "0123456789ABCDEF";
        return String(chars.substr((n >> 4) & 0x0F, 1)) + chars.substr(n & 0x0F, 1);
    }

    rgba2hex(r, g, b, a = 255) {
        return ("#").concat(this.byte2Hex(r), this.byte2Hex(g), this.byte2Hex(b), this.byte2Hex(a));
    }

    onTick(player, world) {
        if (world && player && player.isYou && player.active) {
            this.world = world;
            this.me = player;
            this.server = this.exports.c[7].exports;
            this.me.weapon.range = Infinity;
            this.me.weapon.pierce = Infinity;

            for (let i = 0, sz = this.features.length; i < sz; i++) {
                const feature = this.features[i];
                switch (feature.name) {
                    case 'AutoAim':
                        this.autoAim(feature.value);
                        break;
                    case 'AutoReload':
                        if (feature.value) this.wpnReload();
                        break;
                    case 'AutoBhop':
                        this.autoBhop(feature.value);
                        break;
                    case 'EspMode':
                        this.settings.espMode = feature.value;
                        break;
                    case 'ZaresSettings':
                        if (feature.value) new Map([
                            ["fov", 85],
                            ["fpsFOV", 85],
                            ["weaponBob", 3],
                            ["weaponLean", 6],
                            ["weaponOffX", 2],
                            ["weaponOffY", 2],
                            ["weaponOffZ", 2]
                        ]).forEach(function(value, key, map) {
                            window.setSetting(key, value)
                        });
                        break;
                    case 'UseDeltaForce':
                        this.settings.delta = feature.value ? 5 : 1;
                        break;
                }
            }
        }
    }

    resetSettings() {
        if (confirm("Are you sure you want to reset all your zares settings? This will also refresh the page")) {
            Object.keys(window.localStorage).filter(x => x.includes("utilities_")).forEach(x => window.localStorage.removeItem(x));
            window.location.reload();
        }
    }

    newFeature(name, array, myFunction = null) {
        const cStruct = (...keys) => ((...v) => keys.reduce((o, k, i) => {
            o[k] = v[i];
            return o
        }, {}));
        var item = [];
        const myStruct = cStruct('name', 'value', 'valueStr', 'container', 'myFunction')
        const value = parseInt(window.getSavedVal("utilities_" + name) || 0);
        const feature = myStruct(name, value, array.length ? array[value] : '', array, myFunction);
        if (array.length || myFunction) this.features.push(feature);
        item.push(feature);
        return item;
    }

    getFeature(name) {
        for (const feature of this.features) {
            if (feature.name.toLowerCase() === name.toLowerCase()) {
                return feature;
            }
        }
        return null;
    }

    onUpdated(feature) {
        if (feature.container.length) {
            feature.value += 1;
            if (feature.value > feature.container.length - 1) {
                feature.value = 0;
            }
            feature.valueStr = feature.container[feature.value];
            window.saveVal("utilities_" + feature.name, feature.value);
        }
        if (feature.container.length == 2 && feature.container[0] == 'Off' && feature.container[1] == 'On') {
            console.log(feature.name, " is now ", feature.valueStr);
            switch (feature.name) {
                case 'Aim Through Walls':
                    this.settings.autoAimWalls = feature.value;
                    break;
            }
        }
    }

    getDistance3D(fromX, fromY, fromZ, toX, toY, toZ) {
        var distX = fromX - toX,
            distY = fromY - toY,
            distZ = fromZ - toZ;
        return Math.sqrt(distX * distX + distY * distY + distZ * distZ);
    }

    getDistance(player1, player2) {
        return this.getDistance3D(player1.x, player1.y, player1.z, player2.x, player2.y, player2.z);
    }

    getDirection(fromZ, fromX, toZ, toX) {
        return Math.atan2(fromX - toX, fromZ - toZ);
    }

    getXDir(fromX, fromY, fromZ, toX, toY, toZ) {
        var dirY = Math.abs(fromY - toY),
            dist = this.getDistance3D(fromX, fromY, fromZ, toX, toY, toZ);
        return Math.asin(dirY / dist) * (fromY > toY ? -1 : 1);
    }

    getAngleDist(start, end) {
        return Math.atan2(Math.sin(end - start), Math.cos(start - end));
    }

    camLookAt(X, Y, Z) {
        const currentXDR = this.world.controls.xDr;
        const currentYDR = this.world.controls.yDr;
        const camChaseDst = this.server.camChaseDst;
        var xdir = this.getXDir(this.world.controls.object.position.x, this.world.controls.object.position.y, this.world.controls.object.position.z, X, Y, Z),
            ydir = this.getDirection(this.world.controls.object.position.z, this.world.controls.object.position.x, Z, X);
        this.world.controls.target = {
            xD: xdir,
            yD: ydir,
            x: X + camChaseDst * Math.sin(ydir) * Math.cos(xdir),
            y: Y - camChaseDst * Math.sin(xdir),
            z: Z + camChaseDst * Math.cos(ydir) * Math.cos(xdir)
        }
        this.world.controls.xDr = currentXDR;
        this.world.controls.yDr = currentYDR;
    }

    getStatic(s, d) {
        if (typeof s == 'undefined') {
            return d;
        }
        return s;
    }

    teamColor(player) {
        return player.team === null ? '#FF4444' : this.me.team === player.team ? '#44AAFF' : '#FF4444';
    }

    autoAim(value) {
        if (!value) return;
        if (this.me.didShoot) {
            this.me.inputs.push([6, 0]);
            this.settings.canShoot = false;
            setTimeout(() => {
                this.settings.canShoot = true;
            }, this.me.weapon.rate / 1.75);
        }

        const enemies = this.world.players.list.filter(x => {
            return x.active && x.cnBSeen && !x.isYou && (!x.team || x.team !== this.me.team);
        }).sort((p1, p2) => this.getDistance(this.me, p1) - this.getDistance(this.me, p2));
        const target = enemies.shift();
        if (target !== undefined) {
            switch (value) {
                case 1:
                    /*Aim Assist*/
                    if (this.world.controls.mouseDownR > 0) {
                        this.world.config.deltaMlt = this.settings.delta;
                        this.camLookAt(target.x2, target.y2 + target.height + this.settings.aimOffset - this.server.cameraHeight - this.server.crouchDst * target.crouchVal - this.server.recoilMlt * this.me.recoilAnimY * this.me.recoilForce, target.z2);
                        this.world.config.deltaMlt = 1;
                    }
                    break;
                case 2:
                    /*Aim Bot*/
                    this.Aimbot(target, false);
                    break;
                case 3:
                    /*Trigger Bot*/
                    this.Aimbot(target, true);
                    break;
                default:
                    break;
            }
        } else {
            this.world.controls.target = null;
            this.world.config.deltaMlt = 1;
            if (this.world.controls.mouseDownR > 1) this.world.controls.mouseDownR = 0;
        }
    }

    Aimbot(target, autoShoot) {

        if (this.world.controls.mouseDownL > 0) {
            this.world.controls.mouseDownL = 0;
            this.world.controls.mouseDownR = 0;
            this.settings.scopingOut = true;
        }

        if (this.me.aimVal === 1) {
            this.settings.scopingOut = false;
        }

        if (this.me.recoilForce > 0) {
            this.me.recoilTween = new self.TWEEN.Tween(this.me).to({
                recoilTweenY: 0,
                recoilTweenYM: 0,
                recoilTweenZ: 0
            });
        }

        if (this.settings.scopingOut || !this.settings.canShoot) {
            return;
        }

        this.world.config.deltaMlt = this.settings.delta;

        if (autoShoot) {
            this.camLookAt(target.x, target.y + this.server.playerHeight - this.server.headScale / 2 - target.crouchVal * this.server.crouchDst - this.server.recoilMlt * this.me.recoilAnimY * this.me.recoilForce, target.z);
            this.world.controls.mouseDownR = 2;
            if (this.me.aimVal < 0.2) {
                this.world.controls.mouseDownL ^= 1;
            }
        } else {
            this.world.config.deltaMlt = this.settings.delta;
            this.camLookAt(target.x2, target.y2 + target.height + this.settings.aimOffset - this.server.cameraHeight - this.server.crouchDst * target.crouchVal - this.server.recoilMlt * this.me.recoilAnimY * this.me.recoilForce, target.z2);
            if (target.cnBSeen) this.world.controls.mouseDownR = 2;
        }

        this.world.config.deltaMlt = 1;
    }

    autoBhop(value) {
        if (!value) return;
        if (this.keyDown("Space") || value == 1 || value == 3) {
            this.world.controls.keys[this.world.controls.jumpKey] = !this.world.controls.keys[this.world.controls.jumpKey];
            if (value > 2) {
                if (this.settings.isSliding) {
                    this.world.controls.keys[this.world.controls.crouchKey] = 1;
                    return;
                }
                if (this.me.yVel < -0.04 && this.me.canSlide) {
                    this.settings.isSliding = true;
                    setTimeout(() => {
                        this.settings.isSliding = false;
                        this.world.controls.keys[this.world.controls.crouchKey] = 0;
                    }, 350);
                    this.world.controls.keys[this.world.controls.crouchKey] = 1;
                }
            }
        }
    }

    wpnReload(force = false) {
        //(inputs[9] = me.ammos[me.weaponIndex] === 0);
        const ammoLeft = this.me.ammos[this.me.weaponIndex];
        if (force || ammoLeft === 0) {
            this.world.players.reload(this.me);
            if (ammoLeft) this.world.players.endReload(this.me.weapon);
        }
    }

    world2Screen(camera, pos3d, aY = 0) {
        let pos = pos3d.clone();
        pos.y += aY;
        pos.project(camera);
        pos.x = (pos.x + 1) / 2;
        pos.y = (-pos.y + 1) / 2;
        pos.x *= this.canvas.width || innerWidth;
        pos.y *= this.canvas.height || innerHeight;
        return pos;
    }

    pixelTranslate(ctx, x, y) {
        ctx.translate(~~x, ~~y);
    }

    text(txt, font, color, x, y) {
        this.ctx.save();
        this.pixelTranslate(this.ctx, x, y);
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
        this.ctx.font = font;
        this.ctx.lineWidth = 1;
        this.ctx.strokeText(txt, 0, 0);
        this.ctx.fillText(txt, 0, 0);
        this.ctx.restore();
    }

    rect(x, y, ox, oy, w, h, color, fill) {
        this.ctx.save();
        this.pixelTranslate(this.ctx, x, y);
        this.ctx.beginPath();
        fill ? this.ctx.fillStyle = color : this.ctx.strokeStyle = color;
        this.ctx.rect(ox, oy, w, h);
        fill ? this.ctx.fill() : this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
    }

    roundRect(x, y, width, height, radius, fill, stroke, color) {
        var cornerRadius = {
            upperLeft: 0,
            upperRight: 0,
            lowerLeft: 0,
            lowerRight: 0
        };
        if (typeof stroke == "undefined") {
            stroke = true;
        }
        if (typeof radius === "object") {
            for (var side in radius) {
                cornerRadius[side] = radius[side];
            }
        }
        this.ctx.save();
        this.pixelTranslate(this.ctx, x, y);
        this.ctx.beginPath();
        this.ctx.moveTo(x + cornerRadius.upperLeft, y);
        this.ctx.lineTo(x + width - cornerRadius.upperRight, y);
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + cornerRadius.upperRight);
        this.ctx.lineTo(x + width, y + height - cornerRadius.lowerRight);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - cornerRadius.lowerRight, y + height);
        this.ctx.lineTo(x + cornerRadius.lowerLeft, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - cornerRadius.lowerLeft);
        this.ctx.lineTo(x, y + cornerRadius.upperLeft);
        this.ctx.quadraticCurveTo(x, y, x + cornerRadius.upperLeft, y);
        this.ctx.closePath();
        if (stroke) {
            this.ctx.strokeStyle = color;
            this.ctx.stroke();
        }
        if (fill) {
            this.ctx.fillStyle = color;
            this.ctx.fill();
        }
        this.ctx.restore();
    }

    line(x1, y1, x2, y2, lW, sS) {
        this.ctx.save();
        this.ctx.lineWidth = lW + 2;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.strokeStyle = "rgba(0, 0, 0, 0.25)";
        this.ctx.stroke();
        this.ctx.lineWidth = lW;
        this.ctx.strokeStyle = sS;
        this.ctx.stroke();
        this.ctx.restore();
    }

    image(x, y, img, ox, oy, w, h) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.beginPath();
        this.ctx.drawImage(img, ox, oy, w, h);
        this.ctx.closePath();
        this.ctx.restore();
    }

    gradient(x, y, w, h, colors) {
        let grad = this.ctx.createLinearGradient(x, y, w, h);
        for (let i = 0; i < colors.length; i++) {
            grad.addColorStop(i, colors[i]);
        }
        return grad;
    }

    getTextMeasurements(arr) {
        for (let i = 0; i < arr.length; i++) {
            arr[i] = ~~this.ctx.measureText(arr[i]).width;
        }
        return arr;
    }

    drawEsp(ui, world, myself) {
        const me = ui.camera.getWorldPosition()
        const font = this.settings.espFontSize + 'px Sans-serif';
        const setting = this.getFeature('EspMode').container[this.settings.espMode];
        for (const entity of world.players.list.filter(x => !x.isYou && x.active)) {
            //if (!entity.rankIcon && entity.level > 0) {
            //	let rankVar = entity.level > 0 ? Math.ceil(entity.level / 3) * 3 : entity.level < 0 ? Math.floor(entity.level / 3) * 3 : entity.level;
            //	let rankId = Math.max(Math.min(100, rankVar - 2), 0);
            //	entity.rankIcon = new Image();
            //	entity.rankIcon.src = `./img/levels/${rankId}.png`;
            //}
            const target = entity.objInstances.position.clone();

            if (ui.frustum.containsPoint(target)) {
                let screenR = this.world2Screen(ui.camera, entity.objInstances.position.clone());
                let screenH = this.world2Screen(ui.camera, entity.objInstances.position.clone(), entity.height);
                let hDiff = ~~(screenR.y - screenH.y);
                let bWidth = ~~(hDiff * 0.6);

                if (setting !== 'Walls') {
                    /*healthBar*/
                    let health = entity.health;
                    this.rect((screenH.x - bWidth / 2) - 7, ~~screenH.y - 1, 0, 0, 4, hDiff + 2, this.colors.black, false);
                    this.rect((screenH.x - bWidth / 2) - 7, ~~screenH.y - 1, 0, 0, 4, hDiff + 2, health > 75 ? this.colors.green : health > 50 ? this.colors.orange : this.colors.red, true);
                    this.rect((screenH.x - bWidth / 2) - 7, ~~screenH.y - 1, 0, 0, 4, ~~((entity.maxHealth - entity.health) / entity.maxHealth * (hDiff + 2)), this.colors.black, true);
                    /*2d*/
                    this.ctx.save();
                    this.ctx.lineWidth = 4;
                    this.pixelTranslate(this.ctx, screenH.x - bWidth / 2, screenH.y);
                    this.ctx.beginPath();
                    this.ctx.rect(0, 0, bWidth, hDiff);
                    this.ctx.strokeStyle = "rgba(0, 0, 0, 0.25)";
                    this.ctx.stroke();
                    this.ctx.lineWidth = 2;
                    this.ctx.strokeStyle = entity.team === null ? '#FF4444' : myself.team === entity.team ? '#44AAFF' : '#FF4444';
                    this.ctx.stroke();
                    this.ctx.closePath();
                    this.ctx.restore();
                    if (setting === 'Full') {
                        /*healthBar*/
                        let playerDist = parseInt(this.getDistance3D(me.x, me.y, me.z, target.x, target.y, target.z) / 10);
                        this.ctx.save();
                        //this.ctx.font = font;
                        let meas = this.getTextMeasurements([" ", playerDist, "m ", entity.level, "©", entity.name]);
                        this.ctx.restore();
                        let grad2 = this.gradient(0, 0, meas[4] * 5, 0, ["rgba(0, 0, 0, 0.25)", "rgba(0, 0, 0, 0)"]);
                        let padding = 2;
                        //if (entity.rankIcon && entity.rankIcon.complete) {
                        //	let grad = this.gradient(0, 0, (meas[4] * 2) + meas[3] + (padding * 3), 0, ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.25)"]);
                        //	this.rect(~~(screenH.x - bWidth / 2) - 12 - (meas[4] * 2) - meas[3] - (padding * 3), ~~screenH.y - padding, 0, 0, (meas[4] * 2) + meas[3] + (padding * 3), meas[4] + (padding * 2), grad, true);
                        //	this.ctx.drawImage(entity.rankIcon, ~~(screenH.x - bWidth / 2) - 16 - (meas[4] * 2) - meas[3], ~~screenH.y - (meas[4] * 0.5), entity.rankIcon.width * ((meas[4] * 2) / entity.rankIcon.width), entity.rankIcon.height * ((meas[4] * 2) / entity.rankIcon.height));
                        //	this.text(`${entity.level}`, `${this.settings.espFontSize}px GameFont`, '#FFFFFF', ~~(screenH.x - bWidth / 2) - 16 - meas[3], ~~screenH.y + meas[4] * 1);
                        //}
                        this.rect(~~(screenH.x + bWidth / 2) + padding, ~~screenH.y - padding, 0, 0, (meas[4] * 5), (meas[4] * 4) + (padding * 2), grad2, true);
                        this.text(entity.name, font, entity.team === null ? '#FFCDB4' : myself.team === entity.team ? '#B4E6FF' : '#FFCDB4', (screenH.x + bWidth / 2) + 4, screenH.y + meas[4] * 1)
                        if (entity.clan) this.text('[' + entity.clan + ']', font, '#AAAAAA', (screenH.x + bWidth / 2) + 8 + meas[5], screenH.y + meas[4] * 1)
                        this.text(entity.health + ' HP', font, "#33FF33", (screenH.x + bWidth / 2) + 4, screenH.y + meas[4] * 2)
                        this.text(entity.weapon.name, font, "#DDDDDD", (screenH.x + bWidth / 2) + 4, screenH.y + meas[4] * 3)
                        this.text("[", font, "#AAAAAA", (screenH.x + bWidth / 2) + 4, screenH.y + meas[4] * 4)
                        this.text(playerDist, font, "#DDDDDD", (screenH.x + bWidth / 2) + 4 + meas[0], screenH.y + meas[4] * 4)
                        this.text("m]", font, "#AAAAAA", (screenH.x + bWidth / 2) + 4 + meas[0] + meas[1], screenH.y + meas[4] * 4)
                    }
                }

                const tracers = this.getFeature('Tracers');
                if (tracers && tracers.value)
                    if (this.settings.espMode === 1 || this.settings.espMode === 2) this.line(innerWidth / 2, innerHeight - 1, screenR.x, screenR.y, 2, entity.team === null ? '#FF4444' : myself.team === entity.team ? '#44AAFF' : '#FF4444');
            }
        }
    }

    drawMenuLine(item, lineWidth, lineHeight, lineTop, lineLeft, textLeft, active, title, rescaleText = true) {
        // default values
        let text_col = [255, 255, 255, 255],
            rect_col = [0, 0, 0, 120],
            text_scale = 20,
            font = 'px sans-serif';

        // active line values
        if (active) {
            text_col[0] = 0;
            text_col[1] = 0;
            text_col[2] = 0;
            rect_col[0] = 231;
            rect_col[1] = 231;
            rect_col[2] = 231;
            if (rescaleText) text_scale = 21;
        }

        // title values
        if (title) {
            rect_col[0] = 70;
            rect_col[1] = 90;
            rect_col[2] = 90;
            rect_col[3] = 255;
            if (rescaleText) text_scale = 20;
            font = 'px GameFont';
            textLeft = lineWidth / 2 - this.getTextMeasurements([item.name]);
        }

        // rect
        this.rect(lineLeft, lineTop, 0, 0, lineWidth, (lineHeight * 2), this.rgba2hex(rect_col[0], rect_col[1], rect_col[2], rect_col[3]), true);

        // text
        this.text(item.name, text_scale + font, this.rgba2hex(text_col[0], text_col[1], text_col[2]), textLeft, lineTop + lineHeight + lineHeight / 2);

        // value
        this.text(item.valueStr, text_scale + font, item.valueStr == "On" ? "#B2F252" : item.valueStr == "Off" ? "#FF4444" : active ? "#333333" : "#999EA5", lineWidth - textLeft * 1.5 - this.getTextMeasurements([item.valueStr]), lineTop + lineHeight + lineHeight / 2);
    }

    drawMenuItem(caption) {
        const top = 280;
        const left = 20;
        const lineWidth = 320;
        const items = this.menus.get(caption);
        if (!items.length) return;
        if (this.activeLineIndex > items.length - 1) this.activeLineIndex = 0;

        // draw menu
        this.drawMenuLine({
            name: caption,
            valueStr: ''
        }, lineWidth, 22, top + 18, left, left + 5, false, true);
        for (var i = 0; i < items.length; i++) {
            if (i != this.activeLineIndex) this.drawMenuLine(items[i][0], lineWidth, 19, top + 60 + i * 36, left, left + 9, false, false);
            this.drawMenuLine(items[this.activeLineIndex][0], lineWidth, 19, top + 60 + this.activeLineIndex * 36, left, left + 9, true, false);
        }

        // process buttons
        if (this.keyUp("Numpad5") || this.keyUp("ArrowRight")) {
            self.SOUND.play('tick_0', 0.1)
            const feature = items[this.activeLineIndex][0];
            if (feature) {
                if (feature.container.length) this.onUpdated(feature);
                else if (typeof feature.myFunction === "function") feature.myFunction();
                else this.activeMenuIndex = this.activeLineIndex + 1;
            }
        } else if (this.keyUp("Numpad0") || this.keyUp("ArrowLeft")) {
            self.SOUND.play('tick_0', 0.1);
            if (this.activeMenuIndex > 0) this.activeMenuIndex = 0;
            else this.settings.showMenu = false;
            return;
        } else if (this.keyUp("Numpad8") || this.keyUp("ArrowUp")) {
            self.SOUND.play('tick_0', 0.1)
            if (this.activeLineIndex == 0) this.activeLineIndex = items.length;
            this.activeLineIndex--;
        } else if (this.keyUp("Numpad2") || this.keyUp("ArrowDown")) {
            self.SOUND.play('tick_0', 0.1)
            this.activeLineIndex++;
            if (this.activeLineIndex == items.length) this.activeLineIndex = 0;
        }
    }

    drawMenu() {
        if (this.settings.showMenu) {
            switch (this.activeMenuIndex) {
                case 0:
                    this.drawMenuItem('Krunker Zares');
                    break;
                case 1:
                    this.drawMenuItem('Self');
                    break;
                case 2:
                    this.drawMenuItem('Weapon');
                    break;
                case 3:
                    this.drawMenuItem('Visual');
                    break;
                case 4:
                    this.drawMenuItem('Settings');
                    break;
                default:
                    break;
            }
        } else if (this.keyUp("Numpad0") || this.keyUp("ArrowLeft")) {
            self.SOUND.play('tick_0', 0.1)
            this.settings.showMenu = true;
        }
    }

    onRender(uiConfig, scale, world, ui, me, scale2) {
        if (uiConfig) {
            uiConfig.crosshairAlways = true;
            this.settings.espFontSize = uiConfig.dmgScale * 0.25;
            this.canvas = uiConfig.canvas || document.getElementById("game-overlay");
            this.ctx = this.canvas.getContext("2d");
            this.ctx.save();
            this.ctx.clearRect(0, 0, this.canvas.width || innerWidth, this.canvas.height || innerHeight);
            if (world && ui && me) {
                if ('none' == self.menuHolder.style.display && 'none' == self.endUI.style.display) {
                    if (this.settings.espMode > 0) this.drawEsp(ui, world, me);
                    this.drawMenu();
                }
            }
            this.ctx.restore();
        }
    }
}

function attemptPatch(source) {
    window.GameScript = source;
    source = Utilities.toString().concat(source);
    const patches = new Map()
        .set("exports", [/(\['__CANCEL__']=.*?\(\w+,\w+,(\w+)\){)(let)/, '$1window.utilities=new Utilities();utilities.exports=$2;$3'])
        .set("controlView", [/(if\(this\['target']\){)/, '$1this.object.rotation.y=this.target.yD;this.pitchObject.rotation.x=this.target.xD;const half=Math.PI/2;this.yDr=Math.max(-half,Math.min(half,this.target.xD))%Math.PI;this.xDr=this.target.yD%Math.PI;'])
        //.set("procInputs", [/(this\['procInputs']=function\((\w+),(\w+),(\w+),(\w+)\){)/, '$1utilities.onTick(this,$3,$2);'])
        .set("Update", [/(this\['update']=function\((\w+),(\w+)\){if\(this\['active']\){)/, '$1utilities.onTick(this,$2);'])
        .set("ui", [/(this,\w+={};this\['frustum'])/, 'utilities.ui=$1'])
        .set("fixHowler", [/(Howler\['orientation'](.+?)\)\),)/, ``])
        .set("clearRec", [/(if\(\w+\['save']\(\),\w+\['scale']\(\w+,\w+\),)\w+\['clearRect']\(0x0,0x0,\w+,\w+\),(\w+\['showDMG']\))/, '$1$2'])
        .set("onRender", [/((\w+)\['render']=function\((\w+,\w+,\w+,\w+,\w+)\){)/, '$1utilities.onRender($2,$3);'])
        .set("pInfo", [/(if\()(!\w+\['cnBSeen']\)continue;)/, '$1utilities.settings.espMode==1||utilities.settings.espMode==0&&$2'])
        .set("wallhack", [/(\(((\w+))=this\['map']\['manager']\['objects']\[(\w+)]\))(.+?)\)/, '$1.penetrable&&$2.active&&!utilities.settings.autoAimWalls)'])
        //.set("socket", [/(new WebSocket)/, 'utilities.socket=$1'])
        .set("fuckingLame", [/if\(!\w+&&!\w+&&!\w+&&\w+\['isView']\(this\)&&\w+\['isView']\(\w+\)/, 'if(!1'])

    for (const [name, item] of patches) {
        const patched = source.replace(item[0], item[1]);
        if (source === patched) {
            alert(`Failed to patch ${name}`);
            continue;
        } else console.log("Successfully patched ", name);
        source = patched;
    }

    return source;
}
//</edit>
var Q=I(6),B=I(7),C=I(8);function E(){return c.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function D(A,g){if(E()<g)throw new RangeError("Invalid typed array length");return c.TYPED_ARRAY_SUPPORT?(A=new Uint8Array(g)).__proto__=c.prototype:(null===A&&(A=new c(g)),A.length=g),A}function c(A,g,I){if(!(c.TYPED_ARRAY_SUPPORT||this instanceof c))return new c(A,g,I);if("number"==typeof A){if("string"==typeof g)throw new Error("If encoding is specified then the first argument must be a string");return H(this,A)}return N(this,A,g,I)}function N(A,g,I,Q){if("number"==typeof g)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&g instanceof ArrayBuffer?function(A,g,I,Q){if(g.byteLength,I<0||g.byteLength<I)throw new RangeError("'offset' is out of bounds");if(g.byteLength<I+(Q||0))throw new RangeError("'length' is out of bounds");g=void 0===I&&void 0===Q?new Uint8Array(g):void 0===Q?new Uint8Array(g,I):new Uint8Array(g,I,Q);c.TYPED_ARRAY_SUPPORT?(A=g).__proto__=c.prototype:A=x(A,g);return A}(A,g,I,Q):"string"==typeof g?function(A,g,I){"string"==typeof I&&""!==I||(I="utf8");if(!c.isEncoding(I))throw new TypeError('"encoding" must be a valid string encoding');var Q=0|M(g,I),B=(A=D(A,Q)).write(g,I);B!==Q&&(A=A.slice(0,B));return A}(A,g,I):function(A,g){if(c.isBuffer(g)){var I=0|X(g.length);return 0===(A=D(A,I)).length?A:(g.copy(A,0,0,I),A)}if(g){if("undefined"!=typeof ArrayBuffer&&g.buffer instanceof ArrayBuffer||"length"in g)return"number"!=typeof g.length||(Q=g.length)!=Q?D(A,0):x(A,g);if("Buffer"===g.type&&C(g.data))return x(A,g.data)}var Q;throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(A,g)}function e(A){if("number"!=typeof A)throw new TypeError('"size" argument must be a number');if(A<0)throw new RangeError('"size" argument must not be negative')}function H(A,g){if(e(g),A=D(A,g<0?0:0|X(g)),!c.TYPED_ARRAY_SUPPORT)for(var I=0;I<g;++I)A[I]=0;return A}function x(A,g){var I=g.length<0?0:0|X(g.length);A=D(A,I);for(var Q=0;Q<I;Q+=1)A[Q]=255&g[Q];return A}function X(A){if(A>=E())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+E().toString(16)+" bytes");return 0|A}function M(A,g){if(c.isBuffer(A))return A.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(A)||A instanceof ArrayBuffer))return A.byteLength;"string"!=typeof A&&(A=""+A);var I=A.length;if(0===I)return 0;for(var Q=!1;;)switch(g){case"ascii":case"latin1":case"binary":return I;case"utf8":case"utf-8":case void 0:return b(A).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*I;case"hex":return I>>>1;case"base64":return r(A).length;default:if(Q)return b(A).length;g=(""+g).toLowerCase(),Q=!0}}function i(A,g,I){var Q=A[g];A[g]=A[I],A[I]=Q}function o(A,g,I,Q,B){if(0===A.length)return-1;if("string"==typeof I?(Q=I,I=0):I>2147483647?I=2147483647:I<-2147483648&&(I=-2147483648),I=+I,isNaN(I)&&(I=B?0:A.length-1),I<0&&(I=A.length+I),I>=A.length){if(B)return-1;I=A.length-1}else if(I<0){if(!B)return-1;I=0}if("string"==typeof g&&(g=c.from(g,Q)),c.isBuffer(g))return 0===g.length?-1:F(A,g,I,Q,B);if("number"==typeof g)return g&=255,c.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?B?Uint8Array.prototype.indexOf.call(A,g,I):Uint8Array.prototype.lastIndexOf.call(A,g,I):F(A,[g],I,Q,B);throw new TypeError("val must be string, number or Buffer")}function F(A,g,I,Q,B){var C,E=1,D=A.length,c=g.length;if(void 0!==Q&&("ucs2"===(Q=String(Q).toLowerCase())||"ucs-2"===Q||"utf16le"===Q||"utf-16le"===Q)){if(A.length<2||g.length<2)return-1;E=2,D/=2,c/=2,I/=2}function N(A,g){return 1===E?A[g]:A.readUInt16BE(g*E)}if(B){var e=-1;for(C=I;C<D;C++)if(N(A,C)===N(g,-1===e?0:C-e)){if(-1===e&&(e=C),C-e+1===c)return e*E}else-1!==e&&(C-=C-e),e=-1}else for(I+c>D&&(I=D-c),C=I;C>=0;C--){for(var H=!0,x=0;x<c;x++)if(N(A,C+x)!==N(g,x)){H=!1;break}if(H)return C}return-1}function J(A,g,I,Q){I=Number(I)||0;var B=A.length-I;Q?(Q=Number(Q))>B&&(Q=B):Q=B;var C=g.length;if(C%2!=0)throw new TypeError("Invalid hex string");Q>C/2&&(Q=C/2);for(var E=0;E<Q;++E){var D=parseInt(g.substr(2*E,2),16);if(isNaN(D))return E;A[I+E]=D}return E}function w(A,g,I,Q){return W(b(g,A.length-I),A,I,Q)}function n(A,g,I,Q){return W(function(A){for(var g=[],I=0;I<A.length;++I)g.push(255&A.charCodeAt(I));return g}(g),A,I,Q)}function Y(A,g,I,Q){return n(A,g,I,Q)}function y(A,g,I,Q){return W(r(g),A,I,Q)}function G(A,g,I,Q){return W(function(A,g){for(var I,Q,B,C=[],E=0;E<A.length&&!((g-=2)<0);++E)I=A.charCodeAt(E),Q=I>>8,B=I%256,C.push(B),C.push(Q);return C}(g,A.length-I),A,I,Q)}function h(A,g,I){return 0===g&&I===A.length?Q.fromByteArray(A):Q.fromByteArray(A.slice(g,I))}function R(A,g,I){I=Math.min(A.length,I);for(var Q=[],B=g;B<I;){var C,E,D,c,N=A[B],e=null,H=N>239?4:N>223?3:N>191?2:1;if(B+H<=I)switch(H){case 1:N<128&&(e=N);break;case 2:128==(192&(C=A[B+1]))&&(c=(31&N)<<6|63&C)>127&&(e=c);break;case 3:C=A[B+1],E=A[B+2],128==(192&C)&&128==(192&E)&&(c=(15&N)<<12|(63&C)<<6|63&E)>2047&&(c<55296||c>57343)&&(e=c);break;case 4:C=A[B+1],E=A[B+2],D=A[B+3],128==(192&C)&&128==(192&E)&&128==(192&D)&&(c=(15&N)<<18|(63&C)<<12|(63&E)<<6|63&D)>65535&&c<1114112&&(e=c)}null===e?(e=65533,H=1):e>65535&&(e-=65536,Q.push(e>>>10&1023|55296),e=56320|1023&e),Q.push(e),B+=H}return function(A){var g=A.length;if(g<=z)return String.fromCharCode.apply(String,A);var I="",Q=0;for(;Q<g;)I+=String.fromCharCode.apply(String,A.slice(Q,Q+=z));return I}(Q)}g.Buffer=c,g.SlowBuffer=function(A){+A!=A&&(A=0);return c.alloc(+A)},g.INSPECT_MAX_BYTES=50,c.TYPED_ARRAY_SUPPORT=void 0!==A.TYPED_ARRAY_SUPPORT?A.TYPED_ARRAY_SUPPORT:function(){try{var A=new Uint8Array(1);return A.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===A.foo()&&"function"==typeof A.subarray&&0===A.subarray(1,1).byteLength}catch(A){return!1}}(),g.kMaxLength=E(),c.poolSize=8192,c._augment=function(A){return A.__proto__=c.prototype,A},c.from=function(A,g,I){return N(null,A,g,I)},c.TYPED_ARRAY_SUPPORT&&(c.prototype.__proto__=Uint8Array.prototype,c.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&c[Symbol.species]===c&&Object.defineProperty(c,Symbol.species,{value:null,configurable:!0})),c.alloc=function(A,g,I){return function(A,g,I,Q){return e(g),g<=0?D(A,g):void 0!==I?"string"==typeof Q?D(A,g).fill(I,Q):D(A,g).fill(I):D(A,g)}(null,A,g,I)},c.allocUnsafe=function(A){return H(null,A)},c.allocUnsafeSlow=function(A){return H(null,A)},c.isBuffer=function(A){return!(null==A||!A._isBuffer)},c.compare=function(A,g){if(!c.isBuffer(A)||!c.isBuffer(g))throw new TypeError("Arguments must be Buffers");if(A===g)return 0;for(var I=A.length,Q=g.length,B=0,C=Math.min(I,Q);B<C;++B)if(A[B]!==g[B]){I=A[B],Q=g[B];break}return I<Q?-1:Q<I?1:0},c.isEncoding=function(A){switch(String(A).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},c.concat=function(A,g){if(!C(A))throw new TypeError('"list" argument must be an Array of Buffers');if(0===A.length)return c.alloc(0);var I;if(void 0===g)for(g=0,I=0;I<A.length;++I)g+=A[I].length;var Q=c.allocUnsafe(g),B=0;for(I=0;I<A.length;++I){var E=A[I];if(!c.isBuffer(E))throw new TypeError('"list" argument must be an Array of Buffers');E.copy(Q,B),B+=E.length}return Q},c.byteLength=M,c.prototype._isBuffer=!0,c.prototype.swap16=function(){var A=this.length;if(A%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var g=0;g<A;g+=2)i(this,g,g+1);return this},c.prototype.swap32=function(){var A=this.length;if(A%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var g=0;g<A;g+=4)i(this,g,g+3),i(this,g+1,g+2);return this},c.prototype.swap64=function(){var A=this.length;if(A%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var g=0;g<A;g+=8)i(this,g,g+7),i(this,g+1,g+6),i(this,g+2,g+5),i(this,g+3,g+4);return this},c.prototype.toString=function(){var A=0|this.length;return 0===A?"":0===arguments.length?R(this,0,A):function(A,g,I){var Q=!1;if((void 0===g||g<0)&&(g=0),g>this.length)return"";if((void 0===I||I>this.length)&&(I=this.length),I<=0)return"";if((I>>>=0)<=(g>>>=0))return"";for(A||(A="utf8");;)switch(A){case"hex":return s(this,g,I);case"utf8":case"utf-8":return R(this,g,I);case"ascii":return l(this,g,I);case"latin1":case"binary":return d(this,g,I);case"base64":return h(this,g,I);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return t(this,g,I);default:if(Q)throw new TypeError("Unknown encoding: "+A);A=(A+"").toLowerCase(),Q=!0}}.apply(this,arguments)},c.prototype.equals=function(A){if(!c.isBuffer(A))throw new TypeError("Argument must be a Buffer");return this===A||0===c.compare(this,A)},c.prototype.inspect=function(){var A="",I=g.INSPECT_MAX_BYTES;return this.length>0&&(A=this.toString("hex",0,I).match(/.{2}/g).join(" "),this.length>I&&(A+=" ... ")),"<Buffer "+A+">"},c.prototype.compare=function(A,g,I,Q,B){if(!c.isBuffer(A))throw new TypeError("Argument must be a Buffer");if(void 0===g&&(g=0),void 0===I&&(I=A?A.length:0),void 0===Q&&(Q=0),void 0===B&&(B=this.length),g<0||I>A.length||Q<0||B>this.length)throw new RangeError("out of range index");if(Q>=B&&g>=I)return 0;if(Q>=B)return-1;if(g>=I)return 1;if(this===A)return 0;for(var C=(B>>>=0)-(Q>>>=0),E=(I>>>=0)-(g>>>=0),D=Math.min(C,E),N=this.slice(Q,B),e=A.slice(g,I),H=0;H<D;++H)if(N[H]!==e[H]){C=N[H],E=e[H];break}return C<E?-1:E<C?1:0},c.prototype.includes=function(A,g,I){return-1!==this.indexOf(A,g,I)},c.prototype.indexOf=function(A,g,I){return o(this,A,g,I,!0)},c.prototype.lastIndexOf=function(A,g,I){return o(this,A,g,I,!1)},c.prototype.write=function(A,g,I,Q){if(void 0===g)Q="utf8",I=this.length,g=0;else if(void 0===I&&"string"==typeof g)Q=g,I=this.length,g=0;else{if(!isFinite(g))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");g|=0,isFinite(I)?(I|=0,void 0===Q&&(Q="utf8")):(Q=I,I=void 0)}var B=this.length-g;if((void 0===I||I>B)&&(I=B),A.length>0&&(I<0||g<0)||g>this.length)throw new RangeError("Attempt to write outside buffer bounds");Q||(Q="utf8");for(var C=!1;;)switch(Q){case"hex":return J(this,A,g,I);case"utf8":case"utf-8":return w(this,A,g,I);case"ascii":return n(this,A,g,I);case"latin1":case"binary":return Y(this,A,g,I);case"base64":return y(this,A,g,I);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return G(this,A,g,I);default:if(C)throw new TypeError("Unknown encoding: "+Q);Q=(""+Q).toLowerCase(),C=!0}},c.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var z=4096;function l(A,g,I){var Q="";I=Math.min(A.length,I);for(var B=g;B<I;++B)Q+=String.fromCharCode(127&A[B]);return Q}function d(A,g,I){var Q="";I=Math.min(A.length,I);for(var B=g;B<I;++B)Q+=String.fromCharCode(A[B]);return Q}function s(A,g,I){var Q=A.length;(!g||g<0)&&(g=0),(!I||I<0||I>Q)&&(I=Q);for(var B="",C=g;C<I;++C)B+=m(A[C]);return B}function t(A,g,I){for(var Q=A.slice(g,I),B="",C=0;C<Q.length;C+=2)B+=String.fromCharCode(Q[C]+256*Q[C+1]);return B}function Z(A,g,I){if(A%1!=0||A<0)throw new RangeError("offset is not uint");if(A+g>I)throw new RangeError("Trying to access beyond buffer length")}function a(A,g,I,Q,B,C){if(!c.isBuffer(A))throw new TypeError('"buffer" argument must be a Buffer instance');if(g>B||g<C)throw new RangeError('"value" argument is out of bounds');if(I+Q>A.length)throw new RangeError("Index out of range")}function k(A,g,I,Q){g<0&&(g=65535+g+1);for(var B=0,C=Math.min(A.length-I,2);B<C;++B)A[I+B]=(g&255<<8*(Q?B:1-B))>>>8*(Q?B:1-B)}function U(A,g,I,Q){g<0&&(g=4294967295+g+1);for(var B=0,C=Math.min(A.length-I,4);B<C;++B)A[I+B]=g>>>8*(Q?B:3-B)&255}function V(A,g,I,Q,B,C){if(I+Q>A.length)throw new RangeError("Index out of range");if(I<0)throw new RangeError("Index out of range")}function S(A,g,I,Q,C){return C||V(A,0,I,4),B.write(A,g,I,Q,23,4),I+4}function K(A,g,I,Q,C){return C||V(A,0,I,8),B.write(A,g,I,Q,52,8),I+8}c.prototype.slice=function(A,g){var I,Q=this.length;if((A=~~A)<0?(A+=Q)<0&&(A=0):A>Q&&(A=Q),(g=void 0===g?Q:~~g)<0?(g+=Q)<0&&(g=0):g>Q&&(g=Q),g<A&&(g=A),c.TYPED_ARRAY_SUPPORT)(I=this.subarray(A,g)).__proto__=c.prototype;else{var B=g-A;I=new c(B,void 0);for(var C=0;C<B;++C)I[C]=this[C+A]}return I},c.prototype.readUIntLE=function(A,g,I){A|=0,g|=0,I||Z(A,g,this.length);for(var Q=this[A],B=1,C=0;++C<g&&(B*=256);)Q+=this[A+C]*B;return Q},c.prototype.readUIntBE=function(A,g,I){A|=0,g|=0,I||Z(A,g,this.length);for(var Q=this[A+--g],B=1;g>0&&(B*=256);)Q+=this[A+--g]*B;return Q},c.prototype.readUInt8=function(A,g){return g||Z(A,1,this.length),this[A]},c.prototype.readUInt16LE=function(A,g){return g||Z(A,2,this.length),this[A]|this[A+1]<<8},c.prototype.readUInt16BE=function(A,g){return g||Z(A,2,this.length),this[A]<<8|this[A+1]},c.prototype.readUInt32LE=function(A,g){return g||Z(A,4,this.length),(this[A]|this[A+1]<<8|this[A+2]<<16)+16777216*this[A+3]},c.prototype.readUInt32BE=function(A,g){return g||Z(A,4,this.length),16777216*this[A]+(this[A+1]<<16|this[A+2]<<8|this[A+3])},c.prototype.readIntLE=function(A,g,I){A|=0,g|=0,I||Z(A,g,this.length);for(var Q=this[A],B=1,C=0;++C<g&&(B*=256);)Q+=this[A+C]*B;return Q>=(B*=128)&&(Q-=Math.pow(2,8*g)),Q},c.prototype.readIntBE=function(A,g,I){A|=0,g|=0,I||Z(A,g,this.length);for(var Q=g,B=1,C=this[A+--Q];Q>0&&(B*=256);)C+=this[A+--Q]*B;return C>=(B*=128)&&(C-=Math.pow(2,8*g)),C},c.prototype.readInt8=function(A,g){return g||Z(A,1,this.length),128&this[A]?-1*(255-this[A]+1):this[A]},c.prototype.readInt16LE=function(A,g){g||Z(A,2,this.length);var I=this[A]|this[A+1]<<8;return 32768&I?4294901760|I:I},c.prototype.readInt16BE=function(A,g){g||Z(A,2,this.length);var I=this[A+1]|this[A]<<8;return 32768&I?4294901760|I:I},c.prototype.readInt32LE=function(A,g){return g||Z(A,4,this.length),this[A]|this[A+1]<<8|this[A+2]<<16|this[A+3]<<24},c.prototype.readInt32BE=function(A,g){return g||Z(A,4,this.length),this[A]<<24|this[A+1]<<16|this[A+2]<<8|this[A+3]},c.prototype.readFloatLE=function(A,g){return g||Z(A,4,this.length),B.read(this,A,!0,23,4)},c.prototype.readFloatBE=function(A,g){return g||Z(A,4,this.length),B.read(this,A,!1,23,4)},c.prototype.readDoubleLE=function(A,g){return g||Z(A,8,this.length),B.read(this,A,!0,52,8)},c.prototype.readDoubleBE=function(A,g){return g||Z(A,8,this.length),B.read(this,A,!1,52,8)},c.prototype.writeUIntLE=function(A,g,I,Q){(A=+A,g|=0,I|=0,Q)||a(this,A,g,I,Math.pow(2,8*I)-1,0);var B=1,C=0;for(this[g]=255&A;++C<I&&(B*=256);)this[g+C]=A/B&255;return g+I},c.prototype.writeUIntBE=function(A,g,I,Q){(A=+A,g|=0,I|=0,Q)||a(this,A,g,I,Math.pow(2,8*I)-1,0);var B=I-1,C=1;for(this[g+B]=255&A;--B>=0&&(C*=256);)this[g+B]=A/C&255;return g+I},c.prototype.writeUInt8=function(A,g,I){return A=+A,g|=0,I||a(this,A,g,1,255,0),c.TYPED_ARRAY_SUPPORT||(A=Math.floor(A)),this[g]=255&A,g+1},c.prototype.writeUInt16LE=function(A,g,I){return A=+A,g|=0,I||a(this,A,g,2,65535,0),c.TYPED_ARRAY_SUPPORT?(this[g]=255&A,this[g+1]=A>>>8):k(this,A,g,!0),g+2},c.prototype.writeUInt16BE=function(A,g,I){return A=+A,g|=0,I||a(this,A,g,2,65535,0),c.TYPED_ARRAY_SUPPORT?(this[g]=A>>>8,this[g+1]=255&A):k(this,A,g,!1),g+2},c.prototype.writeUInt32LE=function(A,g,I){return A=+A,g|=0,I||a(this,A,g,4,4294967295,0),c.TYPED_ARRAY_SUPPORT?(this[g+3]=A>>>24,this[g+2]=A>>>16,this[g+1]=A>>>8,this[g]=255&A):U(this,A,g,!0),g+4},c.prototype.writeUInt32BE=function(A,g,I){return A=+A,g|=0,I||a(this,A,g,4,4294967295,0),c.TYPED_ARRAY_SUPPORT?(this[g]=A>>>24,this[g+1]=A>>>16,this[g+2]=A>>>8,this[g+3]=255&A):U(this,A,g,!1),g+4},c.prototype.writeIntLE=function(A,g,I,Q){if(A=+A,g|=0,!Q){var B=Math.pow(2,8*I-1);a(this,A,g,I,B-1,-B)}var C=0,E=1,D=0;for(this[g]=255&A;++C<I&&(E*=256);)A<0&&0===D&&0!==this[g+C-1]&&(D=1),this[g+C]=(A/E>>0)-D&255;return g+I},c.prototype.writeIntBE=function(A,g,I,Q){if(A=+A,g|=0,!Q){var B=Math.pow(2,8*I-1);a(this,A,g,I,B-1,-B)}var C=I-1,E=1,D=0;for(this[g+C]=255&A;--C>=0&&(E*=256);)A<0&&0===D&&0!==this[g+C+1]&&(D=1),this[g+C]=(A/E>>0)-D&255;return g+I},c.prototype.writeInt8=function(A,g,I){return A=+A,g|=0,I||a(this,A,g,1,127,-128),c.TYPED_ARRAY_SUPPORT||(A=Math.floor(A)),A<0&&(A=255+A+1),this[g]=255&A,g+1},c.prototype.writeInt16LE=function(A,g,I){return A=+A,g|=0,I||a(this,A,g,2,32767,-32768),c.TYPED_ARRAY_SUPPORT?(this[g]=255&A,this[g+1]=A>>>8):k(this,A,g,!0),g+2},c.prototype.writeInt16BE=function(A,g,I){return A=+A,g|=0,I||a(this,A,g,2,32767,-32768),c.TYPED_ARRAY_SUPPORT?(this[g]=A>>>8,this[g+1]=255&A):k(this,A,g,!1),g+2},c.prototype.writeInt32LE=function(A,g,I){return A=+A,g|=0,I||a(this,A,g,4,2147483647,-2147483648),c.TYPED_ARRAY_SUPPORT?(this[g]=255&A,this[g+1]=A>>>8,this[g+2]=A>>>16,this[g+3]=A>>>24):U(this,A,g,!0),g+4},c.prototype.writeInt32BE=function(A,g,I){return A=+A,g|=0,I||a(this,A,g,4,2147483647,-2147483648),A<0&&(A=4294967295+A+1),c.TYPED_ARRAY_SUPPORT?(this[g]=A>>>24,this[g+1]=A>>>16,this[g+2]=A>>>8,this[g+3]=255&A):U(this,A,g,!1),g+4},c.prototype.writeFloatLE=function(A,g,I){return S(this,A,g,!0,I)},c.prototype.writeFloatBE=function(A,g,I){return S(this,A,g,!1,I)},c.prototype.writeDoubleLE=function(A,g,I){return K(this,A,g,!0,I)},c.prototype.writeDoubleBE=function(A,g,I){return K(this,A,g,!1,I)},c.prototype.copy=function(A,g,I,Q){if(I||(I=0),Q||0===Q||(Q=this.length),g>=A.length&&(g=A.length),g||(g=0),Q>0&&Q<I&&(Q=I),Q===I)return 0;if(0===A.length||0===this.length)return 0;if(g<0)throw new RangeError("targetStart out of bounds");if(I<0||I>=this.length)throw new RangeError("sourceStart out of bounds");if(Q<0)throw new RangeError("sourceEnd out of bounds");Q>this.length&&(Q=this.length),A.length-g<Q-I&&(Q=A.length-g+I);var B,C=Q-I;if(this===A&&I<g&&g<Q)for(B=C-1;B>=0;--B)A[B+g]=this[B+I];else if(C<1e3||!c.TYPED_ARRAY_SUPPORT)for(B=0;B<C;++B)A[B+g]=this[B+I];else Uint8Array.prototype.set.call(A,this.subarray(I,I+C),g);return C},c.prototype.fill=function(A,g,I,Q){if("string"==typeof A){if("string"==typeof g?(Q=g,g=0,I=this.length):"string"==typeof I&&(Q=I,I=this.length),1===A.length){var B=A.charCodeAt(0);B<256&&(A=B)}if(void 0!==Q&&"string"!=typeof Q)throw new TypeError("encoding must be a string");if("string"==typeof Q&&!c.isEncoding(Q))throw new TypeError("Unknown encoding: "+Q)}else"number"==typeof A&&(A&=255);if(g<0||this.length<g||this.length<I)throw new RangeError("Out of range index");if(I<=g)return this;var C;if(g>>>=0,I=void 0===I?this.length:I>>>0,A||(A=0),"number"==typeof A)for(C=g;C<I;++C)this[C]=A;else{var E=c.isBuffer(A)?A:b(new c(A,Q).toString()),D=E.length;for(C=0;C<I-g;++C)this[C+g]=E[C%D]}return this};var L=/[^+\/0-9A-Za-z-_]/g;function m(A){return A<16?"0"+A.toString(16):A.toString(16)}function b(A,g){var I;g=g||1/0;for(var Q=A.length,B=null,C=[],E=0;E<Q;++E){if((I=A.charCodeAt(E))>55295&&I<57344){if(!B){if(I>56319){(g-=3)>-1&&C.push(239,191,189);continue}if(E+1===Q){(g-=3)>-1&&C.push(239,191,189);continue}B=I;continue}if(I<56320){(g-=3)>-1&&C.push(239,191,189),B=I;continue}I=65536+(B-55296<<10|I-56320)}else B&&(g-=3)>-1&&C.push(239,191,189);if(B=null,I<128){if((g-=1)<0)break;C.push(I)}else if(I<2048){if((g-=2)<0)break;C.push(I>>6|192,63&I|128)}else if(I<65536){if((g-=3)<0)break;C.push(I>>12|224,I>>6&63|128,63&I|128)}else{if(!(I<1114112))throw new Error("Invalid code point");if((g-=4)<0)break;C.push(I>>18|240,I>>12&63|128,I>>6&63|128,63&I|128)}}return C}function r(A){return Q.toByteArray(function(A){if((A=function(A){return A.trim?A.trim():A.replace(/^\s+|\s+$/g,"")}(A).replace(L,"")).length<2)return"";for(;A.length%4!=0;)A+="=";return A}(A))}function W(A,g,I,Q){for(var B=0;B<Q&&!(B+I>=g.length||B>=A.length);++B)g[B+I]=A[B];return B}}).call(this,I(0))},function(A,g,I){"use strict";g.byteLength=function(A){var g=N(A),I=g[0],Q=g[1];return 3*(I+Q)/4-Q},g.toByteArray=function(A){for(var g,I=N(A),Q=I[0],E=I[1],D=new C(function(A,g,I){return 3*(g+I)/4-I}(0,Q,E)),c=0,e=E>0?Q-4:Q,H=0;H<e;H+=4)g=B[A.charCodeAt(H)]<<18|B[A.charCodeAt(H+1)]<<12|B[A.charCodeAt(H+2)]<<6|B[A.charCodeAt(H+3)],D[c++]=g>>16&255,D[c++]=g>>8&255,D[c++]=255&g;2===E&&(g=B[A.charCodeAt(H)]<<2|B[A.charCodeAt(H+1)]>>4,D[c++]=255&g);1===E&&(g=B[A.charCodeAt(H)]<<10|B[A.charCodeAt(H+1)]<<4|B[A.charCodeAt(H+2)]>>2,D[c++]=g>>8&255,D[c++]=255&g);return D},g.fromByteArray=function(A){for(var g,I=A.length,B=I%3,C=[],E=0,D=I-B;E<D;E+=16383)C.push(e(A,E,E+16383>D?D:E+16383));1===B?(g=A[I-1],C.push(Q[g>>2]+Q[g<<4&63]+"==")):2===B&&(g=(A[I-2]<<8)+A[I-1],C.push(Q[g>>10]+Q[g>>4&63]+Q[g<<2&63]+"="));return C.join("")};for(var Q=[],B=[],C="undefined"!=typeof Uint8Array?Uint8Array:Array,E="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",D=0,c=E.length;D<c;++D)Q[D]=E[D],B[E.charCodeAt(D)]=D;function N(A){var g=A.length;if(g%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var I=A.indexOf("=");return-1===I&&(I=g),[I,I===g?0:4-I%4]}function e(A,g,I){for(var B,C,E=[],D=g;D<I;D+=3)B=(A[D]<<16&16711680)+(A[D+1]<<8&65280)+(255&A[D+2]),E.push(Q[(C=B)>>18&63]+Q[C>>12&63]+Q[C>>6&63]+Q[63&C]);return E.join("")}B["-".charCodeAt(0)]=62,B["_".charCodeAt(0)]=63},function(A,g){g.read=function(A,g,I,Q,B){var C,E,D=8*B-Q-1,c=(1<<D)-1,N=c>>1,e=-7,H=I?B-1:0,x=I?-1:1,X=A[g+H];for(H+=x,C=X&(1<<-e)-1,X>>=-e,e+=D;e>0;C=256*C+A[g+H],H+=x,e-=8);for(E=C&(1<<-e)-1,C>>=-e,e+=Q;e>0;E=256*E+A[g+H],H+=x,e-=8);if(0===C)C=1-N;else{if(C===c)return E?NaN:1/0*(X?-1:1);E+=Math.pow(2,Q),C-=N}return(X?-1:1)*E*Math.pow(2,C-Q)},g.write=function(A,g,I,Q,B,C){var E,D,c,N=8*C-B-1,e=(1<<N)-1,H=e>>1,x=23===B?Math.pow(2,-24)-Math.pow(2,-77):0,X=Q?0:C-1,M=Q?1:-1,i=g<0||0===g&&1/g<0?1:0;for(g=Math.abs(g),isNaN(g)||g===1/0?(D=isNaN(g)?1:0,E=e):(E=Math.floor(Math.log(g)/Math.LN2),g*(c=Math.pow(2,-E))<1&&(E--,c*=2),(g+=E+H>=1?x/c:x*Math.pow(2,1-H))*c>=2&&(E++,c/=2),E+H>=e?(D=0,E=e):E+H>=1?(D=(g*c-1)*Math.pow(2,B),E+=H):(D=g*Math.pow(2,H-1)*Math.pow(2,B),E=0));B>=8;A[I+X]=255&D,X+=M,D/=256,B-=8);for(E=E<<B|D,N+=B;N>0;A[I+X]=255&E,X+=M,E/=256,N-=8);A[I+X-M]|=128*i}},function(A,g){var I={}.toString;A.exports=Array.isArray||function(A){return"[object Array]"==I.call(A)}}]);
