// import React, {useEffect, useState} from 'react';
// import {View, Text, ActivityIndicator} from 'react-native';
// import Constants from '../assets/Colors/Constants';
// import { GET } from '../services/API';
// import Styles from './Styles';
// import { FlatList } from 'react-native-gesture-handler';

// const TrendingPeople = (props) => {
//   const [loading, setLoading] = useState(true);
//   const [people, setPeople] = useState();

//   useEffect(() => {
//     const getPeople = async () => {
//         const data = await GET(props.url);
//         setPeople(props.isForPage === 'details' ? data.cast : data.results);
//         setLoading(false);
//     };
//     getPeople();
//   }, []);
//   return (
//     <View>
//       {loading ? (
//         <Loader />
//       ) : <View>
//         <Text style ={Styles.heading}>{props.title}</Text>
//         <FlatList/>
//       </View>
//     </View>
//   );
// };
// export default TrendingPeople;
