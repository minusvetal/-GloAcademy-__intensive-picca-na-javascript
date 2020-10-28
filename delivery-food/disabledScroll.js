window.disableScroll = function(){
  const widthScroll = window.innerWidth - document.body.offsetWidth
  
  
  document.body.dbScrolly = window.scrollY

  document.body.style.cssText = `
  position: fixed;
  top: ${-window.scrolly}px;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  padding-right: ${widthScroll}px;

  `;
}
window.enableScroll = function(){
   document.body.style.cssText = ``;
}
