import 'core-js/features/map';
import 'core-js/features/set';
import React from 'react';
import ReactDOM from 'react-dom';
import bridge from '@vkontakte/vk-bridge';
import App from './App';

bridge.send('VKWebAppInit').then(res => console.log(res));
ReactDOM.render(<App />, document.getElementById('root'));
if (process.env.NODE_ENV === 'development') {
  import('./eruda').then(({ default: eruda }) => {}); //runtime download
}
