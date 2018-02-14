$(document).ready(function() {

	let prev_scrollY = 0
	let ticking = false
	const contentHeight = $('#landing-content').offset().top
	const nav = $('nav')
	const navHeight = nav.height()

	window.addEventListener('scroll', function(e) {
		prev_scrollY = window.scrollY
		if (!ticking && prev_scrollY < contentHeight - navHeight - 40) {
			if (nav.hasClass('yellow'))
				nav.removeClass('yellow')

			window.requestAnimationFrame(function() {

				scaleFactor = (1 + scrollY / 30)

				$('#logo-circle').css({
					"transform": "scale("+scaleFactor+")"
				})

				ticking = false
			})

			ticking = true

		} else {
			nav.addClass('yellow')
		}
	})

	window.addEventListener('resize', function(e) {
		navHeight = nav.height()
		contentHeight = $('#landing-content').offset().top
	})
})