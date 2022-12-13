import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from '../screens/Dashboard/Dashboard'

const Drawer = createDrawerNavigator();

export default DrawerNavigation = () => {
    return (
        <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name={"Dashboard"} component={Dashboard} />
        </Drawer.Navigator>
    )
};