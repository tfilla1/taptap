export const createAnimation = (target: string, color: string, type: "class" | "id" = "class") => {
  console.log({ target })
  const delimiter = type === "class" ? "." : "#"

  return {
    targets: delimiter + target,
    height: ["20%", "100%", "50%"],
    translateY: [0, 100, 200, 300, 400, 200, 0],
    backgroundColor: [color],
    easing: "easeInOutSine",
    direction: "alternate",
    duration: 1500,
    loop: false,
  }
};

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
