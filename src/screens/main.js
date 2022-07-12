import { SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { width, height } from '../global';
import Spinner from 'react-native-spinkit';
import moment from 'moment';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client/react';
import Toast from 'react-native-simple-toast';

const GET_DATA = gql`
    query {
        workers{
            id,
            name,
            email,
            profession,
            uuid,
            uri,
            status,
            address,
            amount,
            created_at,
            email,
            phone_number,
            ratings,
            status,
            verified,
            current_payment,
            year
        }
    }
`;


const Main = ({navigation}) => {
    const {data, loading, error} = useQuery(GET_DATA);
    const [workers, setWorkers] = useState([]);
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        setWorkers(c => c = data?.workers);
    }, [loading])


    const filterData = [{option: 'Available'}, {option: 'Verified'}, {option: 'Not-Verified'}, {option: 'Offline'}, {option: 'Busy'}];
    let searchWorker = [];
    const holes = workers.filter(({profession}) => search == profession);
    const onSearch = () => {
       
        const holes = workers.filter(({profession}) => search == profession);
        console.log("holes: ", holes);
        searchWorker.push(holes);
        searchWorker = holes;
        setIsSearch(true)
        onRefresh()
        console.log("serchs: ", searchWorker, searchWorker.length);
        return holes;

    };

    console.log("search: ", searchWorker);    
    
    const [search, setSearch] = useState(''); 
    const [isSearch, setIsSearch] = useState(false)
    
    // console.log(workers);
    
    if(error){
        console.log(error);
        Toast.showWithGravity(`${error}`, Toast.LONG, Toast.TOP);
    }

    const onRefresh = () => {
        setIsFetching(true);

        setTimeout(() => {
            setIsFetching(false)
        }, 3000)
    }

    const filtVer = workers?.filter((item) => item.verified === true);
    const filtNotVer = workers?.filter((item) => item.verified === false);
    const filtAva = workers?.filter((item) => item.status === 'Available');
    const filtOffline = workers?.filter((item) => item.status === 'offline');
    const filtBusy = workers?.filter((item) => item.status === 'busy');

    const [verify, setVerify] = useState(false);
    const [nonverify, setNonverify] = useState(false);
    const [available, setAvailable] = useState(false);
    const [offline, setOffline] = useState(false);
    const [busy, setBusy] = useState(false);

    const [isFetching, setIsFetching] = useState(false);

    const onPressHandler =(item) => {
        if(item.option === 'Verified'){
            setVerify(!verify);
            setNonverify(false);
            setAvailable(false);
            setOffline(false)
            setBusy(false);
            searchWorker = [];
            setIsSearch(false)
        } else if (item.option === 'Not-Verified'){
            setVerify(false);
            setNonverify(!nonverify);
            setAvailable(false);
            setOffline(false)
            setBusy(false);
            setIsSearch(false)
            searchWorker = [];
        } else if (item.option === 'Available'){
            setVerify(false);
            setNonverify(false);
            setAvailable(!available);
            setOffline(false)
            setIsSearch(false)
            setBusy(false);
            searchWorker = [];
        } else if (item.option === 'Offline'){
            setVerify(false);
            setNonverify(false);
            setAvailable(false);
            setOffline(!offline)
            setBusy(false);
            setIsSearch(false)
            searchWorker = [];
        } else if (item.option === 'Busy'){
            setBusy(!busy);
            setVerify(false);
            setNonverify(false);
            setAvailable(false);
            setOffline(false)
            setIsSearch(false)
            searchWorker = [];
        }
    }
 
    const listView = ({item, index}) => {
        return(
            <View style={styles.view1}>
                {moment(item.created_at).format('L') == moment(workers[index].created_at).format('L') && 
                    (index === 0 ? moment(item.created_at).format('L') : 
                    moment(item.created_at).format('L') === moment(workers[index - 1].created_at).format('L') ? null 
                    : moment(item.created_at).format('L'))  &&
                    <Text style={styles.dates}>{moment(item.created_at).calendar()}</Text>}
                <TouchableOpacity style={styles.touch} activeOpacity={0.6} onPress={() => navigation.push('infoScreen', {details: item})}>
                    <View style={styles.view11}>
                        <Image style={styles.image} source={{uri: item.uri}} /> 
                        <View style={styles.view12}>
                            <Text style={styles.title}>{item.name} {searchWorker}</Text>
                            <Text style={styles.content}>{item.profession}</Text>
                            <View style={styles.row}>

                            </View>
                            <View style={styles.view3}>
                                <Text style={{textAlign: 'right', color: 'black', fontSize: 10}}>Ratings: {item.ratings} </Text>
                                <Image source={require('../../assets/images/star.png')} style={styles.icon} />

                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    const filterView = ({item}) => {
        return(
            <TouchableOpacity style={[styles.filterStyle, 
                item.option === 'Available' && available == true ? {borderColor: '#0384fc', elevation: 4 }: 
                item.option === 'Verified' && verify == true ? {borderColor: '#0384fc', elevation: 4 }: 
                item.option === 'Not-Verified' && nonverify == true ? {borderColor: '#0384fc', elevation: 4 }: 
                item.option === 'Offline' && offline == true ? {borderColor: '#0384fc', elevation: 4 }: 
                item.option === 'Busy' && busy == true ? {borderColor: '#0384fc', elevation: 4 }: 
                
                null]}
                onPress={() => {
                    onPressHandler(item)
                }}
            >
                <Text style={styles.filterItem}>{item.option}</Text>
            </TouchableOpacity>
        );
    }

  return(
      
      <SafeAreaView style={styles.view}>
            <StatusBar barStyle={'dark-content'} backgroundColor={'#fcfcfc'} />

            {loading === false  &&
                <View style={styles.container}>
                    <TextInput style={styles.searchInput} 
                    placeholder='Search... e.g Engineer, Driver, Plumber etc.' 
                    placeholderTextColor={'#bbb'}
                    onSubmitEditing={() => {
                        console.log("searchWorker: ", searchWorker)
                        onSearch()}}
                    keyboardType={'web-search'}
                    onChangeText={(val) => setSearch(val)}
                    />

                    <View style={styles.view4}>
                        <FlatList
                            data={filterData}
                            keyExtractor={(item) => item.id}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            renderItem={filterView}
                        />
                    </View>

                    <FlatList
                    data={ 
                        verify == true ? filtVer : nonverify == true ? filtNotVer : 
                        available == true ? filtAva : offline == true ? filtOffline :
                        busy == true ? filtBusy : isSearch == true ? holes :
                        workers 
                    }
                    refreshing={isFetching}
                    onRefresh={() => onRefresh()}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={listView}          
                    />
                </View>
            }
            {loading  &&
                <View style={[styles.container, { alignItems: 'center', justifyContent: 'center'}]} >
                    <Spinner color='darkblue' type='9CubeGrid' size={100} style={{backgroundColor: '#fcfcfc'}} />
                </View>
            
            }
        </SafeAreaView>
    )
}

export default Main;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc',
        // alignItems: 'center',onRefresh={onRefresh()}
        // justifyContent: 'center',
        width: width,
        padding: 20
    },
    view3:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: -50
    },  
    title:{
        fontSize: 13,
        color: 'black',
        fontWeight: '600'
    },
    content:{
        marginTop: 2,
        fontSize: 11,
        color: '#aaa'
    },
    view4:{
        width: '100%',
        marginVertical: 20

    },
    view:{
        flex: 1,
    },
    filterStyle:{
        borderRadius: 15,
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderWidth: 1,
        borderColor: '#aaa',
        // borderColor: '#0384fc',
        width: width * 0.3,
        elevation: 1,
        backgroundColor:"#fcfcfc",
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    filterItem:{
        color: '#aaa',
        fontSize: 12
    },
    row:{
        flexDirection: 'row',
    },
    searchInput:{
        width: '100%',
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
        borderRadius: 10,
        fontSize: 12,
        color: '#000',
        marginTop: 20,
    },
    icon:{
        width: 18,
        height: 18,
        marginHorizontal: 10
    },
    view1:{
        padding: 20,
        width: '100%',
        marginBottom: -18
    },
    touch:{
        width: '100%',
        elevation: 1,
        padding: 18,
        borderWidth: 0.6,
        borderColor: "#bbb",
        backgroundColor: '#fcfcfc',
        borderRadius: 10,
        flexDirection: 'row',
        paddingVertical: 25,
    },
    dates:{
        color: '#aaa',
        fontSize: 11,
        marginBottom: 10
    },
    view11:{
        flexDirection: 'row',
        width: '100%'
    },
    image:{
        width: 50, 
        height: 50,
        borderRadius: 100,
        marginRight: 20
    },
    view12:{
        marginLeft: 15,        
        width: '50%'
    }
})