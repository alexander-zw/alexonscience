(this.webpackJsonpalexonscience=this.webpackJsonpalexonscience||[]).push([[0],{28:function(e,t,n){},29:function(e,t,n){},30:function(e,t,n){},36:function(e,t,n){},37:function(e,t,n){},40:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n(1),i=n.n(a),s=n(19),o=n.n(s),r=(n(8),n(3)),l=n(9);var d=function(){return Object(c.jsx)("div",{className:"text-div",children:Object(c.jsx)("p",{children:"Error: Page does not exist!"})})},j=n(22);n(28);var b=function(){var e=Object(a.useState)(!1),t=Object(j.a)(e,2),n=t[0],i=t[1];return Object(c.jsx)("div",{children:Object(c.jsxs)("div",{className:"text-div bottom-margin",children:[Object(c.jsx)("p",{children:"Hello there! My name is Alexander Wu. I am a graduate student who enjoys maintaining a YouTube channel and working on personal coding projects. Feel free to explore around!"}),Object(c.jsxs)("div",{className:"popup",onClick:function(){i(!n)},children:[Object(c.jsx)("span",{className:"popup-outer",children:"What are those drawings in your banner?"}),Object(c.jsx)("span",{className:"popuptext".concat(n?" show":""),children:"As you might be able to tell, I love drawing, even if I'm not that good at it. Here you can see a Turing machine, AlphaGo, Albert Einstein, some DNA, and Rosalind Franklin. Franklin is particularly underappreciated - she was not recognized for a Nobel prize only because she had passed away by the time it was awarded."})]})]})})};n(29);var h=function(){var e=[{id:"education",title:"Education",contents:Object(c.jsx)("p",{children:"\u2026"})},{id:"skills",title:"Skills",contents:Object(c.jsx)("p",{children:"\u2026"})},{id:"awards",title:"Awards",contents:Object(c.jsx)("p",{children:"\u2026"})},{id:"experience",title:"Experience",contents:Object(c.jsx)("p",{children:"\u2026"})},{id:"projects",title:"Projects",contents:Object(c.jsx)("p",{children:"\u2026"})}],t=e.map((function(e,t){return Object(c.jsx)("li",{className:"contents-li",children:Object(c.jsx)("a",{href:"#".concat(e.id),className:"contents-item",children:e.title})},t)})),n=e.map((function(e,t){return Object(c.jsxs)("section",{id:e.id,className:"section",children:[Object(c.jsx)("h2",{children:e.title}),e.contents]},t)}));return Object(c.jsxs)("div",{className:"outer-container top-margin bottom-margin",children:[Object(c.jsx)("nav",{className:"contents-nav text-div",children:Object(c.jsx)("ol",{className:"contents-ol",children:t})}),Object(c.jsxs)("div",{className:"text-div",children:[Object(c.jsx)("span",{className:"name-title",children:"Alexander Wu"}),Object(c.jsx)("p",{children:"Email: alexwu68 [at] berkeley [dot] edu"}),n]})]})},m=(n(30),n.p+"static/media/hello_there.0f7e79ba.png"),u=n.p+"static/media/general_kenobi.550b7f81.png",x=n.p+"static/media/math_name.9a6f9add.jpg",p=n.p+"static/media/fancy_pants_sketch.c4c87da5.jpg";var O=function(){return Object(c.jsxs)("div",{children:[Object(c.jsx)("div",{className:"text-div",children:Object(c.jsx)("p",{children:"Here is some random artwork I have drawn for fun. Enjoy!"})}),Object(c.jsx)("div",{className:"artwork-div",children:Object(c.jsxs)("div",{id:"kenobi-image",children:[Object(c.jsx)("img",{className:"bottom artwork-image",src:u,alt:"Hello there"}),Object(c.jsx)("img",{className:"top artwork-image",src:m,alt:"General Kenobi"})]})}),Object(c.jsx)("div",{className:"artwork-div",children:Object(c.jsx)("img",{className:"artwork-image",src:x,alt:"How to name a math concept"})}),Object(c.jsx)("div",{className:"artwork-div",id:"fancy-pants-image",children:Object(c.jsx)("img",{className:"artwork-image",id:"fancy-pants-image",src:p,alt:"Fancy pants sketch"})})]})},v=n(20),f=n(13);n(36);var g=function(){var e=[{title:"YouTube",class:"youtube",icon:f.c,link:"https://www.youtube.com/channel/UCaV0jdBmPzgBk6AYweICoMA"},{title:"GitHub",class:"github",icon:f.a,link:"https://github.com/alexander-zw"},{title:"LinkedIn",class:"linkedin",icon:f.b,link:"https://www.linkedin.com/in/alexander-wu-a0145a173"}].map((function(e,t){return Object(c.jsx)("a",{href:e.link,title:e.title,className:"".concat(e.class," social"),children:Object(c.jsx)(v.a,{icon:e.icon,size:"2x"})},t)}));return Object(c.jsxs)("div",{className:"text-div bottom-margin",children:[Object(c.jsx)("p",{children:"Feel free to reach out to me!"}),Object(c.jsx)("p",{children:"Email: alexwu68 [at] berkeley [dot] edu"}),Object(c.jsx)("p",{children:"Social media:"}),Object(c.jsx)("div",{className:"social-container",children:e})]})},w=(n(37),[{path:"/",title:"Home",component:b,exact:!0},{path:"/youtube",title:"YouTube",component:function(){return window.location.href="https://www.youtube.com/channel/UCaV0jdBmPzgBk6AYweICoMA",null},exact:void 0},{path:"/portfolio",title:"Portfolio",component:h,exact:void 0},{path:"/art",title:"Art",component:O,exact:void 0},{path:"/contact",title:"Contact Me",component:g,exact:void 0}]);function N(e){return Object(c.jsx)("div",{className:"nav-option-div",children:Object(c.jsx)(l.c,{to:e.to,exact:e.exact?e.exact:void 0,className:"nav-option",activeClassName:"active-nav-option",onUpdate:function(){return window.scrollTo(0,0)},children:e.children})})}var k=function(){var e=w.map((function(e,t){return Object(c.jsx)(N,{to:e.path,exact:e.exact,children:e.title},t)}));return Object(c.jsx)("div",{className:"nav-bar text-div",children:e})};n(40);var y=function(){return Object(c.jsxs)("footer",{className:"text-div",id:"footer-div",children:[Object(c.jsxs)("div",{className:"left-half",children:["Alexander Wu",Object(c.jsx)("br",{}),"Let there be light."]}),Object(c.jsx)("div",{className:"right-half",children:Object(c.jsx)(l.b,{to:"/contact",children:"Contact me"})})]})},A=n.p+"static/media/science_banner.b02586ff.jpg";function C(){var e=Object(r.f)().pathname;return Object(a.useEffect)((function(){window.scrollTo(0,0)}),[e]),null}var E=function(){var e=w.map((function(e,t){return Object(c.jsx)(r.a,{path:e.path,component:e.component,exact:e.exact},t)}));return Object(c.jsxs)(l.a,{children:[Object(c.jsx)(C,{}),Object(c.jsxs)("div",{className:"non-footer-content",children:[Object(c.jsx)("div",{children:Object(c.jsx)("img",{id:"science-banner-image",src:A,alt:"ALEX on Science"})}),Object(c.jsx)(k,{}),Object(c.jsxs)(r.c,{children:[e,Object(c.jsx)(r.a,{component:d})]})]}),Object(c.jsx)(y,{})]})},F=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,42)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,i=t.getLCP,s=t.getTTFB;n(e),c(e),a(e),i(e),s(e)}))};o.a.render(Object(c.jsx)(i.a.StrictMode,{children:Object(c.jsx)(E,{})}),document.getElementById("root")),F()},8:function(e,t,n){}},[[41,1,2]]]);
//# sourceMappingURL=main.11a577d7.chunk.js.map