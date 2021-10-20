import React, { useState, useEffect } from 'react'
import { 
    View, 
    Text, 
    FlatList, 
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator,
} from 'react-native'
import { styles } from '../styles'
import { connect } from 'react-redux'
import ReviewCard from '../shared/ReviewCard';
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage';

function Reviews({ navigation }) {
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false);
    const [reviewsData, setReviewsData] = useState([])

    const getReviews = async () => {
        try {
            const tokens = await AsyncStorage.getItem('tokens')
            const { access } = JSON.parse(tokens)

            const res = await fetch(`http://192.168.18.19:8000/api/reviews/`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Authorization": 'Bearer ' + access,
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (res.status === 400) {
                
                throw Error(data.errors);
            }
            setReviewsData(data.results)
            setLoading(false)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        setLoading(true)
        getReviews()
    }, [])

    return (
        <View style={styles.container}>
            {loading &&
                <>
                    <Text>Loading</Text>
                </>
            }
            {reviewsData &&
                <FlatList
                    refreshing={refreshing}
                    onRefresh={getReviews}
                    data={reviewsData}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => navigation.navigate('Review Details', item )}
                        >
                            <ReviewCard>
                                <View style={styles.userText}>
                                    <Text>{item.user}</Text>
                                    <Text style={styles.fromNowText}>{moment(item.created).fromNow()}</Text>
                                </View>
                                <Text style={styles.titleText}>
                                    {item.title}
                                </Text>
                                <Text 
                                    style={styles.bodyText}
                                    numberOfLines={2}
                                >
                                    {item.body}
                                </Text>
                            </ReviewCard>
                        </TouchableOpacity>
                        )}
                />
            }
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Reviews);