import React, { useState, useEffect } from 'react'
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native'
import { styles } from '../styles'
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux'
import ReviewCard from '../shared/ReviewCard';

function Reviews({ auth, navigation }) {
    const [loading, setLoading] = useState(true)
    const [reviewsData, setReviewsData] = useState([])
    const { accessToken } = auth

    useEffect(() => {
        const getReviews = async () => {
            try {
                const res = await fetch("http://192.168.18.19:8000/api/reviews/", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Authorization": 'Bearer ' + accessToken,
                        "Content-Type": "application/json",
                    },
                });
    
                const data = await res.json();
    
                if (res.status === 400) {
                    
                    throw Error(data.errors);
                }
                setReviewsData(data)
                setLoading(false)
            }
            catch (err) {
                console.log(err)
            }
        }
        getReviews()
    }, [])

    const handleOnPress = () => {
        navigation.navigate('Review Details');
    }

    return (
        <View style={styles.container}>
            {loading &&
                <>
                    <Text>Loading</Text>
                </>
            }
            {reviewsData &&
                <FlatList
                    data={reviewsData.results}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Review Details', item)}
                        >
                            <ReviewCard>
                                <Text style={styles.titleText}>
                                    {item.title}
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