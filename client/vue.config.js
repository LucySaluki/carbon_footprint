const GoogleFontsPlugin = require("google-fonts-webpack-plugin");

module.exports = {
    configureWebpack: config => {
        plugins: [
            new GoogleFontsPlugin({
                // specify whichever fonts and styles you want below and then use in CSS as normal
                fonts: [
                    { family: 'Cinzel Decorative', variants: ['700bold'] },
                    { family: 'Marck Script' },
                    { family: 'Tangerine', variants: ['700bold'] }
                ]
            })
        ]
    }
}