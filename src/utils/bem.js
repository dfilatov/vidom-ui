const MOD_DELIM = '_',
    ELEM_DELIM = '__';

export default function bem(block) {
    return (elem, mods) => {
        if(typeof elem === 'object' && elem !== null) {
            mods = elem;
            elem = null;
        }

        let res = '',
            entity = block;

        if(elem) {
            entity += ELEM_DELIM + elem;
        }

        res += entity;

        if(mods) {
            for(let modName in mods) {
                let modVal = mods[modName];

                if(modVal) {
                    res += ' ' + entity + MOD_DELIM + modName;
                    if(modVal !== true) {
                        res += MOD_DELIM + modVal;
                    }
                }
            }
        }

        return res;
    };
};
