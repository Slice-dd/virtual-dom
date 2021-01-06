// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import { createElement, render, renderDom } from './element'

import diff from './diff'
import patch from './patches'

let data = {
  type: 'div',
  props: { class: 'list', style: 'list-style:normal;', display: 'block' },
  children: [
    {
      type: 'p',
      props: { class: 'item', style: 'list-style: none;' },
      children: [111]
    }, 
    {
      type: 'div',
      props: { class: 'item' },
      children: [222]
    }, 
    {
      type: 'p',
      props: { class: 'item' },
      children: [333]
    }, {
      type: 'span',
      props: { class: 'item' },
      children: [444]
    },
  ]
}

let dataChanged = {
  type: 'div',
  props: { class: 'list1', style: 'list-style:none;' },
  children: [
    {
      type: 'p',
      props: { class: 'item', style: 'color: red' },
      children: ['0000']
    }, 
    // {
    //   type: 'div',
    //   props: { class: 'item' },
    //   children: [222]
    // }, 
    // {
    //   type: 'div',
    //   props: { class: 'item' },
    //   children: [7777]
    // }, 
    // {
    //   type: 'span',
    //   props: { class: 'item1' },
    //   children: [444]
    // }, 
    // {
    //   type: 'p',
    //   props: { class: 'item' },
    //   children: [999]
    // }, 
    // {
    //   type: 'li',
    //   props: { class: 'item' },
    //   children: [{ type: 'span', children: ['333span'] }]
    // }
  ]
}

let virtualDom = createElement(data)

let wm = new WeakMap()

let el = render(virtualDom, wm)

let root = document.querySelector('#root')

renderDom(el, root)

setTimeout(() => {
  let virtualDomChanged = createElement(dataChanged)

  diff(virtualDom, virtualDomChanged)
  patch(el, wm)

  console.log(wm);

  // for (let index = 0; index < 1000; index++) {
  // }
}, 4000);
