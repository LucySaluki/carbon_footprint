const GoogleFontsPlugin = require("google-fonts-webpack-plugin");

module.exports = {
    configureWebpack: config => {
        plugins: [
            new GoogleFontsPlugin({
                // specify whichever fonts and styles you want below and then use in CSS as normal
                fonts: [
                    { family: 'Lato', variants: ['400regular'] },
                    { family: 'Roboto', variants: ['500medium'] },
                    { family: 'Tangerine', variants: ['400regular'] }
                ]
            })
        ]
    }
}