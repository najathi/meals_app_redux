import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux'

import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import { setFilters } from '../store/actions/meals';

const FilterSwitch = props => {
	return (
		<View style={styles.filterContainer}>
			<Text style={{ textAlign: 'left' }}>{props.label}</Text>
			<Switch
				trackColor={{ true: Colors.primaryColor }}
				thumbColor={Platform.OS === 'android' ? Colors.accentColor : ''}
				value={props.state}
				onValueChange={props.onChange} />
		</View>
	);
}

const FiltersScreen = props => {

	const { navigation } = props; // this is an object restructuring
	/* props is an object and it pulls out navigation key is in a brand new contact of same name self the same navigation, it stores. */

	const [isGlutenFree, setIsGlutenFree] = useState(false);
	const [isLactoseFree, setIsLactoseFree] = useState(false);
	const [isVegan, setIsVegan] = useState(false);
	const [isVegetarian, setIsVegetarian] = useState(false);

	const dispatch = useDispatch();

	const saveFilters = useCallback(() => {
		const appliedFilters = {
			glutenFree: isGlutenFree,
			lactoseFree: isLactoseFree,
			vegan: isVegan,
			isVegetarian: isVegetarian,
		};

		// console.log(appliedFilters);
		dispatch(setFilters(appliedFilters));
	}, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

	useEffect(() => {
		navigation.setParams({ save: saveFilters });
	}, [saveFilters]);

	// useCallBack - useCallback will return a memoized version of the callback that only changes if one of the inputs has changed. For example: Now to make sure that saveFilters only updates when our state changes. So that why we can import the useCallback.

	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Available Filters / Restrictions</Text>
			<FilterSwitch state={isGlutenFree} onChange={newValue => setIsGlutenFree(newValue)} label="Gluten-free" />
			<FilterSwitch state={isLactoseFree} onChange={newValue => setIsLactoseFree(newValue)} label="Lactose-free" />
			<FilterSwitch state={isVegan} onChange={newValue => setIsVegan(newValue)} label="Vegan" />
			<FilterSwitch state={isVegetarian} onChange={newValue => setIsVegetarian(newValue)} label="Vegetarian" />
		</View>
	);
}

// configuring the header
FiltersScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Filter Meals',
		headerLeft: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item title="Menu" iconName='ios-menu' onPress={() => {
					navData.navigation.toggleDrawer()
				}} />
			</HeaderButtons>
		),
		headerRight: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item title="Save" iconName='ios-save' onPress={navData.navigation.getParam('save')} />
			</HeaderButtons>
		)
	}
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center'
	},
	title: {
		fontWeight: 'bold',
		fontSize: 22,
		margin: 20,
		textAlign: 'center'
	},
	filterContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '80%',
		marginVertical: 10
	}
});

export default FiltersScreen;