
// Write your JavaScript code.

function toUppercase(value){
    $(value).val($(value).val().toUpperCase().trim())
}

function closeDiv(value){
    $(value).parent('.alert-warning').hide(100);
}

/*
* Slider Home
* */
$(document).ready(function(){
    $('.home_slider').slick({
        dots: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true
    });
});

/*
* Apply Online 
* */

function showHiddenInput(inputGroup){
    let value = inputGroup.dataset.value;
    let isChecked = $(inputGroup).is(":checked");

    // for check input
    let inputOther = $(inputGroup).parent(".form-check-label").parent(".form-check").next(".other_option");

    // for radio input
    if ($(inputGroup).attr("type") === "radio"){
        inputOther = $(inputGroup).parent(".form-check-label").parent(".form-check").siblings(".other_option");
    }

    if (value.toLowerCase() === "other" && isChecked){
        inputOther.show();
    } else {
        inputOther.hide();
    }
}

function showHiddenSelect(value){
    if (value.value === "Other"){
        $("#HowDidYouHearOther").show()
    } else {
        $("#HowDidYouHearOther").hide()
    }
}

/*
* Contact Form
* */

function contactUs(){
    let form = $("#contactForm");
    if (form.valid()){
        let response = grecaptcha.getResponse();
        if(response.length === 0){
            $(".captcha-error").text("This field is required");
        } else {
            cleanContactErrors();
            $(".button_send").attr('disabled', 'disabled');
            form.submit();
        }
    }
}

function senRequestStaff(){
    let form = $("#requestStaff");
    if (form.valid()){
        let response = grecaptcha.getResponse();
        if(response.length === 0){
            $(".captcha-error").text("This field is required");
        } else {
            $(".captcha-error").text("");
            $(".text-danger").text("");
            $(".button_send").attr('disabled', 'disabled');
            form.submit();
        }
    }
}


function cleanContactErrors(){
    $(".captcha-error").text("");
    $(".text-danger").text("");
}


/*
* Jobs
* */

(function($){
    let isMobile = window.innerWidth <= 767;
    if (!isMobile) {
        $(".job_container:nth-of-type(1)").addClass("active");
    }
})(jQuery);


/*
* Tabs industries
* */

$(".tabs li").click(function() {
    let current = $(".tabs li.active");
    let currentId = $(current).attr("id");
    $(current).removeClass("active");
    let current_container = $(".container-industry." + currentId + "");
    $(current_container).hide(500);

    $(this).addClass("active");
    let tabId = $(this).attr("id");
    let new_container = $(".container-industry." + tabId + "");
    $(new_container).show(500);
});

/*
* Testimonials
* */


$(document).ready(function(){
    $('.testimonials_slider').slick({
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true
    });
});

/*
* Anchor on industries
* */

$(window).scroll(function(){
    if ($('#bannerAnchor').offset()){
        let container = $('#bannerAnchor').offset().top;
        let banner = $('#bannerSigook').outerHeight();
        let height = $(window).height();


        let point = (container + banner) - height;
        if ($(window).scrollTop() >= point){
            console.log("scrolll");
            $('#bannerSigook').addClass("static");
        } else {
            $('#bannerSigook').removeClass("static");
        }
    }
});

/*
* Custom validation phone
* */
$.validator.addMethod('phonenumberca', function (value, element, params) {
    try {
        let phoneNumber = value;
        let regionCode = "CA";
        let phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
        const number = phoneUtil.parseAndKeepRawInput(phoneNumber, regionCode);
        return phoneUtil.isValidNumberForRegion(number, regionCode);    
    }catch (e) {
        return false;
    }
});

$.validator.unobtrusive.adapters.addBool("phonenumberca");

$(function () {
    jQuery.validator.unobtrusive.adapters.add('filesizevalidator', ['maxbytes'], function (options) {
        options.rules['filesizevalidator'] = {maxbytes: options.params.maxbytes};
        if (options.message) {
            options.messages['filesizevalidator'] = options.message;
        }
    });

    jQuery.validator.addMethod("filesizevalidator", function (value, element, param) {
        if (value === "") {return true;}
        let maxBytes = parseInt(param.maxbytes);
        if (element.files && element.files[0] && element.files[0].size){
            let filesize = element.files[0].size;
            return filesize <= maxBytes;
        }
        return true;
    });
}(jQuery));

$.validator.unobtrusive.adapters.addSingleVal("accept", "accept");