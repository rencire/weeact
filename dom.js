// TODO write tests

function appendRest(childrenNodes) {
// TODO
}

function isValidProp(el, prop) {
    
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
            .filter((prop) => isValidProp(el, prop));
            .forEach( (prop) => {
                const value = propsOrTextOrChild[prop];
                if (prop === `style` ) {
                    setStyles(el, value)
                } else {
                    el[prop] = value
                }

            })  
    }

    if (restOfChildren) {
        appendRest(el, restOfChildren);
    }


    el.appendChild(textNode);

    return el;
}

const h1 = (...args) => makeElement(`h1`, ...args);

const p = (...args) => makeElement(`p`, ...args);
const div = (...args) => makeElement(`div`, ...args);
const span = (...args) => makeElement(`span`, ...args);

const a = (...args) => makeElement(`a`, ...args);


document.body.appendChild(
    h1(
        {className: `title`},
        `Hey there world`
    )

);

