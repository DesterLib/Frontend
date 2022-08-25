import { ComponentMeta, ComponentStory } from '@storybook/react';
import LogoFullDark from 'main/assets/logo/logo-full-dark.svg';
import LogoFullLight from 'main/assets/logo/logo-full-light.svg';
import React from 'react';

import NavBar from '.';

export default {
    title: 'Components/NavBar',
    component: NavBar,
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = (args) => <NavBar {...args} />;

export const Default = Template.bind({});

Default.args = {
    logo: {
        light: LogoFullLight,
        dark: LogoFullDark,
    },
};
