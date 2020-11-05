import React, {FC, useState} from 'react';
import {useSelector} from 'react-redux';
import SettingsIcon from '@material-ui/icons/Settings';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import SubjectIcon from '@material-ui/icons/Subject';
import BookIcon from '@material-ui/icons/Book';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import InfoIcon from '@material-ui/icons/Info';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
/*
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
*/
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import TrainIcon from '@material-ui/icons/Train';
import PersonIcon from '@material-ui/icons/Person';
import DomainIcon from '@material-ui/icons/Domain';
import {Theme, useMediaQuery} from '@material-ui/core';
import {DashboardMenuItem, MenuItemLink, useTranslate} from 'react-admin';

import SubMenu from './SubMenu';
import {AppState} from '../types';
import { usePermissions } from 'react-admin';

type MenuName = ('menuSystems' | 'menuRules' | 'menuTraining' | 'menuAssets' | 'menuUsers');

interface Props {
    dense: boolean;
    logout: () => void;
    onMenuClick: () => void;
}

const Menu: FC<Props> = ({ onMenuClick, dense, logout }) => {
    const [state, setState] = useState({
        menuUsers: false,
        menuSystems: false,
        menuRules: false,
        menuTraining: false,
        menuAssets: false,
    });
    const { permissions } = usePermissions();
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
            {permissions && permissions.admin && permissions.admin.isAdmin && <SubMenu
                handleToggle={() => handleToggle('menuSystems')}
                isOpen={state.menuSystems}
                sidebarIsOpen={open}
                name="pos.menu.systems"
                icon={<LocalDrinkIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/systems`}
                    primaryText={translate(`resources.systems.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<LocalDrinkIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>}
            {permissions && permissions.admin && permissions.admin.isAdmin && <SubMenu
                handleToggle={() => handleToggle('menuRules')}
                isOpen={state.menuRules}
                sidebarIsOpen={open}
                name="pos.menu.rules"
                icon={<AccountTreeIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/symptoms`}
                    primaryText={translate(`resources.symptoms.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<SentimentVeryDissatisfiedIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/solutions`}
                    primaryText={translate(`resources.solutions.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<SentimentVerySatisfiedIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/facts`}
                    primaryText={translate(`resources.facts.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<InfoIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>}
            <SubMenu
                handleToggle={() => handleToggle('menuTraining')}
                isOpen={state.menuTraining}
                sidebarIsOpen={open}
                name="pos.menu.training"
                icon={<LibraryBooksIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/topics`}
                    primaryText={translate(`resources.topics.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<BookIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/subjects`}
                    primaryText={translate(`resources.subjects.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<SubjectIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/lessons`}
                    primaryText={translate(`resources.lessons.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<BookmarkBorderIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/sessions`}
                    primaryText={translate(`resources.sessions.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<TrainIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            {/*
            <SubMenu
                handleToggle={() => handleToggle('menuAssets')}
                isOpen={state.menuAssets}
                sidebarIsOpen={open}
                name="pos.menu.assets"
                icon={<PhotoLibraryIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/photos`}
                    primaryText={translate(`resources.photos.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<PhotoLibraryIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/videos`}
                    primaryText={translate(`resources.videos.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<VideoLibraryIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            */}
            <MenuItemLink
                to={`/organizations`}
                primaryText={translate(`resources.organizations.name`, {
                    smart_count: 2,
                })}
                leftIcon={<DomainIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
            />
            <MenuItemLink
                to={`/users`}
                primaryText={translate(`resources.users.name`, {
                    smart_count: 2,
                })}
                leftIcon={<PersonIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
            />
            {permissions && permissions.admin && permissions.admin.isAdmin && <MenuItemLink
                to={`/admins`}
                primaryText={translate(`resources.admins.name`, {
                    smart_count: 2,
                })}
                leftIcon={<SupervisorAccountIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
            />}
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
