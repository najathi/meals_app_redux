import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import MealItem from '../components/mealItem';

const MealList = props => {

	const renderMealItems = itemData => (
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
						mealId: itemData.item.id
					}
				});
			}} />
	);

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

