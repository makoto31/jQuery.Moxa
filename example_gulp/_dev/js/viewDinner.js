$.moxa.view('dinner', function(aController, aDef, aUtil, aViewObserver){

	// controller -> view observer
	aController.set({
		init: onInit	
		,onDinnerJson: onAddSuccess
	});

	// click events.
	(function(){
		$('#id-header-dinner').on('click', onClickHeader);

		$('#id-dinner').on('click', '> .add', onAdd);
	})();

	function onClickHeader(){

		var el = $(this);
		if(!el.hasClass('disable')){
			return;
		}

		$('#id-breakfast').hide();
		$('#id-header-breakfast').addClass('disable');

		el.removeClass('disable');
		$('#id-dinner').velocity('fadeIn', {
			duration: 700
		});
	}

	function onAdd(){
		var el = $(this);
		el.remove();
		aController.dinnerJson(new Date().getTime());
	}

	function onInit(aData){

		var dinner = $('#id-dinner').hide();
		for(var i = 0; i < aData.length + 1; i++){
			dinner.append(createThum(aData[i]));
		}
	}

	function createThum(aData){

		var ret = $([
			'<div>'
				,'<div>'
					,aData ? '<img src="res/' + aData + '">' : ''
				,'</div>'
				,aData ? '' : '<span>ADD</span>'
			,'</div>'
		].join(''));

		if(aData == null){
			ret.addClass('add');
		}else{
			ret.find('img').get(0).onload = function(){

				var el = $(this);
				var width = this.width;
				var height = this.height;
				var aspect = width / height;

				var parent = el.parent().parent();
				var size = {
					width: parent.width()
					,height: parent.height()
				};

				el.height(size.height);
				var resizeWidth = size.height * aspect;
				el.css('margin-left', -1 *(resizeWidth - size.width) / 2);
			};
		}

		return ret;
	}

	function onAddSuccess(aData){

		var dinner = $('#id-dinner');
		for(var i = 0; i < aData.length; i++){
			var thum = createThum(aData[i]);
			dinner.append(thum);
			thum.velocity('fadeIn', {
				duration: 700
				,display: ''
			});
		}
	}
});
