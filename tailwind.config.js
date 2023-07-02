import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                "primary": {
                    "100": "#E0D4F4",
                    "200": "#C1A9E9",
                    "300": "#A17DDD",
                    "400": "#8252D2",
                    "500": "#6327C7",
                    "600": "#4A1D95",
                    "700": "#321464",
                    "800": "#190A32",
                    "900": "#0A0414"

                },
                "secondary": {
                    "100": "#ECD8F5",
                    "200": "#D9B2EB",
                    "300": "#C58BE2",
                    "400": "#B265D8",
                    "500": "#9F3ECE",
                    "600": "#772F9B",

                },
                "base": {
                    "0": "#FFFFFF",
                    "50": "#F0F0F0",
                    "100": "#E0E0E0",
                    "200": "#C2C2C2",
                    "300": "#A3A3A3",
                    "400": "#858585",
                    "500": "#666666",
                    "600": "#4D4D4D",
                    "700": "#333333",
                    "800": "#1A1A1A",
                    "900": "#0A0A0A",
                }
            },
            backgroundImage: {
                'backgroundAuth': "url('/public/assets/Background.svg')",
            }
        },
    },

    plugins: [forms, require("daisyui")],
    daisyui: {
        styled: true,
        themes: true,
        base: true,
        utils: true,
        themes: [
            {
                light: {

                    "primary": "#6327C7",

                    "secondary": "#9F3ECE",

                    "accent": "#1FB2A5",

                    "neutral": "#191D24",

                    "base-100": "#FFFFFF",

                    "info": "#3ABFF8",

                    "success": "#36D399",

                    "warning": "#FBBD23",

                    "error": "#F87272",

                    ".text-title": {
                        color: "#3D9EA5"
                    }
                }
            },
            {
                dark: {

                    "primary": "#6327C7",

                    "secondary": "#9F3ECE",

                    "accent": "#1FB2A5",

                    "neutral": "#191D24",

                    "base-100": "#2A303C",

                    "info": "#3ABFF8",

                    "success": "#36D399",

                    "warning": "#FBBD23",

                    "error": "#F87272",

                    ".text-title": {
                        color: "#a6adbb"
                    }
                },
            },
        ],
    },
};
