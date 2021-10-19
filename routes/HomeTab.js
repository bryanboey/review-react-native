import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from '../screens/Search';
import Playlist from '../screens/Playlist';
import Profile from '../screens/Profile';
import FeedStack from './FeedStack';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ProfileStack from './ProfileStack';
import SearchStack from './SearchStack';


const { Navigator, Screen } = createBottomTabNavigator();

export default function HomeTab() {

    
    return (
        <Navigator
            screenOptions={{ 
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#e91e63',
            }}
        >
            <Screen
                name="FeedStack"
                component={FeedStack}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='md-home' color={color} size={size} />
                    ),
                }}
            />
            <Screen
                name="SearchStack"
                component={SearchStack}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='search-sharp' color={color} size={size} />
                    ),
                }}
            />
            <Screen
                name="PlaylistStack"
                component={Playlist}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='list-sharp' color={color} size={size} />
                    ),
                }}
            />
            <Screen
                name="ProfileStack"
                component={ProfileStack}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='md-person-circle-outline' color={color} size={size} />
                    ),
                }}
            />
        </Navigator>
    )
}