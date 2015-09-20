$.moxa.view('breakfast', function(aController, aDef, aUtil, aViewObserver){

	// controller -> view observer
	aController.set({
		init: onInit	
	});

	// click events.
	(function(){

		$('#id-header-breakfast').on('click', onClickHeader);
	})();

	function onClickHeader(){

		var el = $(this);
		if(!el.hasClass('disable')){
			return;
		}

		$('#id-header-dinner').addClass('disable');
		$('#id-dinner').hide();

		el.removeClass('disable');
		$('#id-breakfast').velocity('fadeIn', {
			duration: 700
		});
	}

	function onInit(aData){

		var breakfast = $('#id-breakfast').hide();
		for(var i = 0; i < aData.length; i++){
			var thum = $([
				'<div>'
					,'<div>'
						,'<img src="res/' + aData[i] + '">'
					,'</div>'
				,'</div>'
			].join(''));
			breakfast.append(thum);

			thum.find('img').get(0).onload = function(){

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

		$('#id-header').velocity('fadeIn', {
			duration: 700
			,complete: function(){
				breakfast.velocity('fadeIn', {
					duration: 1000
				});
			}
		});
	}
});
