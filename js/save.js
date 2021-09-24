const storage = (() => {

    //Bind Events
    events.sub('themeChange', updateTheme)

    function updateTheme(theme) {
        if (storageAvailable('localStorage')) {
            localStorage.setItem('appTheme', JSON.stringify(theme));
        }
    }

    function getLocalStorage(data) {
        if (storageAvailable('localStorage')) {
            if (localStorage.getItem(data)) {
                if (data === 'appTheme') return JSON.parse(localStorage.getItem(data));
                else return localStorage.getItem(data);
            }
        }
    }

    function storageAvailable(type) {
        let storage;
        try {
            storage = window[type];
            let x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return e instanceof DOMException && (
                    // everything except Firefox
                    e.code === 22 ||
                    // Firefox
                    e.code === 1014 ||
                    // test name field too, because code might not be present
                    // everything except Firefox
                    e.name === 'QuotaExceededError' ||
                    // Firefox
                    e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);
        }
    }

    return { getLocalStorage }
})();

const gameParams = (() => {
    const root = document.documentElement;
    let theme = {};
    // let savedGameExist = false;
    // let conquestMode = false;
    // let cellsClassList = [];
    // let boardSectionsClassList = [];
    // let xTurn = true;
    // let playableSection = '';

    //Bind Events
    events.sub('themeChange', setTheme)

    function setTheme(theme = {}) {
        root.style.setProperty("--base-background-color", theme.baseBackgroundColor || "linear-gradient(#F2D9CB,#33AAA1)");
        root.style.setProperty("--button-color", theme.buttonColor || "#0E535A");
        root.style.setProperty("--button-text-color", theme.buttonTextColor || "white");
        root.style.setProperty("--button-border-color", theme.buttonBorderColor || "none");
        root.style.setProperty("--button-hover-shadow", theme.buttonHoverShadow || "0px 0px 10px black inset");
        root.style.setProperty("--large-gameboard-color", theme.largeGameboardColor || "black");
        root.style.setProperty("--small-gameboards-color", theme.smallGameboardsColor || "black");
        root.style.setProperty("--marker-color", theme.markerColor || "black");
        root.style.setProperty("--marker-hover-color", theme.markerHoverColor || "lightgrey");
        root.style.setProperty("--section-win-marker-color", theme.sectionWinMarkerColor || "#0E535A");
        root.style.setProperty("--game-info-text-color", theme.gameInfoTextColor || "#0E535A");
        root.style.setProperty("--title-color", theme.titleColor || "black");
    };

    //Init
    setTheme(storage.getLocalStorage('appTheme'));

})();