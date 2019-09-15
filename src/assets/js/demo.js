$.fn.selectpicker.Constructor.DEFAULTS.iconBase = 'zmdi';
$.fn.selectpicker.Constructor.DEFAULTS.tickIcon = 'zmdi-check';
$(".navbar-toggler").on('click', function () {
  $("html").toggleClass("nav-open");
});
//=============================================================================
$('.form-control').on("focus", function () {
  $(this).parent('.input-group').addClass("input-group-focus");
}).on("blur", function () {
  $(this).parent(".input-group").removeClass("input-group-focus");
});
$(function () {
  $('.example-popover').popover({
    container: 'body',
    html: true
  });
});
$(function () {
  "use strict";
  skinChanger();
  CustomScrollbar();
  initSparkline();
  initCounters();
});
// Sparkline
function initSparkline() {
  $(".sparkline").each(function () {
    var $this = $(this);
    $this.sparkline('html', $this.data());
  });
}
// Counters JS 
function initCounters() {
  $('.count-to').countTo();
}
//Datetimepicker plugin
$(function () {
  $('.datetimepicker').bootstrapMaterialDatePicker({
    format: 'dddd DD MMMM YYYY',
    time: false,
    clearButton: true,
    weekStart: 1
  });
});
//Datetimepicker plugin

$(function () {
  $('.timepicker').bootstrapMaterialDatePicker({
    format: 'HH:mm',
    time: true,
    year: false,
    date: false,
    clearButton: true,
    weekStart: 1
  });
});

//full-calendar
$('#calendar').fullCalendar({
  dayClick: function (date, jsEvent, view) {

    alert('Clicked on: ' + date.format());

    alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);

    alert('Current view: ' + view.name);

    // change the day's background color just for fun
    $(this).css('background-color', 'red');

  }
});
$('#calendarTab').tabs({
  activate: function (event, ui) {
    $('#calendar').fullCalendar('render');
  }
});
//mini-calendar
$('#mini_calendar').datepicker({})



//Skin changer
function skinChanger() {
  $('.right-sidebar .choose-skin li').on('click', function () {
    var $body = $('body');
    var $this = $(this);

    var existTheme = $('.right-sidebar .choose-skin li.active').data('theme');
    $('.right-sidebar .choose-skin li').removeClass('active');
    $body.removeClass('theme-' + existTheme);
    $this.addClass('active');

    $body.addClass('theme-' + $this.data('theme'));
  });
}

// All Custom Scrollbar JS
function CustomScrollbar() {
  $('.sidebar .menu .list').slimscroll({
    height: 'calc(100vh - 60px)',
    color: 'rgba(0,0,0,0.2)',
    position: 'left',
    size: '2px',
    alwaysVisible: false,
    borderRadius: '3px',
    railBorderRadius: '0'
  });

  $('.navbar-left .dropdown-menu .body .menu').slimscroll({
    height: '300px',
    color: 'rgba(0,0,0,0.2)',
    size: '3px',
    alwaysVisible: false,
    borderRadius: '3px',
    railBorderRadius: '0'
  });
  $('.chat-widget').slimscroll({
    height: '300px',
    color: 'rgba(0,0,0,0.4)',
    size: '2px',
    alwaysVisible: false,
    borderRadius: '3px',
    railBorderRadius: '2px'
  });

  $('.right-sidebar .slim_scroll').slimscroll({
    height: 'calc(100vh - 60px)',
    color: 'rgba(0,0,0,0.4)',
    size: '2px',
    alwaysVisible: false,
    borderRadius: '3px',
    railBorderRadius: '0'
  });


}

// Theme Light and Dark  ============
$('.theme-light-dark .t-light').on('click', function () {
  $('body').removeClass('menu_dark');
});

$('.theme-light-dark .t-dark').on('click', function () {
  $('body').addClass('menu_dark');
});

$(".m_img_btn").on('click', function () {
  $("body").toggleClass("menu_img");
});

//========
$(".ls-toggle-btn").on('click', function () {
  if ($("body").hasClass("ls-toggle-menu")) {
    $("body").removeClass("ls-toggle-menu");
  } else {
    $("body").addClass("ls-toggle-menu");
  }
});

//Chat widget js ====
$(function () {
  $('.chat-launcher').on('click', function () {
    $('.chat-launcher').toggleClass('active');
    $('.chat-wrapper').toggleClass('is-open pullUp');
  });
});
//=========
$('.form-control').on("focus", function () {
  $(this).parent('.input-group').addClass("input-group-focus");
}).on("blur", function () {
  $(this).parent(".input-group").removeClass("input-group-focus");
});
