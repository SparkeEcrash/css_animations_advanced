// $(function() {...}) is short hand for
// $(document).ready(function() {...})

$(function() {
	$(window).mouseleave(function(e) {
		var modalSeen = sessionStorage.getItem('modalSeen');
		//if modal was already shown and user closed it out... the modal wont' show again
		if(e.toElement == null && !modalSeen) {
			//adds 'mouse-out' class to '.article-container' element
			document.documentElement.classList.add('mouse-out');
		}
	});

	$('#close-modal').click(function(e) {
		e.preventDefault();
		document.documentElement.classList.remove('mouse-out');
		sessionStorage.setItem('modalSeen', true);
	});


});