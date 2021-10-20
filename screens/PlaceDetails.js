import React, { useState, useEffect } from 'react'
import { 
    View, 
    Text,
    FlatList, 
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal, 
    Keyboard 
} from 'react-native'
import { styles } from '../styles'
import ReviewCard from '../shared/ReviewCard'
import FlatButton from '../shared/FlatButton'
import { MaterialIcons } from '@expo/vector-icons';
import ReviewForm from './ReviewForm'
import moment from 'moment';

export default function PlaceDetails({ navigation, route }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false)
    const [reviews, setReviews] = useState([]);

    const { 
        id, name, address, avg_star_rating, review_count
    } = route.params.item;
    
    const fetchReviews = async () => {
        setRefreshing(true)
        setLoading(true)
        try {
            const res = await fetch(`http://192.168.18.19:8000/api/reviews/?search=${name}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Authorization": 'Bearer ' + route.params.token,
                    "Content-Type": "application/json",
                },
            });
            
            const data = await res.json();
            
            if (res.status === 400) {
                
                throw Error(data.errors);
            }
            setReviews(data)
        }
        catch (err) {
            console.log(err)
        }
        setLoading(false)
        setRefreshing(false)
    }

    useEffect(() => {
        fetchReviews()
    }, [])

    const addReview = async (review) => {
        const reviewEntry = {
            establishment_id: id,
            title: review.title,
            body: review.body,
            star_rating: parseInt(review.star_rating)
        }
        try {
            const res = await fetch(`http://192.168.18.19:8000/api/reviews/`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Authorization": 'Bearer ' + route.params.token,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(reviewEntry),
                });
                
                const data = await res.json();
                
                if (res.status === 500) {
                    console.log(data)
                    throw Error(data.errors);
                }
                setModalOpen(false)
        } catch (e) {
            console.log(e)
        }
        
    };

    return (
        <View style={styles.container}>
    
            {!loading &&
                <>
                    <View style={styles.reviewDetails}>
                        <Text style={styles.reviewDetailsNameText}>
                            {name}
                        </Text>
                        <Text style={styles.reviewDetailsAddressText}>
                            {address}
                        </Text>
                        <Text>{avg_star_rating} Stars</Text>
                        <Text>{review_count} Reviews</Text> 
                    </View>
                    <Modal
                        visible={modalOpen}
                        animationType='slide'
                    >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styles.modalContent}>
                                <MaterialIcons
                                    name='close'
                                    size={24}
                                    style={{ ...styles.modalToggle, ...styles.modalClose }}
                                    onPress={() => setModalOpen(false)}
                                />
                                <ReviewForm addReview={addReview} />
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                    <FlatButton text='Add a Review' onPress={() => setModalOpen(true)}/>
                    {reviews &&
                        <FlatList
                            refreshing={refreshing}
                            onRefresh={fetchReviews}
                            data={reviews.results}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => navigation.push('Review Details', item )}
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
                </>
                }
        </View>
    )
}