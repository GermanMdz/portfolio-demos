import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                violeta: {
                    50: '#f9f5fc',
                    100: '#f3ebf9',
                    200: '#e7d7f3',
                    300: '#dbc3ed',
                    700: 'rgb(77, 50, 128)',
                    900: 'rgb(54, 35, 90)',
                },
            },
        },
    },
    plugins: [],
};

export default config;