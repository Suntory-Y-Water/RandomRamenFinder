import { useEffect, useState } from 'react';
import './App.css';
import db from './firebase';
import { collection, getDocs, onSnapshot } from "firebase/firestore";

function App() {
  
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // データベースから情報を取得する
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
    setIsLoading(true);
    setTimeout(() => {
      if (posts.length > 0) {
        const randomIndex = Math.floor(Math.random() * posts.length);
        setSelectedPost(posts[randomIndex]);
      }
      setIsLoading(false);
    }, 2000);
  }


  return (
    <div className="App">
      <div>
        <h1>じろるーれっと</h1>
        <div>
          {isLoading ? <p>読み込み中...</p> :
            selectedPost && (
              <div key={selectedPost.store_name}>
                <h1>{selectedPost.store_name}</h1>
                <p>{selectedPost.store_address}</p>
                <p>{selectedPost.open_time}</p>
                <p>{selectedPost.close_day}</p>
              </div>
            )
          }
        </div>
        <div>
          <button onClick={handleButtonClick} className='randomButton'>ランダムに投稿を表示</button>
        </div>
      </div>

    </div>
  );
}

export default App;
