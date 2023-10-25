function getRandom(){
  return Math.floor(Math.random() * 256 + 1);
}

export function getRandomColor(){
  return 'rgb(' + getRandom() + ',' + getRandom() + ',' + getRandom() + ')';
}
