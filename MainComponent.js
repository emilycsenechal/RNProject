import React, { Component } from 'react';
import Hearth from './HearthComponent';
import Directory from './DirectoryComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { View, Platform, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Icon } from 'react-native-elements';
//import SafeAreaView from 'react-native-safe-area-view'; this was causing an error
import { createStackNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';
import { connect } from 'react-redux';
import { fetchHomes, fetchComments, fetchPartners } from '../redux/ActionCreators';

const mapDispatchToProps = {
    fetchHomes,
    fetchComments,
    fetchPartners
};

const DirectoryNavigator = createStackNavigator(
    {
        Directory: {screen: Directory}
    },
    {
            navigationOptions: ({navigation}) => ({
                headerLeft: <Icon
                    name='list'
                    type='font-awesome'
                    iconStyle={styles.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                />
            })
        },
        {
        initialRouteName: 'Directory',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#7395AE'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

const HearthNavigator = createStackNavigator(
    {
        Hearth: { screen: Hearth }
    },
    {
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#7395AE'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='home'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const AboutNavigator = createStackNavigator(
    {
        About: { screen: About }
    },
    {
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#7395AE'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='info-circle'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const ContactNavigator = createStackNavigator(
    {
        Contact: { screen: Contact }
    },
    {
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#7395AE'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='address-card'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const MainNavigator = createDrawerNavigator(
    {
        Hearth: {
            screen: HearthNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='home'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Directory: {
            screen: DirectoryNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='list'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        About: {
            screen: AboutNavigator,
            navigationOptions: {
                drawerLabel: 'About Us',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='info-circle'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Contact: {
            screen: ContactNavigator,
            navigationOptions: {
                drawerLabel: 'Contact Us',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='address-card'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        }
    },
    {
        drawerBackgroundColor: '#B1A296',
        // contentComponent: CustomDrawerContentComponent
    }
);

// const CustomDrawerContentComponent = props => (
//     <ScrollView>
//         <SafeAreaView 
//             style={styles.container}
//             forceInset={{top: 'always', horizontal: 'never'}}>
//             <View style={styles.drawerHeader}>
//                 <View style={{flex: 1}}>
//                     <Image source={require('./images/Images/maybe.jpg')} style={styles.drawerImage} />
//                 </View>
//                 <View style={{flex: 2}}>
//                     <Text style={styles.drawerHeaderText}>OffGrid Homes</Text>
//                 </View>
//             </View>
//             <DrawerItems {...props} />
//         </SafeAreaView>
//     </ScrollView>
// );
// this was causing an error for me, wasn't able to fix it 


class Main extends Component {

    componentDidMount() {
        this.props.fetchHomes();
        this.props.fetchComments();
        this.props.fetchPartners();
    }

    render() {
        return (
            <View style={{
                flex: 1,
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
            }}>
                <MainNavigator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#7395AE',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        height: 60,
        width: 60
    },
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24
    }
});


export default connect(null, mapDispatchToProps) (Main);