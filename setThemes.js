const root = document.documentElement;
const themeOneButton = document.getElementById('themeOneButton');
const themeTwoButton = document.getElementById('themeTwoButton');
const themeThreeButton = document.getElementById('themeThreeButton');
const themeFourButton = document.getElementById('themeFourButton');
const themeFiveButton = document.getElementById('themeFiveButton');
const themeSixButton = document.getElementById('themeSixButton');
const themeSevenButton = document.getElementById('themeSevenButton');
const themeEightButton = document.getElementById('themeEightButton');
const themeNineButton = document.getElementById('themeNineButton');
const themeTenButton = document.getElementById('themeTenButton');
const themeElevenButton = document.getElementById('themeElevenButton');
const themeTwelveButton = document.getElementById('themeTwelveButton');

getTheme();
themeOneButton.addEventListener('click', setThemeOne);
themeTwoButton.addEventListener('click', setThemeTwo);
themeThreeButton.addEventListener('click', setThemeThree);
themeFourButton.addEventListener('click', setThemeFour);
themeFiveButton.addEventListener('click', setThemeFive);
themeSixButton.addEventListener('click', setThemeSix);
themeSevenButton.addEventListener('click', setThemeSeven);
themeEightButton.addEventListener('click', setThemeEight);
themeNineButton.addEventListener('click', setThemeNine);
themeTenButton.addEventListener('click', setThemeTen);
themeElevenButton.addEventListener('click', setThemeEleven);
themeTwelveButton.addEventListener('click', setThemeTwelve);

function setThemeOne(){
    localStorage.baseBackgroundColor = 'linear-gradient(#FFACA8,#FADFC2)';
    localStorage.buttonColor = '#5E3A56';
    localStorage.buttonTextColor = 'white';
    localStorage.buttonBorderColor = 'none';
    localStorage.buttonHoverShadow = '0px 0px 10px black inset';
    localStorage.largeGameboardColor = 'black';
    localStorage.smallGameboardsColor = 'black';
    localStorage.markerColor = 'black';
    localStorage.markerHoverColor = 'lightgrey';
    localStorage.sectionWinMarkerColor = '#5E3A56';
    localStorage.gameInfoTextColor = '#5E3A56';
    localStorage.titleColor = 'black';
    getTheme();
}

function setThemeTwo(){
    localStorage.baseBackgroundColor = 'linear-gradient(#F4B84D,#7B3C4A)';
    localStorage.buttonColor = '#48151E';
    localStorage.buttonTextColor = 'white';
    localStorage.buttonBorderColor = 'black';
    localStorage.buttonHoverShadow = '0px 0px 10px black inset';
    localStorage.largeGameboardColor = 'black';
    localStorage.smallGameboardsColor = 'black';
    localStorage.markerColor = 'black';
    localStorage.markerHoverColor = 'lightgrey';
    localStorage.sectionWinMarkerColor = '#48151E';
    localStorage.gameInfoTextColor = '#48151E';
    localStorage.titleColor = 'black';
    getTheme();
}

function setThemeThree(){
    localStorage.baseBackgroundColor = 'linear-gradient(#F2D9CB,#33AAA1)';
    localStorage.buttonColor = '#0E535A';
    localStorage.buttonTextColor = 'white';
    localStorage.buttonBorderColor = 'none';
    localStorage.buttonHoverShadow = '0px 0px 10px black inset';
    localStorage.largeGameboardColor = 'black';
    localStorage.smallGameboardsColor = 'black';
    localStorage.markerColor = 'black';
    localStorage.markerHoverColor = 'lightgrey';
    localStorage.sectionWinMarkerColor = '#0E535A';
    localStorage.gameInfoTextColor = '#0E535A';
    localStorage.titleColor = 'black';
    getTheme();
}

function setThemeFour(){
    localStorage.baseBackgroundColor = 'linear-gradient(#479948,#002A48)';
    localStorage.buttonColor = '#002A4A';
    localStorage.buttonTextColor = 'white';
    localStorage.buttonBorderColor = 'none';
    localStorage.buttonHoverShadow = '0px 0px 10px black inset';
    localStorage.largeGameboardColor = 'black';
    localStorage.smallGameboardsColor = 'black';
    localStorage.markerColor = '#2ACF41';
    localStorage.markerHoverColor = 'lightgrey';
    localStorage.sectionWinMarkerColor = '#01579B';
    localStorage.gameInfoTextColor = '#002A4A';
    localStorage.titleColor = 'black';
    getTheme();
}

function setThemeFive(){
    localStorage.baseBackgroundColor = 'radial-gradient(#1FA897,#0D2E35)';
    localStorage.buttonColor = '#42B3E7';
    localStorage.buttonTextColor = '#0D2E35';
    localStorage.buttonBorderColor = 'none';
    localStorage.buttonHoverShadow = '0px 0px 10px black inset';
    localStorage.largeGameboardColor = 'black';
    localStorage.smallGameboardsColor = 'black';
    localStorage.markerColor = 'black';
    localStorage.markerHoverColor = 'grey';
    localStorage.sectionWinMarkerColor = '#42B3E7';
    localStorage.gameInfoTextColor = '#42B3E7';
    localStorage.titleColor = 'black';
    getTheme();
}

