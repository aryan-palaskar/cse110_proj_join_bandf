(this["webpackJsonpscavenger-hunt-frontend"]=this["webpackJsonpscavenger-hunt-frontend"]||[]).push([[0],{10:function(e,t,n){"use strict";n.r(t);var c=n(1),s=n.n(c),a=n(3),r=n.n(a),o=(n(8),n(0));var i=function(){const[e,t]=Object(c.useState)(""),[n,s]=Object(c.useState)(""),[a,r]=Object(c.useState)(!1);return Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)("div",{className:"spacer"}),Object(o.jsxs)("div",{className:"pin-page",children:[Object(o.jsxs)("header",{className:"header",children:[Object(o.jsx)("h1",{children:"Enter Lobby Code"}),Object(o.jsxs)("div",{className:"input-container",children:[Object(o.jsx)("input",{type:"text",className:"input-box",value:e,onChange:e=>{const n=e.target.value.replace(/\D/g,"").slice(0,4);t(n)},placeholder:"Lobby PIN",maxLength:4}),Object(o.jsx)("input",{type:"text",className:"input-box",value:n,onChange:e=>{s(e.target.value)},placeholder:"Player Name"})]})]}),Object(o.jsx)("button",{className:"start-game-button",onClick:async()=>{if(n&&e)try{const t=await fetch("http://localhost:5000/api/join",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({lobbyId:1,userId:n,pin:e})}),c=await t.json();t.ok?(r(!1),console.log("Lobby code is valid. Proceeding to join game...")):(r(!0),console.error(c.error))}catch(t){r(!0),console.error("Error joining the game:",t)}else r(!0)},children:"Join Game"})]}),Object(o.jsx)("div",{className:"spacer2"}),a&&Object(o.jsx)("div",{className:"error-popup",children:Object(o.jsxs)("div",{className:"error-popup-content",children:[Object(o.jsx)("p",{children:"Error: Invalid Lobby Code or User ID"}),Object(o.jsx)("button",{onClick:()=>{r(!1)},children:"OK"})]})})]})};var l=function(){return Object(o.jsx)("div",{children:Object(o.jsx)(i,{})})};r.a.render(Object(o.jsx)(s.a.StrictMode,{children:Object(o.jsx)(l,{})}),document.getElementById("root"))},8:function(e,t,n){}},[[10,1,2]]]);
//# sourceMappingURL=main.2a05e18b.chunk.js.map