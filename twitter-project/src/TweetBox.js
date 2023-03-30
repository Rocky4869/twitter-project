import React from 'react';
import "./TweetBox.css";
import { Avatar, Button } from '@material-ui/core';

function TweetBox() {
    return(
        <div className='tweetBox'>
            <form>
                <div className='tweetBox_input'>
                <Avatar style={{ height: '140px', width: '140px' }} src="https://dep.com.vn/wp-content/uploads/2022/11/phong-cach-thoi-trang-cha-eun-woo-1.jpg"></Avatar>
                {/*
                <Avatar src="https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png"></Avatar>
                */}
                <input placeholder="What's happening?"type="text"/>
                </div>
                <input className='tweetBox_imageInput' placeholder="Optional: Enter image URL" type="text"/>
                <Button className='tweetBox_tweetButton'>Tweet</Button>
            </form>
        </div>
    )
}

export default TweetBox