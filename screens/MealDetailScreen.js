import React from 'react';
import {
	ScrollView,
	View,
	Text,
	StyleSheet,
	Button,
	Platform,
	Image
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import { CATEGORIES, MEALS } from '../data/dummy-data';
import Colors from '../constants/Colors';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';

const ListItem = props => {
	return (
		<View style={styles.listItem}>
			<DefaultText>{props.children}</DefaultText>
		</View>
	);
}

const MealDetailScreen = props => {

	const availableMeals = useSelector(state => state.meals.meals);

	const mealId = props.navigation.getParam('mealId');

	const selectedMeal = availableMeals.find(meal => meal.id === mealId);

	return (
		<ScrollView style={styles.screen}>
			<Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
			<View style={styles.details}>
				<DefaultText>{selectedMeal.duration}m</DefaultText>
				<DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
				<DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
			</View>
			<Text style={styles.title}>Ingredients...</Text>
			{selectedMeal.ingredients.map(ingredient =>
				<ListItem key={ingredient}>{ingredient}</ListItem>
			)}
			<Text style={styles.title}>Steps...</Text>
			{selectedMeal.steps.map(step => <ListItem key={step}>{step}</ListItem>)}
		</ScrollView>
	);
}

// configuring the header
MealDetailScreen.navigationOptions = navigationData => {
	const mealId = navigationData.navigation.getParam('mealId');
	const selectedMeal = MEALS.find(meal => meal.id === mealId);

	let title = selectedMeal.title;
	if (title.length >= 23) {
		title = title.substring(0, 22) + '..';
	}

	return {
		headerTitle: title,
		headerRight: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Favorite"
					iconName="ios-star"
					onPress={() => {
						console.log('Mark as favorite!');
					}} />
			</HeaderButtons>
		)
	};
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	image: {
		height: 200,
		width: '100%',
	},
	details: {
		flexDirection: 'row',
		padding: 15,
		justifyContent: 'space-around'
	},
	title: {
		fontWeight: 'bold',
		fontSize: 22,
		textAlign: 'center',
		marginBottom: 15
	},
	listItem: {
		marginVertical: 10,
		marginHorizontal: 20,
		borderColor: '#ccc',
		borderWidth: 1,
		padding: 10
	}
});

export default MealDetailScreen;