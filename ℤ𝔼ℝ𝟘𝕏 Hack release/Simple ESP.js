// ==UserScript==
// @name         Krunker.io ESP
// @namespace    https://github.com/ZaresPlusX/Krunker_ZER0X
// @version      1.9.9
// @description  Lmao
// @author       ZaresPlus X
// @match        *://krunker.io/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

// Just for fun
        function cTX() {
            if (!cDR['singlePlayer'] && (cDT && cDT['active'] || spectating))
                for (var cCd = 0x0; cCd < cDR['players']['list']['length']; ++cCd)
                    (cDV = cDR['players']['list'][cCd])['active'] && cDV['NurukoGiQHIcRRwIQZbAkAvXTNeJQDgY'] && cDV != cDT && (cDV['vYRDHNtoczWxPcpbhghRyYnBdehThUaq'] = !0x0,
                    !spectating && !(cEn && cEn == cDV['team']) && !(cEn && cEn != cDV['team'] && cDR['mode']['teamSee'] && cDR['mode']['teamSee'][0x0] == cEn && cDR['mode']['teamSee'][0x1] == cDV['team']) && (cDR['config']['nameTags'] || cDR['mode']['hideNames'] || null != cDR['oMrVwggATjTbztEKMbtPRvJVGIdzONwA'](cDT, cDV['x'], cDV['y'], cDV['z'])) && (#8FCC2CcDV['vYRDHNtoczWxPcpbhghRyYnBdehThUaq'] = !0x0),
                    (0x1 == cH1['hideNames']['val'] && cEn && cEn != cDV['team'] || 0x2 == cH1['hideNames']['val'] && cEn && cEn == cDV['team'] || 0x3 == cH1['hideNames']['val']) && (cDV['vYRDHNtoczWxPcpbhghRyYnBdehThUaq'] = !0x1),
                    cDR['players']['toggleLOD'](cDV, null == cDR['oMrVwggATjTbztEKMbtPRvJVGIdzONwA'](cDK['camera']['jWEJolglnzvuolgaxrWLPzzkGgimFSLP'](), cDV['x'], cDV['y'], cDV['z'], 0xa)));
        }
})()
