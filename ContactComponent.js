import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';

class Contact extends Component {
    static navigationOptions = {
        title: 'Contact Us'
    }
    render() {
        return (
            <ScrollView>
                <Card title="Contact Information"
                 wrapperStyle={{margin:20}}>
                    <Text>1 OffGrid Road</Text>
                    <Text>Bosie, ID 837001</Text>
                    <Text style={{marginBottom: 10}}>U.S.A.</Text>
                    <Text>Phone: 1-206-555-1234</Text>
                    <Text>Email: offgrid@homes.co</Text>
                </Card>
            </ScrollView>
        );
    }
}
export default Contact;