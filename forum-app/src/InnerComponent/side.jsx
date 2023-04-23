import React from 'react';
import TableComponent from "../compontents/table_components";
import { useEffect, useState } from 'react';

const Side = () => {
    /**
     * Contains all the values necessary to set the headers
     * and the titles of the tables on the side
     */
    let title = "Topic Stats";
    let header_array = ["topic_title", "nmberPost", "status"];
    let title2 = "Recent Posts";
    let header_array2 = ["author", "date", "rate"];
    let title3 = "User Stats";
    let header_array3 = ["username", "nmberPost"];

    /**
     * Contains the data for the tables. This is how
     * I set my values and get them to display later
     *  - topicStats
     * - recentPosts
     * - userstats
     */
    const [topicStats, setTopicStats] = useState([]);
    const [recentPosts, setRecentPosts] = useState([]);
    const [userstats, setUserstats] = useState([]);

    /**
     * Gets the topic stats
     * - fetches the data
     * - passes it to getTopicStats which formats the data
     * - sorts the topics by the number of posts
     * - sets the state
     * @returns - returns the array
     */
    useEffect(() => {
        /**
         * Fetches the data
         * calls the other functions
         * sets the state
         */
        const dataFetch = async () => {
          const newData = await (
            await fetch(
              "https://sonic.dawsoncollege.qc.ca/~nasro/js320/project2/forum-data.php"
            ).then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Something went wrong");
                }
            }).then((data) => {
                return data;
            }).catch((error) => {
                console.log(error);
            })
          );
    
        // set state when the data received
        setTopicStats(getTopicStats(newData.categories));
        };

        /**
         * using the categories from the data
         * it creates an array of arrays
         * each array contains the topic title, number of posts, and status
         * It orders it and returns it
         * @param {*} arr an array of objects
         * @returns another array ready for use
         */
        const getTopicStats = (arr) => {
            const topics = [];

            let id = 0;

            for (let i = 0; i < arr.length; i++) {
                arr[i].topicList.forEach(element => {
                    topics[id] = [element.topic_title, element.nberPost, element.status];
                    id++;
                });
            }

            topics.sort((a, b) => b[1] - a[1]);

            return topics;
        }
        dataFetch()
      }, []);

      /**
       * Gets the user stats
       * - fetches the data
       * - passes it to getUserStats which formats the data
       * - counts the number of posts users have made
       * - sorts the users by the number of posts
       * - sets the state
       */
      useEffect(() => {
        /**
         * Fetches the data
         * calls the other functions
         * sets the state
         */
        const dataFetch = async () => {
          const newData = await (
            await fetch(
              "https://sonic.dawsoncollege.qc.ca/~nasro/js320/project2/forum-data.php"
            ).then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Something went wrong");
                }
            }).then((data) => {
                return data;
            }).catch((error) => {
                console.log(error);
            })
          );
    
          // set state when the data received
        setUserstats(getUserStats(newData.categories[0].topicList[0].listPosts));
        };
        /**
         * using the post list from the data
         * it creates an array of arrays
         * each array contains the username and number of posts
         * It counts the number of posts
         * It orders it and returns it
         * @param {*} arr an array of objects
         * @returns another array ready for use
         */
        const getUserStats = (arr) => {
            const count = {};
            let bodArr = [];

            arr.forEach(element => {
                count[element.author] = (count[element.author] || 0) + 1;
            });

            for (let [k,v] of Object.entries(count)) {
                bodArr.push([k, v]);
            }

            bodArr.sort((a, b) => b[1] - a[1]);
            return bodArr;
        }
        dataFetch()
      }, []);


      /**
       * Gets the recent posts
       * - fetches the data
       * - passes it to getRecentPosts which formats the data
       * - sorts the posts by the date
       * - sets the state
       */
      useEffect(() => {
        /**
         * Fetches the data
         * calls the other functions
         * sets the state
         */
        const dataFetch = async () => {
          const newData = await (
            await fetch(
              "https://sonic.dawsoncollege.qc.ca/~nasro/js320/project2/forum-data.php"
            ).then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Something went wrong");
                }
            }).then((data) => {
                return data;
            }).catch((error) => {
                console.log(error);
            })
          );
    
          // set state when the data received
        setRecentPosts(getRecentPosts(newData.categories));
        };

        /**
         * using the categories from the data
         * it creates an array of arrays
         * each array contains the username, date, and rate
         * It orders it and returns it
         * @param {*} arr an array of objects
         * @returns another array ready for use
         */
        const getRecentPosts = (arr) => {
            const date = {};
            let bodArr = [];
            
            let id = 0;

            arr.forEach(element => {
                for (let i = 0; i < element.topicList.length; i++) {
                    let e = element.topicList[i];
                    for (let j = 0; j < e.listPosts.length; j++) {
                        date[id] = [e.listPosts[j].author,new Date(e.listPosts[j].date),e.listPosts[j].rate];
                        id++;
                    }
                }
            });

            for (let v of Object.values(date)) {
                    bodArr.push(v);
            }

            bodArr.sort((a, b) => b[1] - a[1]);

            bodArr.forEach(element => {
                element[1] = element[1].toDateString().slice(4);
            });

            while (bodArr.length > 3) {
                bodArr.pop();
            }

            return bodArr;
        }
        dataFetch()
      }, []);

    /**
     * sets the tables object to be passed to the TableComponent
     * so that it may be displayed
     * each table has a title, headers, data, and id
     * the id is used to identify the table
     * the headers are used to identify the columns
     * the data is used to populate the table
     * the title is used to identify the table
     */
    let tables = [
        {
            title: title,
            headers: header_array,
            data: topicStats,
            id: "side_components_table_stats",
        },
        {
            title: title2,
            headers: header_array2,
            data: recentPosts,
            id: "side_components_table_posts",
        },
        {
            title: title3,
            headers: header_array3,
            data: userstats,
            id: "side_components_table_user",
        },
    ];
    return (  
        <section id="section_tables_side">
            <TableComponent tables={tables} />
        </section>
     );
}
 
export default Side;