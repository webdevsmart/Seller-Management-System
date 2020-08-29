(this["webpackJsonpseller-management-system"]=this["webpackJsonpseller-management-system"]||[]).push([[5],{1461:function(e,t,a){"use strict";var n=a(361),l=a(0),r=a.n(l),o=a(1316),i=a(581),c=a(1604),s=a(1317),m=a(1522),u=a(1264),d=a(4),p=a(50),h=a(102),g=!1;t.a=Object(u.a)({},{withTheme:!0})(Object(p.b)((function(e){return{settings:e.layout.settings,getCartList:d.PropTypes.func.isRequired,deleteProductFromCart:d.PropTypes.func.isRequired,updateCartAmount:d.PropTypes.func.isRequired,cartList:e.ecommerce.cartList,user:e.user}}),{getCartList:h.j,deleteProductFromCart:h.i,updateCartAmount:h.k})((function(e){var t=e.container,a=e.theme,l=e.settings,u=e.cartList,d=void 0===u?[]:u,p=e.getCartList,h=e.deleteProductFromCart,b=e.updateCartAmount,y=e.user,E=r.a.useState(!1),f=Object(n.a)(E,2),v=f[0],x=f[1];function N(){x(!v)}g||(p(y.userId),g=!0);var C=a.palette;return r.a.createElement(o.a,{theme:l.themes[l.activeTheme]},r.a.createElement(i.a,{onClick:N,style:{color:"light"===C.type?C.text.secondary:C.text.primary}},r.a.createElement(c.a,{color:"secondary",badgeContent:d.length},r.a.createElement(s.a,null,"shopping_cart"))),r.a.createElement(m.a,{container:t,variant:"temporary",anchor:"right",open:v,onClose:N,ModalProps:{keepMounted:!0}},r.a.createElement("div",{className:"mini-cart"},r.a.createElement("div",{className:"cart__topbar flex flex-middle p-16 mb-24"},r.a.createElement(s.a,{color:"primary"},"shopping_cart"),r.a.createElement("h5",{className:"ml-8 my-0 font-weight-500"},"Cart")),d.map((function(e){return r.a.createElement("div",{key:e.id,className:"mini-cart__item flex flex-middle flex-space-between py-16 px-8"},r.a.createElement("div",{className:"flex flex-column mr-8"},r.a.createElement(i.a,{size:"small",onClick:function(){return b(y.userId,e.id,e.amount+1)}},r.a.createElement(s.a,{className:"cursor-pointer"},"keyboard_arrow_up")),r.a.createElement(i.a,{disabled:!(e.amount-1),size:"small",onClick:function(){return b(y.userId,e.id,e.amount-1)}},r.a.createElement(s.a,{className:"cursor-pointer"},"keyboard_arrow_down"))),r.a.createElement("div",{className:"mr-8"},r.a.createElement("img",{src:e.imgUrl,alt:e.title})),r.a.createElement("div",{className:"mr-8 text-center"},r.a.createElement("h6",{className:"m-0 mb-4"},e.title),r.a.createElement("small",{className:"text-muted"},"$",e.price," x ",e.amount)),r.a.createElement(i.a,{size:"small",onClick:function(){return h(y.userId,e.id)}},r.a.createElement(s.a,{fontSize:"small"},"clear")))})))))})))},1543:function(e,t,a){"use strict";var n=a(361),l=a(0),r=a.n(l),o=a(1316),i=a(581),c=a(1604),s=a(1317),m=a(1522),u=a(1327),d=a(1304),p=a(57),h=a(1264),g=a(121),b=a(4),y=a(50),E=a(199);t.a=Object(h.a)({},{withTheme:!0})(Object(y.b)((function(e){return{getNotification:b.PropTypes.func.isRequired,deleteNotification:b.PropTypes.func.isRequired,deleteAllNotification:b.PropTypes.func.isRequired,notification:e.notification,settings:e.layout.settings}}),{getNotification:E.g,deleteNotification:E.f,deleteAllNotification:E.e})((function(e){var t=e.container,a=e.theme,l=e.settings,h=e.notification,b=void 0===h?[]:h,y=e.getNotification,E=e.deleteAllNotification,f=e.deleteNotification,v=r.a.useState(!1),x=Object(n.a)(v,2),N=x[0],C=x[1];function S(){N||y(),C(!N)}var k=a.palette;return r.a.createElement(o.a,{theme:l.themes[l.activeTheme]},r.a.createElement(i.a,{onClick:S,style:{color:"light"===k.type?k.text.secondary:k.text.primary}},r.a.createElement(c.a,{color:"secondary",badgeContent:5},r.a.createElement(s.a,null,"notifications"))),r.a.createElement(m.a,{width:"100px",container:t,variant:"temporary",anchor:"right",open:N,onClose:S,ModalProps:{keepMounted:!0}},r.a.createElement("div",{className:"notification"},r.a.createElement("div",{className:"notification__topbar flex flex-middle p-16 mb-24"},r.a.createElement(s.a,{color:"primary"},"notifications"),r.a.createElement("h5",{className:"ml-8 my-0 font-weight-500"},"Notifications")),b.map((function(e){return r.a.createElement("div",{key:e.id,className:"notification__card position-relative"},r.a.createElement(i.a,{size:"small",className:"delete-button bg-light-gray mr-24",onClick:function(){return f(e.id)}},r.a.createElement(s.a,{className:"text-muted",fontSize:"small"},"clear")),r.a.createElement(p.a,{to:"/".concat(e.path),onClick:S},r.a.createElement(u.a,{className:"mx-16 mb-24",elevation:3},r.a.createElement("div",{className:"card__topbar flex flex-middle flex-space-between p-8 bg-light-gray"},r.a.createElement("div",{className:"flex"},r.a.createElement("div",{className:"card__topbar__button"},r.a.createElement(s.a,{className:"card__topbar__icon",fontSize:"small",color:e.icon.color},e.icon.name)),r.a.createElement("span",{className:"ml-4 font-weight-500 text-muted"},e.heading)),r.a.createElement("small",{className:"card__topbar__time text-muted"},Object(g.e)(new Date(e.timestamp))," ago")),r.a.createElement("div",{className:"px-16 pt-8 pb-16"},r.a.createElement("p",{className:"m-0"},e.title),r.a.createElement("small",{className:"text-muted"},e.subtitle)))))})),r.a.createElement("div",{className:"text-center"},r.a.createElement(d.a,{onClick:E},"Clear Notifications")))))})))},1544:function(e,t,a){"use strict";var n=a(8),l=a(22),r=a(25),o=a(30),i=a(29),c=a(0),s=a.n(c),m=a(1440),u=a.n(m),d=a(34),p=a(50),h=a(4),g=a.n(h),b=a(11),y=a(105),E=function(e){Object(o.a)(a,e);var t=Object(i.a)(a);function a(){var e;Object(l.a)(this,a);for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return(e=t.call.apply(t,[this].concat(o))).state={navigations:[{name:"Product",icon:"shopping_basket",path:"/product/list",permission:"product"},{name:"Product Cost List",icon:"format_list_bulleted",path:"/product-cost/list",permission:"product_cost"},{name:"Product Category",icon:"category",path:"/product-category/list",permission:"product_category"},{name:"Supplier",icon:"group_work",path:"/supplier/list",permission:"supplier"},{name:"Parts",icon:"inbox",path:"/parts/list",permission:"parts"},{name:"Settings",icon:"dashboard",children:[{name:"Product Variations",iconText:"V",path:"/product-variation/list",permission:"product_variation"},{name:"Parts UM",iconText:"U",path:"/parts-um/list",permission:"parts_um"},{name:"Parts Type",iconText:"T",path:"/parts-type/list",permission:"parts_type"},{name:"Supplier Type",iconText:"T",path:"/supplier-type/list",permission:"supplier_type"},{name:"Freight",iconText:"F",path:"/freight/list",permission:"freight"},{name:"Storage",iconText:"S",path:"/storage/list",permission:"storage"},{name:"Fullfillment",iconText:"F",path:"/fullfillment/list",permission:"fullfillment"},{name:"Misc",iconText:"M",path:"/misc/list",permission:"misc"},{name:"Users",iconText:"U",path:"/users/list",permission:"users"}]},{name:"Inventory Forecast",icon:"favorite",path:"/inventory-forecast/index",permission:"inventory_forecast"},{name:"Add Inventory Report",icon:"favorite",path:"/inventory-warehouse/add",permission:"inventory_warehouse"},{name:"Add Inventory Factory",icon:"group_work",path:"/inventory-factory/add",permission:"inventory_factory"},{name:"Warehouse Location Types",iconText:"W",path:"/warehouse-location-type/list",permission:"warehouse_location_type"},{name:"Warehouse Locations",iconText:"I",path:"/inventory-warehouse-location/list",permission:"inventory_warehouse_location"},{name:"Sales Outlet",iconText:"S",path:"/sales-outlet/list",permission:"sales_outlet"},{name:"Sales Outlet Report",iconText:"R",path:"/sales-outlet-report/index",permission:"sales_outlet_report"},{name:"Sales Report Summary",iconText:"S",path:"/sales-report-summary/index",permission:"sales_report_summary"},{name:"Manage Report",iconText:"R",path:"/reports/index",permission:"reports"},{name:"Manage OEM Report",iconText:"p",path:"/oem-order/index",permission:"oem_order"}]},e.updateSidebarMode=function(t){var a=e.props,l=a.settings,r=a.setLayoutSettings,o=l.activeLayout+"Settings",i=l[o];r(Object(n.a)(Object(n.a)({},l),{},{[o]:Object(n.a)(Object(n.a)({},i),{},{leftSidebar:Object(n.a)(Object(n.a)({},i.leftSidebar),t)})}))},e.renderOverlay=function(){return s.a.createElement("div",{onClick:function(){return e.updateSidebarMode({mode:"close"})},className:"sidenav__overlay"})},e}return Object(r.a)(a,[{key:"componentDidMount",value:function(){var e=this.state.navigations,t=[],a=JSON.parse(localStorage.getItem("auth_user")).permissions;"ADMIN"!=JSON.parse(localStorage.getItem("auth_user")).role&&(e.map((function(e){if(e.children&&e.children.length>0){var n=[];e.children.map((function(e){a.includes(e.permission)&&n.push(e)})),n.length>0&&t.push({name:e.name,icon:e.icon,children:n})}else a.includes(e.permission)&&t.push(e)})),this.setState({navigations:t}))}},{key:"render",value:function(){var e=this.state.navigations;return s.a.createElement(c.Fragment,null,s.a.createElement(u.a,{option:{suppressScrollX:!0},className:"scrollable position-relative"},this.props.children,e&&s.a.createElement(b.i,{navigation:e})),this.renderOverlay())}}]),a}(c.Component);t.a=Object(d.g)(Object(p.b)((function(e){return{setLayoutSettings:g.a.func.isRequired,settings:e.layout.settings}}),{setLayoutSettings:y.d})(E))},1545:function(e,t,a){"use strict";var n=a(22),l=a(25),r=a(30),o=a(29),i=a(0),c=a.n(i),s=function(e){Object(r.a)(a,e);var t=Object(o.a)(a);function a(){var e;Object(n.a)(this,a);for(var l=arguments.length,r=new Array(l),o=0;o<l;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={},e}return Object(l.a)(a,[{key:"render",value:function(){return c.a.createElement("div",{className:"flex flex-middle flex-space-between brand-area"},c.a.createElement("div",{className:"flex flex-middle brand"},c.a.createElement("img",{src:"/assets/images/logo.svg",alt:"company-logo"}),c.a.createElement("span",{className:"brand__text"},"Egret")),this.props.children)}}]),a}(i.Component);t.a=s},1546:function(e,t,a){"use strict";var n=a(0),l=a.n(n),r=a(353);t.a=function(e){var t=e.theme,a=e.settings;return l.a.createElement(r.Helmet,null,l.a.createElement("style",null,"\n        \n        ".concat("dark"===t.palette.type?".sidenav {\n          color: ".concat(t.palette.text.secondary,";\n        }"):" ","\n\n        .sidenav__hold {\n          background-image: url(").concat(a.layout1Settings.leftSidebar.bgImgURL,");\n          opacity: 1 !important;\n        }\n        .sidenav__hold::after {\n          background: ").concat(t.palette.primary.main,";\n          opacity: ").concat(a.layout1Settings.leftSidebar.bgOpacity,";\n        }\n\n        ").concat("light"===t.palette.type?".navigation .nav-item:hover,\n        .navigation .nav-item.active,\n        .navigation .submenu {\n          background: rgba(0, 0, 0, .08);\n        }":"","\n        ").concat("dark"===t.palette.type?".navigation .nav-item:hover,\n        .navigation .nav-item.active {\n          color: ".concat(t.palette.text.primary,";\n        }"):"","\n        \n      ")))}},1547:function(e,t,a){"use strict";var n=a(0),l=a.n(n),r=a(1316),o=a(1304),i=a(9),c=a(50),s=a(353);t.a=Object(i.a)({},{withTheme:!0})(Object(c.b)((function(e){return{settings:e.layout.settings}}),{})((function(e){var t=e.theme,a=e.settings,n=a.themes[a.footer.theme]||t;return l.a.createElement(r.a,{theme:n},l.a.createElement(s.Helmet,null,l.a.createElement("style",null,"\n              .footer {\n                background: ".concat(n.palette.primary.main,";\n                color: ").concat(n.palette.primary.contrastText,";\n              }\n            "))),l.a.createElement("div",{className:"footer flex flex-middle"},l.a.createElement("div",{className:"flex flex-middle container px-sm-30 w-100"},l.a.createElement("a",{href:"https://themeforest.net/item/egret-react-redux-material-design-admin-dashboard-template/24673283"},l.a.createElement(o.a,{variant:"contained",color:"secondary"},"Buy Egret")),l.a.createElement("span",{className:"m-auto"}),l.a.createElement("p",{className:"m-0"},"Design and Developed by ",l.a.createElement("a",{href:"http://ui-lib.com"},"UI Lib")))))})))},1549:function(e,t,a){"use strict";var n=a(22),l=a(25),r=a(30),o=a(29),i=a(0),c=a.n(i),s=a(1316),m=a(581),u=a(1317),d=a(1566),p=a(353),h=a(34),g=a(50),b=a(121),y=a(8),E=a(105),f=a(4),v=a(1526),x=a(259),N=a(583),C=a(1275),S=a(1452),k=a(1305),w=a(1611),O=a(9),_=a(1440),j=a.n(_),T=a(101),L=a(1454),R=a(1597),z=a(1644),D=a(357),P=a(1604),F=Object(O.a)((function(e){return{badge:{top:"100%",right:"90%",height:"32px",width:"32px",borderRadius:"50%"}}}))(P.a),I=["purple1","purple2","blue","purpleDark1","purpleDark2","blueDark"],M=["white","slateDark1","slateDark2","purpleDark1","purpleDark2","blueDark"],A=["white","slateDark1","slateDark2","purpleDark1","purpleDark2","blueDark"],U=["/assets/images/sidebar/sidebar-bg-dark.jpg","/assets/images/sidebar/sidebar-bg-light.jpg"],W=function(e){var t=e.settings,a=e.handleChange,n=e.handleControlChange;return c.a.createElement(i.Fragment,null,c.a.createElement("div",{className:"mb-16 mx-12"},c.a.createElement("div",{className:"text-muted mb-4"},"Sidebar theme"),c.a.createElement("div",{className:"colors"},M.map((function(e,n){return c.a.createElement(v.a,{key:n,title:e,placement:"top"},c.a.createElement("div",{className:"color",onClick:function(){return a("layout1Settings.leftSidebar.theme",e)},style:{backgroundColor:D.a[e].palette.primary.main}},t.layout1Settings.leftSidebar.theme===e&&c.a.createElement(u.a,null,"done"),c.a.createElement("div",{className:t.themes[e].palette.type})))})))),c.a.createElement("div",{className:"mb-32 mx-12"},c.a.createElement("div",{className:"text-muted mb-4"},"Topbar theme"),c.a.createElement("div",{className:"colors"},A.map((function(e,n){return c.a.createElement(v.a,{key:n,title:e,placement:"top"},c.a.createElement("div",{className:"color",onClick:function(){return a("layout1Settings.topbar.theme",e)},style:{backgroundColor:D.a[e].palette.primary.main}},t.layout1Settings.topbar.theme===e&&c.a.createElement(u.a,null,"done"),c.a.createElement("div",{className:t.themes[e].palette.type})))})))),c.a.createElement("div",{className:"mx-12 mb-24"},c.a.createElement(N.a,{component:"fieldset"},c.a.createElement(C.a,{component:"legend"},"Sidebar mode"),c.a.createElement(L.a,{"aria-label":"Sidebar",name:"leftSidebar",value:t.layout1Settings.leftSidebar.mode,onChange:n("layout1Settings.leftSidebar.mode")},c.a.createElement(k.a,{value:"full",control:c.a.createElement(R.a,null),label:"Full"}),c.a.createElement(k.a,{value:"close",control:c.a.createElement(R.a,null),label:"Close"}),c.a.createElement(k.a,{value:"compact",control:c.a.createElement(R.a,null),label:"Compact"})))),c.a.createElement("div",{className:"mb-32 mx-12"},c.a.createElement("div",{className:"text-muted"},"Sidebar background image"),c.a.createElement("div",{className:"layout-boxes"},U.map((function(e,n){return c.a.createElement(F,{key:n,color:"primary",className:"layout-box",style:{width:"calc(25% - 8px)"},badgeContent:c.a.createElement(u.a,null,"done"),invisible:t.layout1Settings.leftSidebar.bgImgURL!==e},c.a.createElement(x.a,{onClick:function(){return a("layout1Settings.leftSidebar.bgImgURL",e)},style:{height:"160px"}},c.a.createElement("img",{src:e,alt:""})))})))),c.a.createElement("div",{className:"mb-32 mx-12"},c.a.createElement("div",{className:"text-muted"},"Sidebar background opacity"),c.a.createElement(z.a,{value:t.layout1Settings.leftSidebar.bgOpacity,onChange:function(e,t){return a("layout1Settings.leftSidebar.bgOpacity",t)},marks:!0,step:.02,max:1,min:.5,valueLabelDisplay:"auto","aria-labelledby":"sidebar-bgOpacity"})),c.a.createElement("div",{className:"mx-12 mb-24"},c.a.createElement(N.a,{component:"fieldset"},c.a.createElement(C.a,{component:"legend"},"Topbar"),c.a.createElement(S.a,null,c.a.createElement(k.a,{control:c.a.createElement(w.a,{checked:Object(T.get)(t.layout1Settings.topbar,"show"),onChange:n("layout1Settings.topbar.show")}),label:"Show"}),c.a.createElement(k.a,{control:c.a.createElement(w.a,{checked:Object(T.get)(t.layout1Settings.topbar,"fixed"),onChange:n("layout1Settings.topbar.fixed")}),label:"Fixed"})))))},q=function(e){var t=e.settings,a=e.handleChange,n=e.handleControlChange;return c.a.createElement(i.Fragment,null,c.a.createElement("div",{className:"mb-16 mx-12"},c.a.createElement("div",{className:"text-muted mb-4"},"Topbar theme"),c.a.createElement("div",{className:"colors"},Object.keys(D.a).map((function(e,n){return c.a.createElement(v.a,{key:n,title:e,placement:"top"},c.a.createElement("div",{className:"color",onClick:function(){return a("layout2Settings.topbar.theme",e)},style:{backgroundColor:D.a[e].palette.primary.main}},t.layout2Settings.topbar.theme===e&&c.a.createElement(u.a,null,"done"),c.a.createElement("div",{className:t.themes[e].palette.type})))})))),c.a.createElement("div",{className:"mb-16 mx-12"},c.a.createElement("div",{className:"text-muted mb-4"},"Navbar theme"),c.a.createElement("div",{className:"colors"},Object.keys(D.a).map((function(e,n){return c.a.createElement(v.a,{key:n,title:e,placement:"top"},c.a.createElement("div",{className:"color",onClick:function(){return a("layout2Settings.navbar.theme",e)},style:{backgroundColor:D.a[e].palette.primary.main}},t.layout2Settings.navbar.theme===e&&c.a.createElement(u.a,null,"done"),c.a.createElement("div",{className:t.themes[e].palette.type})))})))),c.a.createElement("div",{className:"mx-12 mb-24"},c.a.createElement(N.a,{component:"fieldset"},c.a.createElement(C.a,{component:"legend"},"Layout mode"),c.a.createElement(L.a,{"aria-label":"layout-mode",name:"layoutMode",value:t.layout2Settings.mode,onChange:n("layout2Settings.mode")},c.a.createElement(k.a,{value:"full",control:c.a.createElement(R.a,null),label:"Full"}),c.a.createElement(k.a,{value:"contained",control:c.a.createElement(R.a,null),label:"Contained"}),c.a.createElement(k.a,{value:"boxed",control:c.a.createElement(R.a,null),label:"Boxed"})))))},H=function(e){Object(r.a)(a,e);var t=Object(o.a)(a);function a(){var e;Object(n.a)(this,a);for(var l=arguments.length,r=new Array(l),o=0;o<l;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={open:!1},e.updateSettings=function(t){var a=e.props,n=a.settings,l=a.setLayoutSettings,r=a.setDefaultSettings,o=Object(T.merge)({},n,t);l(o),r(o)},e.selectLayout=function(t){e.updateSettings({activeLayout:t})},e.handleChange=function(t,a){var n=e.props.settings,l=Object(T.set)(n,t,a);e.updateSettings(l)},e.handleControlChange=function(t){return function(a){var n="checkbox"===a.target.type?a.target.checked:a.target.value;e.handleChange(t,n)}},e.tooglePanel=function(){e.setState({open:!e.state.open})},e}return Object(l.a)(a,[{key:"render",value:function(){var e=this,t=this.props,a=t.settings,n=t.classes,l=Object(y.a)({},a.themes[a.activeTheme]);return c.a.createElement(i.Fragment,null,c.a.createElement(v.a,{title:"Theme Settings",placement:"left"},c.a.createElement(m.a,{size:"small","aria-label":"delete",className:"my-12",onClick:this.tooglePanel},c.a.createElement(u.a,{className:"spin"},"settings"))),this.state.open&&c.a.createElement(s.a,{theme:l},c.a.createElement("div",{className:"egret-customizer pb-8 ".concat(n.root),style:{backgroundColor:l.palette.background.default}},c.a.createElement("div",{className:"flex felx-row flex-middle p-16 mb-16 elevation-z6",style:{minHeight:"64px"}},c.a.createElement(u.a,{color:"primary"},"settings"),c.a.createElement("h5",{className:"mb-0 ml-8"},"Theme Settings"),c.a.createElement(m.a,{onClick:this.tooglePanel,className:"customizer-close"},c.a.createElement(u.a,null,"close"))),c.a.createElement(j.a,{options:{suppressScrollX:!0},className:"px-16"},c.a.createElement("div",{className:"mt-8 mb-32 mx-12"},c.a.createElement("div",{className:"text-muted"},"Layouts"),c.a.createElement("div",{className:"layout-boxes"},c.a.createElement(F,{color:"secondary",className:"layout-box",badgeContent:c.a.createElement(u.a,null,"done"),invisible:"layout1"!==a.activeLayout},c.a.createElement(x.a,{onClick:function(){return e.selectLayout("layout1")},elevation:4},c.a.createElement("img",{src:"/assets/images/screenshots/layout1-customizer.png",alt:""}))),c.a.createElement(F,{color:"secondary",className:"layout-box",badgeContent:c.a.createElement(u.a,null,"done"),invisible:"layout2"!==a.activeLayout},c.a.createElement(x.a,{onClick:function(){return e.selectLayout("layout2")},elevation:4},c.a.createElement("img",{src:"/assets/images/screenshots/layout2-customizer.png",alt:""}))))),c.a.createElement("div",{className:"mb-16 mx-12"},c.a.createElement("div",{className:"text-muted mb-4"},"Main theme"),c.a.createElement("div",{className:"colors"},I.map((function(t,n){return c.a.createElement(v.a,{key:n,title:t,placement:"top"},c.a.createElement("div",{className:"color",onClick:function(){return e.updateSettings({activeTheme:t})},style:{backgroundColor:D.a[t].palette.primary.main}},a.activeTheme===t&&c.a.createElement(u.a,null,"done"),c.a.createElement("div",{className:a.themes[t].palette.type})))})))),"layout1"===a.activeLayout&&c.a.createElement(W,{settings:a,handleChange:this.handleChange,handleControlChange:this.handleControlChange}),"layout2"===a.activeLayout&&c.a.createElement(q,{settings:a,handleChange:this.handleChange,handleControlChange:this.handleControlChange}),c.a.createElement("div",{className:"mx-12 mb-24"},c.a.createElement(N.a,{component:"fieldset"},c.a.createElement(C.a,{component:"legend"},"Footer"),c.a.createElement(S.a,null,c.a.createElement(k.a,{control:c.a.createElement(w.a,{checked:Object(T.get)(a.footer,"show"),onChange:this.handleControlChange("footer.show")}),label:"Show"}),c.a.createElement(k.a,{control:c.a.createElement(w.a,{checked:Object(T.get)(a.layout1Settings.footer,"fixed"),onChange:this.handleControlChange("footer.fixed")}),label:"Fixed"})))),c.a.createElement("div",{className:"mx-12 mb-24"},c.a.createElement(N.a,{component:"fieldset"},c.a.createElement(C.a,{component:"legend"},"Secondary sidebar"),c.a.createElement(S.a,null,c.a.createElement(k.a,{control:c.a.createElement(w.a,{checked:Object(T.get)(a.secondarySidebar,"show"),onChange:this.handleControlChange("secondarySidebar.show")}),label:"Show"})))),c.a.createElement("div",{className:"mb-16 mx-12"},c.a.createElement("div",{className:"text-muted mb-4"},"Secondary sidebar theme"),c.a.createElement("div",{className:"colors"},A.map((function(t,n){return c.a.createElement(v.a,{key:n,title:t,placement:"top"},c.a.createElement("div",{className:"color",onClick:function(){return e.handleChange("secondarySidebar.theme",t)},style:{backgroundColor:D.a[t].palette.primary.main}},a.secondarySidebar.theme===t&&c.a.createElement(u.a,null,"done"),c.a.createElement("div",{className:a.themes[t].palette.type})))})))),c.a.createElement("div",{className:"mb-16 mx-12"},c.a.createElement("div",{className:"text-muted mb-4"},"Footer theme"),c.a.createElement("div",{className:"colors"},A.map((function(t,n){return c.a.createElement(v.a,{key:n,title:t,placement:"top"},c.a.createElement("div",{className:"color",onClick:function(){return e.handleChange("footer.theme",t)},style:{backgroundColor:D.a[t].palette.primary.main}},a.footer.theme===t&&c.a.createElement(u.a,null,"done"),c.a.createElement("div",{className:a.themes[t].palette.type})))}))))))))}}]),a}(i.Component),J=Object(O.a)((function(e){return{root:{},paper:{display:"inherit"}}}),{withTheme:!0})(Object(g.b)((function(e){return{settings:e.layout.settings,setLayoutSettings:f.PropTypes.func.isRequired,setDefaultSettings:f.PropTypes.func.isRequired}}),{setLayoutSettings:E.d,setDefaultSettings:E.c})(H)),B=a(1264),V=a(1461),X=function(e){Object(r.a)(a,e);var t=Object(o.a)(a);function a(){var e;Object(n.a)(this,a);for(var l=arguments.length,r=new Array(l),o=0;o<l;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={open:!0},e.toggle=function(){e.setState({open:!e.state.open})},e.listenWindowResize=function(){return Object(b.b)((function(){e.setState({open:!Object(b.g)()})}),100)},e}return Object(l.a)(a,[{key:"componentWillMount",value:function(){this.setState({open:!Object(b.g)()}),window&&(this.listenWindowResizeRef=this.listenWindowResize(),window.addEventListener("resize",this.listenWindowResizeRef))}},{key:"componentWillUnmount",value:function(){window&&window.removeEventListener("resize",this.listenWindowResizeRef)}},{key:"render",value:function(){var e=this.props,t=e.settings,a=e.classes,n=e.theme,l=t.themes[t.secondarySidebar.theme]||n;return c.a.createElement(s.a,{theme:l},this.state.open&&!Object(b.g)()&&c.a.createElement(p.Helmet,null,c.a.createElement("style",null,"\n              .content-wrap, \n              .layout2.layout-contained, \n              .layout2.layout-full {\n                margin-right: ".concat("50px",";\n              }\n              @media screen and (max-width: 959px) {\n                .toolbar-menu-wrap .menu-area {\n                  width: calc(100% - ").concat("50px",");\n                }\n              }\n              .egret-customizer {\n                right: ").concat("50px",";\n              }\n            "))),c.a.createElement("div",{className:a.root+" "+Object(b.a)({open:this.state.open,"secondary-sidebar":!0}),style:{backgroundColor:l.palette.primary.main}},c.a.createElement("span",{className:"m-auto"}),c.a.createElement(J,null),c.a.createElement(V.a,null),c.a.createElement(m.a,{size:"small","aria-label":"delete",className:"my-12"},c.a.createElement(u.a,null,"comments")),c.a.createElement("span",{className:"m-auto"}),c.a.createElement("div",{className:"toggle"},this.state.open&&c.a.createElement(m.a,{onClick:this.toggle,size:"small","aria-label":"toggle"},c.a.createElement(u.a,null,"arrow_right")),!this.state.open&&c.a.createElement(d.a,{variant:"extended",size:"small",color:"primary","aria-label":"add",className:"pr-36",onClick:this.toggle},c.a.createElement(u.a,null,"arrow_left")))))}}]),a}(i.Component);t.a=Object(B.a)((function(e){return{root:{position:"fixed",height:"100vh",width:"50px",right:"-".concat("50px"),bottom:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",boxShadow:e.shadows[8],zIndex:98,transition:"all 0.15s ease","&.open":{right:0,"& .toggle":{left:0}},"& .toggle":{position:"relative",left:"-28px",bottom:"20px",transition:"all 0.15s ease"}}}}),{withTheme:!0})(Object(h.g)(Object(g.b)((function(e){return{settings:e.layout.settings}}),{})(X)))}}]);
//# sourceMappingURL=5.e29bdfae.chunk.js.map