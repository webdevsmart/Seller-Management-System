(this["webpackJsonpseller-management-system"]=this["webpackJsonpseller-management-system"]||[]).push([[29],{1377:function(e,t,n){"use strict";n.d(t,"c",(function(){return r})),n.d(t,"d",(function(){return i})),n.d(t,"b",(function(){return c})),n.d(t,"a",(function(){return l})),n.d(t,"e",(function(){return s}));var a=n(15),o=n.n(a),r=function(){return o.a.get("/api/products/list")},i=function(e){return o.a.get("/api/products/get?_id=".concat(e))},c=function(e){return o.a.post("/api/products/delete?_id=".concat(e))},l=function(e,t){return o.a.post("/api/products/add",e,t)},s=function(e){return o.a.post("/api/products/update",e)}},1590:function(e,t,n){"use strict";n.r(t);var a=n(1334),o=n(8),r=n(22),i=n(25),c=n(30),l=n(29),s=n(0),u=n.n(s),d=(n(15),n(1482)),p=n(1605),m=n(580),g=n(1317),h=n(1303),f=n(1327),b=n(357),v=n(1316),C=n(1347),x=n.n(C),y=n(19),O=n(57),E=n(1377),D=n(1414),k=(n(1416),{filterType:"checkbox",customToolbarSelect:function(){},selectableRows:"none"}),w={width:"100px"},S=function(e){Object(c.a)(n,e);var t=Object(l.a)(n);function n(){var e;Object(r.a)(this,n);for(var a=arguments.length,i=new Array(a),c=0;c<a;c++)i[c]=arguments[c];return(e=t.call.apply(t,[this].concat(i))).state={productList:[],shouldOpenConfirmationDialog:!1,warningOpen:!1,warningMessage:"",lightboxOpen:!1,productImages:[],lightboxIndex:0},e.handleDialogClose=function(){e.setState({shouldOpenEditorDialog:!1,shouldOpenConfirmationDialog:!1}),e.updatePageData()},e.handleDeleteProduct=function(t){e.setState({mid:t,shouldOpenConfirmationDialog:!0})},e.handleConfirmationResponse=function(){Object(E.b)(e.state.mid).then((function(t){e.handleDialogClose()}))},e.updatePageData=function(){Object(E.c)().then((function(t){var n=[];t.data.map((function(e){n.push(Object(o.a)(Object(o.a)({},e),{},{parent:e.parent_category.category,categories:e.categories.map((function(e){return e.category})).join()}))})),e.setState({productList:n})}))},e.handleClickAvatar=function(t){e.setState({productImages:t,lightboxOpen:!0,lightboxIndex:0})},e.getMuiTheme=function(){return Object(b.a)({overrides:{MUIDataTableBodyRow:{root:{"&:nth-child(odd)":{backgroundColor:"rgb(211 235 255 / 44%)"}}}}})},e}return Object(i.a)(n,[{key:"componentDidMount",value:function(){this.updatePageData()}},{key:"render",value:function(){var e=this,t=this.state,n=t.productList,o=t.shouldOpenConfirmationDialog,r=(t.warningOpen,t.warningMessage,t.lightboxIndex),i=t.lightboxOpen,c=t.productImages,l=[{name:"",label:"",options:{filter:!1,sort:!1,empty:!0,customHeadRender:function(e){var t=e.index,n=Object(a.a)(e,["index"]);return u.a.createElement(d.a,{key:t,style:w},n.label)},customBodyRenderLite:function(t){return u.a.createElement(u.a.Fragment,null,e.state.productList[t]&&u.a.createElement("a",{href:"#!",onClick:function(){return e.handleClickAvatar(e.state.productList[t].img)}},u.a.createElement(p.a,{className:"avatar",src:"/".concat(e.state.productList[t].img[0].path)})))}}},{name:"sku",label:"SKU",options:{filter:!0,sort:!0}},{name:"upc",label:"UPC",options:{filter:!0,sort:!0}},{name:"name",label:"Name",options:{filter:!0,sort:!0}},{name:"parent",label:"Parent",options:{filter:!0,sort:!0}},{name:"categories",label:"Categories",options:{filter:!0,sort:!0}},{name:"notes",label:"Notes",options:{filter:!0,sort:!0}},{name:"action",label:"Action",options:{filter:!1,sort:!1,empty:!0,customBodyRenderLite:function(t){return u.a.createElement(u.a.Fragment,null,u.a.createElement(m.a,{onClick:function(){return e.props.history.push("/product/edit/".concat(n[t]._id))}},u.a.createElement(g.a,{color:"primary"},"edit")),u.a.createElement(m.a,{onClick:function(){return e.handleDeleteProduct(e.state.productList[t]._id)}},u.a.createElement(g.a,{color:"error"},"delete")))}}}];return u.a.createElement("div",{className:"m-sm-30"},u.a.createElement("div",{className:"mb-sm-30"},u.a.createElement(y.a,{routeSegments:[{name:"Product List"}]})),u.a.createElement(O.a,{to:"/product/add-new"},u.a.createElement(h.a,{className:"mb-16",variant:"contained",color:"primary"},"Add New Product")),u.a.createElement(f.a,{className:"w-100 overflow-auto",elevation:6},u.a.createElement(v.a,{theme:this.getMuiTheme()},u.a.createElement(x.a,{className:"crud-table",title:"Product List",data:n,columns:l,options:k})),o&&u.a.createElement(y.b,{open:o,onConfirmDialogClose:this.handleDialogClose,onYesClick:this.handleConfirmationResponse,text:"Are you sure to delete?"})),i&&c&&u.a.createElement(D.a,{mainSrc:"/".concat(c[r].path),nextSrc:"/".concat(c[(r+1)%c.length].path),prevSrc:"/".concat(c[(r+c.length-1)%c.length].path),onCloseRequest:function(){return e.setState({lightboxOpen:!1})},onMovePrevRequest:function(){return e.setState({lightboxIndex:(r+c.length-1)%c.length})},onMoveNextRequest:function(){return e.setState({lightboxIndex:(r+1)%c.length})}}))}}]),n}(s.Component);t.default=S}}]);
//# sourceMappingURL=29.6bc9a831.chunk.js.map