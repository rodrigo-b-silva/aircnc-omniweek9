import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import List from './pages/List'
import Booking from './pages/Booking';

export default createAppContainer(
    createSwitchNavigator({
        Login,
        List,
        Booking
    })
);