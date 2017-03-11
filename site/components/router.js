import Susanin from 'susanin';
import Intro from './Intro';
import ButtonDoc from 'vidom-components/components/Button/doc';
import CheckBoxDoc from 'vidom-components/components/CheckBox/doc';
import CheckBoxGroupDoc from 'vidom-components/components/CheckBoxGroup/doc';
import IconDoc from 'vidom-components/components/Icon/doc';
import LinkDoc from 'vidom-components/components/Link/doc';
import MenuDoc from 'vidom-components/components/Menu/doc';
import ModalDoc from 'vidom-components/components/Modal/doc';
import PopupDoc from 'vidom-components/components/Popup/doc';
import RadioDoc from 'vidom-components/components/Radio/doc';
import RadioGroupDoc from 'vidom-components/components/RadioGroup/doc';
import SelectDoc from 'vidom-components/components/Select/doc';
import SpinnerDoc from 'vidom-components/components/Spinner/doc';
import TextAreaDoc from 'vidom-components/components/TextArea/doc';
import TextInputDoc from 'vidom-components/components/TextInput/doc';

const BASE_URL = document.location.pathname,
    router = Susanin();
let url = BASE_URL + document.location.hash,
    listener;

window.addEventListener('popstate', () => {
    url = document.location.pathname;
    listener();
});

export default router;

export const routes = {
    Intro : router.addRoute({
        pattern : BASE_URL,
        data : { Component : Intro }
    })
};

const componentDocs = {
    Button : ButtonDoc,
    CheckBox : CheckBoxDoc,
    CheckBoxGroup : CheckBoxGroupDoc,
    Icon : IconDoc,
    Link : LinkDoc,
    Menu : MenuDoc,
    Modal : ModalDoc,
    Popup : PopupDoc,
    Radio : RadioDoc,
    RadioGroup : RadioGroupDoc,
    Select : SelectDoc,
    Spinner : SpinnerDoc,
    TextArea : TextAreaDoc,
    TextInput : TextInputDoc
};

Object.keys(componentDocs).reduce((res, name) => {
    res[name] = router.addRoute({
        pattern : `${BASE_URL}#!/${name}(/<tab>)`,
        data : { Component : componentDocs[name] },
        defaults : { tab : 'Examples' }
    });

    return res;
}, routes);

export function goTo(_url) {
    url = _url;
    window.history.pushState(null, null, url);
    listener();
}

export function onStateChange(_listener) {
    listener = _listener;
}

export function getCurrentUrl() {
    return url;
}
