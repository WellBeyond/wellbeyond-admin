import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import SettingsIcon from '@material-ui/icons/Settings';
import LabelIcon from '@material-ui/icons/Label';
import { useMediaQuery, Theme } from '@material-ui/core';
import { useTranslate, DashboardMenuItem, MenuItemLink } from 'react-admin';

import systems from "../resources/systems";
import symptoms from "../resources/symptoms";
import solutions from "../resources/solutions";
import facts from "../resources/facts";
import photos from "../resources/photos";
import videos from "../resources/videos";
import SubMenu from './SubMenu';
import { AppState } from '../types';

type MenuName = ('menuSystems' | 'menuRules' | 'menuAssets');

interface Props {
    dense: boolean;
    logout: () => void;
    onMenuClick: () => void;
}

const Menu: FC<Props> = ({ onMenuClick, dense, logout }) => {
    const [state, setState] = useState({
        menuSystems: false,
        menuRules: false,
        menuAssets: false,
    });
    const translate = useTranslate();
    const isXSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('xs')
    );
    const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);
    useSelector((state: AppState) => state.theme); // force rerender on theme change

    const handleToggle = (menu: MenuName) => {
        setState(state => ({ ...state, [menu]: !state[menu] }));
    };

    return (
        <div>
            {' '}
            <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} />
            <SubMenu
                handleToggle={() => handleToggle('menuSystems')}
                isOpen={state.menuSystems}
                sidebarIsOpen={open}
                name="pos.menu.systems"
                icon={<systems.icon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/systems`}
                    primaryText={translate(`resources.systems.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<systems.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuRules')}
                isOpen={state.menuRules}
                sidebarIsOpen={open}
                name="pos.menu.rules"
                icon={<solutions.icon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/symptoms`}
                    primaryText={translate(`resources.symptoms.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<symptoms.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/solutions`}
                    primaryText={translate(`resources.solutions.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<solutions.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/facts`}
                    primaryText={translate(`resources.facts.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<facts.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuAssets')}
                isOpen={state.menuAssets}
                sidebarIsOpen={open}
                name="pos.menu.assets"
                icon={<photos.icon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/photos`}
                    primaryText={translate(`resources.photos.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<photos.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/videos`}
                    primaryText={translate(`resources.videos.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<LabelIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            {isXSmall && (
                <MenuItemLink
                    to="/configuration"
                    primaryText={translate('pos.configuration')}
                    leftIcon={<SettingsIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            )}
            {isXSmall && logout}
        </div>
    );
};

export default Menu;
