import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react';
import { height, width } from '../global';

const info = (props) => {
    console.log(props.route.params.details)
    const user = props.route.params.details;

    const formatToCurrency = amount => {
        return "N" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
      };
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>

            <View style={styles.container}>
                <View style={styles.view1}>
                    <Image 
                        source={{uri: user.uri}}
                        style={styles.image}
                        resizeMode={'contain'}
                    />
                    <Text style={styles.title}>{user.name}</Text>
                    <Text style={styles.email}>{user.email}</Text>
                    <Text style={styles.email}>+234 {user.phone_number}</Text>
                </View>

                <View style={styles.view2}>
                    <View style={styles.view21}>
                        <Image source={require('../../assets/images/briefcase.png')} style={styles.icon} />
                        <Text style={styles.text1}>{user.year} {user.year > 1 ? 'Years' : 'Year'}</Text>
                    </View>

                    <View style={[styles.view22, user.status == 'offline' ? {backgroundColor: 'grey'} :  user.status == 'busy' ? {backgroundColor: 'orange'} :  null]}>
                        <Text style={styles.text2}>{user.status}</Text>
                    </View>
                </View>

                <View style={styles.view2}>
                    <View style={styles.view21}>
                        <Image source={require('../../assets/images/star.png')} style={styles.icon} />
                        <Text style={styles.text1}>{user.ratings}</Text>
                    </View>

                    <View style={[styles.view22, user.verified === false ? {backgroundColor: 'grey'} : null]}>
                        <Text style={styles.text2}>{user.verified == true ? 'Verified' : 'Not-Verified'}</Text>
                    </View>
                </View>

                <Text style={styles.review}>Reviews</Text>

                <View style={styles.view3}>
                    <Text style={styles.review1}>No reviews yet</Text>
                </View>

                <View style={styles.footer}>
                    <View style={styles.footer1}>
                        <Text style={{color: 'grey', fontSize: 12}}>{user.profession}</Text>
                        <Text style={{color: 'black', fontSize: 22, fontWeight: '700', marginVertical: 10}}>{formatToCurrency(user.amount)}</Text>
                        <Text style={{color: 'grey', fontSize: 12}}>Pay (Negotiable)</Text>

                    </View>
                    <TouchableOpacity style={styles.touch}>
                        <Text style={{color: '#fff', fontWeight: '700', fontSize: 12}}>Book</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default info;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc',
        width: '100%',
        padding: 20
    },
    view1:{
        padding: 20,
        alignItems: 'center',
    },
    touch:{
        backgroundColor: '#0384fc',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 45,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon:{
        width: 18,
        height: 18,
        marginRight: 10
    },
    image:{
        borderRadius: 100,
        width: 120,
        height: 120,
    },
    text1:{
        fontSize: 11,
        color: '#aaa'
    },
    text2:{
        fontSize: 11,
        color: '#fcfcfc'
    },
    title:{
        fontWeight: '700',
        fontSize: 16,
        color: 'black',
        marginTop: 15,
    },
    email:{
        fontSize: 11,
        color: '#bbb'
    },
    view2:{
        flexDirection: 'row',
        marginTop: 20,
        width: '50%',
        justifyContent: 'space-between'
    },
    view21:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 50
    },
    view22:{
        paddingHorizontal: 20,
        backgroundColor: 'darkgreen',
        borderRadius: 10,
        paddingVertical: 12
    },
    view3: {
        width:'100%',
        height: height * 0.4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    review:{
        fontWeight: 'bold',
        fontSize: 14,
        color: 'black',
        marginTop: 50,
    },
    review1:{
        fontSize: 12,
        color: '#bbb',   
    },
    footer:{
        flexDirection: 'row',
        width: '100%',
        bottom: 10,
        justifyContent: 'space-between',
        position: 'absolute'
    },
    footer1: {

    }

})