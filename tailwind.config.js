/* eslint-env es6 */
/* eslint-disable no-console */
const plugin = require("tailwindcss/plugin");

module.exports = {
    prefix: "",
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: "class", // or 'media' or 'class'
    corePlugins: {
        preflight: false
    },
    theme: {
        extend: {
            colors: {
                inherit: "inherit",
                transparent: "transparent",
                black: "black",
                white: "white",
                blue: {
                    "00AFFF": "#00AFFF",
                },
            },
            fontWeight: {
                "weight-300": "300",
                "weight-400": "400",
                "weight-500": "500",
                "weight-600": "600",
                "weight-700": "700",
                "weight-bold": "700"
            },
            fontSize: {
                "8": "8px",
                "10": "10px",
            },
            lineHeight: {
                "normal": "normal",
                "1": "1",
            },
            fontFamily: {
                "gotham-book": ['"Gotham Book"', '"sans-serif"'],
                "gotham-medium": ['"Gotham Medium"', '"sans-serif"'],
                "gotham-bold": ['"Gotham Bold"', '"sans-serif"']
            },
            borderWidth: {
                "0.5": "0.5px",
                "0": "0px",
                "1": "1px",
                "2": "2px",
                "3": "3px",
                "4": "4px"
            },
            borderRadius: {
                "none": "0",
                "4": "4px",
                "5": "5px",
                "6": "6px",
                "12": "12px",
                "20": "20px",
                "1/2": "50%",
                "full": "100%"
            },
            spacing: {
                "0": "0px",
                "0.5": "1px",
                "1": "1px",
                "2": "2px",
                "3": "3px",
                "4": "4px",
                "5": "5px",
                "6": "6px",
                "6.5": "6.5px",
                "7": "7px",
                "8": "8px",
                "9": "9px",
                "10": "10px",
            },
            margin: {
                "auto-0": "auto 0",
                "0-auto": "0 auto"
            },
            minWidth: {
                0: "0px",
                full: "100%",
                min: "min-content",
                max: "max-content",
                fit: "fit-content",
                "10": "10px"
            },
            maxWidth: {
                "1/5": "20%",
                "1/4": "25%",
                "1/2": "50%",
                "3/4": "75%",
                "100": "100px",
            },
            width: {
                "auto": "auto",
                "unset": "unset",
                "3/4": "75%"
            },
            height: {
                "1": "1px",
            },
            minHeight: {
                0: "0px",
                full: "100%",
                screen: "100vh",
                min: "min-content",
                max: "max-content",
                fit: "fit-content"
            },
            maxHeight: {
                "1": "1px",
            },
            zIndex: {
                "1": "1",
                "2": "2"
            },
            boxShadow: {
                "0_1_4_black-15%": "0px 1px 4px rgba(0, 0, 0, 0.15)",
                "0_2_16_black-12%": "0px 2px 16px rgba(0, 0, 0, 0.12)",
                "0_2_20_black-12%": "0px 2px 20px rgba(0, 0, 0, 0.12)",
                "0_0_0_1_ccc": "0px 0px 0px 1px #ccc"
            },
            gridTemplateColumns: {
                "1fr": "1fr",
                "1fr_auto": "1fr auto",
                "auto_1fr": "auto 1fr",
                "1/2_1/2": "50% 50%",
                "100%": "100%",
                "1fr_max-content": "1fr max-content",
                "auto_max-content": "auto max-content",
            },
            gridTemplateRows: {
                "1fr": "1fr",
                "100%": "100%",
                "1fr_auto": "1fr auto",
                "1fr_max-content": "1fr max-content",
                "max-content_1fr": "max-content 1fr",
            },
            opacity: {
                0: "0",
                5: "0.05",
                10: "0.1",
                20: "0.2",
                25: "0.25",
                30: "0.3",
                40: "0.4",
                50: "0.5",
                60: "0.6",
                70: "0.7",
                75: "0.75",
                80: "0.8",
                90: "0.9",
                95: "0.95",
                100: "1"
            },
            rotate: {
                0: "0deg",
                45: "45deg",
                90: "90deg",
                180: "180deg"
            },
        },
        // Overwrite the default tailwindCSS
        colors: {},
        spacing: {},
        fontFamily: {},
        fontWeight: {},
        fontSize: {},
        lineHeight: {},
        borderRadius: {},
        boxShadow: {},
        screens: {
            '1280': '1280px',
            // => @media (min-width: 1280px) { ... } // For old design
            // We only use 3 of responsive sizes
            '768': '768px',
            // => @media (min-width: 768px) { ... }
            '1024': '1024px',
            // => @media (min-width: 1024px) { ... }
            '1440': '1440px',
            // => @media (min-width: 1440px) { ... }
        },
    },
    variants: {
        extend: {}
    },
    plugins: [
        plugin(function ({ addUtilities }) {
            addUtilities({
                ".break-words": {
                    "word-break": "break-word"
                },
                ".flex-center": {
                    "display": "flex",
                    "align-items": "center",
                    "justify-content": "center",
                }
            });
        })
    ]
};
