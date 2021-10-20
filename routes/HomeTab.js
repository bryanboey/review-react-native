import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedStack from './FeedStack';
import { Ionicons } from '@expo/vector-icons';
import ProfileStack from './ProfileStack';
import SearchStack from './SearchStack';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../store/actions/authActions';
import PlaylistStack from './PlaylistStack';


const { Navigator, Screen } = createBottomTabNavigator();

export default function HomeTab() {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getCurrentUser())
    }, [dispatch])
    
    
    return (
        <Navigator
            screenOptions={{ 
                headerShown: false,
                tabBarShowLabel: false,
                tabBarInactiveTintColor: "#d7d7d7",
                tabBarActiveTintColor: '#FFC529',
                tabBarStyle: {
                    backgroundColor: '#272d2f'
                }
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
                component={PlaylistStack}
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