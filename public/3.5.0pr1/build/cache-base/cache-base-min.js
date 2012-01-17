/*
YUI 3.5.0pr1 (build 4342)
Copyright 2011 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("cache-base",function(d){var a=d.Lang,b=d.Lang.isDate,c=function(){c.superclass.constructor.apply(this,arguments);};d.mix(c,{NAME:"cache",ATTRS:{max:{value:0,setter:"_setMax"},size:{readOnly:true,getter:"_getSize"},uniqueKeys:{value:false},expires:{value:0,validator:function(e){return d.Lang.isDate(e)||(d.Lang.isNumber(e)&&e>=0);}},entries:{readOnly:true,getter:"_getEntries"}}});d.extend(c,d.Base,{_entries:null,initializer:function(e){this.publish("add",{defaultFn:this._defAddFn});this.publish("flush",{defaultFn:this._defFlushFn});this._entries=[];},destructor:function(){this._entries=[];},_setMax:function(f){var e=this._entries;if(f>0){if(e){while(e.length>f){e.shift();}}}else{f=0;this._entries=[];}return f;},_getSize:function(){return this._entries.length;},_getEntries:function(){return this._entries;},_defAddFn:function(i){var g=this._entries,f=this.get("max"),h=i.entry;if(this.get("uniqueKeys")&&(this.retrieve(i.entry.request))){g.shift();}while(f&&g.length>=f){g.shift();}g[g.length]=h;},_defFlushFn:function(h){var f=this._entries,g=h.details[0],i;if(g&&a.isValue(g.request)){i=this._position(g.request);if(a.isValue(i)){f.splice(i,1);}}else{this._entries=[];}},_isMatch:function(f,e){if(!e.expires||new Date()<e.expires){return(f===e.request);}return false;},_position:function(h){var e=this._entries,g=e.length,f=g-1;if((this.get("max")===null)||this.get("max")>0){for(;f>=0;f--){if(this._isMatch(h,e[f])){return f;}}}return null;},add:function(g,f){var e=this.get("expires");if(this.get("initialized")&&((this.get("max")===null)||this.get("max")>0)&&(a.isValue(g)||a.isNull(g)||a.isUndefined(g))){this.fire("add",{entry:{request:g,response:f,cached:new Date(),expires:b(e)?e:(e?new Date(new Date().getTime()+this.get("expires")):null)}});}else{}},flush:function(e){this.fire("flush",{request:(a.isValue(e)?e:null)});},retrieve:function(h){var e=this._entries,g=e.length,f=null,i;if((g>0)&&((this.get("max")===null)||(this.get("max")>0))){this.fire("request",{request:h});i=this._position(h);if(a.isValue(i)){f=e[i];this.fire("retrieve",{entry:f});if(i<g-1){e.splice(i,1);e[e.length]=f;}return f;}}return null;}});d.Cache=c;},"3.5.0pr1",{requires:["base"]});