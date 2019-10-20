// $(function() {...}) is short hand for
// $(document).ready(function() {...})

$(function() {
	$('.option').hover(
		//runs on hover enter
		function() {
			$('.option').removeClass('highlighted');
			$(this).addClass('highlighted');
		},
		//runs on hover out
		function() {
			$(this).removeClass('highlighted');
			setTimeout(function() {
				if(!$('.option.highlighted').length) {
					$('.option.featured').addClass('highlighted');
				}
			}, 500)
		}
	)
});

//jquery works on mobile phones?