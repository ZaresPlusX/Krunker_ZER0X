¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤
//Basic camera information
playerHeight = 11;	
crouchDst = 3;	
headScale = 2;	
hitBoxPad = 1;	
armScale = 1.3;	
chestWidth = 2.6;	
armInset = -.1;	
playerScale = (2 * armScale + chestWidth + armInset) / 2;	
SHOOT = 5, SCOPE = 6, xDr = 3, yDr = 2, JUMP = 7, CROUCH = 8;	
PI2 = Math.PI * 2;
¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤
//2d box esps corners	
                        let xmin = Infinity;	
                        let xmax = -Infinity;	
                        let ymin = Infinity;	
                        let ymax = -Infinity;	
                        let br = false;	
                        for (var j = -1; !br && j < 2; j+=2) {	
                            for (var k = -1; !br && k < 2; k+=2) {	
                                for (var l = 0; !br && l < 2; l++) {	
                                    let position = e[objInstances].position.clone();	
                                    position.x += j * playerScale;	
                                    position.z += k * playerScale;	
                                    position.y += l * (playerHeight - e.crouchVal * crouchDst);	
                                    if (!perspective.frustum.containsPoint(position)) {	
                                        br = true;	
                                        break;	
                                    }	
                                    position.project(perspective.camera);	
                                    xmin = Math.min(xmin, position.x);	
                                    xmax = Math.max(xmax, position.x);	
                                    ymin = Math.min(ymin, position.y);	
                                    ymax = Math.max(ymax, position.y);	
                                }	
                            }	
                                                    }	

                        if (br) {	
                            continue;	
                        }	

                        xmin = (xmin + 1) / 2;	
                        ymin = (ymin + 1) / 2;	
                        xmax = (xmax + 1) / 2;	
                        ymax = (ymax + 1) / 2;
¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤
 // perfect box esp	
                        c.lineWidth = 5;	
                        c.strokeStyle = 'rgba(255,50,50,1)';	

                        let distanceScale = Math.max(.3, 1 - getD3D(worldPosition.x, worldPosition.y, worldPosition.z, e.x, e.y, e.z) / 600);	
                        original_scale.apply(c, [distanceScale, distanceScale]);	
                        let xScale = scaledWidth / distanceScale;	
                        let yScale = scaledHeight / distanceScale;	

                        original_beginPath.apply(c, []);	
                        ymin = yScale * (1 - ymin);	
                        ymax = yScale * (1 - ymax);	
                        xmin = xScale * xmin;	
                        xmax = xScale * xmax;	
                        //-----	
                        original_moveTo.apply(c, [xmin, ymin]);	
                        original_lineTo.apply(c, [xmin, ymax]);	
                        original_lineTo.apply(c, [xmax, ymax]);	
                        original_lineTo.apply(c, [xmax, ymin]);	
                        original_lineTo.apply(c, [xmin, ymin]);	
                        original_stroke.apply(c, []);
¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤
  // health bar	
                        c.fillStyle = "rgba(255,50,50,1)";	
                        let barMaxHeight = ymax - ymin;	
                        original_fillRect.apply(c, [xmin - 7, ymin, -10, barMaxHeight]);	
                        c.fillStyle = "#00FFFF";	
                        original_fillRect.apply(c, [xmin - 7, ymin, -10, barMaxHeight * (e.health / e.maxHealth)]);
¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤
// Player info
                        c.font = "60px Sans-serif";	
                        c.fillStyle = "white";	
                        c.strokeStyle='black';	
                        c.lineWidth = 1;	
                        let x = xmax + 7;	
                        let y = ymax;	
                        original_fillText.apply(c, [e.name, x, y]);	
                        original_strokeText.apply(c, [e.name, x, y]);	
                        c.font = "30px Sans-serif";	
                        y += 35;	
                        original_fillText.apply(c, [e.weapon.name, x, y]);	
                        original_strokeText.apply(c, [e.weapon.name, x, y]);	
                        y += 35;	
                        original_fillText.apply(c, [e.health + ' HP', x, y]);	
                        original_strokeText.apply(c, [e.health + ' HP', x, y]);	

                        original_restore.apply(c, []);	

                        c.strokeStyle = original_strokeStyle;	
                        c.lineWidth = original_lineWidth;	
                        c.font = original_font;	
                        c.fillStyle = original_fillStyle;
¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤
// skelly chams	
                        if (e[legMeshes][0]) {	
                            let material = e[legMeshes][0].material;	
                            material.alphaTest = 1;	
                            material.depthTest = false;	
                            material.fog = false;	
                            material.emissive.g = 1;	
                            material.wireframe = true;
¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤
            // runs once	
            if (!shared_state.get('init')) {	
                shared_state.set('init', true);	
                drawVisuals = function(c) {	
                    let scalingFactor = arguments.callee.caller.caller.arguments[0];	
                    let perspective = arguments.callee.caller.caller.arguments[2];	
                    let scaledWidth = c.canvas.width / scalingFactor;	
                    let scaledHeight = c.canvas.height / scalingFactor;	
                    let worldPosition = perspective.camera[getWorldPosition]();	
                    for (let i = 0; i < world.players.list.length; i++) {	
                        let player = world.players.list[i];	
                        let e = players[i];	
                        if (e[isYou] || !e.active || !e[objInstances] || !isEnemy(e)) {	
                            continue;	
                        }	
¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤
// Silent aim settings w Camera settings
            const playerHeight = 11;	
            const crouchDst = 3;	
            const headScale = 2;	
            const hitBoxPad = 1;	
            const armScale = 1.3;	
            const chestWidth = 2.6;	
            const armInset = -.1;	
            const playerScale = (2 * armScale + chestWidth + armInset) / 2;	
            const SHOOT = 5, SCOPE = 6, xDr = 3, yDr = 2, JUMP = 7, CROUCH = 8;	
            const PI2 = Math.PI * 2;	
            let isEnemy = function(player) {return !me.team || player.team != me.team};	
            let canHit = function(player) {return null == world[canSee](me, player.x3, player.y3 - player.crouchVal * crouchDst, player.z3)};	
            let normaliseYaw = function(yaw) {return (yaw % PI2 + PI2) % PI2;};	
            let getDir = function(a, b, c, d) {	
                return Math.atan2(b - d, a - c);	
            };	
            let getD3D = function(a, b, c, d, e, f) {	
                let g = a - d, h = b - e, i = c - f;	
                return Math.sqrt(g * g + h * h + i * i);	
            };	
            let getXDire = function(a, b, c, d, e, f) {	
                let g = Math.abs(b - e), h = getD3D(a, b, c, d, e, f);	
                return Math.asin(g / h) * (b > e ? -1 : 1);	
            };	

            let dAngleTo = function(x, y, z) {	
                let ty = normaliseYaw(getDir(controls.object.position.z, controls.object.position.x, z, x));	
                let tx = getXDire(controls.object.position.x, controls.object.position.y, controls.object.position.z, x, y, z);	
                let oy = normaliseYaw(controls.object.rotation.y);	
                let ox = controls[pchObjc].rotation.x;	
                let dYaw = Math.min(Math.abs(ty - oy), Math.abs(ty - oy - PI2), Math.abs(ty - oy + PI2));	
                let dPitch = tx - ox;	
                return Math.hypot(dYaw, dPitch);	
            };	
            let calcAngleTo = function(player) {return dAngleTo(player.x3, player.y3 + playerHeight - (headScale + hitBoxPad) / 2 - player.crouchVal * crouchDst, player.z3);};	
            let calcDistanceTo = function(player) {return getD3D(player.x3, player.y3, player.z3, me.x, me.y, me.z)};	
            let isCloseEnough = function(player) {let distance = calcDistanceTo(player); return me.weapon.range >= distance && ("Shotgun" != me.weapon.name || distance < 70) && ("Akimbo Uzi" != me.weapon.name || distance < 100);};	
            let haveAmmo = function() {return !(me[ammos][me[weaponIndex]] !== undefined && me[ammos][me[weaponIndex]] == 0);};	

            // target selector - based on closest to aim	
            let closest = null, closestAngle = Infinity;	
            let players = world.players.list;	
            for (let i = 0; me.active && i < players.length; i++) {	
                let e = players[i];	
                if (e[isYou] || !e.active || !e[objInstances] || !isEnemy(e)) {	
                    continue;	
                }	

                // experimental prediction removed	
                e.x3 = e.x;	
                e.y3 = e.y;	
                e.z3 = e.z;	

                if (!isCloseEnough(e) || !canHit(e)) {	
                    continue;	
                }	

                let angle = calcAngleTo(e);	
                if (angle < closestAngle) {	
                    closestAngle = angle;	
                    closest = e;	
                }	
            }	
            /********************************************************************************************************************/	
// aimbot	
            let ty = controls.object.rotation.y, tx = controls[pchObjc].rotation.x;	
            if (closest) {	
                let target = closest;	
                let y = target.y3 + playerHeight - (headScale/* + hitBoxPad*/) / 2 - target.crouchVal * crouchDst;	
                if (me.weapon[nAuto] && me[didShoot]) {	
                    inputs[SHOOT] = 0;	
                } else if (!me.aimVal) {	
                    inputs[SHOOT] = 1;	
                    inputs[SCOPE] = 1;	
                } else {	
                    inputs[SCOPE] = 1;	
                }	

                ty = getDir(controls.object.position.z, controls.object.position.x, target.z3, target.x3);	
                tx = getXDire(controls.object.position.x, controls.object.position.y, controls.object.position.z, target.x3, y, target.z3);	
            /********************************************************************************************************************/	
// perfect recoil control	
                tx -= .3 * me[recoilAnimY];	
            } else {	
                inputs[SHOOT] = controls[mouseDownL];	
                inputs[SCOPE] = controls[mouseDownR];	
            }	
            /********************************************************************************************************************/	

// silent aim	
            inputs[xDr] = +(tx % PI2).toFixed(3);	
            inputs[yDr] = +(ty % PI2).toFixed(3);	
            
