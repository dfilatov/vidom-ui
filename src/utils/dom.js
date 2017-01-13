function findScrollableParents(domElem) {
    const res = [];
    let parentDomElem = domElem;

    while((parentDomElem = parentDomElem.parentNode) && parentDomElem.nodeType === 1) {
        const { overflowX, overflowY } = window.getComputedStyle(parentDomElem);

        if(overflowY === 'scroll' || overflowY === 'hidden' || overflowY === 'auto' ||
                overflowX === 'scroll' || overflowX === 'hidden' || overflowX === 'auto') {
            res.push(parentDomElem);
        }
    }

    return res;
}

function findFocusableChild(containerElem, dir, startDomElem) {
    let curElem = startDomElem?
            dir === 'forward'? startDomElem.nextElementSibling : startDomElem.previousElementSibling :
            dir === 'forward'? containerElem.firstElementChild : containerElem.lastElementChild;

    while(curElem) {
        if(isFocusable(curElem)) {
            return curElem;
        }

        const focusableChildElem = findFocusableChild(curElem, dir);

        if(focusableChildElem) {
            return focusableChildElem;
        }

        curElem = dir === 'forward'? curElem.nextElementSibling : curElem.previousElementSibling;
    }

    return startDomElem && startDomElem.parentNode !== containerElem?
        findFocusableChild(containerElem, dir, startDomElem.parentNode) :
        null;
}

function isFocusable(domElem) {
    if(domElem.hasAttribute('tabindex')) {
        return isVisible(domElem);
    }

    switch(domElem.tagName.toLowerCase()) {
        case 'iframe':
            return isVisible(domElem);

        case 'button':
        case 'textarea':
        case 'select':
            return !domElem.disabled && isVisible(domElem);

        case 'input':
            return !domElem.disabled && domElem.type !== 'hidden' && isVisible(domElem);

        case 'a':
            return domElem.hasAttribute('href') && isVisible(domElem);
    }

    return false;
}

function isVisible(domElem) {
    if(!domElem.offsetParent) {
        const { position, display, visibility } = window.getComputedStyle(domElem);

        return position === 'fixed' && (display !== 'none' && visibility !== 'hidden');
    }

    return true;
}

export default {
    findScrollableParents,
    findFocusableChild,
    isFocusable,
    isVisible
};
