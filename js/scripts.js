// Initial Variables
var colors = [];
var undos = 8; // for people whose hands are much faster than their brains ;)
var clipboard = new Clipboard('.noStyle');
var konamiActivated = false;
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

// Suprise K
var pressedK = [];
var konamiCode = '38,38,40,40,37,39,37,39,66,65';
window.addEventListener('keydown', function(k) {
  pressedK.push(k.keyCode);
  if (pressedK.toString().indexOf(konamiCode) >= 0) {
    surpriseK();
    pressedK = [];
  }
}, true);

// supriseK Function
var surpriseK = function() {
  alert('Try Editing the Text, reload to reset :)');
  konamiActivated = true;
  document.getElementsByTagName('HTML')[0].setAttribute('contenteditable', 'true');
  //(function() {var ds = document.getElementsByTagName('div');var d = ds[Math.round(Math.random()*ds.length)];function transform(r) {d.style.transform=d.style['WebkitTransform']=d.style['MozTransform']='scale(' + r + ')';setTimeout(function() {transform(++r % 10);}, 100);}transform(1);})();
  //(function() {var ds = document.getElementsByTagName('div');var d = ds[Math.round(Math.random()*ds.length)];function transform(r) {d.style.transform=d.style['WebkitTransform']=d.style['MozTransform']='rotate(' + r + 'deg)';setTimeout(function() {transform(++r % 360);}, 100);}transform(1);})()
  (function(){var elems=document.getElementsByTagName('*');for(var i = 0; i<elems.length;i++){elems[i].style.fontFamily='Comic Sans MS';}})();
};

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
  $('body').css('background', colors[colors.length - 1]);
  $('#undos').html(colors.length - 1);
  $('#undos').css('color', colors[colors.length - 1]);
}

// Add Loading
$('.notFooter').hide();
document.write(`<div class='centered text-center' id='loading'><?xml version='1.0' ?><svg enable-background='new 0 0 24 24' height='50px' id='Layer_1' version='1.1' viewBox='0 0 24 24' width='50px' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g fill='#FFF'><path d='M12,0C6,6,2,8.5,2,14s4.5,10,10,10s10-4.5,10-10S18,6,12,0z M12,22c-4.4,0-8-3.6-8-8s5-8,8-11c3,3,8,6.6,8,11   S16.4,22,12,22z'/><path d='M17,9l-0.7,0.7c1.1,1.1,1.8,2.6,1.8,4.2s-0.7,3.2-1.8,4.2L17,19c1.3-1.3,2-3,2-5S18.2,10.3,17,9z'/></g></svg><h1>Colicious</h1><br><p>Press Space Or Click For A New Color</p><div class='loader' /></div>`);

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
      if(!konamiActivated && e.keyCode === 32){
        updateColor(colorGen());
        $('#back').css('opacity', '1');
        $('#back').removeClass('notBack');
      } else if (!konamiActivated && e.keyCode === 39) {
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
