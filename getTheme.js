const root = document.documentElement;
getTheme();

function getTheme(){
    //Default theme is theme 3
    root.style.setProperty('--base-background-color', localStorage.baseBackgroundColor  || 'linear-gradient(#F2D9CB,#33AAA1)');
    root.style.setProperty('--button-color', localStorage.buttonColor || '#0E535A');
    root.style.setProperty('--button-text-color', localStorage.buttonTextColor || 'white');
    root.style.setProperty('--button-border-color', localStorage.buttonBorderColor || 'none');
    root.style.setProperty('--button-hover-shadow', localStorage.buttonHoverShadow || '0px 0px 10px black inset');
    root.style.setProperty('--large-gameboard-color', localStorage.largeGameboardColor || 'black');
    root.style.setProperty('--small-gameboards-color', localStorage.smallGameboardsColor || 'black');
    root.style.setProperty('--marker-color', localStorage.markerColor || 'black');
    root.style.setProperty('--marker-hover-color', localStorage.markerHoverColor || 'lightgrey');
    root.style.setProperty('--section-win-marker-color', localStorage.sectionWinMarkerColor || '#0E535A');
    root.style.setProperty('--game-info-text-color', localStorage.gameInfoTextColor || '#0E535A');
    root.style.setProperty('--title-color', localStorage.titleColor || 'black');
}