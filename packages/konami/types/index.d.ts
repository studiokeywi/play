declare const _default: ({ once, payload, secondPlayer, }?: KonamiConfig) => {
    load: () => void;
    unload: () => void;
};
export default _default;
export type KonamiConfig = {
    once?: boolean;
    payload?: Function;
    secondPlayer?: boolean;
};
