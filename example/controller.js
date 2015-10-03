$.moxa.controller(function(aViews, aObserver, aDef, aUtil, aAjax){

	// view -> controller observer
	aObserver.set({
		dinnerJson: function(aTime){
			aAjax.get('res/dinner.json?v=' + aTime, null, successDinner);
		}
		,test: function(){

			// aObserver set() text.
			console.log('case 7');
			aObserver.set($('div'));

			console.log('case 8');
			aObserver.set({
				set: function(){}
			});
			console.log('case 9');
			aObserver.set({
				foo: 'foo'
			});
		}
	});

	// data store.
	mData = {
		breakfast: null
		,dinner: null
	}

	// get json.
	aAjax.get('res/init.json', null, successInit);

	function successInit(aData){

		mData.breakfast = aData.breakfast;
		mData.dinner = aData.dinner;

		aViews.breakfast.init(mData.breakfast);
		aViews.dinner.init(mData.dinner);
	}

	function successDinner(aData){

		mData.dinner = mData.dinner.concat(aData.dinner);
		aViews.dinner.onDinnerJson(aData.dinner);
	}

	// global I/F. ex) iframe, ActionScript...etc
	return {
		onParent: function(){
			// do something.
		}
	};
});
