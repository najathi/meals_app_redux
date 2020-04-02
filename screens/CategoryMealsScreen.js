import React from 'react';
import { View, Text, StyleSheet, Button, Platform, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
// you can also use connect instead of useSelector  in react redux

import { CATEGORIES, MEALS } from '../data/dummy-data';
import Colors from '../constants/Colors';
import MealItem from '../components/mealItem';
import MealList from '../components/MealList';

const CategoryMealsScreen = props => {
	const catId = props.navigation.getParam('categoryId');

	const availableMeals = useSelector(state => state.meals.filteredMeals);

	const displayedMeals = availableMeals.filter(
		meal => meal.categoryIds.indexOf(catId) >= 0
	);

	return (
		<MealList listData={displayedMeals} navigation={props.navigation} />
	);
}

// configuring the header
CategoryMealsScreen.navigationOptions = navigationData => {

	const catId = navigationData.navigation.getParam('categoryId');
	const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
	return {
		headerTitle: selectedCategory.title,
	};
}

const styles = StyleSheet.create({

});

export default CategoryMealsScreen;