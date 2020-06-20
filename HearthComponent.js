import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { HOMES } from '../shared/homes';
import { PARTNERS } from '../shared/partners';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
        homes: state.homes,
        partners: state.partners
    };
};


function RenderItem(props) {
    const {item} = props;

    if (props.isLoading) {
        return <Loading />;
    }
    if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }
    if (item) {
        return (
            <Card
                featuredTitle={item.name}
                image={{uri: baseUrl + item.image}}>
                <Text
                    style={{margin: 10}}>
                    {item.description}
                </Text>
            </Card>
        );
    }
    return <View />;
}

class Hearth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            homes: HOMES,
            partners: PARTNERS
        };
    }

    static navigationOptions = {
        title: 'Hearth'
    }

    render() {
        return (
            <ScrollView>
                <RenderItem 
                    item={this.props.homes.homes.filter(home => home.featured)[0]} 
                    isLoading={this.props.homes.isLoading}
                    errMess={this.props.homes.errMess} />
                <RenderItem 
                    item={this.props.partners.partners.filter(partner => partner.featured)[0]} 
                    isLoading={this.props.partners.isLoading}
                    errMess={this.props.partners.errMess} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps) (Hearth);