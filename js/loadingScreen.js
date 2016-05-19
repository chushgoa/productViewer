/* LOADING SCREEN */
function loadingScreen(){
    loadingScreen = document.createElement( 'div' );
    loadingScreen.id = "loadingScreen";
    loadingScreen.style.position = 'absolute';
    loadingScreen.style.top = '0px';
    loadingScreen.style.bottom = '0px';
    loadingScreen.style.width = '100%';
    loadingScreen.style.height = '100%';
    loadingScreen.style.textAlign = 'center';
    loadingScreen.style.lineHeight = '100px';
    loadingScreen.style.color = '#000000';
    loadingScreen.style.fontWeight = 'bold';
    loadingScreen.style.backgroundColor = '#FFFFFF';
    loadingScreen.style.zIndex = '2';
    loadingScreen.style.fontFamily = 'Monospace';
    loadingScreen.innerHTML = 'LOADING...';
    document.body.appendChild( loadingScreen );
    console.log("loadingScreen");
}
