$.moxa.view('breakfast', function(aController, aDef, aUtil, aViewObserver){

	// controller -> view observer
	aController.set({
		init: onInit	
	});

	// click events.
	(function(){

		$('#id-header-breakfast').on('click', onClickHeader);

		$('#id-breakfast').on('click', '> .add', onTest);
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
		for(var i = 0; i < aData.length + 1; i++){
			var thum = $([
				'<div>'
					,aData[i] ? '' : '<span>　</span>'
					,'<div>'
						,aData[i] ? '<img src="res/' + aData[i] + '">' : ''
					,'</div>'
				,aData[i] ? '' : '<span>ERROR TEST</span>'
				,'</div>'
			].join(''));
			breakfast.append(thum);

			if(aData[i] == null){
				thum.addClass('add');
			}else{
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

	function onTest(){

		// view observer set() test.
		console.log('case 1');
		aViewObserver.set($('div'));

		console.log('case 2');
		aViewObserver.set({
			set: function(){}
		});

		console.log('case 3');
		aViewObserver.set({
			foo: 'foo'
		});

		// aController set() text.
		console.log('case 4');
		aController.set($('div'));

		console.log('case 5');
		aController.set({
			set: function(){}
		});

		console.log('case 6');
		aController.set({
			foo: 'foo'
		});

		// controller observer test.
		aController.test();

		// $.moxa.view test.
		console.log('case 10');
		$.moxa.view(null, function(){});

		console.log('case 11');
		$.moxa.view('test', null);

		console.log('finished 11 cases.');
		$('#id-warn').empty().text('check console log.').hide().velocity('fadeIn', {
			duration: 700
		});
	}
});
