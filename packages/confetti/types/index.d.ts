declare const _default: ({ colors, count, drag, gravity, holidays, termVelocity, }?: ConfettiConfig) => {
    init: () => any;
    render: () => any;
};
export default _default;
export type ConfettiConfig = {
    colors?: string[];
    count?: number;
    drag?: number;
    gravity?: number;
    holidays?: boolean;
    termVelocity?: number;
};
