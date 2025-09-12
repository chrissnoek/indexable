export enum ButtonVariant {
    Primary = 'primary',
    Secondary = 'secondary',
    Outline = 'outline',
    Ghost = 'ghost',
}

export enum ButtonSize {
    XS = 'xs',
    SM = 'sm',
    MD = 'md',
    LG = 'lg',
}

export interface ButtonProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
}