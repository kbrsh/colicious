var color, previousColor;
new Clipboard('.noStyle');



function colorGen() {
  return '#' + Math.random().toString(16).slice(2, 8);
}

function updateColor(c) {
  previousColor = color;
  color = c;
  //$('.ripple').css('background', previousColor);
  $('#color').html(color);
  $('body').css('background', color);
}


$('.notFooter').hide();
document.write(`<div class='centered text-center' id='loading'><?xml version="1.0" ?><svg enable-background="new 0 0 24 24" height="50px" id="Layer_1" version="1.1" viewBox="0 0 24 24" width="50px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g fill="#FFF"><path d="M12,0C6,6,2,8.5,2,14s4.5,10,10,10s10-4.5,10-10S18,6,12,0z M12,22c-4.4,0-8-3.6-8-8s5-8,8-11c3,3,8,6.6,8,11   S16.4,22,12,22z"/><path d="M17,9l-0.7,0.7c1.1,1.1,1.8,2.6,1.8,4.2s-0.7,3.2-1.8,4.2L17,19c1.3-1.3,2-3,2-5S18.2,10.3,17,9z"/></g></svg><h1>Colicious</h1><br><p>Press Space Or Click For A New Color</p><div class='loader'></div></div>`);

$(document).ready(function() {
  setTimeout(function() {
    $('#loading').addClass("animate");
    $("#loading").addClass("fadeOut");
    setTimeout(function() {
      $('#loading').hide();
      $('.notFooter').show();
  }, 500);
}, 1000);


  document.onkeyup = function(e){
      if(e.keyCode == 32){
          updateColor(colorGen());
          $("#back").css("opacity", "1");
      }
      e.preventDefault();
  }

  $("html").on("click", function(e) {
    updateColor(colorGen());
    $("#back").css("opacity", "1");
    e.preventDefault();
  });

  document.getElementById("back").addEventListener("click", function(e) {
    e.stopPropagation();
    updateColor(previousColor);
    $("#back").css("opacity", "0");
    e.preventDefault();
  });



  $('.noStyle').on("click", function(e) {
    e.preventDefault;
  });

  updateColor(colorGen());

});

/* Ripple Effect

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}
var Ripples = function () {
    function Ripples(box) {
        _classCallCheck(this, Ripples);
        this.box = box;
        this.ripples = {};
        this.rippleIndex = 0;
        this.last = 0;
        this.down = false;
        this.appendRipple = this.appendRipple.bind(this);
        this.handleDown = this.handleDown.bind(this);
        this.handleUp = this.handleUp.bind(this);
        this.endIntro = this.endIntro.bind(this);
        this.startOutro = this.startOutro.bind(this);
        this.removeFromDOM = this.removeFromDOM.bind(this);
        box.addEventListener('mousedown', this.handleDown);
        box.addEventListener('mouseup', this.handleUp);
        box.addEventListener('mouseleave', this.handleUp);
    }
    Ripples.prototype.appendRipple = function appendRipple(coordinates, size) {
        ++this.rippleIndex;
        var ripple = document.createElement('div');
        var style = '\n        top: ' + coordinates.y + 'px;\n        left: ' + coordinates.x + 'px;\n        height: ' + size + 'px;\n        width: ' + size + 'px;\n    ';
        ripple.setAttribute('style', style);
        ripple.classList.add('ripple');
        ripple.index = this.rippleIndex;
        ripple.addEventListener('animationend', this.endIntro);
        this.ripples[this.rippleIndex] = {
            element: ripple,
            animating: true
        };
        this.box.appendChild(ripple);
    };
    Ripples.prototype.endIntro = function endIntro(event) {
        this.ripples[event.target.index].animating = false;
        event.target.removeEventListener('animationend', this.endIntro);
    };
    Ripples.prototype.startOutro = function startOutro(event) {
        ++this.last;
        if (event) {
            event.target.removeEventListener('animationend', this.startOutro);
        }
        this.ripples[this.last].element.style.opacity = 0;
        this.ripples[this.last].element.addEventListener('transitionend', this.removeFromDOM);
    };
    Ripples.prototype.removeFromDOM = function removeFromDOM(event) {
        event.target.removeEventListener('transitionend', this.removeFromDOM);
        delete this.ripples[event.target.index];
        event.target.remove();
    };
    Ripples.prototype.handleUp = function handleUp(event) {
        if (!this.down) {
            return;
        }
        this.down = false;
        if (this.ripples[this.rippleIndex].animating) {
            this.ripples[this.rippleIndex].element.addEventListener('animationend', this.startOutro);
        } else {
            this.startOutro();
        }
    };
    Ripples.prototype.handleDown = function handleDown(event) {
        this.down = true;
        var y = event.layerY;
        var x = event.layerX;
        var w = event.target.offsetWidth;
        var h = event.target.offsetHeight;
        var offsetX = Math.abs(w / 2 - x);
        var offsetY = Math.abs(h / 2 - y);
        var deltaX = w / 2 + offsetX;
        var deltaY = h / 2 + offsetY;
        var size = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2) - 2 * deltaX * deltaY * Math.cos(90 / 180 * Math.PI)) * 2;
        this.appendRipple({
            x: x,
            y: y
        }, size);
    };
    return Ripples;
}();
var html = document.querySelector("html")
    var rippleHTML = new Ripples(html);*/
