"use strict";

var slider = document.querySelector(".slider");
var trail = document.querySelector(".trail").querySelectorAll("div");

// All trails 

// Transform value
var value = 0;
// trail index number
var trailValue = 0;
// interval (Duration)
var interval = 4000;

// Function to slide forward
var slide = function slide(condition) {
  // CLear interval
  clearInterval(start);
  // update value and trailValue
  condition === "increase" ? initiateINC() : initiateDEC();
  // move slide
  move(value, trailValue);
  // Restart Animation
  animate();
  // start interal for slides back 
  start = setInterval(function () {
    return slide("increase");
  }, interval);
};

// function for increase(forward, next) configuration
var initiateINC = function initiateINC() {
  // Remove active from all trails
  for (var i = 0; i < trail.length; i++) {
    trail[i].classList.remove("active");
   }
  // increase transform value
  value === 80 ? value = 0 : value += 20;
  // update trailValue based on value
  trailUpdate();
};

// function for decrease(backward, previous) configuration
var initiateDEC = function initiateDEC() {
  // Remove active from all trails
  for (var i = 0; i < trail.length; i++) {
    trail[i].classList.remove("active");
   }
  // decrease transform value
  value === 0 ? value = 80 : value -= 20;
  // update trailValue based on value
  trailUpdate();
};

// function to transform slide 
var move = function move(S, T) {
  // transform slider
  slider.style.transform = "translateX(-".concat(S, "%)");
  //add active class to the current trail
  trail[T].classList.add("active");
};
var tl = gsap.timeline({
  defaults: {
    duration: 0.6,
    ease: "power2.inOut"
  }
});
tl.from(".bg", {
  x: "-100%",
  opacity: 0
}).from("p", {
  opacity: 0
}, "-=0.3").from("h1", {
  opacity: 0,
  y: "30px"
}, "-=0.3").from("button", {
  opacity: 0,
  y: "-40px"
}, "-=0.8");

// function to restart animation
var animate = function animate() {
  return tl.restart();
};

// function to update trailValue based on slide value
var trailUpdate = function trailUpdate() {
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

// Start interval for slides
var start = setInterval(function () {
  return slide("increase");
}, interval);

// Next  and  Previous button function (SVG icon with different classes)
var svgList = document.querySelectorAll("svg")

for (var i = 0; i < svgList.length; i++) {
    var cur = svgList[i]
    cur.addEventListener("click", function () {
        return cur.classList.contains("next") ? slide("increase") : slide("decrease");
      });
}

// function to slide when trail is clicked
var clickCheck = function clickCheck(e) {
  // CLear interval
  clearInterval(start);
  // remove active class from all trails
for (var i = 0; i < trail.length; i++) {
 trail[i].classList.remove("active");
};
  // Get selected trail
  var check = e.target;
  // add active class
  check.classList.add("active");

  // Update slide value based on the selected trail
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
  // update trail based on value
  trailUpdate();
  // transfrom slide
  move(value, trailValue);
  // start animation
  animate();
  // start interval
  start = setInterval(function () {
    return slide("increase");
  }, interval);
};

// Add function to all trails
for (var i = 0; i < trail.length; i++) {
    var cur = trail[i]
    cur.addEventListener("click", function (ev) {
        return clickCheck(ev);
      });
}

// Mobile touch Slide Section
var touchSlide = function () {
  var start;
  var move;
  var change;
  var sliderWidth;
  // Do this on initial touch on screen
  slider.addEventListener("touchstart", function (e) {
    // get the touche position of X on the screen
    start = e.touches[0].clientX;
    // (each slide with) the width of the slider container divided by the number of slides
    sliderWidth = slider.clientWidth / trail.length;
  });

  // Do this on touchDrag on screen
  slider.addEventListener("touchmove", function (e) {
    // prevent default function
    e.preventDefault();
    // get the touche position of X on the screen when dragging stops
    move = e.touches[0].clientX;
    // Subtract initial position from end position and save to change variabla
    change = start - move;
  });
  var mobile = function mobile(e) {
    // if change is greater than a quarter of sliderWidth, next else Do NOTHING
    change > sliderWidth / 4 ? slide("increase") : null;
    // if change * -1 is greater than a quarter of sliderWidth, prev else Do NOTHING
    change * -1 > sliderWidth / 4 ? slide("decrease") : null;
    // reset all variable to 0
    start = 0;
    move = 0;
    change = 0;
    sliderWidth = 0;
  };
  // call mobile on touch end
  slider.addEventListener("touchend", mobile);
}();
