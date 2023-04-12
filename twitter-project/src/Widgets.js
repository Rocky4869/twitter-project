import React, {useEffect, useState} from 'react';
import "./Widgets.css";
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import SearchIcon from "@material-ui/icons/Search";
import db from "./firebase";
import TwitterFollow from './TwitterFollow'

const Widgets = () => {
    const [widgetsFollow, setWidgetsFollow] = useState([]);
    useEffect(() => {
        db.collection('posts').onSnapshot( snapshot => (  
            setWidgetsFollow(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
        ))       
    }, [])



    return(
        <div className='widgets'>
            <div className='widgets_input'>
                <SearchIcon className="widgets_searchIcon" />
                <input placeholder='Search Twitter' type="text" />
            </div>
            <div className='widgets_widgetContainer_follow'>
                <h2>You may also like</h2>

                
                {widgetsFollow.slice(0, 3).map(widgetFollow => (
                <TwitterFollow
                id={widgetFollow.id}
                displayName={widgetFollow.displayName}
                username={widgetFollow.username}
                verified={widgetFollow.verified}
                text={widgetFollow.text}
                avatar={widgetFollow.avatar}
                image={widgetFollow.image}
                likes={widgetFollow.likes}
                />
                ))}

                {/*
                <TwitterFollowButton
                    screenName={'ivestarship'} />
                <TwitterFollowButton
                    screenName={'blackpink'} />
                <TwitterFollowButton
                    screenName={'le_sserafim'} />
                */}

            </div>
            <div className='widgets_widgetContainer'>
                <h2>What's happening</h2>
                <TwitterTweetEmbed tweetId={'1645351004358029312'}/>
                <TwitterTimelineEmbed 
                    sourceType="profile"
                    screenName="IVEstarship"
                    options={{ height: 400 }}
                />
            </div>
        </div>
    )
}

export default Widgets