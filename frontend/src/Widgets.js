import React from 'react';
import "./css/Widgets.css";
import {
    TwitterTimelineEmbed,
    TwitterTweetEmbed,
  } from "react-twitter-embed";
import SearchIcon from "@material-ui/icons/Search";
import db from "./firebase";
import { useEffect, useState } from "react";

function Widgets() {
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (searchInput.trim() === '') {
            setSearchResults([]);
            return;
          }
        const searchInputNext = searchInput.slice(0, -1) + String.fromCharCode(searchInput.charCodeAt(searchInput.length - 1) + 1);
        // // alert("press enter");
        // let results = db.collection('users')
        // .where("name" ,">=", searchInput)
        // .where("name" ,"<", searchInputNext).get()
        // .then((querySnapshot) => {
        //     if (!querySnapshot.empty) {
        //         let docs =[]
        //         querySnapshot.forEach((doc) => {
        //           console.log('Document ID:', doc.id);
        //           console.log('Document data:', doc.data());
        //           console.log('Document data:', doc.data().id);
        //           docs.push(doc.data());
        //         });
        //         setSearchResults(docs);
        //       } else {
        //         console.log('No document found with the specified field value');
        //       }
        //   })
        //   .catch((error) => {
        //     console.error('Error adding document:', error);
        //   });
        const collectionRef = db.collection('users');
        const queryByName = collectionRef.where("name" ,">=", searchInput)
        .where("name" ,"<", searchInputNext).get();
        const queryById = collectionRef.where('id', '>=', searchInput)
        .where("id" ,"<", searchInputNext).get();
        Promise.all([queryByName, queryById])
        .then(([nameSnapshot, idSnapshot]) => {
        const docs = [];

        nameSnapshot.forEach((doc) => {
            // console.log('Document ID:', doc.id);
            // console.log('Document data:', doc.data());
            // console.log('Document data:', doc.data().id);
            docs.push({ id: doc.id, data: doc.data() });
        });

        idSnapshot.forEach((doc) => {
            if (!docs.some((item) => item.id === doc.id)) {
                // console.log('Document ID:', doc.id);
                // console.log('Document data:', doc.data());
                // console.log('Document data:', doc.data().id);  
            docs.push({ id: doc.id, data: doc.data() });
            }
        });

        //   console.log(docs.length);
            docs.forEach((doc) => {
                const id = doc.id;
                const data = doc.data;
                const name = doc.data.name;
                console.log(`Document ID: ${id}`);
                console.log('Document data:', data);
                console.log(`userID: ${data.id}`);
                console.log(`Name: ${name}`);
            });
        setSearchResults(docs);
        //   console.log(searchResults);
        })
        .catch((error) => {
        console.error('Error querying collection:', error);
        });
    }, [searchInput]);   

    // const handleKeyDown = (e) => {
    // if (e.key === 'Enter') {
    //     // alert("press enter");
    //     handleSearch(e);
    //     }   
    // };
    return(
        <div className='widgets'>
            <div className='widgets_input'>
                <SearchIcon className="widgets_searchIcon"/>
                <input placeholder='Search by user name or ID'
                    type="text" 
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </div>

            <div className="dropdown">
                {searchResults.map((doc) => (
                    <div className='dropdown-item' key={doc.id}>
                        <p>Name: {doc.data.name}</p>
                        <h3>Document ID: {doc.data.id}</h3>
                    </div>
                ))}
            </div>
            <div className='widgets_widgetContainer'>
                <h2>What's happening</h2>
                <TwitterTweetEmbed tweetId={'1639974872406446084'}/>
                <TwitterTimelineEmbed 
                    sourceType="profile"
                    screenName="offclASTRO"
                    options={{ height: 400 }}
                />
            </div>
        </div>
    )
}

export default Widgets