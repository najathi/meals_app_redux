import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import MealList from '../components/MealList';
import { MEALS } from '../data/dummy-data';

const FavoritesScreen = props => {

	const favMeals = useSelector(state => state.meals.favoritesMeals);

	return (
		<MealList listData={favMeals} navigation={props.navigation} />
	);
}

FavoritesScreen.navigationOptions = {
	headerTitle: 'Your Favorites'
};

// configuring the header
FavoritesScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Filter Meals',
		headerLeft: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item title="Menu" iconName='ios-menu' onPress={() => {
					navData.navigation.toggleDrawer()
				}} />
			</HeaderButtons>
		)
	}
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default FavoritesScreen;