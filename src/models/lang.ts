export interface Lang {
    name: string;
    iso: string;
}

export const langs = {
    en: { name: 'English', iso: 'gb' } as Lang,
    fr: { name: 'Français', iso: 'fr' } as Lang,
};

const codes = Object.keys(langs);

export const langsCode = codes as (keyof typeof langs)[];

export function isLang(code: string): code is keyof typeof langs {
    return codes.indexOf(code) != -1;
}