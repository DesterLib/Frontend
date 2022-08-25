import { ComponentMeta, ComponentStory } from '@storybook/react';
import LogoFullDark from 'main/assets/logo/logo-full-dark.svg';
import LogoFullLight from 'main/assets/logo/logo-full-light.svg';
import React from 'react';

import SideBar from '.';

export default {
    title: 'Components/SideBar',
    component: SideBar,
} as ComponentMeta<typeof SideBar>;

const Template: ComponentStory<typeof SideBar> = (args) => <SideBar {...args} />;

export const Default = Template.bind({});

Default.args = {
    logo: {
        light: LogoFullLight,
        dark: LogoFullDark,
    },
};
