// Initial Variables
var colors = [];
var undos = 8; // for people whose hands are much faster than their brains ;)
var clipboard = new Clipboard('.noStyle');
window.onunload = changeTitle;
window.onblur = changeTitle;
window.onfocus = function() {
  document.title = 'Colicious';
}

function changeTitle() {
  if(document.title === 'We Miss You - Colicious') {
    document.title = 'Colicious';
  } else {
    document.title = 'We Miss You - Colicious';
  }
}


// Generate HEX Color
function colorGen() {
  return '#' + Math.random().toString(16).slice(2, 8);
}

// Update Color Function
function updateColor(c) {
  if(c == 'undo'){
    colors.pop();
    if(colors.length == 0) {
      colors.push(colorGen())
    }
  } else {
    if(colors.length > undos) {
      colors.shift();
    }
    colors.push(c);
  }
  //$('.ripple').css('background', previousColor);
  $('#color').html(colors[colors.length - 1]);

/* 
  To update the text in the 
  additional placeholder as well for clipboard to work 
*/
  $('#color-clipboard').html(colors[colors.length - 1]);

  $('body').css('background', colors[colors.length - 1]);
  $('#undos').html(colors.length - 1);
  $('#undos').css('color', colors[colors.length - 1]);
}

// Add Loading
$('.notFooter').hide();
document.write(`<div class='centered text-center' id='loading'><img src="./img/logo.png" class="logo-img"/><h1>Colicious</h1><br><p>Press Space Or Click For A New Color</p><div class='loader' /></div>`);

// Initialize copyMessage
$('#copyMessage').css('display', 'none');
$('#copyMessage').css('opacity', '1');

// Document Ready
$(document).ready(function() {

  // Remove Loading
  setTimeout(function() {
    $('#loading').addClass('animate');
    $('#loading').addClass('fadeOut');
    setTimeout(function() {
      $('#loading').hide();
      $('.notFooter').show();
    }, 500);
  }, 1500);

  // KeyListener for space
  document.addEventListener('keyup',function(e){
      if(e.keyCode === 32){
        updateColor(colorGen());
        $('#back').css('opacity', '1');
        $('#back').removeClass('notBack');
      } else if (e.keyCode === 39) {
        updateColor(colorGen());
        $('#back').css('opacity', '1');
        $('#back').removeClass('notBack');
      }
      e.preventDefault();
  });

  // Listener for click
  $('html').on('click', function(e) {
    if(e.target.id === 'githubLink') {
      window.open('https://github.com/KingPixil/colicious');
      e.preventDefault();
      e.stopPropagation();
    } else if (e.target.id === 'color' || e.target.id === 'colorButton') {
      e.preventDefault();
      e.stopPropagation();
    } else {
      updateColor(colorGen());
      $('#back').css('opacity', '1');
      $('#back').removeClass('notBack');
      e.preventDefault();
    }
  });

  $('#linkP').click(function(e) {
    e.stopPropagation();
  });

  // EventListener for the back button
  document.getElementById('back').addEventListener('click', function(e) {
    updateColor('undo');
    $('#back').css('opacity', '0');
    $('#back').addClass('notBack');
    e.stopPropagation();
    e.preventDefault();
  });

  document.addEventListener('keyup',function(e){
      if(e.keyCode === 8 || e.keyCode === 37){
          updateColor('undo');
          $('#back').css('opacity', '0');
          $('#back').addClass('notBack');
          e.stopPropagation();
      }
      e.preventDefault();
  });

  // Copy handling / action
  clipboard.on('success', function(e) {
    $('.notFooter').hide();
    $('#copyMessage').css('display', '');
    $('#copyMessage').addClass('fadeIn');

    setTimeout(function() {
      $('#copyMessage').removeClass('fadeIn');
      $('#copyMessage').addClass('fadeOut');
      $('#copyMessage').css('display', 'none')
      $('.notFooter').show();
    }, 1000);

    e.clearSelection();
    e.stopPropagation();
  });

  // Initial color
  updateColor(colorGen());

});
