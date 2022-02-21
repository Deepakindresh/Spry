import React, {
    useState,
    useEffect,
    useCallback,
    useMemo,
    useRef,
} from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import MapView, { MAP_TYPES, UrlTile, Marker } from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/core";
import BottomSheet from "@gorhom/bottom-sheet";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    container: {
        flex: 1,
        backgroundColor: "grey",
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white',
      color: 'black',
    },
});

const MapScreen = () => {
    const navigation = useNavigation();
    const bottomSheetRef = useRef < BottomSheet > null;
    const markers = [
        {
            title: "Mayo Hall Manipal Hospital",
            latitude: 77.38053544805545,
            longitude: 12.457774224055761,
        },
        {
            title: "Domlur.",
            latitude: 77.05061196436114,
            longitude: 12.103930552235786,
        },
        {
            title: "K.R.Puram Rly.Stn,Marathhalli Bridge",
            latitude: 77.56726554880552,
            longitude: 12.035640565856784,
        },
    ];
    const [location, setLocation] = useState({
        coords: {
            latitude: 13.0827,
            longitude: 80.2707,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
    });
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            console.log(location["coords"]["latitude"]);
            console.log(location["coords"]["longitude"]);
        })();
    }, []);
    // variables
    const snapPoints = useMemo(() => ["25%", "50%"], []);

    return (
        <>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Menu")}
                    style={tw`bg-gray-100 absolute top-8 left-3 z-50 p-3 rounded-full shadow-lg`}
                >
                    <Icon
                        name="menu"
                        type="material-community"
                        color="#000"
                        size={30}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <MapView
                    region={{
                        latitude: location["coords"]["latitude"],
                        longitude: location["coords"]["longitude"],
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    style={styles.map}
                    mapType={MAP_TYPES.STANDARD}
                    rotateEnabled={false}
                    style={{ flex: 1 }}
                    style={styles.map}
                    showsUserLocation={true}
                    provider="google"
                    annotations={markers}
                >
                    <UrlTile
                        urlTemplate="http://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
                        maximumZ={19}
                    />
                    {markers.map((marker, index) => (
                        <MapView.Marker
                            key={index}
                            title={marker.title}
                            coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude,
                            }}
                        />
                    ))}
                </MapView>
            </View>
            <BottomSheet index={1} snapPoints={snapPoints}>
                <View style={styles.contentContainer}>
                    <Text>Awesome 🎉</Text>
                </View>
            </BottomSheet>
        </>
    );
};

export default MapScreen;
