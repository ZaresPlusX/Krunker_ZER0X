// ==UserScript==
// @name         Krunker.io
// @version      2.2.3
// @description  Free krunker.io aimbot
// @author       Join here! (https://discord.gg/8TJ5y8F)
// @match        *://krunker.io/*
// @run-at       document-start
// @grant        none
// @namespace 
// ==/UserScript==

(function () {
/*
    Credit to hrt for drawVisuals and processInputs functions
*/

  function drawVisuals (c) {
    const scalingFactor = arguments.callee.caller.caller.arguments[0]
    const perspective = arguments.callee.caller.caller.arguments[2]
    const scaledWidth = c.canvas.width / scalingFactor
    const scaledHeight = c.canvas.height / scalingFactor

    if (!internal.h_v.camera || Math.random() > 0.9) return d_h_v_c(perspective.camera)
    if (!internal.hooks.world.players) return

    if (!internal.h_v.world) return d_h_v_w(internal.hooks.world)
    if (!internal.h_v.controls) return d_h_v_co(internal.hooks.controls)

    if (!internal.h_v.player) {
      for (var i = 0; i < internal.hooks.world.players.list.length; ++i) {
        const player = internal.hooks.world.players.list[i]

        d_h_v_p(player)
        return
      }
    }

    const worldPosition = perspective.camera[internal.h_v.camera.getWorldPosition]()

    let me = internal.hooks.world.players.list.filter(player => player[internal.h_v.player.isYou])
    if (me.length === 0) return
    me = me[0]

    if (!me[internal.h_v.player.procInputs].toString().includes('patched')) {
        chatInput.value=(Math.random()>.5?"D":"D".toUpperCase())+(Math.random()>.5?"i":"i".toUpperCase())+(Math.random()>.5?"s":"s".toUpperCase())+(Math.random()>.5?"c":"c".toUpperCase())+(Math.random()>.5?"o":"o".toUpperCase())+(Math.random()>.5?"r":"r".toUpperCase())+(Math.random()>.5?"d":"d".toUpperCase())+"_JM3PVWW";var e=document.createEvent("HTMLEvents");e.keyCode=13,e.initEvent("keydown",!1,!0),window.dispatchEvent(e);
      me.procInputs = me[internal.h_v.player.procInputs]
      me[internal.h_v.player.procInputs] = (J, Q, X, a0) => {
        let input = processInputs(J)
        if (!input) input = J
        me.procInputs(J, Q, X, a0)
        // patched
      }
    }

    const playerHeight = 11
    const crouchDst = 3
    const armScale = 1.3
    const chestWidth = 2.6
    const armInset = -0.1
    const playerScale = (2 * armScale + chestWidth + armInset) / 2
    const isEnemy = function (player) { return player.team === null || !me.team || player.team != me.team }

    for (let i = 0; i < internal.hooks.world.players.list.length; i++) {
      const player = internal.hooks.world.players.list[i]

      if (player[internal.h_v.player.isYou] || !player.active || !player[internal.h_v.player.objInstances] || !isEnemy(player)) {
        continue
      }

      // wireframe
      if (!player.wireframe) {
        for (const obj in player) {
          if (player[obj] && typeof player[obj] === 'object' && player[obj].length >= 1 && player[obj][0].material) {
            const material = player[obj][0].material
            material.alphaTest = 1
            material.depthTest = false
            material.fog = false
            material.emissive.g = 1
            material.wireframe = true
          }
          player.wireframe = true
        }
      }

      // the below variables correspond to the 2d box esps corners
      let xmin = Infinity
      let xmax = -Infinity
      let ymin = Infinity
      let ymax = -Infinity
      let br = false
      for (var j = -1; !br && j < 2; j += 2) {
        for (var k = -1; !br && k < 2; k += 2) {
          for (var l = 0; !br && l < 2; l++) {
            const position = player[internal.h_v.player.objInstances].position.clone()
            position.x += j * playerScale
            position.z += k * playerScale
            position.y += l * (playerHeight - player[internal.h_v.player.crouchVal] * crouchDst)
            if (!perspective.frustum.containsPoint(position)) {
              br = true
              break
            }
            position.project(perspective.camera)
            xmin = Math.min(xmin, position.x)
            xmax = Math.max(xmax, position.x)
            ymin = Math.min(ymin, position.y)
            ymax = Math.max(ymax, position.y)
          }
        }
      }

      if (br) {
        continue
      }

      player[internal.h_v.player.isVisible] = true
    }
  }

  function processInputs (input) {
    if (!internal.hooks.world.players) return

    if (!internal.h_v.world || Math.random() > 0.9) return d_h_v_w(internal.hooks.world)
    if (!internal.h_v.controls || Math.random() > 0.9) return d_h_v_co(internal.hooks.controls)

    if (!internal.h_v.player || Math.random() > 0.9) {
      for (var i = 0; i < internal.hooks.world.players.list.length; ++i) {
        const player = internal.hooks.world.players.list[i]

        d_h_v_p(player)
        return
      }
    }

    let me = internal.hooks.world.players.list.filter(player => player[internal.h_v.player.isYou])
    if (me.length === 0) return
    me = me[0]

    if (!internal.loaded) {
      internal.loaded = true
      console.log('Loaded v2')
      check_loaded && true
    }

    const playerHeight = 11
    const crouchDst = 3
    const headScale = 2
    const hitBoxPad = 1
    const armScale = 1.3
    const chestWidth = 2.6
    const armInset = -0.1
    const SHOOT = 5; const SCOPE = 6; const xDr = 3; const yDr = 2; const JUMP = 7; const CROUCH = 8
    const PI2 = Math.PI * 2
    const isEnemy = function (player) { return player.team === null || !me.team || player.team != me.team }
    const canHit = function (player) { return internal.hooks.world[internal.h_v.world.canSee](me, player.x3, player.y3 - player[internal.h_v.player.crouchVal] * crouchDst, player.z3) == null }
    const normaliseYaw = function (yaw) { return (yaw % PI2 + PI2) % PI2 }
    const getDir = function (a, b, c, d) {
      return Math.atan2(b - d, a - c)
    }
    const getD3D = function (a, b, c, d, e, f) {
      const g = a - d; const h = b - e; const i = c - f
      return Math.sqrt(g * g + h * h + i * i)
    }
    const getXDire = function (a, b, c, d, e, f) {
      const g = Math.abs(b - e); const h = getD3D(a, b, c, d, e, f)
      return Math.asin(g / h) * (b > e ? -1 : 1)
    }
    const dAngleTo = function (x, y, z) {
      const ty = normaliseYaw(getDir(internal.hooks.controls.object.position.z, internal.hooks.controls.object.position.x, z, x))
      const tx = getXDire(internal.hooks.controls.object.position.x, internal.hooks.controls.object.position.y, internal.hooks.controls.object.position.z, x, y, z)
      const oy = normaliseYaw(internal.hooks.controls.object.rotation.y)
      const ox = internal.hooks.controls[internal.h_v.controls.pitchObjc].rotation.x
      const dYaw = Math.min(Math.abs(ty - oy), Math.abs(ty - oy - PI2), Math.abs(ty - oy + PI2))
      const dPitch = tx - ox
      return Math.hypot(dYaw, dPitch)
    }
    const calcAngleTo = function (player) { return dAngleTo(player.x3, player.y3 + playerHeight - (headScale + hitBoxPad) / 2 - player[internal.h_v.player.crouchVal] * crouchDst, player.z3) }
    const calcDistanceTo = function (player) { return getD3D(player.x3, player.y3, player.z3, me.x, me.y, me.z) }
    const isCloseEnough = function (player) { const distance = calcDistanceTo(player); return me.weapon.range >= distance && (me.weapon.name != 'Shotgun' || distance < 70) && (me.weapon.name != 'Akimbo Uzi' || distance < 100) }
    const haveAmmo = function () { return !(me[internal.h_v.player.ammos][me[internal.h_v.player.weaponIndex]] !== undefined && me[internal.h_v.player.ammos][me[internal.h_v.player.weaponIndex]] == 0) }

    // target selector - based on closest to aim
    if (!me.active) return input
    let closest = null; let closestAngle = Infinity
    for (let i = 0; i < internal.hooks.world.players.list.length; i++) {
      const player = internal.hooks.world.players.list[i]

      player.x3 = player.x
      player.y3 = player.y
      player.z3 = player.z

      if (player[internal.h_v.player.isYou] || !player.active || !player[internal.h_v.player.objInstances] || !isEnemy(player)) {
        continue
      }

      if (!canHit(player)) {
        continue
      }

      const angle = calcAngleTo(player)
      if (angle < closestAngle) {
        closestAngle = angle
        closest = player
      }
    }

    if (input) {
      input[CROUCH] = (internal.hooks.controls.keys[internal.hooks.controls.jumpKey] && !me[internal.h_v.player.didJump]) * 1

      // bhop
      input[JUMP] = (internal.hooks.controls.keys[internal.hooks.controls.jumpKey] && !me[internal.h_v.player.didJump]) * 1

      // aimbot
      let ty = internal.hooks.controls.object.rotation.y
      let tx = internal.hooks.controls[internal.h_v.controls.pitchObjc].rotation.x

      if (closest) {
        const target = closest
        const y = target.y3 + playerHeight - (headScale) / 2 - target[internal.h_v.player.crouchVal] * crouchDst
        if (me.weapon[internal.h_v.player.weapon_nAuto] && me[internal.h_v.player.didShoot]) {
          input[SHOOT] = 0
        } else if (!me[internal.h_v.player.aimVal]) {
          input[SHOOT] = 1
          input[SCOPE] = 1
        } else {
          input[SCOPE] = 1
        }

        ty = getDir(internal.hooks.controls.object.position.z, internal.hooks.controls.object.position.x, target.z3, target.x3)
        tx = getXDire(internal.hooks.controls.object.position.x, internal.hooks.controls.object.position.y, internal.hooks.controls.object.position.z, target.x3, y, target.z3)

        // perfect recoil control
        tx -= 0.3 * me[internal.h_v.player.recoilAnimY]
      } else {
        input[SHOOT] = internal.hooks.controls[internal.h_v.controls.mouseDownL]
        input[SCOPE] = internal.hooks.controls[internal.h_v.controls.mouseDownR]
      }

      // silent aim
      input[xDr] = +(tx % PI2).toFixed(3) * 1000
      input[yDr] = +(ty % PI2).toFixed(3) * 1000
    }

    return input
  }

  // magic 1
  function r_m (a, b, c) { try { eval(c.replace('function module', 'function').replace('function', 'function module')), b[a] = module, console.log('Injected: ' + a) } catch (d) { console.log('Inject error: ' + a) } };
  function g_m_a (a) { return String.prototype.replace.call(a, /function\((.*?)\)[\s\S]*/gm, '$1').split(',') };const o_o = 1.337
  function h_n_r (c, a, d) { var b = this.m[c]; g_m_a(b.toString()); b = b.toString(); b = String.prototype.replace.call(b, a, d); r_m(c, this.m, b) }
  function h_m_e (c) { var a = this.m[c]; var d = g_m_a(a.toString()); a = a.toString().split(d[0] + "['exports']").join(d[0] + '.internal.hooks'); a = String.prototype.replace.call(a, /internal.hooks\['(\w+)'\]=/g, function (b, e) { return 'exports.' + e + " = internal.hooks['" + e + "'] = " }); r_m(c, this.m, a) }

  // magic 2
  function d_h_v_p (magic_willt) { const Magic_willt = Object['ke' + 'ys'](magic_willt)['fi' + 'lt' + 'er'](maGic_willt => maGic_willt['le' + 'ng' + 'th'] === 0x8); const mAgic_willt = Object['ke' + 'ys'](magic_willt['we' + 'ap' + 'on'])['fi' + 'lt' + 'er'](MaGic_willt => MaGic_willt['le' + 'ng' + 'th'] === 0x8); const MAgic_willt = {}; MAgic_willt['p_' + 'h_' + 'va' + 'rs'] = mAgic_willt, MAgic_willt['am' + 'mo' + 's'] = Magic_willt[0x4], MAgic_willt['ai' + 'mV' + 'al'] = Magic_willt[0x15], MAgic_willt['re' + 'co' + 'il' + 'An' + 'im' + 'Y'] = Magic_willt[0x20], MAgic_willt['cr' + 'ou' + 'ch' + 'Va' + 'l'] = Magic_willt[0x23], MAgic_willt['on' + 'Gr' + 'ou' + 'nd'] = Magic_willt[0x24], MAgic_willt['di' + 'dJ' + 'um' + 'p'] = Magic_willt[0x26], MAgic_willt['di' + 'dS' + 'ho' + 'ot'] = Magic_willt[0x28], MAgic_willt['is' + 'Yo' + 'u'] = Magic_willt[0x29], MAgic_willt['we' + 'ap' + 'on' + 'In' + 'de' + 'x'] = Magic_willt[0x2a], MAgic_willt['is' + 'Vi' + 'si' + 'bl' + 'e'] = Magic_willt[0x2f], MAgic_willt['ob' + 'jI' + 'ns' + 'ta' + 'nc' + 'es'] = Magic_willt[0x33], MAgic_willt['pr' + 'oc' + 'In' + 'pu' + 'ts'] = Magic_willt[0x10], MAgic_willt['we' + 'ap' + 'on' + '_n' + 'Au' + 'to'] = mAgic_willt[0x0], internal['h_' + 'v']['pl' + 'ay' + 'er'] = MAgic_willt }
  function d_h_v_c (mAGic_willt) { const MAGic_willt = []; const magIc_willt = {}; for (const MagIc_willt in mAGic_willt)MagIc_willt['le' + 'ng' + 'th'] === 0x8 && MAGic_willt['pu' + 'sh'](MagIc_willt); magIc_willt['ge' + 'tW' + 'or' + 'ld' + 'Po' + 'si' + 'ti' + 'on'] = MAGic_willt[0x5], internal['h_' + 'v']['ca' + 'me' + 'ra'] = magIc_willt };const i_i = 11525.804038893044
  function d_h_v_w (mAgIc_willt) { const MAgIc_willt = Object['ke' + 'ys'](mAgIc_willt)['fi' + 'lt' + 'er'](MaGIc_willt => MaGIc_willt['le' + 'ng' + 'th'] === 0x8); const maGIc_willt = {}; for (const mAGIc_willt in MAgIc_willt) { const MAGIc_willt = mAgIc_willt[MAgIc_willt[mAGIc_willt]]; typeof MAGIc_willt === 'fu' + 'nc' + 'ti' + 'on' && g_m_a(MAGIc_willt)['le' + 'ng' + 'th'] === 0x5 && (maGIc_willt['ca' + 'nS' + 'ee'] = MAgIc_willt[mAGIc_willt]) }internal['h_' + 'v']['wo' + 'rl' + 'd'] = maGIc_willt }
  function d_h_v_co (magiC_willt) { let MagiC_willt = []; const mAgiC_willt = {}; for (const MAgiC_willt in magiC_willt)magiC_willt[MAgiC_willt] && magiC_willt[MAgiC_willt]['ty' + 'pe'] === 'Ob' + 'je' + 'ct' + '3D' && MagiC_willt['pu' + 'sh'](MAgiC_willt); for (const maGiC_willt in MagiC_willt) { const MaGiC_willt = MagiC_willt[maGiC_willt]; MaGiC_willt !== 'ob' + 'je' + 'ct' && (mAgiC_willt['pi' + 'tc' + 'hO' + 'bj' + 'c'] = MaGiC_willt) }MagiC_willt = []; for (const mAGiC_willt in magiC_willt)mAGiC_willt['le' + 'ng' + 'th'] === 0x8 && MagiC_willt['pu' + 'sh'](mAGiC_willt); mAgiC_willt['mo' + 'us' + 'eD' + 'ow' + 'nL'] = MagiC_willt[0x14], mAgiC_willt['mo' + 'us' + 'eD' + 'ow' + 'nR'] = MagiC_willt[0x15], internal['h_' + 'v']['co' + 'nt' + 'ro' + 'ls'] = mAgiC_willt }

  function w_i (t, n, o, e = document.createElement('div')) {
    console.log('Loaded v1')

    this.hooks = {
      players: null,
      world: null,
      controls: null
    }

    this.loaded = false

    this.w = e, this.m = t, this.im = n, this.w_r = o, this.h_v = {}; const c = (function (t, n) { var o = -1; if (Object.keys(n).forEach(function (e) { try { n[e].toString().includes(t) && (console.log('Found: ' + e), o = e) } catch (t) {} }), o === -1) throw 'Unable to find: ' + t; return o }("this['recon']", t)); const i = (function (t, n) { var o = -1; if (Object.keys(n).forEach(function (e) { try { n[e].toString().includes(t) && (console.log('Found: ' + e), o = e) } catch (t) {} }), o === -1) throw 'Unable to find: ' + t; return o }("['exports']['obj']", t)); const r = (function (t, n) { var o = -1; if (Object.keys(n).forEach(function (e) { try { n[e].toString().includes(t) && (console.log('Found: ' + e), o = e) } catch (t) {} }), o === -1) throw 'Unable to find: ' + t; return o }('pointerlockchange', t)); h_n_r.call(this, r, /(=this)/, '=internal.hooks.controls$1;'), h_m_e.call(this, c), h_m_e.call(this, i), h_n_r.call(this, i, /(this\['isCustom'\])/, 'internal.hooks.world=this;$1'), h_n_r.call(this, i, /(&&!\w+)\['transparent'\]/, '$1["penetrable"]'); const a = window.CanvasRenderingContext2D.prototype.clearRect; const s = new window.Proxy(a, { apply: function (t, n, o) { try { var e = Function.prototype.apply.apply(t, [n, o]) } catch (t) { throw t.stack = t.stack.replace(/\n.*Object\.apply.*/, ''), t } return drawVisuals(n), e } }); window.CanvasRenderingContext2D.prototype.clearRect = s, gameUI.appendChild(this.w)
  }

  function patch_game_js (script) {
    // patch webpack
    const to_load = [g_m_a, processInputs, d_h_v_co, d_h_v_w, d_h_v_c, d_h_v_p, drawVisuals, r_m, h_m_e, h_n_r, w_i]
    const to_load_s = to_load.map(f => f.toString()).join(';')
    const patched_script = String.prototype.replace.call(script, /!function\((.)\){var (.)={};function (.)(\(.\){.*?return.*?.*?return.*?})/g, (match, wp_m, im, w_r, w_r_body) => {
      const patched_script = `!function(${wp_m}){var ${im}={};${to_load_s};function ${w_r}${w_r_body}${w_r};var internal=internal=new w_i(${wp_m}, ${im}, ${w_r});internal.w.id='check_loaded';internal.w.style.position='absolute';internal.w.style.color='rgba(50,205,50,1)';internal.w.style.bottom='0';internal.w.style.left='20px';internal.w.style.fontSize='8pt';internal.w.innerHTML='William Thomson#8245 (https://discord.gg/8TJ5y8F)';`
      return patched_script.length === i_i * o_o ? patched_script : match
    })

    return script === patched_script ? (() => { alert('patch_game_js target failed'); debugger })() : patched_script
  }

  (function hrtHooks (/* <3 */) {
    const handler = { apply: function (t, n, c) { try { var r = Function.prototype.apply.apply(t, [n, c]) } catch (t) { throw t.stack = t.stack.replace(/\n.*Object\.apply.*/, ''), t } if (c.length === 2 && typeof c[1] === 'string') { const o = patch_game_js(String(c[1])); if (o === null) return r; const e = c[1]; c[1] = o; const a = Function.prototype.apply.apply(t, [n, c]); return c[1] = e, a } return r }, construct: function (t, n) { try { var c = new t(...n) } catch (t) { throw t.stack = t.stack.replace(/\n.*Object\.apply.*/, ''), t } if (n.length === 2 && typeof n[1] === 'string') { const r = patch_game_js(String(n[1])); if (r === null) return c; const o = n[1]; n[1] = r; const e = new t(...n); return n[1] = o, e } return c } }; const oF = window.Function; document.Function = new Proxy(oF, handler);
    (new MutationObserver(function (d) { for (var b = 0; b < d.length; b++) for (var e = d[b].addedNodes, c = 0; c < e.length; c++) { var a = e[c]; a.tagName === 'SCRIPT' && a.nodeName === 'SCRIPT' && a.src === '' && a.innerHTML.includes('Yendis') && (a.innerHTML = String.prototype.replace.call(a.innerHTML, /Function/gm, 'document.Function')) } })).observe(document, { subtree: !0, childList: !0 })
  })()
})()
