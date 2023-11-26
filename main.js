const stats = document.querySelector('.stats');
const box = document.querySelector('.box');

let canvas = document.getElementById('canvas'),
ctx = canvas.getContext('2d');


function getScreens() {
    return Object.entries(window.localStorage)
      .filter(([key]) => key.startsWith('screen-'))
      .map(([key, value]) => [key, JSON.parse(value)]);
  }
  function getScreenId() {
    const existingScreens = Object.keys(window.localStorage)
      .filter((key) => key.startsWith('screen-'))
      .map((key) => parseInt(key.replace('screen-', '')))
      .sort((a, b) => a - b);
    return existingScreens.at(-1) + 1 || 1;
  }
  const screenId = `screen-${getScreenId()}`;
  
  function setScreenDetails() {
    const windowDetails = {
      screenX: window.screenX,
      screenY: window.screenY,
      screenWidth: window.screen.availWidth,
      screenHeight: window.screen.availHeight,
      width: window.outerWidth,
      height: window.innerHeight,
      updated: Date.now(),
    };
    // box.style.height = windowDetails.height + 'px';
    // box.style.width = windowDetails.width + 'px';

    window.localStorage.setItem(screenId, JSON.stringify(windowDetails));
    // console.log(windowDetails);
  }
  
  function displayStats() {
    if (!stats) return;
    const existingScreens = Object.fromEntries(getScreens());
    stats.innerHTML = JSON.stringify(existingScreens, null, ' ');
  }
  
  function restart() {
    console.log(timers);
    timers.forEach((timer) => window.clearInterval(timer));
    window.localStorage.clear();
    setTimeout(() => window.location.reload(), Math.random() * 1000);
  }
  
  function removeScreen() {
    console.log(`removing screen ${screenId}`);
    localStorage.removeItem(screenId);
  }
  
  function removeOld() {
    const screens = getScreens();
    for (const [key, screen] of screens) {
      if (Date.now() - screen.updated > 1000) {
        localStorage.removeItem(key);
      }
    }
  }
  
  const timers = [];
  function go() {
    timers.push(setInterval(setScreenDetails, 10));
    timers.push(setInterval(displayStats, 10));
    timers.push(setInterval(removeOld, 100));
  }
  
  window.addEventListener('beforeunload', removeScreen);
  
  go();




  let drawing = false
  window.addEventListener("click", (e) => {
    if (!drawing) {
        ctx.beginPath();
        ctx.moveTo(e.x, e.y);
        drawing = true;
    }
    else {
        ctx.lineTo(e.x, e.y);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.stroke();
        drawing = false;
    }
    console.log(drawing);

  })

  function drawLine(ctx, x1, y1, x2,y2, stroke = 'black', width = 3) {
    // start a new path
   

    // place the cursor from the point the line should be started 

    // draw a line from current cursor position to the provided x,y coordinate
    

    // set strokecolor
 
  }
