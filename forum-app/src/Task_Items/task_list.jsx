import { useEffect, useState } from 'react';

/**
* @description Uses fetch to get the lastest tasks from the server and then displays them on the page, with the ability to search for a specific task or filter by category and topic
* @return TaskList component
*/

const TaskList = () => {

    // Use state constants
    const [keyword, setKeyword] = useState('');
    const [, setData] = useState({});
    const [categories, setCategories] = useState([]);
    const [topics, setTopics] = useState([]);
    const [taskList, setTaskList] = useState([]);

    /**
     * 
     * @param {event} e 
     * @description gets the value of the search box and sets the keyword to the value
     */
    const handleSearch = (e) => {
        setKeyword(e);
    }
    /**
     * @description adds an event listener to the search box and when the user presses enter it calls the handleSearch function
     */
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById("searching_box").addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                handleSearch(document.getElementById("searching_box").value);
            }
        });
        })

    // Filters the tasks by the keyword
    const filteredTasks = taskList.filter(task => task.text.toLowerCase().includes(keyword.toLowerCase()));
    /**
     * @description fetches the data from the api and sets the state
     */
    useEffect(() => {
        // fetch data
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
                console.log("getting data")
                return data;
            }).catch((error) => {
                console.log(error);
            })
          );
    
          // set state when the data received
          handleData(newData);
        };
        dataFetch()
        
      }, []);
      /**
       * 
       * @param {array} newData 
       * @description sets the categories, taskList, topics and the first category to the first category in the array
       */
      const handleData = (newData) => {
        setData(newData);
        setCategories(newData.categories)
        setTaskList(newData.categories[0].topicList[0].listPosts)
        handleCategory(newData.categories[0].name)
        setTopics(newData.categories[0].topicList)
    }

    /** 
        * @description Handles the data from the category select and sets the states for topics and task lists
        * @param e event
    */
    const handleCategory = (e) => {
        if (e.target) {
            for (let i = 0; i < categories.length; i++) {
                if (categories[i].name === e.target.value) {
                    setTopics(categories[i].topicList)
                    setTaskList(categories[i].topicList[0].listPosts)
                }
            }
        }
    }

    /**
     * 
     * @param {event} e 
     * @description the event and gets the value of the target to later compare it to the topics array and set the taskList to the listPosts of the topic 
     */
    const handleTopic = (e) => {
        if (e.target) {
            for (let i = 0; i < topics.length; i++) {
                if (topics[i].topic_title === e.target.value) {
                    setTaskList(topics[i].listPosts)
                }
            }
        }
    }

    /** 
        * @description Deletes the task from the task list
        * @param integer task_id
    */
    const handleDelete = (task_id) => {
        let newList = taskList.filter((task) => task.id !== task_id);
        for (let i = 0; i < topics.length; i++) {
            for (let j = 0; j < topics[i].listPosts.length; j++) {
                if (topics[i].listPosts[j].id === task_id) {
                    topics[i].listPosts.splice(j, 1);
                }
            }
        }
        console.log(newList)
        setTaskList(newList);
        setTopics(topics)
    }

    /**
     * 
     * @param {id} task_id 
     * @description gets the id of the task and filters the taskList to find the task with the same id and then increments the like by 1
     */
    const handlePlus = (task_id) => {
        let newList = [...taskList];
        for (let i = 0; i < newList.length; i++) {
            if (newList[i].id === task_id) {
                newList[i].like += 1;
            }
        }
        setTaskList(newList);
    }

    /**
     * 
     * @param {id} task_id 
     * @description gets the id of the task and filters the taskList to find the task with the same id and then decrements the like by 1
     */
    const handleMinus = (task_id) => {
        let newList = [...taskList];
        for (let i = 0; i < newList.length; i++) {
            if (newList[i].id === task_id) {
                newList[i].like -= 1;
            }
        }
        setTaskList(newList);
    }
    // uses the array to map everything based on the value in that array and then returns it, also goes through the filteredTasks array to map the tasks that are in the array
    return (
        <section id="task-list">
            <section id="chooser">
                <section id="choose-category">
                    <label>choose category</label>
                    {/* Checks if the category has been changed, if so update the array of topics and the array of tasks */}
                    <select id="category" onChange={(e) => handleCategory(e)}>
                        {
                            categories.map((category) => (
                                <option value={category.name}>{category.name}</option>
                            ))
                        }   
                    </select>
                </section>
                <section id="choose-category">
                    <label>choose topic</label>
                    <select id="category" onChange={(e) => handleTopic(e)}>
                        {
                            topics.map((topic) => (
                                <option value={topic.topic_title}>{topic.topic_title}</option>
                            ))
                        }  
                    </select>
                </section>
            </section>
            <section id="inner-task">
                {
                    // for each task in the filteredTasks array, return the task
                    filteredTasks.map((task) => (
                        <section id="task-row">
                            <section id="line">
                                <p>{task.text}</p>
                                <section id="likes">
                                    <label>Likes: {task.like}</label>
                                    {/* Appends the images to the table as a like and dislike button and calls the handlePlus and handleMinus functions */}
                                    <a onClick={e => handlePlus(task.id)} href="#"><img src="https://cdn-icons-png.flaticon.com/512/25/25297.png" alt="" /></a>
                                    <a onClick={e => handleMinus(task.id)} href="#" ><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu84fiK1_kWxyVTkgcgphTv3we3qieh0EUZ7yDSe0H&s" alt="" /></a>
                                </section>
                            </section>
                            <section id="info">
                                <p>by: {task.author}</p>
                                <p>{task.date}</p>
                                <p>replies: {task.replies}</p>
                                {/* Appends the images to the table as a delete button and calls the handleDelete function */}
                                <a href="#" onClick={e => handleDelete(task.id)}><img src="https://emojipedia-us.s3.amazonaws.com/source/skype/289/wastebasket_1f5d1-fe0f.png" alt="" /></a>
                            </section>
                        </section>
                    ))}
            </section>
            
        </section>
    );
}

export default TaskList;