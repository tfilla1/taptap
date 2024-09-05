export const createAnimation = (target: string, color: string) => {
  return {
    targets: '#' + target,
    height: ["75%", "90%", "100%"],
    translateY: [0, 100, 200, 300, 400, 200, 0],
    backgroundColor: [color],
    easing: "easeInOutSine",
    direction: "alternate",
    duration: 1500,
    loop: false,
  }
};

export const createTapTapAnimation = (target: string, color: string) =>
({
  targets: '#' + target,
  height: ["0px", "20px", "40px"],
  width: ['15px', '30px', '50px', '85px'],
  backgroundColor: [color, '#f0a', '#0af', color],
  easing: "easeInOutSine",
  direction: "alternate",
  duration: 1500,
  loop: false,
})

// export const createAnimation = (target: string, color: string) => ({
//   targets: "." + target,
//   height: ["20%", "100%", "50%"],
//   translateY: [0, 100, 200, 300, 400, 200, 0],
//   backgroundColor: [color],
//   easing: "easeInOutSine",
//   direction: "alternate",
//   duration: 1500,
//   loop: false,
// });


// .add({
//   targets: "." + target,
//   backgroundColor: [color, color],
//   translateY: [100, 200, 300, 400, 1200],
//   height: [40, 50, 600, 70, 85, 5000],
//   // translateX: [0, 250, 450, 250, 0],
//   // rotate: [0, 180, 0, 180, 0],
//   // opacity: 1,
//   duration: 3500,
//   // scaleY: [2, 4, 8, 16],
//   // easing: "cubicBezier(.35,.94,.61,.27)",
//   loop: true,
//   // scale: anime.stagger([1, 4, 1, 4, 1], { from: "center" }),
//   delay: anime.stagger(1000, { start: 0 }),
// });
