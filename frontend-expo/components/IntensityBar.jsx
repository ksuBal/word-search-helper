import { Text, View } from "react-native";
import React from "react";

export default function IntensityBar({frequency}) {
	const frequencyArray = [0, 1, 2, 3, 4, 5, 6];
	return (
		<>
			<View style={styles.container}>
				{frequencyArray.map((index) => (
					<View
						key={index}
						style={[
							styles.rectangle,
							{backgroundColor: index <= frequency ? "#697565" : "#ECDFCC"}
						]}
					/>
				))
				}
			</View>
			<View style={styles.textContainer}>
				<View style={{flex: 1}}><Text style={{textAlign: "left"}}>selten</Text></View>
				<View style={{flex: 1}}><Text style={{textAlign: "right"}}>häufig</Text></View>
			</View>
		</>
	)
}

const styles = {
	container: {
		flex: 1,
		gap: 5,
		flexDirection: "row",
		maxHeight: "15px",
		justifyContent: "space-between"
	},
	rectangle: {
		flex: 1,
		height: "15px",
	},
	textContainer: {
		flex: 1,
		flexDirection: "row",
	}
}