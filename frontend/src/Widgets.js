import React from 'react';
import "./css/Widgets.css";
import {
    TwitterTimelineEmbed,
    TwitterTweetEmbed,
  } from "react-twitter-embed";
import SearchIcon from "@material-ui/icons/Search";
import db from "./firebase";
import { useEffect, useState, useRef  } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate} from "react-router-dom";

function Widgets() {
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(true);
    const dropDownRef = useRef(null);
    let navigate = useNavigate();
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

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
            setDropdownVisible(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    const handleClearButton = () => {
    setSearchInput('');
    };

    const handleItemClick = (userid) => {
        setDropdownVisible(false);
        setSearchInput('');
        // alert("selected item: " + userid);
        navigate(`/${userid}`);
      };

    return(
        <div className='widgets'>
            <div className='widgets_input'>
                <SearchIcon className="widgets_searchIcon"/>
                <input placeholder='Search by user name or ID'
                    type="text" 
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onFocus={() => setDropdownVisible(true)}
                />
                <div className='cancelBtn'>
                {searchInput && (
                    <CancelIcon onClick={handleClearButton}/>
                )}
                </div>
            </div>
            {dropdownVisible && (
                <div className="dropdown" ref={dropDownRef}>
                    {searchResults.map((doc) => (
                        <div className='dropdown-item' key={doc.id} onClick={() => handleItemClick(doc.data.id)}>
                            <p>User Name: {doc.data.name}</p>
                            <p>User ID: {doc.data.id}</p>
                        </div>
                    ))}
                </div>)}
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