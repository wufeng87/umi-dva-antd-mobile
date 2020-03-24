/**
 * 创建人：
 * 创建时间：
 * 描述：
 */
import React, { Component } from 'react';
import {
    BrowserRouter as Router, withRouter
} from 'react-router-dom';
import PropTypes from 'prop-types';
// import CustomEvent from 'custom-event';
// import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start } from '../lib';
import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start } from 'qiankun';
// import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start } from 'qiankun';
import { checkActivityFunctions, getMountedApps } from 'single-spa'
// var mm = require('micromatch');
// console.log('test mm');
// console.log(mm('http://localhost:8089/fssc/i18nStatic/queryAllPageLanguages', ['**', '!**/fssc/**']).length > 0);

const location = window.location;
function genActiveRule (routerPrefix) {
    const withHash = '#'
    return location => {
        // return location.pathname.startsWith(routerPrefix);
        return location.hash.startsWith(withHash +routerPrefix);
    }
}
function genActiveRule2 (routes) {
    return location => {
        let result = false;
        routes.forEach(route => {
            if (location.pathname.startsWith(route)) {
                result = true;
            }
        })
        return result;
    }
}
// eslint-disable-next-line camelcase
let __ecsMicroContent;

function render ({ appContent, loading }) {
    const contentChanged = appContent !== __ecsMicroContent;
    __ecsMicroContent = appContent;
    const _ecs_micro_update = '_ecs_micro_update';
    // contentChanged &&
    window.dispatchEvent(new CustomEvent(_ecs_micro_update));
    // __ecsMicroContent = null;
    // TODO
    /**
        兼容iframe模式
     */
}


function startApp () {
    registerMicroApps(
        [
            // { name: 'react16-main', entry: '//localhost:7100', render, activeRule: genActiveRule('/react') },
            // { name: 'react15 app', entry: '//localhost:7102', render, activeRule: genActiveRule('/15react15') },
            // { name: 'vue app', entry: '//localhost:7101', render, activeRule: genActiveRule('/vue') },
            // { name: 'ant-design-pro', entry: '//localhost:8081', render, activeRule: genActiveRule('/pro') },
            // { name: 'fssc', entry: '//' + location.hostname + ':8099', render, activeRule: genActiveRule2(['/fssc', '/at/fssc', '/task/fssc']) },
            // { name: 'fssc2', entry: '//localhost:8099', render, activeRule: genActiveRule('/at/fssc') },
            // { name: 'fssc', entry: '//localhost:8088', render, activeRule: genActiveRule('/fssc') },
            // { name: 'p1', entry: '//localhost:8877', render, activeRule: genActiveRule('/p1') }
            { name: 'fssc-mobile', entry: '//localhost:8000', render, activeRule: genActiveRule('/bill') }
        ],
        {
            beforeLoad: [
                app => {
                    console.log('before load', app);
                }
            ],
            beforeMount: [
                app => {
                    console.log('before mount', app);
                }
            ],
            afterUnmount: [
                app => {

                    __ecsMicroContent = null;
                    _hasSideBar = false;
                    console.log('after unload', app);
                }
            ]
        }
    );

    setDefaultMountApp('/');
    runAfterFirstMounted(() => console.info('first app mounted'));

    const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

    start({
    // prefetch: true,
        // prefetch: (typeof window.globalConfig.micro.prefetch === 'boolean' || 
        //             window.globalConfig.micro.prefetch === 'all') ? 
        //             window.globalConfig.micro.prefetch : 'all',
        // jsSandbox: typeof window.globalConfig.micro.jsSandbox === 'boolean' ? 
        //             window.globalConfig.micro.jsSandbox : !isIE11,  // 测试ie 禁用沙箱
        prefetch: false,
        jsSandbox: true,
        jsSandbox: false,
        
    });
}

// 模拟个异步获取路由
// setTimeout(() => {
startApp();
// }, 1000);

export function toBrowserRouterUrl (url) {
    // TODO
    return url
        .replace('http://192.168.2.172:8080', '')
        .replace('http://192.168.12.40', '')
        .replace('http://localhost:8089', '')
        .replace(window.globalConfig.micro.ecsDomain, '')
        .replace(/\/\?v=[a-zA-Z0-9]*\/#/, '') // 改成browserRouter      
}

export function hasSideBar () {
    return _hasSideBar
    // location.href.indexOf('hasSideBar=true') !== -1;
}
// 是否有子应用被激活
export function isChildAppActive () {
    const funs = checkActivityFunctions(location);
    return funs.length > 0 && __ecsMicroContent
}
export function unmountChildApp () {
    const apps = getMountedApps()
    console.log(apps)
    if (apps[1] && apps[1] == 'fssc') {
        const d = document.getElementById('froot');
        // ReactDOM.unmountComponentAtNode(d);
    }
}
let _hasSideBar = false;
export function withSideBar (bool = true) {
    _hasSideBar = bool
}
export function getContent () {
    return __ecsMicroContent;
}

// TODO 目前判断是否渲染待办（右下）的内容的依据是url里hasSideBar参数，后面可以考虑改用MicroMain里加接口判断