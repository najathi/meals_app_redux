import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import MealItem from '../components/mealItem';

const MealList = props => {

	const favoriteMeals = useSelector(state => state.meals.favoritesMeals);

	const renderMealItems = itemData => {
		const isFavorite = favoriteMeals.find(meal => meal.id === itemData.item.id);
		return (
			<MealItem
				title={itemData.item.title}
				duration={itemData.item.duration}
				complexity={itemData.item.complexity}
				affordability={itemData.item.affordability}
				image={itemData.item.imageUrl}
				onSelect={() => {
					props.navigation.navigate({
						routeName: 'MealDetail',
						params: {
							mealId: itemData.item.id,
							mealTitle: itemData.item.title,
							isFav: isFavorite ? true : false
						}
					});
				}} />);
	};

	return (
		<View style={styles.screen}>
			<FlatList
				data={props.listData}
				keyExtractor={(item, index) => item.id}
				renderItem={renderMealItems} style={{ width: '100%' }} />
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 15
	}
});

export default MealList;

