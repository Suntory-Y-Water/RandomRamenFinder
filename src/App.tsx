import { useEffect, useState } from 'react';
import './App.css';
import db from './firebase';
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { Post, PostDetails } from './components/PostDetails';
import LoadingSpinner from './components/LoadingSpinner';


function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const postData = collection(db, "jirouFromTokyoAndKanagawa");
    getDocs(postData).then((snapShot) => {
      const postsData = snapShot.docs.map((doc) => ({ ...doc.data() } as Post));
      setPosts(postsData);
    });

    onSnapshot(postData, (post) => {
      const postsData = post.docs.map((doc) => ({...doc.data()} as Post));
      setPosts(postsData);
    });
  }, []);

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

  return {
    posts,
    selectedPost,
    isLoading,
    handleButtonClick
  };
}



function App() {
  const { isLoading, selectedPost, handleButtonClick } = usePosts();

  return (
    <div className="App">
      <div className="App-header">
        <h1>じろるーれっと</h1>
      </div>
      <div className='mainContaienr'>
        <table className='tableLayout'>
          {isLoading ? <LoadingSpinner /> : selectedPost && <PostDetails post={selectedPost} />}
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
