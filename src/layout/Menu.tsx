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
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import NetworkCheckIcon from '@material-ui/icons/NetworkCheck';
import CategoryIcon from '@material-ui/icons/Category';
import NoteIcon from '@material-ui/icons/Notes';
import InputIcon from '@material-ui/icons/InputOutlined';
import LensIcon from '@material-ui/icons/Lens';

/*
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
*/
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import TrainIcon from '@material-ui/icons/Train';
import PersonIcon from '@material-ui/icons/Person';
import DomainIcon from '@material-ui/icons/Domain';
import {Theme, useMediaQuery} from '@material-ui/core';
import {DashboardMenuItem, MenuItemLink, usePermissions, useTranslate} from 'react-admin';

import SubMenu from './SubMenu';
import {AppState} from '../types';

type MenuName = ('menuSystems' | 'menuRules' | 'menuMaintenance' | 'menuTraining' | 'menuAssets' | 'menuUsers' | 'menuForms' | 'menuSystemOverview');

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
        menuMaintenance: false,
        menuTraining: false,
        menuAssets: false,
        menuForms: false,
        menuSystemOverview: false
    });
    const { permissions } = usePermissions();
    const translate = useTranslate();
    const isXSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('xs')
    );
    const isAdmin = permissions && permissions.admin && permissions.admin.isAdmin
    const isClientAdmin = permissions && permissions.admin && permissions.admin.isClientAdmin
    const isMaintenanceUser = permissions && permissions.admin && permissions.admin.isMaintenanceUser
    const permittedResources = permissions && permissions.admin && (isMaintenanceUser || isClientAdmin) && permissions.admin.permittedResources
    const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);
    useSelector((state: AppState) => state.theme); // force rerender on theme change

    const handleToggle = (menu: MenuName) => {
        setState(state => ({ ...state, [menu]: !state[menu] }));
    };

    return (
        <div>
            <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} />
            {isAdmin && <MenuItemLink
                to={`/systemOverview`}
                sidebarIsOpen={open}
                onClick={onMenuClick}
                leftIcon={<LensIcon />}
                dense={dense}
                primaryText={translate(`pos.menu.systemOverview`, {
                    smart_count: 2,
                })}
            >
            </MenuItemLink>}
            {isAdmin && <SubMenu
                handleToggle={() => handleToggle('menuSystems')}
                isOpen={state.menuSystems}
                sidebarIsOpen={open}
                name="pos.menu.systems"
                icon={<LocalDrinkIcon />}
                dense={dense}
            >
                  <MenuItemLink
                    to={`/systemTypes`}
                    primaryText={translate(`resources.systemTypes.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<CategoryIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                  />
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
            { isAdmin ?
                <SubMenu
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
                    to={`/diagnostics`}
                    primaryText={translate(`resources.diagnostics.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<InfoIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
              <MenuItemLink
                to={`/diagnosticLogs`}
                primaryText={translate(`resources.diagnosticLogs.name`, {
                    smart_count: 2,
                })}
                leftIcon={<AssignmentTurnedInIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
              />
            </SubMenu>  :   
                ((isMaintenanceUser || isClientAdmin) && permittedResources.includes('diagnostic-logs') ? 
                    <MenuItemLink
                        to={`/diagnosticLogs`}
                        primaryText={translate(`resources.diagnosticLogs.name`, {
                            smart_count: 2,
                        })}
                        leftIcon={<AssignmentTurnedInIcon />}
                        onClick={onMenuClick}
                        sidebarIsOpen={open}
                        dense={dense}
                /> : null
              )
              }
            { isAdmin ? <SubMenu
                handleToggle={() => handleToggle('menuMaintenance')}
                isOpen={state.menuMaintenance}
                sidebarIsOpen={open}
                name="pos.menu.maintenance"
                icon={<NetworkCheckIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/checklists`}
                    primaryText={translate(`resources.checklists.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<PlaylistAddCheckIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/maintenanceLogs`}
                    primaryText={translate(`resources.maintenanceLogs.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<AssignmentTurnedInIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>: ((isMaintenanceUser || isClientAdmin) && permittedResources.includes('maintenance-logs')? <MenuItemLink
                    to={`/maintenanceLogs`}
                    primaryText={translate(`resources.maintenanceLogs.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<AssignmentTurnedInIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />: null)}
            { isAdmin ? <SubMenu
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
            </SubMenu>:((isMaintenanceUser || isClientAdmin) && permittedResources.includes('training-sessions') ? <MenuItemLink
                    to={`/sessions`}
                    primaryText={translate(`resources.sessions.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<TrainIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />: null)}
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
            { isAdmin && <MenuItemLink
                to={`/organizations`}
                primaryText={translate(`resources.organizations.name`, {
                    smart_count: 2,
                })}
                leftIcon={<DomainIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
            />}
            { isAdmin && <MenuItemLink
                to={`/users`}
                primaryText={translate(`resources.users.name`, {
                    smart_count: 2,
                })}
                leftIcon={<PersonIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
            />}
          { isAdmin ? <SubMenu
                handleToggle={() => handleToggle('menuForms')}
                isOpen={state.menuForms}
                sidebarIsOpen={open}
                name="pos.menu.forms"
                icon={<InputIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/formTypes`}
                    primaryText={translate(`resources.formTypes.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<CategoryIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/forms`}
                    primaryText={translate(`resources.forms.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<NoteIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/formSessions`}
                    primaryText={translate(`resources.formSessions.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<AssignmentTurnedInIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>:((isMaintenanceUser || isClientAdmin) && permittedResources.includes('form-sessions') ? <MenuItemLink
                    to={`/formSessions`}
                    primaryText={translate(`resources.formSessions.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<AssignmentTurnedInIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />: null)}

            {(isAdmin) && <MenuItemLink
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
