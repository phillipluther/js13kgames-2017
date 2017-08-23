/**
 * A class for creating DOM elements with a unified API for managing class
 * names, attributes, and other goodies. This class is for creating raw elements
 * with the appropriate manipulation methods. the .mk() utility provides a
 * convenience wrapper around element creation and provides a less-granular API.
 *
 */
class El {
    constructor(nodeName) {
        if (!nodeName) {
            console.warn(
                'Can not instantiate new El() with a nodeName;',
                nodeName
            );
            return null;
        }

        this.el = document.createElement(nodeName);
    }

    // a method for interacting with our element's className object to add (+),
    // remove (-), or toggle (~) classes
    classify(classOperators) {
        if (!classOperators) {
            return;
        }

        classOperators.split(' ').map((classNameOp) => {
            let op = classNameOp.charAt(0);
            let className = classNameOp.substr(1, classNameOp.length);

            if (op === '-') {
                this.el.classList.remove(className);
            } else if (op === '~') {
                this.el.classList.toggle(className);
            } else if (op === '+'){
                this.el.classList.add(className);

            // handle everything else as an add of the whole className without
            // filtering the operator.
            } else {
                this.el.classList.add(classNameOp);
            }
        });
    }

    // a method for attributing attributes (redundant?) to the View element; the
    // method name is the verb form ... uh-TRIB-yoot.
    attribute(attributes) {
        let attributeNames = Object.keys(attributes);

        attributeNames.map((name) => {
            this.el[name] = attributes[name];
        });
    }

    // a method for appending child nodes
    kids(/* arguments */) {
        let children = Array.from(arguments);

        children.map((child) => {
            this.el.appendChild(child);
        });
    }

    // a method for clearing all contents within the element
    gut() {
        while (this.el.lastChild) {
            this.el.removeChild(this.el.lastChild);
        }
    }
}

export default El;
