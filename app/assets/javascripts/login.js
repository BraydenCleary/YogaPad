var loginStatus = {
	element: null,

	init: function(element){
		this.element = $(element);
		this.reset();
	},

	reset: function(){
		this.element.children().hide();
	},

	showSuccessfulSignout: function(){
		this.reset();
		this.element.find('.successful-signout').show().fadeOut(1500);
	},

	showSuccessfulSignin: function(){
		this.reset();
		this.element.find('.successful-signin').show().fadeOut(1500);
	},
}

var login = {
	element: null,

	init: function(element, current_user){
		this.element = $(element);
		this.display(current_user);
	},

	reset: function(){
		this.element.children().hide();
	},

	userSignedIn: function(){
		this.reset();
		this.element.find('.signed-in').show();
	},

	userSignedOut: function(){
		this.reset();
		this.element.find('.sign-actions').show();
	},

	display: function(current_user){
		if ($(current_user).text().trim() == 'true'){
			this.userSignedOut();
		} else {
			this.userSignedIn();
		}
	}
}

$(document).ready(function(){
	loginStatus.init($('.notices'));
	login.init($('.sign-status'), $('.current-user'));

	$('#signup-toggle').on('click', function(){
		$('#signup-form').slideToggle();
	});

	$('#signup-trigger').on('click', function(){
		$('#signup-form').slideToggle();
	});

	$('#signin-toggle').on('click', function(){
		$('#signin-form').slideToggle();
	})

	$('.sign-out').on('click', function(e){
		e.stopPropagation();
		e.preventDefault();
		$.ajax({
			url: $(e.target).attr('href'),
			type: 'GET',
			success: function(response){
				loginStatus.showSuccessfulSignout();
				login.userSignedOut();
			}
		});
	})

	$('.new_user').on('submit', function(e){
		e.stopPropagation();
		e.preventDefault();
		$.ajax({
			url: $(this).attr('action'),
			type: $(this).attr('method'),
			data: $(this).serialize(),
			success: function(response){
				login.userSignedIn();
				loginStatus.showSuccessfulSignin();
				$('.new_user').find('.field').find('input').each(function(){ $(this).val('') }) //clear form inputs
			}
		})
	});

	$('.new_session').on('submit', function(e){
		e.stopPropagation();
		e.preventDefault();
		$.ajax({
			url: $(this).attr('action'),
			type: $(this).attr('method'),
			data: $(this).serialize(),
			success: function(response){
				login.userSignedIn();
				loginStatus.showSuccessfulSignin();
				$('.user').each(function(){
					$(this).text(response.username)
				});
			}
		});
	});




});
