// jQuery.Moxa: v.0.6.1
// http://makoto31.github.io/jQuery.Moxa
// Licensed under MIT (https://github.com/makoto31/jQuery.Moxa/blob/master/LICENSE.txt)
(function($){

	var mAjax = {
		get: function(aUrl, aData, aSuccess, aError){

			$.ajax({
				type : 'GET'
				,scriptCharset : 'utf-8'
				,datatype: 'json'
				,cashe: false
				,url: aUrl
				,data: aData
			}).then(aSuccess, aError);
		}
		,post: function(aUrl, aData, aSuccess, aError){

			$.ajax({
				type : 'POST'
				,scriptCharset : 'utf-8'
				,datatype: 'json'
				,cashe: false
				,url: aUrl
				,data: aData
			}).then(aSuccess, aError);
		}
	};
	var mUtil = {
		// 空判定
		isEmpty: function(aData){

			var ret = false;

			if(aData === null){
				ret = true;

			}else if(aData === void 0){
				ret = true;

			}else if(aData === ''){
				ret = true;

			}else if($.isArray(aData)){

				if(aData.length === 0){
					ret = true;
				}

			}else if(aData.length === 0){
				ret = true;
			}

			return ret;
		}

		// 表示中判定
		,isShow: function(aEl){

			var ret = true;

			if(aEl.css('display') == 'none'){
				ret = false;
			}
			return ret;
		}
	};
	var mInit = function(){

		if(mController == null){
			return;
		}

		var viewObserver = {
			set: function(aParam){
				if(!$.isPlainObject(aParam)){
					return;
				}
				var caller = arguments.callee.caller;
				Object.keys(aParam).forEach(function(aKey){
					if(viewObserver[aKey]){
						return;
					}
					if(!$.isFunction(aParam[aKey])){
						return;
					}
					viewObserver[aKey] = function(){
						aParam[aKey].apply(caller, Array.prototype.slice.call(arguments));
					}
				});
			}
		};

		var view2controller = {
			view: {
				set: function(aParam){
					if(!$.isPlainObject(aParam)){
						return;
					}

					// reset.
					var name = arguments.callee.caller.caller.arguments[0];
					mView[name] = {};

					var caller = arguments.callee.caller;
					Object.keys(aParam).forEach(function(aKey){
						if(view2controller.controller[aKey]){
							return;
						}
						if(!$.isFunction(aParam[aKey])){
							return;
						}
						mView[name][aKey] = function(){
							aParam[aKey].apply(caller, Array.prototype.slice.call(arguments));
						}
					});
				}
			}
			,controller: {
				set: function(aParam){
					if(!$.isPlainObject(aParam)){
						return;
					}
					var caller = arguments.callee.caller;
					Object.keys(aParam).forEach(function(aKey){
						if(view2controller.view[aKey]){
							return;
						}
						if(!$.isFunction(aParam[aKey])){
							return;
						}
						view2controller.view[aKey] = function(){
							aParam[aKey].apply(caller, Array.prototype.slice.call(arguments));
						}
					});
				}
			}
		};

		Object.keys(mView).forEach(function(aKey){
			mView[aKey](view2controller.view, mDef, mUtil, viewObserver);
		});

		window.Moxa = mController(mView, view2controller.controller, mDef, mUtil, mAjax);
	}
	var mDef = {};
	var mView = {};
	var mController = null;

	// set ready event.
	if(typeof(Ext) !== 'undefined'){
		Ext.onReady(mInit);
	}else{
		$(document).ready(mInit);
	}

	$.moxa = {
		def: function(aDef){
			$.extend(mDef, aDef);
		}
		,ajax: function(ajax){
			$.extend(mAjax, aAjax);
		}
		,util: function(aUtil){
			$.extend(mUtil, aUtil);
		}
		,view: function(aName, aFn){
			if($.type(aName) != 'string'){
				return;
			}
			if(!$.isFunction(aFn)){
				return;
			}
			mView[aName] = aFn;
		}
		,controller: function(aController){
			mController = aController;
		}
	};

}(jQuery));
