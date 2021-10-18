const themes = (() => {
    const themeButtons = document.querySelectorAll(".themes-button-container button");

    //Bind Elements
    for (let i = 0; i < themeButtons.length; i++) {
        themeButtons[i].addEventListener("click", setTheme);
    }

    function setTheme(event) {
        const btnIndex = getButton(event);
        const theme = themeValues(btnIndex);
        events.publish('themeChange', theme);
        events.publish('variableChange', [
            [theme, 'appTheme']
        ]);
    }

    function getButton(event) {
        return Array.from(themeButtons).findIndex(btn => btn === event.target);
    }

    function themeValues(btnIndex = 2) {
        switch (btnIndex) {
            case 0:
                return {
                    baseBackgroundColor: "linear-gradient(#FFACA8,#FADFC2)",
                    buttonColor: "#5E3A56",
                    buttonTextColor: "white",
                    buttonBorderColor: "#5E3A56",
                    buttonHoverShadow: "0px 0px 10px black inset",
                    largeGameboardColor: "black",
                    smallGameboardsColor: "black",
                    markerColor: "black",
                    markerHoverColor: "lightgrey",
                    sectionWinMarkerColor: "#5E3A56",
                    gameInfoTextColor: "#5E3A56",
                    titleColor: "black"
                }
            case 1:
                return {
                    baseBackgroundColor: "linear-gradient(#F4B84D,#7B3C4A)",
                    buttonColor: "#48151E",
                    buttonTextColor: "white",
                    buttonBorderColor: "#48151E",
                    buttonHoverShadow: "0px 0px 10px black inset",
                    largeGameboardColor: "black",
                    smallGameboardsColor: "black",
                    markerColor: "black",
                    markerHoverColor: "lightgrey",
                    sectionWinMarkerColor: "#48151E",
                    gameInfoTextColor: "#48151E",
                    titleColor: "black"
                }
            default:
            case 2:
                return {
                    baseBackgroundColor: "linear-gradient(#F2D9CB,#33AAA1)",
                    buttonColor: "#0E535A",
                    buttonTextColor: "white",
                    buttonBorderColor: "#0E535A",
                    buttonHoverShadow: "0px 0px 10px black inset",
                    largeGameboardColor: "black",
                    smallGameboardsColor: "black",
                    markerColor: "black",
                    markerHoverColor: "lightgrey",
                    sectionWinMarkerColor: "#0E535A",
                    gameInfoTextColor: "#0E535A",
                    titleColor: "black"
                }
            case 3:
                return {
                    baseBackgroundColor: "linear-gradient(#479948,#002A48)",
                    buttonColor: "#002A4A",
                    buttonTextColor: "white",
                    buttonBorderColor: "#002A4A",
                    buttonHoverShadow: "0px 0px 10px black inset",
                    largeGameboardColor: "black",
                    smallGameboardsColor: "black",
                    markerColor: "#2ACF41",
                    markerHoverColor: "lightgrey",
                    sectionWinMarkerColor: "#01579B",
                    gameInfoTextColor: "#002A4A",
                    titleColor: "black"
                }
            case 4:
                return {
                    baseBackgroundColor: "radial-gradient(#1FA897,#0D2E35)",
                    buttonColor: "#42B3E7",
                    buttonTextColor: "#0D2E35",
                    buttonBorderColor: "#42B3E7",
                    buttonHoverShadow: "0px 0px 10px black inset",
                    largeGameboardColor: "black",
                    smallGameboardsColor: "black",
                    markerColor: "black",
                    markerHoverColor: "grey",
                    sectionWinMarkerColor: "#42B3E7",
                    gameInfoTextColor: "#42B3E7",
                    titleColor: "black",
                }
            case 5:
                return {
                    baseBackgroundColor: "linear-gradient(#243F4D 14%,#292929 14%)",
                    buttonColor: "#2B7187",
                    buttonTextColor: "#EAEAEA",
                    buttonBorderColor: "#2B7187",
                    buttonHoverShadow: "0px 0px 10px black inset",
                    largeGameboardColor: "black",
                    smallGameboardsColor: "black",
                    markerColor: "#8CD3EE",
                    markerHoverColor: "#4B4B4B",
                    sectionWinMarkerColor: "#243F4D",
                    gameInfoTextColor: "#8CD3EE",
                    titleColor: "#EAEAEA",
                }

            case 6:
                return {
                    baseBackgroundColor: "linear-gradient(#004524 14%,#292929 14%)",
                    buttonColor: "#008251",
                    buttonTextColor: "white",
                    buttonBorderColor: "#008251",
                    buttonHoverShadow: "0px 0px 10px black inset",
                    largeGameboardColor: "black",
                    smallGameboardsColor: "black",
                    markerColor: "#7FBE72",
                    markerHoverColor: "#4B4B4B",
                    sectionWinMarkerColor: "#004524",
                    gameInfoTextColor: "#7FBE72",
                    titleColor: "white",
                }
            case 7:
                return {
                    baseBackgroundColor: "linear-gradient(#3791B5 14%, #EAEAEA 14%)",
                    buttonColor: "#333333",
                    buttonTextColor: "white",
                    buttonBorderColor: "#333333",
                    buttonHoverShadow: "0px 0px 10px black inset",
                    largeGameboardColor: "black",
                    smallGameboardsColor: "black",
                    markerColor: "#333333",
                    markerHoverColor: "#4B4B4B",
                    sectionWinMarkerColor: "#3791B5",
                    gameInfoTextColor: "#333333",
                    titleColor: "black",
                }

            case 8:
                return {
                    baseBackgroundColor: "linear-gradient(#00956F 14%, #EAEAEA 14%)",
                    buttonColor: "#333333",
                    buttonTextColor: "white",
                    buttonBorderColor: "#333333",
                    buttonHoverShadow: "0px 0px 10px black inset",
                    largeGameboardColor: "black",
                    smallGameboardsColor: "black",
                    markerColor: "#333333",
                    markerHoverColor: "#4B4B4B",
                    sectionWinMarkerColor: "#00956F",
                    gameInfoTextColor: "#333333",
                    titleColor: "black",
                }
            case 9:
                return {
                    baseBackgroundColor: "linear-gradient(#B53759 14%, #EAEAEA 14%)",
                    buttonColor: "#333333",
                    buttonTextColor: "white",
                    buttonBorderColor: "#333333",
                    buttonHoverShadow: "0px 0px 10px black inset",
                    largeGameboardColor: "black",
                    smallGameboardsColor: "black",
                    markerColor: "#333333",
                    markerHoverColor: "#4B4B4B",
                    sectionWinMarkerColor: "#B53759",
                    gameInfoTextColor: "#333333",
                    titleColor: "black",
                }
            case 10:
                return {
                    baseBackgroundColor: "#EAEAEA",
                    buttonColor: "#EAEAEA",
                    buttonTextColor: "black",
                    buttonBorderColor: "black",
                    buttonHoverShadow: "0px 0px 10px black inset",
                    largeGameboardColor: "black",
                    smallGameboardsColor: "black",
                    markerColor: "black",
                    markerHoverColor: "lightgrey",
                    sectionWinMarkerColor: "darkgrey",
                    gameInfoTextColor: "black",
                    titleColor: "black",
                }
            case 11:
                return {
                    baseBackgroundColor: "#222",
                    buttonColor: "#222",
                    buttonTextColor: "#CCC",
                    buttonBorderColor: "#CCC",
                    buttonHoverShadow: "0px 0px 10px #EAEAEA inset",
                    largeGameboardColor: "#CCC",
                    smallGameboardsColor: "#CCC",
                    markerColor: "#CCC",
                    markerHoverColor: "darkgrey",
                    sectionWinMarkerColor: "grey",
                    gameInfoTextColor: "#CCC",
                    titleColor: "#CCC",
                }
        }
    }

})();