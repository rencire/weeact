
function appendRest(el,children) {
    children.forEach( (child) => {
        if (typeof child === `string`) {
            let textNode = document.createTextNode(child);
            el.appendChild(textNode);
        } else if (child instanceof window.Element ) {
            el.appendChild(child);
        }
    });     
}

function setStyles(el, styles) {
    Object.keys(styles).forEach( (propName) => {
        if (propName in el.style) {
            el.style[propName] = styles[propName];
        } else {
            console.warn(`${propName} is not a valid style for element <${el.tagname}>`);
        }

    });
}

function isValidProp(el, prop) {
    return prop in el;
}

function makeElement(type, propsOrTextOrChild, ...restOfChildren) {
    const el = document.createElement(type);

    // 1. props obj
    // 2. text string
    // 3. single element

    if (propsOrTextOrChild instanceof window.Element ) {
        el.appendChild(propsOrTextOrChild);
    } else if (typeof propsOrTextOrChild === `string`) {
        const textNode = document.createTextNode(propsOrTextOrChild);
        el.appendChild(textNode);
    } else if (typeof propsOrTextOrChild === `object`){
        Object.keys(propsOrTextOrChild)
            .filter((prop) => isValidProp(el, prop))
            .forEach( (prop) => {
                const value = propsOrTextOrChild[prop];
                if (prop === `style` ) {
                    setStyles(el, value);
                } else {
                    el[prop] = value;
                }
            });  
    }

    if (restOfChildren) {
        appendRest(el, restOfChildren);
    }

    return el;
}

const h1 = (...args) => makeElement(`h1`, ...args);

const p = (...args) => makeElement(`p`, ...args);
const div = (...args) => makeElement(`div`, ...args);
const span = (...args) => makeElement(`span`, ...args);

const a = (...args) => makeElement(`a`, ...args);


document.body.appendChild(
    div(
        h1(
            {
                className: `title`,
                style: {
                    color: `blue`,
                    backgroundColor: `red`
                }
            },
            `Hey there world`
        ),
        // p(`no props for this element`, { className: `whaat`})
        p({ id: `a`, style: {color: `green`} }, `no props for this element` )
    )
);

