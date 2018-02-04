$(document).ready( function() {
	window.addEventListener('load', function(){
	    const allimages= document.getElementsByTagName('img');
	    for (let i=0; i<allimages.length; i++) {
	        if (allimages[i].getAttribute('data-src')) {
	        	allimages[i].setAttribute('src', allimages[i].getAttribute('data-src'));
	    	}
	    }
	}, false)

	let people = ['https://source.unsplash.com/200x201', 'https://source.unsplash.com/200x202', 'https://source.unsplash.com/200x203', 'https://source.unsplash.com/200x204', 'https://source.unsplash.com/200x205', 'https://source.unsplash.com/200x206', 'https://source.unsplash.com/200x207']
	// TODO: lazy load these URLs

	$profileNavImgs = $('#profile-nav img')
	$profileImg = $('#profile-img img')

	$('#profile-nav-up').click( function() {
		handleScrollUp()
	})

	$('#profile-nav-down').click(() => {
		handleScrollDown()
	})
	
	$('#profile-nav img').click( function() {
		$this = $(this)
		$active = $('#profile-nav .active')

		// Based on index of image that was clicked, trigger scroll up
		// or scroll down handlers
		if ($this.index() < $active.index())
			handleScrollUp()
		else if ($this.index() > $active.index())
			handleScrollDown()
	})

	function handleScrollUp() {
		// Select last image, unhide it, and move it top of nav
		$('#profile-nav img').last().removeClass('hidden').insertBefore($('#profile-nav img').first())
		updateHiddenAndActive()
	}

	function handleScrollDown() {
		// Select fist image, unhide it, and move it bottom of nav
		$('#profile-nav img').first().removeClass('hidden').insertAfter($('#profile-nav img').last())
		updateHiddenAndActive()
	}

	function updateHiddenAndActive() {
		// Hide images that have gone out of focus
		$('#profile-nav .active').toggleClass('active')
		$('#profile-nav>img:lt(3)').removeClass('hidden')
		$('#profile-nav>img:gt(2)').addClass('hidden')
		$('#profile-nav>img:nth-child(3)').addClass('active')

		// Change active profile image
		$profileImg.attr('src', $('#profile-nav .active').attr('src'))
	}
})