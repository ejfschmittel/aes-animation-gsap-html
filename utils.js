

export const stringAsListOfSpans = (s) => {
    const spans = []
    for(let i = 0; i < s.length; i++){
        const span = document.createElement("span")
        span.innerHTML = s[i];
        spans.push(span);
    }
    return spans;
}


export const create4By4 = (values=[]) => {
    const container = document.createElement("div")
    
    
    for(let i = 0; i < 16; i++){
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.innerHTML = values.length >= i && values[i] ? values[i] : getRandomHexVal();
        container.appendChild(cell);
    }

    return container;
}

const getRandomHexVal = (length=2) => {
    let hex = "";
    for(let i = 0; i < length; i++){
        hex += toHex(Math.floor(Math.random() * 16))
    }
    return hex;
}

function toHex(d) {
    return  (Number(d).toString(16)).slice(-2).toUpperCase()
}




export const createSVGRoundedRect = (width, height, cr=50) =>{

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute("width", width )
    svg.setAttribute("height", height )

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')

    const d  = `
    M 0 ${cr} V ${cr} ${height-cr} q 0 ${cr} ${cr} ${cr} 
    L ${width -cr} ${height} q ${cr} 0 ${cr} ${-cr} V ${height-cr} ${cr} 
    q 0 ${-cr} ${-cr} ${-cr} L ${cr} 0 q ${-cr} 0 ${-cr} ${cr}
    `;

    path.setAttribute('d', d)
    path.setAttribute('stroke-width', 5)
    path.setAttribute('stroke', "black")
    path.setAttribute('fill', "none")

    svg.appendChild(path)

    return [svg, path]
}

export const createSubstitutionTable = () => {
    const container = document.createElement("div")
    container.classList.add("s-box")

    const hexLabel = document.createElement("div");
    hexLabel.classList.add("s-box-hex")
    hexLabel.innerHTML = "hex"

    // y legend
    const yContainer = document.createElement("div");
    yContainer.classList.add("s-box-y")
    const yLabel = document.createElement("div")
    yLabel.classList.add("s-box-label")
    yLabel.innerHTML = "y"
    const yLegend = document.createElement("div");
    yLegend.classList.add("s-box-legend")
    for(let i = 0; i < 16; i++){
        const num = document.createElement("div");
        num.classList.add("ynum")
        num.innerHTML = i;
        yLegend.appendChild(num)
    }
    yContainer.appendChild(yLabel)
    yContainer.appendChild(yLegend)

    // x legend
    const xContainer = document.createElement("div")
    xContainer.classList.add("s-box-x")
    const xLabel = document.createElement("div")
    xLabel.classList.add("s-box-label")
    xLabel.innerHTML = "x"
    const xLegend = document.createElement("div");
    xLegend.classList.add("s-box-legend")
    for(let i = 0; i < 16; i++){
        const num = document.createElement("div");
        num.classList.add("xnum")
        num.innerHTML = i;
        xLegend.appendChild(num)
    }
    xContainer.appendChild(xLabel)
    xContainer.appendChild(xLegend)

    // grid

    const sBoxContainer = document.createElement("div")
    sBoxContainer.classList.add("s-box-container")
    for(let i = 0; i < 16; i++){
        for(let j = 0; j < 16; j++){
            const cell = document.createElement("div")
            const hex = getRandomHexVal(2)
            cell.innerHTML = hex
            cell.classList.add("s-box-cell")
            sBoxContainer.appendChild(cell)
        }
    }



    container.appendChild(hexLabel)
    container.appendChild(yContainer)
    container.appendChild(xContainer)
    container.appendChild(sBoxContainer)
    

    return container;
}


export const hexStringToInt = (hex) => {
    return parseInt(hex.replace(/^#/, ''), 16);
}


export const getBounds = (el) => {
    if (typeof el === 'string' || el instanceof String)
        el = document.querySelector(el)

    const rect = el.getBoundingClientRect();
    return {
        x: rect.x + window.scrollX,
        y: rect.y + window.scrollY,
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        width: rect.width,
        height: rect.height,
    };
}

export const getAbsoluteOffset = (el, parent) => {
    const e = getBounds(el)
    const p = getBounds(parent)

    return {
        ...e,
        x: (e.x -p.x),
        y: (e.y - p.y), 
    }
}

export const getRelativeOffset = (element1, element2) => {
    const el1 = getBounds(element1)
    const el2 = getBounds(element2)

    return {
        x: el2.x - el1.x,
        y:el2.y -el1.y,
        el1,
        el2,
    }
}

export const getCenterAboveOffset = (element1, element2, offsetTop=20) => {
    const el1 = getBounds(element1)
    const el2 = getBounds(element2)

    
    return {
        x: el2.x - el1.x + (el2.width/2) - (el1.width/2),
        y:el2.y -el1.y + -el1.height - offsetTop,
        el1,
        el2,
    }
}