export interface IconProps {
    width?: string;
    height?: string;
    color?: string;
    strokeWidth?: string;
    fillColor?: string;
    rotate?: number;
}

export interface CircleItemDetail {
    id: number;
    year: number;
    description: string;
}

export interface CircleItem {
    id: number;
    label: string;
    items: CircleItemDetail[];
}