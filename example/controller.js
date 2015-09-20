$.moxa.controller(function(aViews, aObserver, aDef, aUtil, aAjax){

	// view -> controller observer
	aObserver.set({
		dinnerJson: function(aTime){
			aAjax.get('res/dinner.json?v=' + aTime, null, successDinner);
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
