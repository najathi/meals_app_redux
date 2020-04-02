import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, TouchableNativeFeedback } from 'react-native';

const CategoryGridTile = props => {

	let TouchableCmp = TouchableOpacity;

	if (Platform.OS === 'android') {
		TouchableCmp = TouchableNativeFeedback;
	}

	return (
		<View style={styles.gridItem}>
			<TouchableCmp
				onPress={props.onSelect}
			>
				<View style={{ ...styles.container, ...{ backgroundColor: props.color } }}>
					<Text style={styles.title} numberOfLines={2}>{props.title}</Text>
				</View >
			</TouchableCmp >
		</View>
	);
};

const styles = StyleSheet.create({
	gridItem: {
		flex: 1,
		height: 150,
		margin: 15,
		borderRadius: 10,
		overflow: Platform.OS === 'android' && Platform.Version >= 21 ? 'hidden' : 'visible',
		elevation: 5,
	},
	container: {
		flex: 1,
		borderRadius: 10,
		shadowColor: 'black',
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 15,
		padding: 10,
		justifyContent: 'flex-end',
		alignItems: 'flex-end'
	},
	title: {
		//fontFamily: 'OpenSans-Bold',
		fontSize: 18,
		textAlign: "right"
	}
});

export default CategoryGridTile;