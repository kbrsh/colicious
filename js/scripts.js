var color, previousColor;
new Clipboard('.noStyle');

var getURLParameters = function(url) {
    var result = {};
    var searchIndex = url.indexOf("?");

    if (searchIndex == -1 ) return result;
        var sPageURL = url.substring(searchIndex +1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            result[sParameterName[0]] = sParameterName[1];
        }
        return result;
};


function colorGen() {
  return '#' + Math.random().toString(16).slice(2, 8);
}

function updateColor() {
  previousColor = color;
  color = colorGen();
  $('.ripple').css('background', previousColor);
  $('#color').html(color);
  $('body').css('background', color);
}

function previous() {
  $('#color').html(previousColor);
  $('body').css('background', previousColor);
}

$('.notFooter').hide();
document.write("<div class='centered text-center' id='loading'><h1>Colicious</h1><br><p>Press Space OR Click For A New Color</p><div class='loader'></div></div>");

$(document).ready(function() {
  setTimeout(function() {
    $('#loading').addClass("animate");
    $("#loading").addClass("fadeOut");
    setTimeout(function() {
      $('#loading').hide();
      $('.notFooter').show();
  }, 500);
}, 1000);


  document.body.onkeyup = function(e){
      if(e.keyCode == 32){
          updateColor();
      }
  }

  $("#back").on("click", function() {
    previous();
  });

  $("html:not(.noStyle)").on("click", function() {
    updateColor();
  });

  $('.noStyle').on("click", function(e) {
    e.preventDefault;
  });

  updateColor();

});

/* Ripple Effect */

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
    var rippleHTML = new Ripples(html);
