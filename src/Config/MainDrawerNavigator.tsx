import * as React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {primaryColor, secondarColor} from '../Constants/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../Screens/HomeScreen';
import AnalysisScreen from '../Screens/AnalysisScreen';
import SettingsScreen from '../Screens/SettingsScreen';
import HelpScreen from '../Screens/HelpScreen';
import AddGuestScreen from '../Screens/AddGuestScreen';
import MembersScreen from '../Screens/MembersScreen';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  const navigateToMembers = (): void => {
    props.navigation.navigate('Members');
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.topContainer}>
          <Image
            source={require('../Assets/login.jpg')}
            style={styles.profile}
          />
          <View>
            <Text style={styles.title}>{props.user_name}</Text>
          </View>
          <View style={styles.data}>
            <View style={styles.following}>
              <Text style={styles.number}>10</Text>
              <Text style={styles.text}> Guests</Text>
            </View>
            <View style={styles.followers}>
              <TouchableOpacity
                style={styles.followers}
                onPress={navigateToMembers}>
                <>
                  <Text style={styles.number}>4</Text>
                  <Text style={styles.text}> Members</Text>
                </>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <DrawerItem
          label={() => <Text style={styles.label}>Home</Text>}
          onPress={() => props.navigation.navigate('Home')}
          icon={() => <Icon name="home" size={22} color="#000" />}
        />
        <DrawerItem
          label={() => <Text style={styles.label}>Add Guest</Text>}
          onPress={() => props.navigation.navigate('AddGuest')}
          icon={() => <Icon name="account-plus" size={22} color="#000" />}
        />
        <DrawerItem
          label={() => <Text style={styles.label}>Analysis</Text>}
          onPress={() => props.navigation.navigate('Analysis')}
          icon={() => <Icon name="chart-bar" size={22} color="#000" />}
        />
        <DrawerItem
          label={() => <Text style={styles.label}>Settings</Text>}
          onPress={() => props.navigation.navigate('Settings')}
          icon={() => <Icon name="settings" size={22} color="#000" />}
        />
        <DrawerItem
          label={() => <Text style={styles.label}>Help</Text>}
          onPress={() => props.navigation.navigate('Help')}
          icon={() => <Icon name="help" size={22} color="#000" />}
        />
        <View style={styles.divider} />
      </DrawerContentScrollView>
    </View>
  );
}

function MyDrawer(props: any) {
  return (
    <Drawer.Navigator
      drawerType="front"
      edgeWidth={100}
      initialRouteName="Home"
      drawerContent={(props_) => (
        <CustomDrawerContent
          {...props_}
          user_name={props.route.params.user_name}
        />
      )}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Analysis" component={AnalysisScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Help" component={HelpScreen} />
      <Drawer.Screen name="Members" component={MembersScreen} />
      <Drawer.Screen name="AddGuest" component={AddGuestScreen} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: secondarColor,
  },
  header: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingRight: 0,
    backgroundColor: primaryColor,
  },
  icon: {
    height: 50,
    width: 50,
  },
  topContainer: {
    padding: 15,
    borderBottomWidth: 0.2,
    borderBottomColor: primaryColor,
  },
  profile: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#99e0e0',
  },
  divider: {
    height: 0.2,
    backgroundColor: primaryColor,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
  },
  username: {
    fontSize: 18,
    color: '#898f93',
  },
  data: {
    flexDirection: 'row',
    marginTop: 15,
  },
  following: {
    flexDirection: 'row',
    marginRight: 15,
  },
  followers: {
    flexDirection: 'row',
  },
  number: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#99e0e0',
  },
  label: {
    fontSize: 18,
    color: '#fff',
  },
});
