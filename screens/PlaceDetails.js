import React, { useState, useEffect } from 'react'
import { 
    View, 
    Text,
    FlatList, 
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal, 
    Keyboard,
    Image,
} from 'react-native'
import { styles } from '../styles'
import ReviewCard from '../shared/ReviewCard'
import FlatButton from '../shared/FlatButton'
import { MaterialIcons } from '@expo/vector-icons';
import ReviewForm from './ReviewForm'
import moment from 'moment';
import { addReview } from '../store/actions/reviewsActions';
import { connect } from 'react-redux';

function PlaceDetails({ addReview, navigation, route }) {
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

    const handleAddReview = (review) => {
        const reviewEntry = {
            establishment_id: id,
            title: review.title,
            body: review.body,
            star_rating: parseInt(review.star_rating)
        }
        addReview(reviewEntry)
        setModalOpen(false)
        // consider adding success message
    }
    return (
        <View style={styles.container}>
    
            {!loading &&
                <>
                    <View style={styles.reviewDetails}>
                        <Text style={styles.reviewDetailsNameText}>
                            {name}
                        </Text>
                        <Text style={styles.placeDetailsAddress}>
                            {address}
                        </Text>
                        {avg_star_rating ? (
                            <View style={styles.placeDetailsReviewRating}>
                                <Text>{avg_star_rating.toFixed(2)} </Text>
                                <Image
                                    style={styles.icons}
                                    source={require("../assets/icons8-star-filled-48.png")}
                                />
                                <Text>{` (${review_count} Reviews)`}</Text> 
                            </View>
                        ) : ( <Text>No rating or reviews yet.</Text>)
                        }
                        
                        
                        
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
                                <ReviewForm handleAddReview={handleAddReview} />
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

const mapStateToProps = (state) => {
    return {
        reviews: state.reviews
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addReview: (review) => dispatch(addReview(review))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetails)