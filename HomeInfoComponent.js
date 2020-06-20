import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { HOMES } from '../shared/homes';
import { COMMENTS } from '../shared/comments';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        homes: state.homes,
        comments: state.comments,
        favorites: state.favorites
    };
};

const mapDispatchToProps = {
    postFavorite: homeId => (postFavorite(homeId))
};


function RenderHome({home}) {
   
    if (home) {
        return (
            <Card
                featuredTitle={home.name}
                image={{uri: baseUrl + home.image}}>
                <Text style={{margin: 10}}>
                    {home.description}
                </Text>
                <Icon
                    name={props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    raised
                    reverse
                    onPress={() => props.favorite ? 
                        console.log('Already set as a favorite') : props.markFavorite()}
                />
            </Card>
        );
    }
    return <View />;
}

function RenderComments({comments}) {

    const renderCommentItem = ({item}) => {
        return (
            <View style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.text}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        );
    };

    return (
        <Card title='Comments'>
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class HomeInfo extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            homes: HOMES,
            comments: COMMENTS,
            favorite: false
        };
    }

    static navigationOptions = {
        title: 'House Information'
    };

    markFavorite(homeId) {
        this.props({homeId});
    }


    render() {
        const homeId = this.props.navigation.getParam('homeId');
        const home = this.props.homes.homes.filter(home => home.id === homeId)[0];
        const comments = this.state.comments.filter(comment => comment.homeId === homeId);
        return (
            <ScrollView>
                <RenderHome 
                    home={home} 
                    favorite={this.props.favorite.includes(homeId)}
                    markFavorite={() => this.markFavorite(homeId)}
                />
                <RenderComments comments={comments} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (HomeInfo);