function setThemeSix(){
    localStorage.baseBackgroundColor = 'linear-gradient(#243F4D 14%,#292929 14%)';
    localStorage.buttonColor = '#2B7187';
    localStorage.buttonTextColor = '#EAEAEA';
    localStorage.buttonBorderColor = 'none';
    localStorage.buttonHoverShadow = '0px 0px 10px black inset';
    localStorage.largeGameboardColor = 'black';
    localStorage.smallGameboardsColor = 'black';
    localStorage.markerColor = '#8CD3EE';
    localStorage.markerHoverColor = '#4B4B4B';
    localStorage.sectionWinMarkerColor = '#243F4D';
    localStorage.gameInfoTextColor = '#8CD3EE';
    localStorage.titleColor = '#EAEAEA';
    getTheme();
}

function setThemeSeven(){
    localStorage.baseBackgroundColor = 'linear-gradient(#004524 14%,#292929 14%)';
    localStorage.buttonColor = '#008251';
    localStorage.buttonTextColor = 'white';
    localStorage.buttonBorderColor = 'none';
    localStorage.buttonHoverShadow = '0px 0px 10px black inset';
    localStorage.largeGameboardColor = 'black';
    localStorage.smallGameboardsColor = 'black';
    localStorage.markerColor = '#7FBE72';
    localStorage.markerHoverColor = '#4B4B4B';
    localStorage.sectionWinMarkerColor = '#004524';
    localStorage.gameInfoTextColor = '#7FBE72';
    localStorage.titleColor = 'white';
    getTheme();
}

function setThemeEight(){
    localStorage.baseBackgroundColor = 'linear-gradient(#3791B5 14%, #EAEAEA 14%)';
    localStorage.buttonColor = '#333333';
    localStorage.buttonTextColor = 'white';
    localStorage.buttonBorderColor = 'none';
    localStorage.buttonHoverShadow = '0px 0px 10px black inset';
    localStorage.largeGameboardColor = 'black';
    localStorage.smallGameboardsColor = 'black';
    localStorage.markerColor = '#333333';
    localStorage.markerHoverColor = '#4B4B4B';
    localStorage.sectionWinMarkerColor = '#3791B5';
    localStorage.gameInfoTextColor = '#333333';
    localStorage.titleColor = 'black';
    getTheme();
}

function setThemeNine(){
    localStorage.baseBackgroundColor = 'linear-gradient(#00956F 14%, #EAEAEA 14%)';
    localStorage.buttonColor = '#333333';
    localStorage.buttonTextColor = 'white';
    localStorage.buttonBorderColor = 'none';
    localStorage.buttonHoverShadow = '0px 0px 10px black inset';
    localStorage.largeGameboardColor = 'black';
    localStorage.smallGameboardsColor = 'black';
    localStorage.markerColor = '#333333';
    localStorage.markerHoverColor = '#4B4B4B';
    localStorage.sectionWinMarkerColor = '#00956F';
    localStorage.gameInfoTextColor = '#333333';
    localStorage.titleColor = 'black';
    getTheme();
}

function setThemeTen(){
    localStorage.baseBackgroundColor = 'linear-gradient(#B53759 14%, #EAEAEA 14%)';
    localStorage.buttonColor = '#333333';
    localStorage.buttonTextColor = 'white';
    localStorage.buttonBorderColor = 'none';
    localStorage.buttonHoverShadow = '0px 0px 10px black inset';
    localStorage.largeGameboardColor = 'black';
    localStorage.smallGameboardsColor = 'black';
    localStorage.markerColor = '#333333';
    localStorage.markerHoverColor = '#4B4B4B';
    localStorage.sectionWinMarkerColor = '#B53759';
    localStorage.gameInfoTextColor = '#333333';
    localStorage.titleColor = 'black';
    getTheme();
}

function setThemeEleven(){
    localStorage.baseBackgroundColor = '#EAEAEA';
    localStorage.buttonColor = '#EAEAEA';
    localStorage.buttonTextColor = 'black';
    localStorage.buttonBorderColor = 'black';
    localStorage.buttonHoverShadow = '0px 0px 10px black inset';
    localStorage.largeGameboardColor = 'black';
    localStorage.smallGameboardsColor = 'black';
    localStorage.markerColor = 'black';
    localStorage.markerHoverColor = 'lightgrey';
    localStorage.sectionWinMarkerColor = 'darkgrey';
    localStorage.gameInfoTextColor = 'black';
    localStorage.titleColor = 'black';
    getTheme();
}

function setThemeTwelve(){
    localStorage.baseBackgroundColor = '#222';
    localStorage.buttonColor = '#222';
    localStorage.buttonTextColor = '#CCC';
    localStorage.buttonBorderColor = '#CCC';
    localStorage.buttonHoverShadow = '0px 0px 10px #EAEAEA inset';
    localStorage.largeGameboardColor = '#CCC';
    localStorage.smallGameboardsColor = '#CCC';
    localStorage.markerColor = '#CCC';
    localStorage.markerHoverColor = 'darkgrey';
    localStorage.sectionWinMarkerColor = 'grey';
    localStorage.gameInfoTextColor = '#CCC';
    localStorage.titleColor = '#CCC';
    getTheme();
}

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
