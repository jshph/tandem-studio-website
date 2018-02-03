let prev_scrollY = 0;
let ticking = false;
const contentHeight = $('#content').scrollTop();
const navHeight = $('nav').height();
const nav = $('nav');

$(document).ready(function() {

	window.addEventListener('scroll', function(e) {
		prev_scrollY = window.scrollY;
		if (!ticking && prev_scrollY < contentHeight - navHeight) {
			if (nav.hasClass('yellow'))
				nav.removeClass('yellow');

			window.requestAnimationFrame(function() {

				scaleFactor = (1 + scrollY / 30);

				$('#logo-circle').css({
					"transform": "scale("+scaleFactor+")"
				});

				ticking = false;
			});

			ticking = true;

		} else {
			nav.addClass('yellow');
		}
	});

	let people = ['https://source.unsplash.com/200x201', 'https://source.unsplash.com/200x202', 'https://source.unsplash.com/200x203', 'https://source.unsplash.com/200x204', 'https://source.unsplash.com/200x205', 'https://source.unsplash.com/200x206', 'https://source.unsplash.com/200x207']
	// TODO: lazy load these URLs

	$profileNavImgs = $('#profile-nav img')
	$profileImg = $('#profile-img img')
	
	$('#profile-nav-up').click(() => {
		people.push(people.shift()) // remove first item in array and push it to end 

		$profileImg.attr('src', people[1])
		$profileNavImgs.each( function(i) {
			$(this).attr('src', people[i])
		})
	})

	$('#profile-nav-down').click(() => {
		people.unshift(people.pop()) // pop off last item in array and push to front

		$profileImg.attr('src', people[1])
		$profileNavImgs.each( function(i) {
			$(this).attr('src', people[i])
		})
	})

	$profileNavImgs.click( function() {
		$(this).toggleClass('active')
	})
});