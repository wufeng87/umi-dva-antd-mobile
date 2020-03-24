import React, { useState, useEffect } from 'react';
import { formatMessage } from 'umi-plugin-locale';
import {Button, NavBar, Icon} from 'antd-mobile';
import { Link } from 'umi';
import styles from './index.less';
// import './MicroMain'
import { getContent } from './MicroMain';
const token = '980b96986c4911ea9fbf89a306ec8101'
/**
 http://192.168.12.41:6060/fssc-mobile/index.html#/bill?lang=zh_CN&TOKEN=f08a9cf46a5d11ea838a852a5147512a&appId=e3d5e4787ff911e88b1997bee3518b4d&billDefineId=b53700b7f0b811e988e5d517bedffdc2&appName=费用报销&MenuId=358e8764f0b911e988e57be57faf2bf6
 */
export default function() {
  const [count, setCount] = useState(0)
  function toFssc() {
    const url = `/#/bill?lang=zh_CN&TOKEN=${token}&appId=e3d5e4787ff911e88b1997bee3518b4d&billDefineId=b53700b7f0b811e988e5d517bedffdc2&appName=费用报销&MenuId=358e8764f0b911e988e57be57faf2bf6`
    window.history.pushState({}, '', url);
  }
  function __forceUpdate() {
    setCount(count + 1);
  }
  useEffect(() => {
    const _ecs_micro_update = '_ecs_micro_update';
    window.addEventListener(_ecs_micro_update, __forceUpdate);
    
    
    return () => {
        const _ecs_micro_update = '_ecs_micro_update';
        window.removeEventListener(_ecs_micro_update, __forceUpdate);
    }
  })
  return (
    <div className={styles.normal}>
      <div>
        <button onClick={toFssc}>toFssc</button>
        <div dangerouslySetInnerHTML={{ __html: getContent() }} 
            className={{ width: '100%', background: '#fff', minHeight: 280, 
            overflow: 'auto', position: 'relative' }}/>
                    
      </div>
    </div>
  );
}


/**
<NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={() => console.log('onLeftClick')}
        rightContent={[
          <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
          <Icon key="1" type="ellipsis" />,
        ]}
      >{formatMessage({ id: 'index.home' })}</NavBar>
      <h1 className={styles.title}>Yay! Welcome to umi!</h1>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
        <li>
          <a href="https://umijs.org/guide/getting-started.html">
            {formatMessage({ id: 'index.start' })}
          </a>
        </li>
        <li><Link to="/me">{formatMessage({ id: 'index.me' })}</Link></li>
      </ul>
      <Button type='warning'>test</Button>
 */