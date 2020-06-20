import React, { Component } from 'react';
import { ScrollView, Text, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';


const mapStateToProps = state => {
    return {
      partners: state.partners
    };
};

function Mission() {
    return (
        <Card title="Mission">
            <Text>
            Turducken chicken pastrami chuck. Beef filet mignon ground round, 
            porchetta meatball sirloin buffalo fatback capicola. Jerky prosciutto 
            strip steak drumstick alcatra, beef ribs pork belly. Meatball shoulder 
            brisket, jerky t-bone pork belly shank salami sirloin alcatra. Biltong 
            spare ribs t-bone, jerky beef ribs prosciutto shankle. Hamburger filet 
            mignon chicken, pancetta buffalo drumstick prosciutto kielbasa pork bacon 
            brisket tri-tip beef alcatra ball tip. Ham short ribs capicola, alcatra ham 
            hock ribeye cow t-bone pork loin fatback jowl filet mignon biltong ground 
            round drumstick.
            </Text>
        </Card>
    )
}

class About extends Component {

    static navigationOptions = {
        title: 'About Us'
    }

    render() {
        const renderPartner = ({item}) => {
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{source: {uri: baseUrl + item.image}}}
                />
            );
        };

        if (this.props.partners.isLoading) {
            return (
                <ScrollView>
                    <Mission />
                    <Card
                        title='Community Partners'>
                        <Loading />
                    </Card>
                </ScrollView>
            );
        }
        if (this.props.partners.errMess) {
            return (
                <ScrollView>
                    <Mission />
                    <Card
                        title='Community Partners'>
                        <Text>{this.props.partners.errMess}</Text>
                    </Card>
                </ScrollView>
            );
        }
        return (
            <ScrollView>
                <Mission />
                <Card title="Community Partners">
                    <FlatList
                        data={this.props.partners.partners}
                        renderItem={renderPartner}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(About);