(this["webpackJsonpseller-management-system"]=this["webpackJsonpseller-management-system"]||[]).push([[4],{1425:function(e,t,a){"use strict";var n=a(360),l=a(0),r=a.n(l),c=a(1316),o=a(581),i=a(1582),s=a(1317),m=a(1493),u=a(1264),d=a(4),p=a(50),g=a(102),h=!1;t.a=Object(u.a)({},{withTheme:!0})(Object(p.b)((function(e){return{settings:e.layout.settings,getCartList:d.PropTypes.func.isRequired,deleteProductFromCart:d.PropTypes.func.isRequired,updateCartAmount:d.PropTypes.func.isRequired,cartList:e.ecommerce.cartList,user:e.user}}),{getCartList:g.j,deleteProductFromCart:g.i,updateCartAmount:g.k})((function(e){var t=e.container,a=e.theme,l=e.settings,u=e.cartList,d=void 0===u?[]:u,p=e.getCartList,g=e.deleteProductFromCart,b=e.updateCartAmount,E=e.user,y=r.a.useState(!1),f=Object(n.a)(y,2),v=f[0],x=f[1];function N(){x(!v)}h||(p(E.userId),h=!0);var C=a.palette;return r.a.createElement(c.a,{theme:l.themes[l.activeTheme]},r.a.createElement(o.a,{onClick:N,style:{color:"light"===C.type?C.text.secondary:C.text.primary}},r.a.createElement(i.a,{color:"secondary",badgeContent:d.length},r.a.createElement(s.a,null,"shopping_cart"))),r.a.createElement(m.a,{container:t,variant:"temporary",anchor:"right",open:v,onClose:N,ModalProps:{keepMounted:!0}},r.a.createElement("div",{className:"mini-cart"},r.a.createElement("div",{className:"cart__topbar flex flex-middle p-16 mb-24"},r.a.createElement(s.a,{color:"primary"},"shopping_cart"),r.a.createElement("h5",{className:"ml-8 my-0 font-weight-500"},"Cart")),d.map((function(e){return r.a.createElement("div",{key:e.id,className:"mini-cart__item flex flex-middle flex-space-between py-16 px-8"},r.a.createElement("div",{className:"flex flex-column mr-8"},r.a.createElement(o.a,{size:"small",onClick:function(){return b(E.userId,e.id,e.amount+1)}},r.a.createElement(s.a,{className:"cursor-pointer"},"keyboard_arrow_up")),r.a.createElement(o.a,{disabled:!(e.amount-1),size:"small",onClick:function(){return b(E.userId,e.id,e.amount-1)}},r.a.createElement(s.a,{className:"cursor-pointer"},"keyboard_arrow_down"))),r.a.createElement("div",{className:"mr-8"},r.a.createElement("img",{src:e.imgUrl,alt:e.title})),r.a.createElement("div",{className:"mr-8 text-center"},r.a.createElement("h6",{className:"m-0 mb-4"},e.title),r.a.createElement("small",{className:"text-muted"},"$",e.price," x ",e.amount)),r.a.createElement(o.a,{size:"small",onClick:function(){return g(E.userId,e.id)}},r.a.createElement(s.a,{fontSize:"small"},"clear")))})))))})))},1520:function(e,t,a){"use strict";var n=a(360),l=a(0),r=a.n(l),c=a(1316),o=a(581),i=a(1582),s=a(1317),m=a(1493),u=a(1327),d=a(1303),p=a(57),g=a(1264),h=a(121),b=a(4),E=a(50),y=a(199);t.a=Object(g.a)({},{withTheme:!0})(Object(E.b)((function(e){return{getNotification:b.PropTypes.func.isRequired,deleteNotification:b.PropTypes.func.isRequired,deleteAllNotification:b.PropTypes.func.isRequired,notification:e.notification,settings:e.layout.settings}}),{getNotification:y.g,deleteNotification:y.f,deleteAllNotification:y.e})((function(e){var t=e.container,a=e.theme,l=e.settings,g=e.notification,b=void 0===g?[]:g,E=e.getNotification,y=e.deleteAllNotification,f=e.deleteNotification,v=r.a.useState(!1),x=Object(n.a)(v,2),N=x[0],C=x[1];function k(){N||E(),C(!N)}var S=a.palette;return r.a.createElement(c.a,{theme:l.themes[l.activeTheme]},r.a.createElement(o.a,{onClick:k,style:{color:"light"===S.type?S.text.secondary:S.text.primary}},r.a.createElement(i.a,{color:"secondary",badgeContent:5},r.a.createElement(s.a,null,"notifications"))),r.a.createElement(m.a,{width:"100px",container:t,variant:"temporary",anchor:"right",open:N,onClose:k,ModalProps:{keepMounted:!0}},r.a.createElement("div",{className:"notification"},r.a.createElement("div",{className:"notification__topbar flex flex-middle p-16 mb-24"},r.a.createElement(s.a,{color:"primary"},"notifications"),r.a.createElement("h5",{className:"ml-8 my-0 font-weight-500"},"Notifications")),b.map((function(e){return r.a.createElement("div",{key:e.id,className:"notification__card position-relative"},r.a.createElement(o.a,{size:"small",className:"delete-button bg-light-gray mr-24",onClick:function(){return f(e.id)}},r.a.createElement(s.a,{className:"text-muted",fontSize:"small"},"clear")),r.a.createElement(p.a,{to:"/".concat(e.path),onClick:k},r.a.createElement(u.a,{className:"mx-16 mb-24",elevation:3},r.a.createElement("div",{className:"card__topbar flex flex-middle flex-space-between p-8 bg-light-gray"},r.a.createElement("div",{className:"flex"},r.a.createElement("div",{className:"card__topbar__button"},r.a.createElement(s.a,{className:"card__topbar__icon",fontSize:"small",color:e.icon.color},e.icon.name)),r.a.createElement("span",{className:"ml-4 font-weight-500 text-muted"},e.heading)),r.a.createElement("small",{className:"card__topbar__time text-muted"},Object(h.e)(new Date(e.timestamp))," ago")),r.a.createElement("div",{className:"px-16 pt-8 pb-16"},r.a.createElement("p",{className:"m-0"},e.title),r.a.createElement("small",{className:"text-muted"},e.subtitle)))))})),r.a.createElement("div",{className:"text-center"},r.a.createElement(d.a,{onClick:y},"Clear Notifications")))))})))},1521:function(e,t,a){"use strict";var n=a(8),l=a(22),r=a(25),c=a(30),o=a(29),i=a(0),s=a.n(i),m=a(1411),u=a.n(m),d=a(34),p=a(50),g=a(4),h=a.n(g),b=a(1522),E=a(19),y=a(105),f=function(e){Object(c.a)(a,e);var t=Object(o.a)(a);function a(){var e;Object(l.a)(this,a);for(var r=arguments.length,c=new Array(r),o=0;o<r;o++)c[o]=arguments[o];return(e=t.call.apply(t,[this].concat(c))).state={},e.updateSidebarMode=function(t){var a=e.props,l=a.settings,r=a.setLayoutSettings,c=l.activeLayout+"Settings",o=l[c];r(Object(n.a)(Object(n.a)({},l),{},{[c]:Object(n.a)(Object(n.a)({},o),{},{leftSidebar:Object(n.a)(Object(n.a)({},o.leftSidebar),t)})}))},e.renderOverlay=function(){return s.a.createElement("div",{onClick:function(){return e.updateSidebarMode({mode:"close"})},className:"sidenav__overlay"})},e}return Object(r.a)(a,[{key:"render",value:function(){return s.a.createElement(i.Fragment,null,s.a.createElement(u.a,{option:{suppressScrollX:!0},className:"scrollable position-relative"},this.props.children,s.a.createElement(E.i,{navigation:b.a})),this.renderOverlay())}}]),a}(i.Component);t.a=Object(d.g)(Object(p.b)((function(e){return{setLayoutSettings:h.a.func.isRequired,settings:e.layout.settings}}),{setLayoutSettings:y.d})(f))},1522:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var n=[{name:"Product",icon:"shopping_basket",path:"/product/list"},{name:"Parts Cost List",icon:"format_list_bulleted",path:"/product-cost/list"},{name:"Product Category",icon:"category",path:"/product-category/list"},{name:"Settings",icon:"dashboard",children:[{name:"Product Variations",iconText:"V",path:"/product-variation/list"},{name:"Parts",iconText:"P",path:"/parts/list"},{name:"Parts UM",iconText:"U",path:"/parts-um/list"},{name:"Parts Type",iconText:"T",path:"/parts-type/list"},{name:"Supplier",iconText:"S",path:"/supplier/list"},{name:"Supplier Type",iconText:"T",path:"/supplier-type/list"},{name:"Freight",iconText:"F",path:"/freight/list"},{name:"Storage",iconText:"S",path:"/storage/list"},{name:"Fullfillment",iconText:"F",path:"/fullfillment/list"},{name:"Misc",iconText:"M",path:"/misc/list"},{name:"Users",iconText:"U",path:"/users/list"}]}]},1523:function(e,t,a){"use strict";var n=a(22),l=a(25),r=a(30),c=a(29),o=a(0),i=a.n(o),s=function(e){Object(r.a)(a,e);var t=Object(c.a)(a);function a(){var e;Object(n.a)(this,a);for(var l=arguments.length,r=new Array(l),c=0;c<l;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={},e}return Object(l.a)(a,[{key:"render",value:function(){return i.a.createElement("div",{className:"flex flex-middle flex-space-between brand-area"},i.a.createElement("div",{className:"flex flex-middle brand"},i.a.createElement("img",{src:"/assets/images/logo.svg",alt:"company-logo"}),i.a.createElement("span",{className:"brand__text"},"Egret")),this.props.children)}}]),a}(o.Component);t.a=s},1524:function(e,t,a){"use strict";var n=a(0),l=a.n(n),r=a(352);t.a=function(e){var t=e.theme,a=e.settings;return l.a.createElement(r.Helmet,null,l.a.createElement("style",null,"\n        \n        ".concat("dark"===t.palette.type?".sidenav {\n          color: ".concat(t.palette.text.secondary,";\n        }"):" ","\n\n        .sidenav__hold {\n          background-image: url(").concat(a.layout1Settings.leftSidebar.bgImgURL,");\n          opacity: 1 !important;\n        }\n        .sidenav__hold::after {\n          background: ").concat(t.palette.primary.main,";\n          opacity: ").concat(a.layout1Settings.leftSidebar.bgOpacity,";\n        }\n\n        ").concat("light"===t.palette.type?".navigation .nav-item:hover,\n        .navigation .nav-item.active,\n        .navigation .submenu {\n          background: rgba(0, 0, 0, .08);\n        }":"","\n        ").concat("dark"===t.palette.type?".navigation .nav-item:hover,\n        .navigation .nav-item.active {\n          color: ".concat(t.palette.text.primary,";\n        }"):"","\n        \n      ")))}},1525:function(e,t,a){"use strict";var n=a(0),l=a.n(n),r=a(1316),c=a(1303),o=a(9),i=a(50),s=a(352);t.a=Object(o.a)({},{withTheme:!0})(Object(i.b)((function(e){return{settings:e.layout.settings}}),{})((function(e){var t=e.theme,a=e.settings,n=a.themes[a.footer.theme]||t;return l.a.createElement(r.a,{theme:n},l.a.createElement(s.Helmet,null,l.a.createElement("style",null,"\n              .footer {\n                background: ".concat(n.palette.primary.main,";\n                color: ").concat(n.palette.primary.contrastText,";\n              }\n            "))),l.a.createElement("div",{className:"footer flex flex-middle"},l.a.createElement("div",{className:"flex flex-middle container px-sm-30 w-100"},l.a.createElement("a",{href:"https://themeforest.net/item/egret-react-redux-material-design-admin-dashboard-template/24673283"},l.a.createElement(c.a,{variant:"contained",color:"secondary"},"Buy Egret")),l.a.createElement("span",{className:"m-auto"}),l.a.createElement("p",{className:"m-0"},"Design and Developed by ",l.a.createElement("a",{href:"http://ui-lib.com"},"UI Lib")))))})))},1528:function(e,t,a){"use strict";var n=a(22),l=a(25),r=a(30),c=a(29),o=a(0),i=a.n(o),s=a(1316),m=a(581),u=a(1317),d=a(1548),p=a(352),g=a(34),h=a(50),b=a(121),E=a(8),y=a(105),f=a(4),v=a(1503),x=a(259),N=a(583),C=a(1275),k=a(1494),S=a(1304),O=a(1590),w=a(9),j=a(1411),_=a.n(j),T=a(101),L=a(1497),z=a(1598),P=a(1606),D=a(355),R=a(1582),F=Object(w.a)((function(e){return{badge:{top:"100%",right:"90%",height:"32px",width:"32px",borderRadius:"50%"}}}))(R.a),M=["purple1","purple2","blue","purpleDark1","purpleDark2","blueDark"],A=["white","slateDark1","slateDark2","purpleDark1","purpleDark2","blueDark"],I=["white","slateDark1","slateDark2","purpleDark1","purpleDark2","blueDark"],U=["/assets/images/sidebar/sidebar-bg-dark.jpg","/assets/images/sidebar/sidebar-bg-light.jpg"],q=function(e){var t=e.settings,a=e.handleChange,n=e.handleControlChange;return i.a.createElement(o.Fragment,null,i.a.createElement("div",{className:"mb-16 mx-12"},i.a.createElement("div",{className:"text-muted mb-4"},"Sidebar theme"),i.a.createElement("div",{className:"colors"},A.map((function(e,n){return i.a.createElement(v.a,{key:n,title:e,placement:"top"},i.a.createElement("div",{className:"color",onClick:function(){return a("layout1Settings.leftSidebar.theme",e)},style:{backgroundColor:D.a[e].palette.primary.main}},t.layout1Settings.leftSidebar.theme===e&&i.a.createElement(u.a,null,"done"),i.a.createElement("div",{className:t.themes[e].palette.type})))})))),i.a.createElement("div",{className:"mb-32 mx-12"},i.a.createElement("div",{className:"text-muted mb-4"},"Topbar theme"),i.a.createElement("div",{className:"colors"},I.map((function(e,n){return i.a.createElement(v.a,{key:n,title:e,placement:"top"},i.a.createElement("div",{className:"color",onClick:function(){return a("layout1Settings.topbar.theme",e)},style:{backgroundColor:D.a[e].palette.primary.main}},t.layout1Settings.topbar.theme===e&&i.a.createElement(u.a,null,"done"),i.a.createElement("div",{className:t.themes[e].palette.type})))})))),i.a.createElement("div",{className:"mx-12 mb-24"},i.a.createElement(N.a,{component:"fieldset"},i.a.createElement(C.a,{component:"legend"},"Sidebar mode"),i.a.createElement(L.a,{"aria-label":"Sidebar",name:"leftSidebar",value:t.layout1Settings.leftSidebar.mode,onChange:n("layout1Settings.leftSidebar.mode")},i.a.createElement(S.a,{value:"full",control:i.a.createElement(z.a,null),label:"Full"}),i.a.createElement(S.a,{value:"close",control:i.a.createElement(z.a,null),label:"Close"}),i.a.createElement(S.a,{value:"compact",control:i.a.createElement(z.a,null),label:"Compact"})))),i.a.createElement("div",{className:"mb-32 mx-12"},i.a.createElement("div",{className:"text-muted"},"Sidebar background image"),i.a.createElement("div",{className:"layout-boxes"},U.map((function(e,n){return i.a.createElement(F,{key:n,color:"primary",className:"layout-box",style:{width:"calc(25% - 8px)"},badgeContent:i.a.createElement(u.a,null,"done"),invisible:t.layout1Settings.leftSidebar.bgImgURL!==e},i.a.createElement(x.a,{onClick:function(){return a("layout1Settings.leftSidebar.bgImgURL",e)},style:{height:"160px"}},i.a.createElement("img",{src:e,alt:""})))})))),i.a.createElement("div",{className:"mb-32 mx-12"},i.a.createElement("div",{className:"text-muted"},"Sidebar background opacity"),i.a.createElement(P.a,{value:t.layout1Settings.leftSidebar.bgOpacity,onChange:function(e,t){return a("layout1Settings.leftSidebar.bgOpacity",t)},marks:!0,step:.02,max:1,min:.5,valueLabelDisplay:"auto","aria-labelledby":"sidebar-bgOpacity"})),i.a.createElement("div",{className:"mx-12 mb-24"},i.a.createElement(N.a,{component:"fieldset"},i.a.createElement(C.a,{component:"legend"},"Topbar"),i.a.createElement(k.a,null,i.a.createElement(S.a,{control:i.a.createElement(O.a,{checked:Object(T.get)(t.layout1Settings.topbar,"show"),onChange:n("layout1Settings.topbar.show")}),label:"Show"}),i.a.createElement(S.a,{control:i.a.createElement(O.a,{checked:Object(T.get)(t.layout1Settings.topbar,"fixed"),onChange:n("layout1Settings.topbar.fixed")}),label:"Fixed"})))))},W=function(e){var t=e.settings,a=e.handleChange,n=e.handleControlChange;return i.a.createElement(o.Fragment,null,i.a.createElement("div",{className:"mb-16 mx-12"},i.a.createElement("div",{className:"text-muted mb-4"},"Topbar theme"),i.a.createElement("div",{className:"colors"},Object.keys(D.a).map((function(e,n){return i.a.createElement(v.a,{key:n,title:e,placement:"top"},i.a.createElement("div",{className:"color",onClick:function(){return a("layout2Settings.topbar.theme",e)},style:{backgroundColor:D.a[e].palette.primary.main}},t.layout2Settings.topbar.theme===e&&i.a.createElement(u.a,null,"done"),i.a.createElement("div",{className:t.themes[e].palette.type})))})))),i.a.createElement("div",{className:"mb-16 mx-12"},i.a.createElement("div",{className:"text-muted mb-4"},"Navbar theme"),i.a.createElement("div",{className:"colors"},Object.keys(D.a).map((function(e,n){return i.a.createElement(v.a,{key:n,title:e,placement:"top"},i.a.createElement("div",{className:"color",onClick:function(){return a("layout2Settings.navbar.theme",e)},style:{backgroundColor:D.a[e].palette.primary.main}},t.layout2Settings.navbar.theme===e&&i.a.createElement(u.a,null,"done"),i.a.createElement("div",{className:t.themes[e].palette.type})))})))),i.a.createElement("div",{className:"mx-12 mb-24"},i.a.createElement(N.a,{component:"fieldset"},i.a.createElement(C.a,{component:"legend"},"Layout mode"),i.a.createElement(L.a,{"aria-label":"layout-mode",name:"layoutMode",value:t.layout2Settings.mode,onChange:n("layout2Settings.mode")},i.a.createElement(S.a,{value:"full",control:i.a.createElement(z.a,null),label:"Full"}),i.a.createElement(S.a,{value:"contained",control:i.a.createElement(z.a,null),label:"Contained"}),i.a.createElement(S.a,{value:"boxed",control:i.a.createElement(z.a,null),label:"Boxed"})))))},H=function(e){Object(r.a)(a,e);var t=Object(c.a)(a);function a(){var e;Object(n.a)(this,a);for(var l=arguments.length,r=new Array(l),c=0;c<l;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={open:!1},e.updateSettings=function(t){var a=e.props,n=a.settings,l=a.setLayoutSettings,r=a.setDefaultSettings,c=Object(T.merge)({},n,t);l(c),r(c)},e.selectLayout=function(t){e.updateSettings({activeLayout:t})},e.handleChange=function(t,a){var n=e.props.settings,l=Object(T.set)(n,t,a);e.updateSettings(l)},e.handleControlChange=function(t){return function(a){var n="checkbox"===a.target.type?a.target.checked:a.target.value;e.handleChange(t,n)}},e.tooglePanel=function(){e.setState({open:!e.state.open})},e}return Object(l.a)(a,[{key:"render",value:function(){var e=this,t=this.props,a=t.settings,n=t.classes,l=Object(E.a)({},a.themes[a.activeTheme]);return i.a.createElement(o.Fragment,null,i.a.createElement(v.a,{title:"Theme Settings",placement:"left"},i.a.createElement(m.a,{size:"small","aria-label":"delete",className:"my-12",onClick:this.tooglePanel},i.a.createElement(u.a,{className:"spin"},"settings"))),this.state.open&&i.a.createElement(s.a,{theme:l},i.a.createElement("div",{className:"egret-customizer pb-8 ".concat(n.root),style:{backgroundColor:l.palette.background.default}},i.a.createElement("div",{className:"flex felx-row flex-middle p-16 mb-16 elevation-z6",style:{minHeight:"64px"}},i.a.createElement(u.a,{color:"primary"},"settings"),i.a.createElement("h5",{className:"mb-0 ml-8"},"Theme Settings"),i.a.createElement(m.a,{onClick:this.tooglePanel,className:"customizer-close"},i.a.createElement(u.a,null,"close"))),i.a.createElement(_.a,{options:{suppressScrollX:!0},className:"px-16"},i.a.createElement("div",{className:"mt-8 mb-32 mx-12"},i.a.createElement("div",{className:"text-muted"},"Layouts"),i.a.createElement("div",{className:"layout-boxes"},i.a.createElement(F,{color:"secondary",className:"layout-box",badgeContent:i.a.createElement(u.a,null,"done"),invisible:"layout1"!==a.activeLayout},i.a.createElement(x.a,{onClick:function(){return e.selectLayout("layout1")},elevation:4},i.a.createElement("img",{src:"/assets/images/screenshots/layout1-customizer.png",alt:""}))),i.a.createElement(F,{color:"secondary",className:"layout-box",badgeContent:i.a.createElement(u.a,null,"done"),invisible:"layout2"!==a.activeLayout},i.a.createElement(x.a,{onClick:function(){return e.selectLayout("layout2")},elevation:4},i.a.createElement("img",{src:"/assets/images/screenshots/layout2-customizer.png",alt:""}))))),i.a.createElement("div",{className:"mb-16 mx-12"},i.a.createElement("div",{className:"text-muted mb-4"},"Main theme"),i.a.createElement("div",{className:"colors"},M.map((function(t,n){return i.a.createElement(v.a,{key:n,title:t,placement:"top"},i.a.createElement("div",{className:"color",onClick:function(){return e.updateSettings({activeTheme:t})},style:{backgroundColor:D.a[t].palette.primary.main}},a.activeTheme===t&&i.a.createElement(u.a,null,"done"),i.a.createElement("div",{className:a.themes[t].palette.type})))})))),"layout1"===a.activeLayout&&i.a.createElement(q,{settings:a,handleChange:this.handleChange,handleControlChange:this.handleControlChange}),"layout2"===a.activeLayout&&i.a.createElement(W,{settings:a,handleChange:this.handleChange,handleControlChange:this.handleControlChange}),i.a.createElement("div",{className:"mx-12 mb-24"},i.a.createElement(N.a,{component:"fieldset"},i.a.createElement(C.a,{component:"legend"},"Footer"),i.a.createElement(k.a,null,i.a.createElement(S.a,{control:i.a.createElement(O.a,{checked:Object(T.get)(a.footer,"show"),onChange:this.handleControlChange("footer.show")}),label:"Show"}),i.a.createElement(S.a,{control:i.a.createElement(O.a,{checked:Object(T.get)(a.layout1Settings.footer,"fixed"),onChange:this.handleControlChange("footer.fixed")}),label:"Fixed"})))),i.a.createElement("div",{className:"mx-12 mb-24"},i.a.createElement(N.a,{component:"fieldset"},i.a.createElement(C.a,{component:"legend"},"Secondary sidebar"),i.a.createElement(k.a,null,i.a.createElement(S.a,{control:i.a.createElement(O.a,{checked:Object(T.get)(a.secondarySidebar,"show"),onChange:this.handleControlChange("secondarySidebar.show")}),label:"Show"})))),i.a.createElement("div",{className:"mb-16 mx-12"},i.a.createElement("div",{className:"text-muted mb-4"},"Secondary sidebar theme"),i.a.createElement("div",{className:"colors"},I.map((function(t,n){return i.a.createElement(v.a,{key:n,title:t,placement:"top"},i.a.createElement("div",{className:"color",onClick:function(){return e.handleChange("secondarySidebar.theme",t)},style:{backgroundColor:D.a[t].palette.primary.main}},a.secondarySidebar.theme===t&&i.a.createElement(u.a,null,"done"),i.a.createElement("div",{className:a.themes[t].palette.type})))})))),i.a.createElement("div",{className:"mb-16 mx-12"},i.a.createElement("div",{className:"text-muted mb-4"},"Footer theme"),i.a.createElement("div",{className:"colors"},I.map((function(t,n){return i.a.createElement(v.a,{key:n,title:t,placement:"top"},i.a.createElement("div",{className:"color",onClick:function(){return e.handleChange("footer.theme",t)},style:{backgroundColor:D.a[t].palette.primary.main}},a.footer.theme===t&&i.a.createElement(u.a,null,"done"),i.a.createElement("div",{className:a.themes[t].palette.type})))}))))))))}}]),a}(o.Component),B=Object(w.a)((function(e){return{root:{},paper:{display:"inherit"}}}),{withTheme:!0})(Object(h.b)((function(e){return{settings:e.layout.settings,setLayoutSettings:f.PropTypes.func.isRequired,setDefaultSettings:f.PropTypes.func.isRequired}}),{setLayoutSettings:y.d,setDefaultSettings:y.c})(H)),J=a(1264),V=a(1425),X=function(e){Object(r.a)(a,e);var t=Object(c.a)(a);function a(){var e;Object(n.a)(this,a);for(var l=arguments.length,r=new Array(l),c=0;c<l;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={open:!0},e.toggle=function(){e.setState({open:!e.state.open})},e.listenWindowResize=function(){return Object(b.b)((function(){e.setState({open:!Object(b.g)()})}),100)},e}return Object(l.a)(a,[{key:"componentWillMount",value:function(){this.setState({open:!Object(b.g)()}),window&&(this.listenWindowResizeRef=this.listenWindowResize(),window.addEventListener("resize",this.listenWindowResizeRef))}},{key:"componentWillUnmount",value:function(){window&&window.removeEventListener("resize",this.listenWindowResizeRef)}},{key:"render",value:function(){var e=this.props,t=e.settings,a=e.classes,n=e.theme,l=t.themes[t.secondarySidebar.theme]||n;return i.a.createElement(s.a,{theme:l},this.state.open&&!Object(b.g)()&&i.a.createElement(p.Helmet,null,i.a.createElement("style",null,"\n              .content-wrap, \n              .layout2.layout-contained, \n              .layout2.layout-full {\n                margin-right: ".concat("50px",";\n              }\n              @media screen and (max-width: 959px) {\n                .toolbar-menu-wrap .menu-area {\n                  width: calc(100% - ").concat("50px",");\n                }\n              }\n              .egret-customizer {\n                right: ").concat("50px",";\n              }\n            "))),i.a.createElement("div",{className:a.root+" "+Object(b.a)({open:this.state.open,"secondary-sidebar":!0}),style:{backgroundColor:l.palette.primary.main}},i.a.createElement("span",{className:"m-auto"}),i.a.createElement(B,null),i.a.createElement(V.a,null),i.a.createElement(m.a,{size:"small","aria-label":"delete",className:"my-12"},i.a.createElement(u.a,null,"comments")),i.a.createElement("span",{className:"m-auto"}),i.a.createElement("div",{className:"toggle"},this.state.open&&i.a.createElement(m.a,{onClick:this.toggle,size:"small","aria-label":"toggle"},i.a.createElement(u.a,null,"arrow_right")),!this.state.open&&i.a.createElement(d.a,{variant:"extended",size:"small",color:"primary","aria-label":"add",className:"pr-36",onClick:this.toggle},i.a.createElement(u.a,null,"arrow_left")))))}}]),a}(o.Component);t.a=Object(J.a)((function(e){return{root:{position:"fixed",height:"100vh",width:"50px",right:"-".concat("50px"),bottom:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",boxShadow:e.shadows[8],zIndex:98,transition:"all 0.15s ease","&.open":{right:0,"& .toggle":{left:0}},"& .toggle":{position:"relative",left:"-28px",bottom:"20px",transition:"all 0.15s ease"}}}}),{withTheme:!0})(Object(g.g)(Object(h.b)((function(e){return{settings:e.layout.settings}}),{})(X)))}}]);
//# sourceMappingURL=4.6cb27bcb.chunk.js.map