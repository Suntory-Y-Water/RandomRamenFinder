import { useEffect, useState } from 'react';
import './App.css';
import db from './firebase';
import { collection, getDocs, onSnapshot } from "firebase/firestore";

function App() {
  
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect( () => {
    const postData = collection(db, "jirouFromTokyoAndKanagawa");
    getDocs(postData).then((snapShot) => {
      const postsData = snapShot.docs.map((doc) => ({ ...doc.data()}));
      setPosts(postsData);
    });

    onSnapshot(postData, (post) => {
      const postsData = post.docs.map((doc) => ({...doc.data()}));
      setPosts(postsData);
    });
  }, [])

  const handleButtonClick = () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      if (posts.length > 0) {
        const randomIndex = Math.floor(Math.random() * posts.length);
        setSelectedPost(posts[randomIndex]);
      }
      setIsLoading(false);
    }, 1000);
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>じろるーれっと</h1>
      </div>
      <div className='mainContaienr'>
        <table className='tableLayout'>
          {isLoading ?
            <div className='circle-body'>
              <div className='spinner-box'>
                <div className="circle-border">
                  <div className="circle-core"></div>
                </div>
              </div>
            </div>:
              selectedPost && (
                <div key={selectedPost.store_name}>
                  <h1 className='title'>{selectedPost.store_name}</h1>
                  <tr>
                    <th>店名</th>
                    <th>{selectedPost.store_name}</th>
                  </tr>
                  <tr>
                    <th>住所</th>
                    <th>{selectedPost.store_address}</th>
                  </tr>
                  <tr>
                    <th>営業時間</th>
                    <th>{selectedPost.open_time}</th>
                  </tr>
                  <tr>
                    <th>定休日</th>
                    <th>{selectedPost.close_day}</th>
                  </tr>
                </div>
              )
            }
        </table>
        <div className='button-container'>
          <div>
            <button onClick={handleButtonClick} className='randomButton'>ラーメン屋を選ぶ</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;