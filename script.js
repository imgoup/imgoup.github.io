
    var slider = document.querySelector(".slider");
    var trail = document.querySelector(".trail").querySelectorAll("div");
    var value = 0;
    var trailValue = 0;
    var interval = 4000;
    var slide = function(condition) {
      clearInterval(start);
      condition === "increase" ? initiateINC() : initiateDEC();
      move(value, trailValue);
      animate();
      start = setInterval(function() {
        return slide("increase");
      }, interval);
    };
    var initiateINC = function() {
      trail.forEach(function(cur) {
        return cur.classList.remove("active");
      });
      value === 80 ? value = 0 : value += 20;
      trailUpdate();
    };
    var initiateDEC = function() {
      trail.forEach(function(cur) {
        return cur.classList.remove("active");
      });
      value === 0 ? value = 80 : value -= 20;
      trailUpdate();
    };
    var move = function(S, T) {
      slider.style.transform = ("translateX(-" + S + "%)");
      trail[T].classList.add("active");
    };
    var tl = gsap.timeline({defaults: {
        duration: 0.6,
        ease: "power2.inOut"
      }});
    tl.from(".bg", {
      x: "-100%",
      opacity: 0
    }).from("p", {opacity: 0}, "-=0.3").from("h1", {
      opacity: 0,
      y: "30px"
    }, "-=0.3").from("button", {
      opacity: 0,
      y: "-40px"
    }, "-=0.8");
    var animate = function() {
      return tl.restart();
    };
    var trailUpdate = function() {
      if (value === 0) {
        trailValue = 0;
      } else if (value === 20) {
        trailValue = 1;
      } else if (value === 40) {
        trailValue = 2;
      } else if (value === 60) {
        trailValue = 3;
      } else {
        trailValue = 4;
      }
    };
    var start = setInterval(function() {
      return slide("increase");
    }, interval);
    document.querySelectorAll("svg").forEach(function(cur) {
      cur.addEventListener("click", function() {
        return cur.classList.contains("next") ? slide("increase") : slide("decrease");
      });
    });
    var clickCheck = function(e) {
      clearInterval(start);
      trail.forEach(function(cur) {
        return cur.classList.remove("active");
      });
      var check = e.target;
      check.classList.add("active");
      if (check.classList.contains("box1")) {
        value = 0;
      } else if (check.classList.contains("box2")) {
        value = 20;
      } else if (check.classList.contains("box3")) {
        value = 40;
      } else if (check.classList.contains("box4")) {
        value = 60;
      } else {
        value = 80;
      }
      trailUpdate();
      move(value, trailValue);
      animate();
      start = setInterval(function() {
        return slide("increase");
      }, interval);
    };
    trail.forEach(function(cur) {
      return cur.addEventListener("click", function(ev) {
        return clickCheck(ev);
      });
    });
    var touchSlide = (function() {
      var start,
          move,
          change,
          sliderWidth;
      slider.addEventListener("touchstart", function(e) {
        start = e.touches[0].clientX;
        sliderWidth = slider.clientWidth / trail.length;
      });
      slider.addEventListener("touchmove", function(e) {
        e.preventDefault();
        move = e.touches[0].clientX;
        change = start - move;
      });
      var mobile = function(e) {
        var $__2,
            $__3,
            $__4;
        change > (sliderWidth / 4) ? slide("increase") : null;
        (change * -1) > (sliderWidth / 4) ? slide("decrease") : null;
        ($__2 = [0, 0, 0, 0], start = ($__3 = $__2[Symbol.iterator](), ($__4 = $__3.next()).done ? void 0 : $__4.value), move = ($__4 = $__3.next()).done ? void 0 : $__4.value, change = ($__4 = $__3.next()).done ? void 0 : $__4.value, sliderWidth = ($__4 = $__3.next()).done ? void 0 : $__4.value, $__2);
      };
      slider.addEventListener("touchend", mobile);
    })()
 
