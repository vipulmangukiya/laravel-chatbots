// --------Preloader--------------
jQuery(window).on("load", function () {
    $('#preloader').fadeOut(500);
});

// --------header--------------
$(document).ready(function() {
	$('.toggle-btn, .close-menu, .menu-overlay-bg').on('click', function(){
		$('.menu-part').toggleClass('active');
		$('.menu-overlay-bg').toggleClass('active');
	});
});



$(window).on("scroll load" ,function() {    
    var scroll = $(window).scrollTop();
    if (scroll >= 30) {
        $(".header-wrapper").addClass("sticky-header");
        $(".logo-part a img").attr('src', 'assets/images/logo.svg');
    } else {
        $(".header-wrapper").removeClass("sticky-header");
        if($('.header-wrapper').hasClass('home-header')){
            $(".logo-part a img").attr('src', 'assets/images/logo-white.svg');
        }else{
            $(".logo-part a img").attr('src', 'assets/images/logo.svg');
        }
    }
});


// ----select2--------
if($('.customSelect').length){
    $('.customSelect').each(function() {
        var dropdownParents = $(this).parents('.select2Part');
        $(this).select2({
            minimumResultsForSearch: -1,
            dropdownParent: dropdownParents,
        });
    });
}


// ----select2 search--------
if($('.customSelectSearch').length){
    $('.customSelectSearch').each(function() {
        var dropdownParents = $(this).parents('.select2Part');
        $(this).select2({
            dropdownParent: dropdownParents,
        });
    });
}




// --------password-hide-show-----
$('.password-show-icon').on('click', function(){
    if(!$(this).hasClass('active')){
        $(this).addClass('active');
        $(this).find('i').html('visibility_off');
        $(this).parent().find('.input-password').attr('type', 'text');
    }else{
        $(this).removeClass('active');
        $(this).find('i').html('visibility');
        $(this).parent().find('.input-password').attr('type', 'password')
    }
});



// ---login Signup Modal
$(".singupmodallink").click(function(){
    $('#loginmodal').modal('hide');
    setTimeout(function(){
        $('#signupmodal').modal('show');
    },500)
});

$(".loginmodalink").click(function(){
    $('#signupmodal').modal('hide');
    setTimeout(function(){
        $('#loginmodal').modal('show');
    },500)
});




// ------qty-incre-descr
var buttonPlus  = $(".qty-btn-plus");
var buttonMinus = $(".qty-btn-minus");

var incrementPlus = buttonPlus.click(function() {
  var $n = $(this)
  .parent(".qty-container")
  .find(".input-qty");
  $n.val(Number($n.val())+1 );
});

var incrementMinus = buttonMinus.click(function() {
  var $n = $(this)
  .parent(".qty-container")
  .find(".input-qty");
  var amount = Number($n.val());
  if (amount > 1) {
    $n.val(amount-1);
  } 
});






// -----------custom-scrollbar-------------
if ($('.chat-scrollbar').length) {
    $(".chat-scrollbar").mCustomScrollbar({
        theme:"minimal-dark",
        mouseWheelPixels: 300,
    });
    $(".chat-scrollbar").mCustomScrollbar("scrollTo", "bottom");
}




if ($('.mCustomScrollbar').length) {
    $(".mCustomScrollbar").mCustomScrollbar({
        theme:"minimal-dark",
        mouseWheelPixels: 300,
    });
}


// -------chat-toggle-------
$(".chat-back-btn").click(function(){
    $(this).parents(".main-chat-section").toggleClass('active');
});

$(".chat-listbox a").click(function(){
    $(this).parents(".chat-flex-section").find('.main-chat-section').addClass('active');
});






// ------property-step-wizard
// ------------register-steps--------------
$(document).ready(function () {
    $('.nav-tabs > li a[title]').tooltip();
    //Wizard
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var $target = $(e.target);
        if ($target.hasClass('disabled')) {
            return false;
        }
    });

    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
        var $target = $(e.target);
        $target.parent().addClass('active');
    });

    $('a[data-toggle="tab"]').on('hide.bs.tab', function (e) {
        var $target = $(e.target);
        $target.parent().removeClass('active');
    });


    $(".next-step").click(function (e) {
        var $active = $('.wizard .nav-tabs li a.active');
        $active.parent().next().children().removeClass('disabled');
        $active.parent().addClass('done');
        nextTab($active);
    });

    $(".prev-step").click(function (e) {
        var $active = $('.wizard .nav-tabs li a.active');
        prevTab($active);
    });
});

function nextTab(elem) {
    $(elem).parent().next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).parent().prev().find('a[data-toggle="tab"]').click();
}





// ---------video-upload-------------
if ($('#videoinput').length) {
    const input = document.getElementById('videoinput');
    const video = document.getElementById('videoselected');
    const videoSourceid = document.getElementById('videosrc');

    input.addEventListener('change', function() {
      const files = this.files || [];

      if (!files.length) return;
      
      const reader = new FileReader();

      reader.onload = function (e) {
        videoSourceid.setAttribute('src', e.target.result);
        video.load();
        // video.play();
        $("#videoinput").parents(".video-upload-box").find(".bg-video-box").removeClass("d-none");
      };
      
      reader.onprogress = function (e) {
        console.log('progress: ', Math.round((e.loaded * 100) / e.total));
      };
      reader.readAsDataURL(files[0]);
    });


    $(".videoremove").click(function(){
        $("#videoinput").val('');
        $("#videoinput").parents(".video-upload-box").find(".bg-video-box").addClass("d-none");
    });


}