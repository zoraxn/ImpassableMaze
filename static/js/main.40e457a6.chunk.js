(this["webpackJsonpmini-apps-50"]=this["webpackJsonpmini-apps-50"]||[]).push([[0],{301:function(e,t,n){"use strict";n.r(t);n(75),n(222),n(233),n(235),n(236),n(238),n(239),n(240),n(242),n(243),n(244),n(245),n(246),n(248),n(249),n(250),n(251),n(252),n(253),n(254),n(255),n(256),n(257),n(259),n(260),n(261),n(262),n(263),n(264),n(265),n(266),n(267),n(268),n(269),n(270),n(271),n(272),n(273),n(274),n(275),n(276);var i,r,c,o,a=n(0),s=n.n(a),u=n(48),d=n.n(u),l=n(20),b=n.n(l),f=n(41),j=n(72),h=n.n(j),p=n(103),x=n(36),y=n(33),O=(n(284),n(34)),v=n(13),g=n(107),m=n.n(g),w="#3498db",S="rgba(5,13,71,0.9)",M="#ffe3e3",T="#d500ff",k="#9702a0",V="rgba(227,149,255,0.32)",A=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:60,t=new m.a.Backtracker(e,e);return t.reset(),t.generate(),t},E=function(e,t,n,i){switch(n){case"x":return t<0&&i.get(e.x-1,e.y)?e.x-1:t>0&&i.get(e.x+1,e.y)?e.x+1:e.x;case"y":return t<0&&i.get(e.x,e.y-1)?e.y-1:t>0&&i.get(e.x,e.y+1)?e.y+1:e.y}},W=function(e){return"x"!==e?"x":"y"},z=n(8),R=function(e){var t=e.id,n=e.modal,i=e.fetching,r=e.children,c=Object(a.useMemo)((function(){return i?Object(z.jsx)(v.h,{}):null}),[i]);return Object(z.jsx)(v.k,{activePanel:t,modal:n,popout:c,children:s.a.cloneElement(r,{id:t})})},K=O.b.canvas(i||(i=Object(y.a)(["\n  background-color: ",";\n"])),S),F=O.b.div(r||(r=Object(y.a)(["\n  display: flex;\n  padding: 2rem 1rem;\n"]))),G=function(e){var t=e.maze,n=e.position,i=e.prevPosition,r=Object(v.m)().viewWidth,c=Object(a.useRef)(null),o=Object(a.useMemo)((function(){switch(r){case v.l.MOBILE:return 4;case v.l.TABLET:return 8;default:return 16}}),[r]);return Object(a.useEffect)((function(){if(c.current){var e=c.current.getContext("2d");e&&e.clearRect(0,0,c.current.width,c.current.height)}!function(e,t,n){if(n.current){n.current.width=e.width*t,n.current.height=e.height*t;var i=n.current.getContext("2d");if(i){i.fillStyle=M;for(var r=0;r<e.width;r++)for(var c=0;c<e.height;c++)e.get(r,c)&&i.fillRect(r*t,c*t,t,t)}}}(t,o,c),setTimeout((function(){return function(e,t,n){if(n.current){var i=n.current.getContext("2d"),r=e.solve([1,1],[e.height-2,e.width-2]);if(i){i.fillStyle=V;for(var c=0;c<r.length;c++)i.fillRect(r[c][0]*t,r[c][1]*t,t,t);i.fillStyle=T,i.fillRect(t,t,t,t),i.fillStyle=k,i.fillRect(t*(e.width-2),t*(e.height-2),t,t)}}}(t,o,c)}),500)}),[t,c,o]),Object(a.useEffect)((function(){if(c.current){var e=c.current.getContext("2d");e&&(e.fillStyle=w,e.fillRect(n.x*o,n.y*o,o,o))}}),[t,n,i,c,o]),Object(z.jsx)(v.d,{children:Object(z.jsx)(F,{children:Object(z.jsx)(K,{ref:c})})})},P=Object(O.a)(c||(c=Object(y.a)(["\n  body {\n    margin: 0;\n    padding: 0;\n  }\n"]))),C=.001,B={x:0,y:0,z:0},I={position:{x:1,y:1},velocity:{x:0,y:0},previousPosition:{x:1,y:1},previousVelocity:{x:0,y:0}},J=function(e){var t=e.titleText,n=e.valueText;return Object(z.jsx)(v.d,{header:Object(z.jsx)(v.j,{level:"2",weight:"bold",children:t}),style:{padding:"0.3rem"},children:Object(z.jsx)(v.e,{weight:"regular",children:n})})},N=O.b.main(o||(o=Object(y.a)(["\n  width: 100%;\n"]))),_=Object(v.n)((function(){var e=Object(a.useState)(1),t=Object(x.a)(e,2),n=t[0],i=t[1],r=Object(a.useState)(A(3+10*n)),c=Object(x.a)(r,2),o=c[0],s=c[1],u=Object(a.useState)(),d=Object(x.a)(u,2),l=d[0],j=d[1],y=Object(a.useState)(I),O=Object(x.a)(y,2),g=O[0],m=O[1],w=Object(a.useState)(B),S=Object(x.a)(w,2),M=S[0],T=S[1],k=Object(a.useState)(),V=Object(x.a)(k,2),K=V[0],F=V[1];return Object(a.useEffect)((function(){3+10*n!==o.width&&(s((function(){return A(3+10*n)})),console.log("New maze generated"))}),[o.width,n,s]),Object(a.useEffect)((function(){var e=function(){var e=Object(p.a)(h.a.mark((function e(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!o||g.position.x!==o.width-2||g.position.y!==o.height-2){e.next=4;break}return e.next=3,b.a.send("VKWebAppGyroscopeStop");case 3:setTimeout((function(){i((function(e){return e+1})),m((function(){return I}))}),1e3);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[o,g,i]),Object(a.useEffect)((function(){b.a.send("VKWebAppGyroscopeStart"),b.a.subscribe((function(e){var t=e.detail;switch(t.type){case"VKWebAppUpdateConfig":var n=document.createAttribute("scheme");n.value=t.data.scheme?t.data.scheme:"client_light",document.body.attributes.setNamedItem(n);break;case"VKWebAppGyroscopeStartResult":j((function(){return t.data.result}));break;case"VKWebAppGyroscopeStartFailed":F((function(){return t.data}));break;case"VKWebAppGyroscopeChanged":if(void 0===o)return void console.warn("Maze is undefined!");var i={x:parseFloat(t.data.x),y:parseFloat(t.data.y),z:parseFloat(t.data.z)};T((function(){return i})),m((function(e){if(e.direction&&e.sign){var t,n=W(e.direction),r=Math.sign(i[n]),c=Math.abs(i[n]-e.velocity[n]);if(c<=.05||c>C&&e.sign===r)return{sign:e.sign,direction:e.direction,previousPosition:e.position,previousVelocity:e.velocity,position:(t={},Object(f.a)(t,n,e.position[n]),Object(f.a)(t,e.direction,E(e.position,e.sign,e.direction,o)),t),velocity:{x:i.x,y:i.y}}}if(Math.abs(i.x)>C||Math.abs(i.y)>C){var a,s=(d=i.x,l=i.y,Math.abs(d)<=Math.abs(l)?"x":"y"),u=W(s);return{sign:Math.abs(i.x)>Math.abs(i.y)?Math.sign(i.x):Math.sign(i.y),direction:s,position:(a={},Object(f.a)(a,u,e.position[u]),Object(f.a)(a,s,E(e.position,Math.sign(i.x),s,o)),a),velocity:{x:i.x,y:i.y},previousPosition:e.position,previousVelocity:e.velocity}}var d,l;return e}))}return function(){b.a.send("VKWebAppGyroscopeStop")}}))}),[o]),Object(z.jsx)(v.c,{children:Object(z.jsx)(v.a,{children:Object(z.jsx)(v.b,{children:Object(z.jsx)(v.i,{children:Object(z.jsxs)(N,{children:[Object(z.jsx)(P,{}),Object(z.jsx)(R,{id:"home",children:Object(z.jsxs)(v.f,{id:"home",children:[Object(z.jsx)(v.g,{children:"\u041d\u0435\u043f\u0440\u043e\u0445\u043e\u0434\u0438\u043c\u044b\u0439 \u043b\u0430\u0431\u0438\u0440\u0438\u043d\u0442 by Romb"}),l?void 0:Object(z.jsx)(J,{titleText:"\u041e\u0448\u0438\u0431\u043a\u0430",valueText:"\u0413\u0438\u0440\u043e\u0441\u043a\u043e\u043f \u043d\u0435 \u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d!"}),l?Object(z.jsx)(J,{titleText:"Gyroscope received data:",valueText:"x: ".concat(M.x.toFixed(2),",\n                         y: ").concat(M.y.toFixed(3),",\n                         z: ").concat(M.z.toFixed(2))}):void 0,K&&Object(z.jsx)(J,{titleText:"Error",valueText:"\n                            ".concat(K.error_type,"\n\n                            ").concat(JSON.stringify(K.error_data),"\n                          ")}),o&&Object(z.jsx)(v.d,{style:{padding:"0.3rem 0.5rem"},children:Object(z.jsx)(G,{maze:o,position:g.position,prevPosition:g.previousPosition})})]})})]})})})})})}),{viewWidth:!0});b.a.send("VKWebAppInit").then((function(e){return console.log(e)})),d.a.render(Object(z.jsx)(_,{}),document.getElementById("root"))}},[[301,1,2]]]);
//# sourceMappingURL=main.40e457a6.chunk.js.map