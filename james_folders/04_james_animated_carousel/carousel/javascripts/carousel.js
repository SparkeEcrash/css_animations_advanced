// $(function() {...}) is short hand for
// $(document).ready(function() {...})

$(function() {
	var prevIndex = 0;
	var currentIndex = 1;
	var nextIndex = 2;
	var lastIndex = $('#quotes-carousel').find('.quote').length - 1;

	$('#quotes-carousel').on('click', '.previous', showQuote);
	$('#quotes-carousel').on('click', '.next', showQuote);
	$('#quotes-carousel-pips').on('click', '.pip', showFromPip);

	generatePips();
	setLeftClass();

	var carouselRunning = true;
	var carouselRestartTimeout;

	var interval = setInterval(function() {
		if(carouselRunning) {
			showNextQuote();
		}
	}, 4000);

	//show next quote on running carousel with intervals
	function showNextQuote() {
		if(currentIndex === lastIndex) {
			currentIndex = 0;
		} else {
			currentIndex++;
		}
		updateState(currentIndex);
	}

	//show quote that was clicked on by the user
	function showQuote(event) {
		if($(event.target).hasClass('quote')) {
			var target = $(event.target);
		} else {
			var target = $(event.target).parent();
		}
		var index = $('.quote').index(target);
		updateState(index);

		//prevent firing of the 4 second interval for auto rotation
		clearTimeout(carouselRestartTimeout);

		//stop the auto rotation
		carouselRunning = false

		//restart auto rotation after 10 seconds
		carouselRestartTimeout = setTimeout(function() {
			carouselRunning = true;
		}, 10000)
	}

	function updateState(index) {
		prevIndex = index === 0 ? lastIndex : index - 1;
		currentIndex = index;
		nextIndex = index === lastIndex ? 0 : index + 1;

		updateCarouselPosition();
		setLeftClass();
		updatePips();
	}

	function updateCarouselPosition() {
		$('#quotes-carousel').find('.previous').removeClass('previous');
		$('#quotes-carousel').find('.current').removeClass('current');
		$('#quotes-carousel').find('.next').removeClass('next');
		var allQuotes = $('#quotes-carousel').find('.quote');
		$(allQuotes[prevIndex]).addClass('previous');
		$(allQuotes[currentIndex]).addClass('current');
		$(allQuotes[nextIndex]).addClass('next');
	}

	function generatePips() {
		var listContainer = $('#quotes-carousel-pips').find('ul');
		for(var i = lastIndex; i >= 0; i--) {
			var newPip = $('<li class="pip"></li>');
			$(listContainer).append(newPip);
		}
		updatePips();
	}

	function updatePips() {
		$('#quotes-carousel-pips').find('.previous').removeClass('previous');
		$('#quotes-carousel-pips').find('.current').removeClass('current');
		$('#quotes-carousel-pips').find('.next').removeClass('next');
		var allPips = $('#quotes-carousel-pips').find('.pip');
		$(allPips[prevIndex]).addClass('previous');
		$(allPips[currentIndex]).addClass('current');
		$(allPips[nextIndex]).addClass('next');
	}

	function showFromPip(event) {
		var index = $('#quotes-carousel-pips li').index(event.target);
		updateState(index);
	}

	function setLeftClass() {
		var allQuotes = $('#quotes-carousel').find('.quote');
		$('.quote.left').removeClass('left');
		if(prevIndex > 0) {
			var index = prevIndex - 1;
			$(allQuotes[index]).addClass('left');
		} else {
			//add 'left' class to the far right last one if starting from first one
			$(allQuotes[lastIndex]).addClass('left');
		}
	}

	// stop auto rotation of carousel is not in view of the browser window
	document.addEventListener('visibilitychange', function() {
		if (document.hidden) {
			carouselRunning = false;
		} else {
			carouselRunning = true;
		}
	})
});

