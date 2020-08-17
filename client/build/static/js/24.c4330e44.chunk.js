(this["webpackJsonpseller-management-system"]=this["webpackJsonpseller-management-system"]||[]).push([[24],{1342:function(e,t,a){"use strict";a.d(t,"c",(function(){return l})),a.d(t,"d",(function(){return s})),a.d(t,"b",(function(){return i})),a.d(t,"a",(function(){return c})),a.d(t,"e",(function(){return o}));var n=a(20),r=a.n(n),l=function(){return r.a.get("/api/parts-um/list")},s=function(e){return r.a.get("/api/parts-um/get?_id=".concat(e))},i=function(e){return r.a.post("/api/parts-um/delete?_id=".concat(e))},c=function(e){return r.a.post("/api/parts-um/add",e)},o=function(e){return r.a.post("/api/parts-um/update",e)}},1349:function(e,t,a){"use strict";a.d(t,"c",(function(){return l})),a.d(t,"d",(function(){return s})),a.d(t,"b",(function(){return i})),a.d(t,"a",(function(){return c})),a.d(t,"e",(function(){return o})),a.d(t,"f",(function(){return u}));var n=a(20),r=a.n(n),l=function(){return r.a.get("/api/parts/list")},s=function(e){return r.a.get("/api/parts/get?_id=".concat(e))},i=function(e){return r.a.post("/api/parts/delete?_id=".concat(e))},c=function(e){return r.a.post("/api/parts/add",e)},o=function(e){return r.a.post("/api/parts/update",e)},u=function(e){return r.a.post("/api/parts/update-list",e)}},1350:function(e,t,a){"use strict";a.d(t,"c",(function(){return l})),a.d(t,"d",(function(){return s})),a.d(t,"b",(function(){return i})),a.d(t,"a",(function(){return c})),a.d(t,"e",(function(){return o}));var n=a(20),r=a.n(n),l=function(){return r.a.get("/api/parts-type/list")},s=function(e){return r.a.get("/api/parts-type/get?_id=".concat(e))},i=function(e){return r.a.post("/api/parts-type/delete?_id=".concat(e))},c=function(e){return r.a.post("/api/parts-type/add",e)},o=function(e){return r.a.post("/api/parts-type/update",e)}},1368:function(e,t,a){"use strict";a.d(t,"c",(function(){return l})),a.d(t,"d",(function(){return s})),a.d(t,"b",(function(){return i})),a.d(t,"a",(function(){return c})),a.d(t,"e",(function(){return o}));var n=a(20),r=a.n(n),l=function(){return r.a.get("/api/supplier-type/list")},s=function(e){return r.a.get("/api/supplier-type/get?uid=".concat(e))},i=function(e){return r.a.post("/api/supplier-type/delete?uid=".concat(e))},c=function(e){return r.a.post("/api/supplier-type/add",e)},o=function(e){return r.a.post("/api/supplier-type/update",e)}},1377:function(e,t,a){"use strict";a.d(t,"c",(function(){return l})),a.d(t,"d",(function(){return s})),a.d(t,"b",(function(){return i})),a.d(t,"a",(function(){return c})),a.d(t,"e",(function(){return o}));var n=a(20),r=a.n(n),l=function(){return r.a.get("/api/suppliers/list")},s=function(e){return r.a.get("/api/suppliers/get?uid=".concat(e))},i=function(e){return r.a.post("/api/suppliers/delete?uid=".concat(e))},c=function(e){return r.a.post("/api/suppliers/add",e)},o=function(e){return r.a.post("/api/suppliers/update",e)}},1412:function(e,t,a){"use strict";a.d(t,"a",(function(){return P}));var n=a(8),r=a(1334),l=a(0),s=a.n(l),i=a(7),c=a(1348),o=a(1302),u=a(33),p=a(51),d=a(581),m=a(1576),h=a(543),g=a(259),f=a(1516),b=a(1408),y=a(1352),v=a.n(y),E=Object(o.a)((function(e){return{root:{flexGrow:1,height:250},input:{display:"flex",padding:0,height:"auto"},valueContainer:{display:"flex",flexWrap:"wrap",flex:1,alignItems:"center",overflow:"hidden"},chip:{margin:e.spacing(.5,.25)},chipFocused:{backgroundColor:Object(u.c)("light"===e.palette.type?e.palette.grey[300]:e.palette.grey[700],.08)},noOptionsMessage:{padding:e.spacing(1,2)},singleValue:{fontSize:16},placeholder:{position:"absolute",left:2,bottom:6,fontSize:16},paper:{position:"absolute",zIndex:1,marginTop:e.spacing(1),left:0,right:0},divider:{height:e.spacing(2)}}}));function x(e){var t=e.inputRef,a=Object(r.a)(e,["inputRef"]);return s.a.createElement("div",Object.assign({ref:t},a))}var C={Control:function(e){var t=e.children,a=e.innerProps,r=e.innerRef,l=e.selectProps,i=l.classes,c=l.TextFieldProps;return s.a.createElement(h.a,Object.assign({fullWidth:!0,InputProps:{inputComponent:x,inputProps:Object(n.a)({className:i.input,ref:r,children:t},a)}},c))},Menu:function(e){return s.a.createElement(g.a,Object.assign({square:!0,className:e.selectProps.classes.paper},e.innerProps),e.children)},MultiValue:function(e){return s.a.createElement(f.a,{tabIndex:-1,label:e.children,className:Object(i.default)(e.selectProps.classes.chip,{[e.selectProps.classes.chipFocused]:e.isFocused}),onDelete:e.removeProps.onClick,deleteIcon:s.a.createElement(v.a,e.removeProps)})},NoOptionsMessage:function(e){return s.a.createElement(d.a,Object.assign({color:"textSecondary",className:e.selectProps.classes.noOptionsMessage},e.innerProps),e.children)},Option:function(e){return s.a.createElement(b.a,Object.assign({ref:e.innerRef,selected:e.isFocused,component:"div",style:{fontWeight:e.isSelected?500:400}},e.innerProps),e.children)},Placeholder:function(e){return s.a.createElement(d.a,Object.assign({color:"textSecondary",className:e.selectProps.classes.placeholder},e.innerProps),e.children)},SingleValue:function(e){return s.a.createElement(d.a,Object.assign({className:e.selectProps.classes.singleValue},e.innerProps),e.children)},ValueContainer:function(e){return s.a.createElement("div",{className:e.selectProps.classes.valueContainer},e.children)}};function P(e){var t=e.handleChange,a=e.selectedValue,r=e.textFieldProps,l=e.isMulti,i=e.options,o=E(),u=Object(p.a)(),d={input:function(e){return Object(n.a)(Object(n.a)({},e),{},{color:u.palette.text.primary,"& input":{font:"inherit"}})}};return s.a.createElement(m.a,null,s.a.createElement(c.a,{classes:o,styles:d,inputId:"react-select-single",options:i,components:C,TextFieldProps:r,value:a,onChange:t,isMulti:l}))}},1583:function(e,t,a){"use strict";a.r(t);var n=a(22),r=a(25),l=a(30),s=a(29),i=a(1334),c=a(0),o=a.n(c),u=a(1303),p=a(1326),d=a(543),m=a(1472),h=a(1481),g=a(1476),f=a(1475),b=a(1534),y=a(1317),v=a(1474),E=a(1378),x=a(1585),C=a(67),P=a(18),S=a(1510),N=a(1412),w=a(1377),O=a(1368),T=a(1342),j=a(1350),M=a(1349),q=a(121),A=a(1353),I=[{label:"Afghanistan"},{label:"Aland Islands"},{label:"Albania"},{label:"Algeria"},{label:"American Samoa"},{label:"Andorra"},{label:"Angola"},{label:"Anguilla"},{label:"Antarctica"},{label:"Antigua and Barbuda"},{label:"Argentina"},{label:"Armenia"},{label:"Aruba"},{label:"Australia"},{label:"Austria"},{label:"Azerbaijan"},{label:"Bahamas"},{label:"Bahrain"},{label:"Bangladesh"},{label:"Barbados"},{label:"Belarus"},{label:"Belgium"},{label:"Belize"},{label:"Benin"},{label:"Bermuda"},{label:"Bhutan"},{label:"Bolivia, Plurinational State of"},{label:"Bonaire, Sint Eustatius and Saba"},{label:"Bosnia and Herzegovina"},{label:"Botswana"},{label:"Bouvet Island"},{label:"Brazil"},{label:"British Indian Ocean Territory"},{label:"Brunei Darussalam"}].map((function(e){return{value:e.label,label:e.label}}));function _(e){var t=e.inputRef,a=e.onChange,n=Object(i.a)(e,["inputRef","onChange"]);return o.a.createElement(A.a,Object.assign({},n,{getInputRef:t,onValueChange:function(e){a({target:{value:e.value}})},thousandSeparator:!0,prefix:"$"}))}var V=function(e){Object(l.a)(a,e);var t=Object(s.a)(a);function a(){var e;Object(n.a)(this,a);for(var r=arguments.length,l=new Array(r),s=0;s<r;s++)l[s]=arguments[s];return(e=t.call.apply(t,[this].concat(l))).state={ID:"S"+Object(q.c)(),start_date:new Date,type:"",country:"",name:"",contact:"",skype:"",wechat:"",whatsapp:"",mobile:"",office:"",email:"",main_products_services:"",address:"",notess:"",loading:!1,supplierTypeList:[],partsUMList:[],partsTypeList:[],supplierList:[],parts:[]},e.handleSubmit=function(t){Object(w.a)(e.state).then((function(t){if(0!=e.state.parts.length){var a=e.state.parts.map((function(e){return{ID:e.IDCode,name:e.name,type:e.selectedType.value,cost_usd:e.UPrice,UM:e.selectedUM.value,qty:e.qty,supplier_id:t.data._id}}));Object(M.a)(a).then((function(t){e.props.history.push("/supplier/list")}))}}))},e.handleChange=function(t,a){t.persist(),e.setState({[t.target.name]:t.target.value})},e.addNewPart=function(){var t={IDCode:"P"+Object(q.c)(),name:"",selectedType:"",selectedUM:"",UPrice:0,qty:0},a=e.state.parts;a.push(t),e.setState({parts:a})},e.handleSelectPartsType=function(t,a){var n=e.state.parts;n[a].selectedType=t,e.setState({parts:n})},e.handleSelectPartsUM=function(t,a){var n=e.state.parts;n[a].selectedUM=t,e.setState({parts:n})},e.handleChangePartsQty=function(t,a){var n=e.state.parts;n[a].qty=t.target.value,e.setState({parts:n})},e.handleChangeUPrice=function(t,a){var n=e.state.parts;n[a].UPrice=t.target.value,e.setState({parts:n})},e.handleChangePartName=function(t,a){var n=e.state.parts;n[a].name=t.target.value,e.setState({parts:n})},e}return Object(r.a)(a,[{key:"componentDidMount",value:function(){var e=this;Object(O.c)().then((function(t){var a=t.data.map((function(e){return{value:e._id,label:e.name}}));e.setState({supplierTypeList:a})})),Object(j.c)().then((function(t){e.setState({partsTypeList:t.data.map((function(e){return{value:e._id,label:e.name}}))})})),Object(T.c)().then((function(t){e.setState({partsUMList:t.data.map((function(e){return{value:e._id,label:e.short_name}}))})})),Object(w.c)().then((function(t){e.setState({supplierList:t.data.map((function(e){return{value:e._id,label:e.name,ID:e.ID}}))})}))}},{key:"render",value:function(){var e=this,t=this.state,a=t.ID,n=t.start_date,r=(t.type,t.country,t.name),l=t.contact,s=t.skype,i=t.wechat,c=t.whatsapp,w=t.mobile,O=t.office,T=t.email,j=t.main_products_services,M=t.address,q=t.notes,A=t.loading,V=t.supplierTypeList,B=t.partsTypeList,U=t.partsUMList,k=(t.supplierList,t.parts);return o.a.createElement("div",{className:"m-sm-30"},o.a.createElement("div",{className:"mb-sm-30"},o.a.createElement(P.a,{routeSegments:[{name:"Add New Supplier"}]})),o.a.createElement(P.j,null,o.a.createElement(C.ValidatorForm,{ref:"form",onSubmit:this.handleSubmit,onError:function(e){return null}},o.a.createElement("div",{className:"viewer_actions px-16 flex flex-end"},o.a.createElement("div",{className:"mb-24"},o.a.createElement(u.a,{type:"submit",className:"py-8",variant:"contained",color:"primary",disabled:A},"Save"))),o.a.createElement(p.a,{container:!0,spacing:6},o.a.createElement(p.a,{item:!0,lg:6,md:6,sm:12,xs:12},o.a.createElement(C.TextValidator,{className:"mb-16 w-100",label:"ID",readOnly:!0,type:"text",name:"ID",value:a,validators:["required"],errorMessages:["this field is required"]})),o.a.createElement(p.a,{item:!0,lg:6,md:6,sm:12,xs:12},o.a.createElement(E.a,{utils:S.a},o.a.createElement(x.a,{className:"mb-16 w-100",margin:"none",id:"mui-pickers-date",label:"Start Date",inputVariant:"standard",type:"text",autoOk:!0,value:n,onChange:function(t){return e.setState({start_date:t})},KeyboardButtonProps:{"aria-label":"change date"}}))),o.a.createElement(p.a,{item:!0,lg:6,md:6,sm:12,xs:12},o.a.createElement(N.a,{textFieldProps:{label:"Supplier Type",InputLabelProps:{htmlFor:"react-select-single",shrink:!0},placeholder:""},handleChange:function(t){return e.setState({type:t.value})},options:V})),o.a.createElement(p.a,{item:!0,lg:6,md:6,sm:12,xs:12},o.a.createElement(N.a,{textFieldProps:{label:"Country",InputLabelProps:{htmlFor:"react-select-single",shrink:!0},placeholder:""},handleChange:function(t){return e.setState({country:t.value})},options:I})),o.a.createElement(p.a,{item:!0,lg:6,md:6,sm:12,xs:12},o.a.createElement(C.TextValidator,{className:"mb-16 w-100",label:"Name",onChange:this.handleChange,type:"text",name:"name",value:r,validators:["required"],errorMessages:["this field is required"]}),o.a.createElement(C.TextValidator,{className:"mb-16 w-100",label:"Contact",onChange:this.handleChange,type:"text",name:"contact",value:l,validators:["required"],errorMessages:["this field is required"]}),o.a.createElement(C.TextValidator,{className:"mb-16 w-100",label:"Mobile",onChange:this.handleChange,type:"text",name:"mobile",value:w,validators:["required"],errorMessages:["this field is required"]}),o.a.createElement(C.TextValidator,{className:"mb-16 w-100",label:"Office",onChange:this.handleChange,type:"text",name:"office",value:O,validators:["required"],errorMessages:["this field is required"]}),o.a.createElement(C.TextValidator,{className:"mb-16 w-100",label:"Email",onChange:this.handleChange,type:"email",name:"email",value:T,validators:["required"],errorMessages:["this field is required"]})),o.a.createElement(p.a,{item:!0,lg:6,md:6,sm:12,xs:12},o.a.createElement("h5",{className:"text-primary"},"CHAT"),o.a.createElement(C.TextValidator,{className:"mb-16 w-100",label:"Skype",onChange:this.handleChange,type:"text",name:"skype",value:s,validators:["required"],errorMessages:["this field is required"]}),o.a.createElement(C.TextValidator,{className:"mb-16 w-100",label:"WeChat",onChange:this.handleChange,type:"text",name:"wechat",value:i,validators:["required"],errorMessages:["this field is required"]}),o.a.createElement(C.TextValidator,{className:"mb-16 w-100",label:"WhatsApp",onChange:this.handleChange,type:"text",name:"whatsapp",value:c,validators:["required"],errorMessages:["this field is required"]})),o.a.createElement(p.a,{item:!0,lg:12,md:12,sm:12,xs:12},o.a.createElement(C.TextValidator,{className:"mb-16 w-100",label:"Main Products/Services",onChange:this.handleChange,type:"text",name:"main_products_services",value:j,validators:["required"],errorMessages:["this field is required"]})),o.a.createElement(p.a,{item:!0,lg:12,md:12,sm:12,xs:12},o.a.createElement(d.a,{label:"Address",fullWidth:!0,multiline:!0,rows:5,name:"address",value:M,onChange:this.handleChange})),o.a.createElement(p.a,{item:!0,lg:12,md:12,sm:12,xs:12},o.a.createElement(d.a,{label:"Notes",fullWidth:!0,multiline:!0,rows:5,name:"notes",value:q,onChange:this.handleChange})),o.a.createElement(p.a,{item:!0,lg:12,md:12,sm:12,xs:12,style:{minHeight:"500px"}},o.a.createElement(m.a,{style:{border:"1px solid rgba(224, 224, 224, 1)"}},o.a.createElement("colgroup",null,o.a.createElement("col",{style:{width:"10%"}}),o.a.createElement("col",{style:{width:"40%"}}),o.a.createElement("col",{style:{width:"10%"}}),o.a.createElement("col",{style:{width:"10%"}}),o.a.createElement("col",{style:{width:"10%"}}),o.a.createElement("col",{style:{width:"10%"}}),o.a.createElement("col",{style:{width:"10%"}})),o.a.createElement(h.a,null,o.a.createElement(g.a,null,o.a.createElement(f.a,{colSpan:1,align:"center",className:"bg-light-green"},o.a.createElement(b.a,{color:"primary","aria-label":"Add",onClick:this.addNewPart},o.a.createElement(y.a,null,"add"))),o.a.createElement(f.a,{colSpan:6,align:"center",className:"bg-light-green"},"PARTS")),o.a.createElement(g.a,null,o.a.createElement(f.a,{align:"center"},"ID Code"),o.a.createElement(f.a,{align:"center"},"Name"),o.a.createElement(f.a,{align:"center"},"Type"),o.a.createElement(f.a,{align:"center"},"UM"),o.a.createElement(f.a,{align:"center"},"UPrice"),o.a.createElement(f.a,{align:"center"},"Qty"),o.a.createElement(f.a,{align:"center"},"Total"))),o.a.createElement(v.a,null,k&&k.map((function(t,a){return o.a.createElement(g.a,{key:a},o.a.createElement(f.a,{className:"px-10",align:"center"},o.a.createElement(C.TextValidator,{type:"text",value:t.IDCode,readOnly:!0,inputProps:{min:0,style:{textAlign:"center"}}})),o.a.createElement(f.a,{align:"center",className:"pr-10"},o.a.createElement(d.a,{name:"name",value:t.name,onChange:function(t){return e.handleChangePartName(t,a)},fullWidth:!0})),o.a.createElement(f.a,{className:"px-10",align:"center"},o.a.createElement(N.a,{textFieldProps:{InputLabelProps:{htmlFor:"react-select-single",shrink:!0},placeholder:""},handleChange:function(t){return e.handleSelectPartsType(t,a)},selectedValue:t.selectedType,options:B})),o.a.createElement(f.a,{className:"px-10",align:"center"},o.a.createElement(N.a,{textFieldProps:{InputLabelProps:{htmlFor:"react-select-single",shrink:!0},placeholder:""},handleChange:function(t){return e.handleSelectPartsUM(t,a)},selectedValue:t.selectedUM,options:U})),o.a.createElement(f.a,{className:"px-10",align:"center"},o.a.createElement(d.a,{value:t.UPrice,onChange:function(t){return e.handleChangeUPrice(t,a)},name:"UPrice",InputProps:{inputComponent:_},inputProps:{min:0,style:{textAlign:"center"}}})),o.a.createElement(f.a,{className:"px-10",align:"center"},o.a.createElement(C.TextValidator,{onChange:function(t){return e.handleChangePartsQty(t,a)},type:"text",name:"qty",value:t.qty,inputProps:{min:0,style:{textAlign:"center"}}})),o.a.createElement(f.a,{className:"px-10",align:"center"},"$ ",parseFloat(t.UPrice*t.qty).toFixed(2)))})))))))))}}]),a}(c.Component);t.default=V}}]);
//# sourceMappingURL=24.c4330e44.chunk.js.map