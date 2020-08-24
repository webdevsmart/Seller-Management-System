(this["webpackJsonpseller-management-system"]=this["webpackJsonpseller-management-system"]||[]).push([[25],{1353:function(e,a,l){"use strict";l.d(a,"a",(function(){return n}));var t=l(0);function n(e){var a=t.useState(e),l=a[0],n=a[1],r=e||l;return t.useEffect((function(){null==l&&n("mui-".concat(Math.round(1e5*Math.random())))}),[l]),r}},1355:function(e,a,l){"use strict";l.d(a,"a",(function(){return P}));var t=l(8),n=l(1334),r=l(0),o=l.n(r),s=l(7),i=l(1342),c=l(1302),u=l(33),b=l(50),d=l(582),m=l(1594),p=l(551),h=l(259),g=l(1540),f=l(1437),y=l(1345),v=l.n(y),E=Object(c.a)((function(e){return{root:{flexGrow:1,height:250},input:{display:"flex",padding:0,height:"auto"},valueContainer:{display:"flex",flexWrap:"wrap",flex:1,alignItems:"center",overflow:"hidden"},chip:{margin:e.spacing(.5,.25)},chipFocused:{backgroundColor:Object(u.c)("light"===e.palette.type?e.palette.grey[300]:e.palette.grey[700],.08)},noOptionsMessage:{padding:e.spacing(1,2)},singleValue:{fontSize:16},placeholder:{position:"absolute",left:2,bottom:6,fontSize:16},paper:{position:"absolute",zIndex:1,marginTop:e.spacing(1),left:0,right:0},divider:{height:e.spacing(2)}}}));function S(e){var a=e.inputRef,l=Object(n.a)(e,["inputRef"]);return o.a.createElement("div",Object.assign({ref:a},l))}var C={Control:function(e){var a=e.children,l=e.innerProps,n=e.innerRef,r=e.selectProps,s=r.classes,i=r.TextFieldProps;return o.a.createElement(p.a,Object.assign({fullWidth:!0,InputProps:{inputComponent:S,inputProps:Object(t.a)({className:s.input,ref:n,children:a},l)}},i))},Menu:function(e){return o.a.createElement(h.a,Object.assign({square:!0,className:e.selectProps.classes.paper},e.innerProps),e.children)},MultiValue:function(e){return o.a.createElement(g.a,{tabIndex:-1,label:e.children,className:Object(s.default)(e.selectProps.classes.chip,{[e.selectProps.classes.chipFocused]:e.isFocused}),onDelete:e.removeProps.onClick,deleteIcon:o.a.createElement(v.a,e.removeProps)})},NoOptionsMessage:function(e){return o.a.createElement(d.a,Object.assign({color:"textSecondary",className:e.selectProps.classes.noOptionsMessage},e.innerProps),e.children)},Option:function(e){return o.a.createElement(f.a,Object.assign({ref:e.innerRef,selected:e.isFocused,component:"div",style:{fontWeight:e.isSelected?500:400}},e.innerProps),e.children)},Placeholder:function(e){return o.a.createElement(d.a,Object.assign({color:"textSecondary",className:e.selectProps.classes.placeholder},e.innerProps),e.children)},SingleValue:function(e){return o.a.createElement(d.a,Object.assign({className:e.selectProps.classes.singleValue},e.innerProps),e.children)},ValueContainer:function(e){return o.a.createElement("div",{className:e.selectProps.classes.valueContainer},e.children)}};function P(e){var a=e.handleChange,l=e.selectedValue,n=e.textFieldProps,r=e.isMulti,s=e.options,c=E(),u=Object(b.a)(),d={input:function(e){return Object(t.a)(Object(t.a)({},e),{},{color:u.palette.text.primary,"& input":{font:"inherit"}})}};return o.a.createElement(m.a,null,o.a.createElement(i.a,{classes:c,styles:d,inputId:"react-select-single",options:s,components:C,TextFieldProps:n,value:l,onChange:a,isMulti:r}))}},1366:function(e,a,l){"use strict";l.d(a,"c",(function(){return r})),l.d(a,"e",(function(){return o})),l.d(a,"b",(function(){return s})),l.d(a,"a",(function(){return i})),l.d(a,"f",(function(){return c})),l.d(a,"d",(function(){return u}));var t=l(17),n=l.n(t),r=function(){return n.a.get("/api/inventory-warehouse-location/list")},o=function(e){return n.a.get("/api/inventory-warehouse-location/get?uid=".concat(e))},s=function(e){return n.a.post("/api/inventory-warehouse-location/delete?uid=".concat(e))},i=function(e){return n.a.post("/api/inventory-warehouse-location/add",e)},c=function(e){return n.a.post("/api/inventory-warehouse-location/update",e)},u=function(){return n.a.get("/api/inventory-warehouse-location/region-list")}},1376:function(e,a,l){"use strict";l.d(a,"c",(function(){return r})),l.d(a,"d",(function(){return o})),l.d(a,"b",(function(){return s})),l.d(a,"a",(function(){return i})),l.d(a,"e",(function(){return c}));var t=l(17),n=l.n(t),r=function(){return n.a.get("/api/warehouse-location-type/list")},o=function(e){return n.a.get("/api/warehouse-location-type/get?uid=".concat(e))},s=function(e){return n.a.post("/api/warehouse-location-type/delete?uid=".concat(e))},i=function(e){return n.a.post("/api/warehouse-location-type/add",e)},c=function(e){return n.a.post("/api/warehouse-location-type/update",e)}},1388:function(e,a,l){"use strict";l.d(a,"a",(function(){return r}));var t=l(0),n=l(1389);function r(){return t.useContext(n.a)}},1389:function(e,a,l){"use strict";var t=l(0),n=t.createContext();a.a=n},1405:function(e,a,l){"use strict";var t=l(1332);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=t(l(0)),r=(0,t(l(1333)).default)(n.default.createElement("path",{d:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"}),"ExpandMore");a.default=r},1408:function(e,a,l){"use strict";l.d(a,"a",(function(){return t}));var t=[{label:"Afghanistan"},{label:"Albania"},{label:"Algeria"},{label:"American Samoa"},{label:"Andorra"},{label:"Angola"},{label:"Anguilla"},{label:"Antarctica"},{label:"Antigua and Barbuda"},{label:"Argentina"},{label:"Armenia"},{label:"Aruba"},{label:"Australia"},{label:"Austria"},{label:"Azerbaijan"},{label:"Bahamas (the)"},{label:"Bahrain"},{label:"Bangladesh"},{label:"Barbados"},{label:"Belarus"},{label:"Belgium"},{label:"Belize"},{label:"Benin"},{label:"Bermuda"},{label:"Bhutan"},{label:"Bolivia (Plurinational State of)"},{label:"Bonaire, Sint Eustatius and Saba"},{label:"Bosnia and Herzegovina"},{label:"Botswana"},{label:"Bouvet Island"},{label:"Brazil"},{label:"British Indian Ocean Territory (the)"},{label:"Brunei Darussalam"},{label:"Bulgaria"},{label:"Burkina Faso"},{label:"Burundi"},{label:"Cabo Verde"},{label:"Cambodia"},{label:"Cameroon"},{label:"Canada"},{label:"Cayman Islands (the)"},{label:"Central African Republic (the)"},{label:"Chad"},{label:"Chile"},{label:"China"},{label:"Christmas Island"},{label:"Cocos (Keeling) Islands (the)"},{label:"Colombia"},{label:"Comoros (the)"},{label:"Congo (the Democratic Republic of the)"},{label:"Congo (the)"},{label:"Cook Islands (the)"},{label:"Costa Rica"},{label:"Croatia"},{label:"Cuba"},{label:"Cura\xe7ao"},{label:"Cyprus"},{label:"Czechia"},{label:"C\xf4te d'Ivoire"},{label:"Denmark"},{label:"Djibouti"},{label:"Dominica"},{label:"Dominican Republic (the)"},{label:"Ecuador"},{label:"Egypt"},{label:"El Salvador"},{label:"Equatorial Guinea"},{label:"Eritrea"},{label:"Estonia"},{label:"Eswatini"},{label:"Ethiopia"},{label:"Falkland Islands (the) [Malvinas]"},{label:"Faroe Islands (the)"},{label:"Fiji"},{label:"Finland"},{label:"France"},{label:"French Guiana"},{label:"French Polynesia"},{label:"French Southern Territories (the)"},{label:"Gabon"},{label:"Gambia (the)"},{label:"Georgia"},{label:"Germany"},{label:"Ghana"},{label:"Gibraltar"},{label:"Greece"},{label:"Greenland"},{label:"Grenada"},{label:"Guadeloupe"},{label:"Guam"},{label:"Guatemala"},{label:"Guernsey"},{label:"Guinea"},{label:"Guinea-Bissau"},{label:"Guyana"},{label:"Haiti"},{label:"Heard Island and McDonald Islands"},{label:"Holy See (the)"},{label:"Honduras"},{label:"Hong Kong"},{label:"Hungary"},{label:"Iceland"},{label:"India"},{label:"Indonesia"},{label:"Iran (Islamic Republic of)"},{label:"Iraq"},{label:"Ireland"},{label:"Isle of Man"},{label:"Israel"},{label:"Italy"},{label:"Jamaica"},{label:"Japan"},{label:"Jersey"},{label:"Jordan"},{label:"Kazakhstan"},{label:"Kenya"},{label:"Kiribati"},{label:"Korea (the Democratic People's Republic of)"},{label:"Korea (the Republic of)"},{label:"Kuwait"},{label:"Kyrgyzstan"},{label:"Lao People's Democratic Republic (the)"},{label:"Latvia"},{label:"Lebanon"},{label:"Lesotho"},{label:"Liberia"},{label:"Libya"},{label:"Liechtenstein"},{label:"Lithuania"},{label:"Luxembourg"},{label:"Macao"},{label:"Madagascar"},{label:"Malawi"},{label:"Malaysia"},{label:"Maldives"},{label:"Mali"},{label:"Malta"},{label:"Marshall Islands (the)"},{label:"Martinique"},{label:"Mauritania"},{label:"Mauritius"},{label:"Mayotte"},{label:"Mexico"},{label:"Micronesia (Federated States of)"},{label:"Moldova (the Republic of)"},{label:"Monaco"},{label:"Mongolia"},{label:"Montenegro"},{label:"Montserrat"},{label:"Morocco"},{label:"Mozambique"},{label:"Myanmar"},{label:"Namibia"},{label:"Nauru"},{label:"Nepal"},{label:"Netherlands (the)"},{label:"New Caledonia"},{label:"New Zealand"},{label:"Nicaragua"},{label:"Niger (the)"},{label:"Nigeria"},{label:"Niue"},{label:"Norfolk Island"},{label:"Northern Mariana Islands (the)"},{label:"Norway"},{label:"Oman"},{label:"Pakistan"},{label:"Palau"},{label:"Palestine, State of"},{label:"Panama"},{label:"Papua New Guinea"},{label:"Paraguay"},{label:"Peru"},{label:"Philippines (the)"},{label:"Pitcairn"},{label:"Poland"},{label:"Portugal"},{label:"Puerto Rico"},{label:"Qatar"},{label:"Republic of North Macedonia"},{label:"Romania"},{label:"Russian Federation (the)"},{label:"Rwanda"},{label:"R\xe9union"},{label:"Saint Barth\xe9lemy"},{label:"Saint Helena, Ascension and Tristan da Cunha"},{label:"Saint Kitts and Nevis"},{label:"Saint Lucia"},{label:"Saint Martin (French part)"},{label:"Saint Pierre and Miquelon"},{label:"Saint Vincent and the Grenadines"},{label:"Samoa"},{label:"San Marino"},{label:"Sao Tome and Principe"},{label:"Saudi Arabia"},{label:"Senegal"},{label:"Serbia"},{label:"Seychelles"},{label:"Sierra Leone"},{label:"Singapore"},{label:"Sint Maarten (Dutch part)"},{label:"Slovakia"},{label:"Slovenia"},{label:"Solomon Islands"},{label:"Somalia"},{label:"South Africa"},{label:"South Georgia and the South Sandwich Islands"},{label:"South Sudan"},{label:"Spain"},{label:"Sri Lanka"},{label:"Sudan (the)"},{label:"Suriname"},{label:"Svalbard and Jan Mayen"},{label:"Sweden"},{label:"Switzerland"},{label:"Syrian Arab Republic"},{label:"Taiwan"},{label:"Tajikistan"},{label:"Tanzania, United Republic of"},{label:"Thailand"},{label:"Timor-Leste"},{label:"Togo"},{label:"Tokelau"},{label:"Tonga"},{label:"Trinidad and Tobago"},{label:"Tunisia"},{label:"Turkey"},{label:"Turkmenistan"},{label:"Turks and Caicos Islands (the)"},{label:"Tuvalu"},{label:"Uganda"},{label:"Ukraine"},{label:"United Arab Emirates (the)"},{label:"United Kingdom of Great Britain and Northern Ireland (the)"},{label:"United States Minor Outlying Islands (the)"},{label:"United States of America (the)"},{label:"Uruguay"},{label:"Uzbekistan"},{label:"Vanuatu"},{label:"Venezuela (Bolivarian Republic of)"},{label:"Viet Nam"},{label:"Virgin Islands (British)"},{label:"Virgin Islands (U.S.)"},{label:"Wallis and Futuna"},{label:"Western Sahara"},{label:"Yemen"},{label:"Zambia"},{label:"Zimbabwe"},{label:"\xc5land Islands"}].map((function(e){return{value:e.label,label:e.label}}))},1436:function(e,a,l){"use strict";var t=l(2),n=l(5),r=l(0),o=(l(4),l(7)),s=l(9),i=r.forwardRef((function(e,a){var l=e.classes,s=e.className,i=e.row,c=void 0!==i&&i,u=Object(n.a)(e,["classes","className","row"]);return r.createElement("div",Object(t.a)({className:Object(o.default)(l.root,s,c&&l.row),ref:a},u))}));a.a=Object(s.a)({root:{display:"flex",flexDirection:"column",flexWrap:"wrap"},row:{flexDirection:"row"}},{name:"MuiFormGroup"})(i)},1438:function(e,a,l){"use strict";var t=l(2),n=l(84),r=l(5),o=l(0),s=(l(4),l(1436)),i=l(28),c=l(200),u=l(1389),b=l(1353),d=o.forwardRef((function(e,a){var l=e.actions,d=e.children,m=e.name,p=e.value,h=e.onChange,g=Object(r.a)(e,["actions","children","name","value","onChange"]),f=o.useRef(null),y=Object(c.a)({controlled:p,default:e.defaultValue,name:"RadioGroup"}),v=Object(n.a)(y,2),E=v[0],S=v[1];o.useImperativeHandle(l,(function(){return{focus:function(){var e=f.current.querySelector("input:not(:disabled):checked");e||(e=f.current.querySelector("input:not(:disabled)")),e&&e.focus()}}}),[]);var C=Object(i.a)(a,f),P=Object(b.a)(m);return o.createElement(u.a.Provider,{value:{name:P,onChange:function(e){S(e.target.value),h&&h(e,e.target.value)},value:E}},o.createElement(s.a,Object(t.a)({role:"radiogroup",ref:C},g),d))}));a.a=d},1582:function(e,a,l){"use strict";var t=l(2),n=l(5),r=l(0),o=(l(4),l(7)),s=l(355),i=l(103),c=Object(i.a)(r.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"RadioButtonUnchecked"),u=Object(i.a)(r.createElement("path",{d:"M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"}),"RadioButtonChecked"),b=l(9);var d=Object(b.a)((function(e){return{root:{position:"relative",display:"flex","&$checked $layer":{transform:"scale(1)",transition:e.transitions.create("transform",{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.shortest})}},layer:{left:0,position:"absolute",transform:"scale(0)",transition:e.transitions.create("transform",{easing:e.transitions.easing.easeIn,duration:e.transitions.duration.shortest})},checked:{}}}),{name:"PrivateRadioButtonIcon"})((function(e){var a=e.checked,l=e.classes,t=e.fontSize;return r.createElement("div",{className:Object(o.default)(l.root,a&&l.checked)},r.createElement(c,{fontSize:t}),r.createElement(u,{fontSize:t,className:l.layer}))})),m=l(33),p=l(11),h=l(111),g=l(1388),f=r.createElement(d,{checked:!0}),y=r.createElement(d,null),v=r.forwardRef((function(e,a){var l=e.checked,i=e.classes,c=e.color,u=void 0===c?"secondary":c,b=e.name,d=e.onChange,m=e.size,v=void 0===m?"medium":m,E=Object(n.a)(e,["checked","classes","color","name","onChange","size"]),S=Object(g.a)(),C=l,P=Object(h.a)(d,S&&S.onChange),w=b;return S&&("undefined"===typeof C&&(C=S.value===e.value),"undefined"===typeof w&&(w=S.name)),r.createElement(s.a,Object(t.a)({color:u,type:"radio",icon:r.cloneElement(y,{fontSize:"small"===v?"small":"default"}),checkedIcon:r.cloneElement(f,{fontSize:"small"===v?"small":"default"}),classes:{root:Object(o.default)(i.root,i["color".concat(Object(p.a)(u))]),checked:i.checked,disabled:i.disabled},name:w,checked:C,onChange:P,ref:a},E))}));a.a=Object(b.a)((function(e){return{root:{color:e.palette.text.secondary},checked:{},disabled:{},colorPrimary:{"&$checked":{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(m.d)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}},colorSecondary:{"&$checked":{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(m.d)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}}}}),{name:"MuiRadio"})(v)},1621:function(e,a,l){"use strict";l.r(a);var t=l(8),n=l(22),r=l(25),o=l(30),s=l(29),i=l(0),c=l.n(i),u=l(1584),b=l(1587),d=l(582),m=l(1586),p=l(1326),h=l(1438),g=l(1304),f=l(1582),y=l(1303),v=l(1501),E=l(1512),S=l(1505),C=l(1504),P=l(1503),w=l(551),_=l(1409),N=l(13),x=l(1407),O=l(1602),M=l(1405),k=l.n(M),j=l(1378),I=l(1355),F=l(1366),R=l(1376),L=l(17),T=l.n(L),B=function(e){return T.a.post("/api/inventory-forecast/report",e)},A=l(1408),z=function(e){Object(o.a)(l,e);var a=Object(s.a)(l);function l(){var e;Object(n.a)(this,l);for(var t=arguments.length,r=new Array(t),o=0;o<t;o++)r[o]=arguments[o];return(e=a.call.apply(a,[this].concat(r))).state={forecastType:"single",monthYear:new Date,expanded:!1,groupOption:"country",warehouseList:[],selectedWarehouse:null,countryList:A.a,selectedCountry:null,typeList:[],selectedType:null,regionList:[],selectedRegion:null,compiledDataList:[],forecastManagerValues:[],rowsPerPage:10,page:0},e.handleChange=function(a){a.persist(),e.setState({[a.target.name]:a.target.value})},e.handleAccordion=function(){var a=e.state.expanded;e.setState({expanded:!a})},e.showData=function(){var a={forecastType:e.state.forecastType,groupOption:e.state.groupOption,warehouse:e.state.selectedWarehouse?e.state.selectedWarehouse.value:null,country:e.state.selectedCountry?e.state.selectedCountry.value:null,type:e.state.selectedType?e.state.selectedType.value:null,region:e.state.selectedRegion?e.state.selectedRegion.value:null,monthYear:e.state.monthYear};B(a).then((function(a){var l=e.state,t=l.compiledDataList,n=l.typeList;t=[],a.data.map((function(e){var a={product_id:e.product_id,sku:e.sku,upc:e.upc,asin:e.asin,name:e.name,this_year_sales_sold:e.this_year_sales_sold,last_year_sales_sold:e.last_year_sales_sold,last_year_next_90_sales_sold:e.last_year_next_90_sales_sold};n.map((function(l){a["".concat(l.name,"_warehouse")]=e["".concat(l.name,"_warehouse")]?e["".concat(l.name,"_warehouse")]:"NA",a["".concat(l.name,"_warehouse_inbound")]=e["".concat(l.name,"_warehouse_inbound")]?e["".concat(l.name,"_warehouse_inbound")]:"NA"})),t.push(a)})),e.setState({compiledDataList:t})}))},e.setPage=function(a){e.setState({page:a})},e.setRowsPerPage=function(a){e.setState({rowsPerPage:a.target.value})},e.handleChangePage=function(a,l){e.setPage(l)},e.handleChangeMangerValue=function(a,l){var t=e.state.forecastManagerValues;t[l]=a.target.value,e.setState({forecastManagerValues:t})},e}return Object(r.a)(l,[{key:"componentDidMount",value:function(){var e=this;Object(F.c)().then((function(a){var l=a.data.map((function(e){return Object(t.a)(Object(t.a)({},e),{},{label:e.ID+" - "+e.short_name,value:e._id})}));e.setState({warehouseList:l})})),Object(R.c)().then((function(a){var l=a.data.map((function(e){return Object(t.a)(Object(t.a)({},e),{},{label:e.name,value:e._id})}));e.setState({typeList:l})})),Object(F.d)().then((function(a){var l=a.data.map((function(e){return{label:e._id,value:e._id}}));e.setState({regionList:l})}))}},{key:"render",value:function(){var e=this,a=this.state,l=a.forecastType,t=a.monthYear,n=a.warehouseList,r=a.selectedWarehouse,o=a.expanded,s=a.groupOption,i=a.countryList,M=a.selectedCountry,F=a.typeList,R=a.selectedType,L=a.regionList,T=a.selectedRegion,B=a.compiledDataList,A=a.rowsPerPage,z=a.page,D=a.forecastManagerValues;return c.a.createElement("div",{className:"m-sm-30"},c.a.createElement("div",{className:"mb-sm-30"},c.a.createElement(N.a,{routeSegments:[{name:"Inventory Forecast"}]})),c.a.createElement(u.a,{expanded:!0===o,onChange:this.handleAccordion},c.a.createElement(b.a,{expandIcon:c.a.createElement(k.a,null),"aria-controls":"panel1bh-content",id:"panel1bh-header"},c.a.createElement(d.a,null,"Forecast Setting")),c.a.createElement(m.a,null,c.a.createElement("div",{className:"list w-100"},c.a.createElement("div",{className:"grid-view"},c.a.createElement(p.a,{container:!0,spacing:2},c.a.createElement(p.a,{item:!0,lg:4,md:4,sm:6,xs:12},c.a.createElement(h.a,{className:"mb-16",value:l,name:"forecastType",onChange:this.handleChange,row:!0},c.a.createElement(g.a,{value:"single",control:c.a.createElement(f.a,{color:"secondary"}),label:"Single",labelPlacement:"end"}),c.a.createElement(g.a,{control:c.a.createElement(f.a,{color:"secondary"}),value:"group",labelPlacement:"end",label:"Group"}))),c.a.createElement(p.a,{item:!0,lg:4,md:4,sm:6,xs:12},c.a.createElement(x.a,{utils:j.a},c.a.createElement(O.a,{className:"mb-16 w-100",views:["year","month"],margin:"none",id:"mui-pickers-date",label:"Select Year/Month for Sales Report",inputVariant:"standard",type:"text",autoOk:!0,value:t,format:"yyyy-MMM",onChange:function(a){return e.setState({monthYear:a})},KeyboardButtonProps:{"aria-label":"change date"}}))),c.a.createElement(p.a,{item:!0,lg:4,md:4,sm:6,xs:12},c.a.createElement(y.a,{onClick:this.showData,className:"mb-16 mr-32",variant:"contained",color:"secondary"},"Compiled Data"),c.a.createElement(y.a,{onClick:this.showData,className:"mb-16 mr-32",variant:"contained",color:"primary"},"Create OEM order")),c.a.createElement(p.a,{item:!0,lg:12,md:12,sm:12,xs:12},"single"===l&&c.a.createElement(c.a.Fragment,null,c.a.createElement(I.a,{textFieldProps:{label:"Select Warehouse",InputLabelProps:{htmlFor:"react-select-single",shrink:!0},placeholder:""},options:n,handleChange:function(a){return e.setState({selectedWarehouse:a})},selectedValue:r}))),c.a.createElement(p.a,{item:!0,lg:12,md:12,sm:12,xs:12},"group"===l&&c.a.createElement(c.a.Fragment,null,c.a.createElement(h.a,{className:"mb-16",value:s,name:"groupOption",onChange:this.handleChange,row:!0},c.a.createElement(g.a,{value:"country",control:c.a.createElement(f.a,{color:"primary"}),label:"Country",labelPlacement:"end"}),c.a.createElement(g.a,{control:c.a.createElement(f.a,{color:"primary"}),value:"type",labelPlacement:"end",label:"Type"}),c.a.createElement(g.a,{control:c.a.createElement(f.a,{color:"primary"}),value:"region",labelPlacement:"end",label:"Region"})))),c.a.createElement(p.a,{item:!0,lg:12,md:12,sm:12,xs:12},"group"===l&&"country"===s&&c.a.createElement(I.a,{textFieldProps:{label:"Select Country",InputLabelProps:{htmlFor:"react-select-single",shrink:!0},placeholder:""},options:i,handleChange:function(a){return e.setState({selectedCountry:a})},selectedValue:M}),"group"===l&&"type"===s&&c.a.createElement(I.a,{textFieldProps:{label:"Select Warehouse Type",InputLabelProps:{htmlFor:"react-select-single",shrink:!0},placeholder:""},options:F,handleChange:function(a){return e.setState({selectedType:a})},selectedValue:R}),"group"===l&&"region"===s&&c.a.createElement(I.a,{textFieldProps:{label:"Select Region",InputLabelProps:{htmlFor:"react-select-single",shrink:!0},placeholder:""},options:L,handleChange:function(a){return e.setState({selectedRegion:a})},selectedValue:T}))))))),c.a.createElement(p.a,{container:!0,spacing:4,className:"mt-20",style:{marginBottom:"250px"}},c.a.createElement(p.a,{item:!0,sm:12,xs:12},c.a.createElement("div",{className:"w-100 overflow-auto"},c.a.createElement(v.a,{style:{border:"1px solid rgba(224, 224, 224, 1)",whiteSpace:"pre"}},c.a.createElement(E.a,null,c.a.createElement(S.a,null,c.a.createElement(C.a,{align:"center",className:"bg-light-green",width:"15%"},"Product"),c.a.createElement(C.a,{align:"center",colSpan:F.length+3,width:"40%",className:"bg-primary"}),c.a.createElement(C.a,{align:"center",colSpan:5,className:"bg-secondary",width:"25%"},"Sales"),c.a.createElement(C.a,{align:"center",colSpan:3,className:"bg-error",width:"20%"},"Forecast")),c.a.createElement(S.a,null,c.a.createElement(C.a,{align:"center"},"Product"),F.map((function(e,a){return c.a.createElement(C.a,{align:"center",key:a},"".concat(e.name," Warehouse"))})),c.a.createElement(C.a,{align:"center"},"Total In Location"),c.a.createElement(C.a,{align:"center"},"Inbound to Location"),c.a.createElement(C.a,{align:"center"},"Total"),c.a.createElement(C.a,{align:"center"},"This Year"),c.a.createElement(C.a,{align:"center"},"Last Year"),c.a.createElement(C.a,{align:"center"},"+/-%"),c.a.createElement(C.a,{align:"center"},"Last Year Next 90 Days"),c.a.createElement(C.a,{align:"center"},"90 Days Forecast"),c.a.createElement(C.a,{align:"center"},"Darft Qty"),c.a.createElement(C.a,{align:"center"},"Manager + / -"),c.a.createElement(C.a,{align:"center"},"Final Order Qty"))),c.a.createElement(P.a,null,B&&B.slice(z*A,z*A+A).map((function(a,l){var t=0,n=0,r=parseFloat((a.this_year_sales_sold-a.last_year_sales_sold)/a.this_year_sales_sold);return r=Number.isNaN(r)?0:r,0==a.this_year_sales_sold&&(r=0),c.a.createElement(S.a,{key:l},c.a.createElement(C.a,{className:"px-10",align:"center"},c.a.createElement("div",{className:"flex flex-wrap font-size-13 text-align-left"},c.a.createElement("p",{className:"mr-10"},c.a.createElement("label",{className:"font-weight-bold"},"SKU:"," "),a.sku),c.a.createElement("p",{className:"mr-10"},c.a.createElement("label",{className:"font-weight-bold"},"UPC:"," "),a.upc)),c.a.createElement("div",{className:"flex flex-wrap font-size-13 text-align-left"},c.a.createElement("p",{className:"mr-10"},c.a.createElement("label",{className:"font-weight-bold"},"Name:"," "),a.name),c.a.createElement("p",{className:"mr-10"},c.a.createElement("label",{className:"font-weight-bold"},"ASIN:"," "),a.asin))),F.map((function(e,l){return t+="NA"===a["".concat(e.name,"_warehouse")]?0:a["".concat(e.name,"_warehouse")],n+="NA"===a["".concat(e.name,"_warehouse_inbound")]?0:a["".concat(e.name,"_warehouse_inbound")],c.a.createElement(C.a,{className:"px-10",align:"center",key:l},a["".concat(e.name,"_warehouse")])})),c.a.createElement(C.a,{className:"px-10",align:"center"},t),c.a.createElement(C.a,{className:"px-10",align:"center"},n),c.a.createElement(C.a,{className:"px-10",align:"center"},t+n),c.a.createElement(C.a,{className:"px-10",align:"center"},a.this_year_sales_sold),c.a.createElement(C.a,{className:"px-10",align:"center"},a.last_year_sales_sold),c.a.createElement(C.a,{className:"px-10",align:"center"},(100*r).toFixed(2)),c.a.createElement(C.a,{className:"px-10",align:"center"},a.last_year_next_90_sales_sold),c.a.createElement(C.a,{className:"px-10",align:"center"},(90*r+a.last_year_next_90_sales_sold).toFixed(2)),c.a.createElement(C.a,{className:"px-10",align:"center"},parseFloat(t+n-(90*r+a.last_year_next_90_sales_sold)).toFixed(2)),c.a.createElement(C.a,{className:"px-10",align:"center"},c.a.createElement(w.a,{value:D[l],onChange:function(a){return e.handleChangeMangerValue(a,l)}})),c.a.createElement(C.a,{className:"px-10",align:"center"},parseFloat(t+n-(90*r+a.last_year_next_90_sales_sold)+parseFloat(D[l])).toFixed(2)))})))),c.a.createElement(_.a,{className:"px-16",rowsPerPageOptions:[5,10,25],component:"div",count:B.length,rowsPerPage:A,page:z,backIconButtonProps:{"aria-label":"Previous Page"},nextIconButtonProps:{"aria-label":"Next Page"},onChangePage:this.handleChangePage,onChangeRowsPerPage:this.setRowsPerPage})))))}}]),l}(i.Component);a.default=z}}]);
//# sourceMappingURL=25.189a39ea.chunk.js.map