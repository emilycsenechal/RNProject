import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { HOMES } from '../shared/homes';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
        homes: state.homes
    };
};


class Directory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            homes: HOMES
        };
    }

    static navigationOptions = {
        title: 'Directory'
    };

    render() {
        const { navigate } = this.props.navigation;
        const renderDirectoryItem = ({item}) => {
            return (
                <Tile
                    title={item.name}
                    caption={item.description}
                    featured
                    onPress={() => navigate('HomeInfo', { homeId: item.id })}
                    imageSrc={{uri: baseUrl + item.image}}
                />
            );
        };

        if (this.props.homes.isLoading) {
            return <Loading />;
        }
        if (this.props.homes.errMess) {
            return (
                <View>
                    <Text>{this.props.homes.errMess}</Text>
               </View>
            );
        }
        return (
            <FlatList   
                data={this.props.homes.homes}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToProps)(Directory);