//105780
cAW['nametagStyle'] = 0x0,
//***************************************
//105873
, cAY = 0x1 == cAW['nametagStyle'] ? 0x6 : 0x10;
                    if (0x0 == cAW['nametagStyle'] || 0x3 == cAW['nametagStyle']) {
                        cBc['fillStyle'] = 'rgba(0,\x200,\x200,\x200.4)',
                        cBc['fillRect'](-0x3c, -cAY, cAP, cAY),
                        cB4['dynamicHP'] && cAX['hpChase'] > cAX['health'] / cAX['dhbMaKHDpWsKmWvvfAThCnbfvMfEIinu'] && (cBc['fillStyle'] = '#FFFFFF',
                        cBc['fillRect'](-0x3c, -cAY, cAP * cAX['hpChase'], cAY));
                        var cBB = cAV && cAV['team'] ? cAV['team'] : window['spectating'] ? 0x1 : 0x0;
                        cBc['fillStyle'] = cBB == cAX['team'] ? cAT['teams'][0x0] : cAT['teams'][0x1],
                        cBc['fillRect'](-0x3c, -cAY, cAP * (cAX['health'] / cAX['dhbMaKHDpWsKmWvvfAThCnbfvMfEIinu']), cAY);
                    }
                    if (0x3 > cAW['nametagStyle']) {
                        let cAP = cAX['name']
                          , cAQ = cAX['clan'] ? '[' + cAX['clan'] + ']' : null
                          , cAR = cAX['level'];
                        cBc['font'] = '30px\x20GameFont';
                        let cAU = cAR && 0x1 != cAW['nametagStyle'] ? cBc['measureText'](cAR)['width'] + 0xa : 0x0;
                        cBc['font'] = '20px\x20GameFont';
                        let cAV = cBc['measureText'](cAP)['width'] + (cAQ ? 0x5 : 0x0)
                          , cAZ = cAU + cAV + (cAQ ? cBc['measureText'](cAQ)['width'] : 0x0);
                        cBc['translate'](0x0, -cAY - 0xa),
                        cBc['fillStyle'] = 'white',
                        cBc['font'] = '30px\x20GameFont',
                        cAR && 0x1 != cAW['nametagStyle'] && cBc['fillText'](cAR, -cAZ / 0x2, 0x0),
                        cBc['font'] = '20px\x20GameFont',
                        cBc['globalAlpha'] = 0x1,
                        cBc['fillText'](cAP, -cAZ / 0x2 + cAU, 0x0),
                        cBc['globalAlpha'] = 0x0 <= cAS['verClans']['indexOf'](cAX['clan']) ? 0x1 : 0.4,
                        cBc['fillStyle'] = 0x0 <= cAS['verClans']['indexOf'](cAX['clan']) ? cAT['verified']['clan'] : 'white',
                        cAQ && cBc['fillText'](cAQ, -cAZ / 0x2 + cAU + cAV, 0x0);
                    }
//******************************************************
//107246
            'nametagStyle': {
                'name': 'settings.interface.nametagStyle',
                'cat': 'interface',
                'pro': 0x0,
                'val': 0x0,
                'html': function() {
                    return cGR('select', 'nametagStyle', this, {
                        0: cCp['t']('settings.interface.nametagStyle.all'),
                        1: cCp['t']('settings.interface.nametagStyle.name'),
                        2: cCp['t']('settings.interface.nametagStyle.nameLvl'),
                        3: cCp['t']('settings.interface.nametagStyle.health')
                    });
                },
                'set': function(cCd) {
                    cDJ['nametagStyle'] = cCd;
                }
            },
//**********************************************************
!spectating && !(cEn && cEn == cDV['team']) && !(cEn && cEn != cDV['team'] && cDR['mode']['teamSee'] && cDR['mode']['teamSee'][0x0] == cEn && cDR['mode']['teamSee'][0x1] == cDV['team']) && (cDR['config']['nameTags'] || cDR['mode']['hideNames'] || null != cDR['NnytIaeKQaTGWVEztOnrWRkUFIGNapXW'](cDT, cDV['x'], cDV['y'], cDV['z'])) && (cDV['kKUipnaqRAtiIhfoDISfqamlEaOkyIko'] = !0x1),
//********************
'server.config.nameTags': 'Nametags\x20ausblenden',
//********************
            'settings.interface.nametagStyle': 'Nametag\x20Style',
            'settings.interface.nametagStyle.health': 'Health\x20Only',
            'settings.interface.nametagStyle.name': 'Name\x20Only',
            'settings.interface.nametagStyle.nameLvl': 'Name\x20&\x20Level\x20Only',
            'settings.interface.nametagStyle.all': 'Everything',
//**********************
'server.config.nameTags': 'Hide\x20Nametags',
//**********************
'server.config.nameTags': '&#69;&#115;&#99;&#111;&#110;&#100;&#101;&#114;&#32;&#83;&#101;&#65533;&#97;&#108;&#32;&#100;&#101;&#108;&#32;&#78;&#111;&#109;&#98;&#114;&#101;',
//**********************
'server.config.nameTags': '&#21344;&#49905;&#47756;&#50713;&#54364;&#32;&#21344;&#50137;&#50713;&#21344;&#50137;&#50713;&#21344;&#50137;&#50713;',
