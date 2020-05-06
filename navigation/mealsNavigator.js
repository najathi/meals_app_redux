import React from 'react'; // in using JSX
import { Platform, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';

const defaultStackNavOption = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
	},
	headerTitleStyle: {
		fontWeight: 'bold'
	},
	headerBackTitleStyle: {
		// this style ony for iphone because android doesn't have back text
		fontWeight: 'normal'
	},
	headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
};

const MealsNavigator = createStackNavigator({
	Categories: CategoriesScreen,
	CategoryMeals: {
		screen: CategoryMealsScreen
	},
	MealDetail: MealDetailScreen
},
	{ defaultNavigationOptions: defaultStackNavOption }
);

const FavNavigator = createStackNavigator({
	favorites: FavoritesScreen,
	MealDetail: MealDetailScreen
}, { defaultNavigationOptions: defaultStackNavOption });

const tabsScreenConfig = {
	Meals: {
		screen: MealsNavigator,
		navigationOptions: {
			tabBarIcon: tabInfo => {
				return (
					<Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
				);
			},
			tabBarColor: Colors.primaryColor,
			// tabBarLabel: 'Meals!!!'
			tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontWeight: 'bold' }}>Meals</Text> : 'Meals'
		}
	},
	Favorite: {
		screen: FavNavigator, navigationOptions: {
			tabBarLabel: 'Favorites!',
			tabBarIcon: tabInfo => {
				return (
					<Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
				);
			},
			tabBarColor: Colors.accentColor,
			tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontWeight: 'bold' }}>Favorites</Text> : 'Favorites'
		}
	}
}

const MealsFavTabNavigator = Platform.OS === "android" ?
	createMaterialBottomTabNavigator(tabsScreenConfig,
		{
			activeColor: 'white',
			shifting: true,
			// shifting: false,
			barStyle: {
				backgroundColor: Colors.primaryColor
			}
		}
	) :
	createBottomTabNavigator(tabsScreenConfig, {
		tabBarOptions: {
			labelStyle: {
				fontWeight: 'normal'
			},
			activeTintColor: Colors.accentColor
		}
	});

const filterNavigator = createStackNavigator(
	{
		Filters: FiltersScreen
	},
	{
		// navigationOptions: {
		// 	drawerLabel: 'Filters!!!'
		// },
		defaultNavigationOptions: defaultStackNavOption
	}
);

const MainNavigation = createDrawerNavigator({
	MealsFavs: {
		screen: MealsFavTabNavigator,
		navigationOptions: {
			drawerLabel: 'Meals'
		},
	},
	Filters: filterNavigator
}, {
	contentOptions: {
		activeTintColor: Colors.accentColor,
		labelStyle: {
			// fontFamily: 'OpenSans-Bold'
			fontWeight: 'bold'
		}
	}
});

// export default createAppContainer(MealsNavigator);
// export default createAppContainer(MealsFavTabNavigator);
export default createAppContainer(MainNavigation);