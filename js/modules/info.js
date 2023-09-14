export function infotext() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const coordinatesInfo = document.querySelector('.coordinatesinfo p');
    coordinatesInfo.textContent = ` Game canvas size: x: ${width} y: ${height}`;

}