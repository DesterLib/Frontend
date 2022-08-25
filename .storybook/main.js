const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    stories: ['../src/**/*.stories.@(ts|tsx|js|jsx|mdx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
    typescript: {
        check: true,
    },
    webpackFinal: async (config) => {
        config.resolve.plugins.push(new TsconfigPathsPlugin());
        config.module.rules.push({
            test: /\.mjs$/,
            include: /node_modules/,
            type: 'javascript/auto',
        });
        return config;
    },
    framework: '@storybook/react',
};
