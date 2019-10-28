import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Subscription from './pages/Subscription';

const Routes = createAppContainer(
    createSwitchNavigator({
        SignIn,
        SignUp,
    })
);

export default Routes;
