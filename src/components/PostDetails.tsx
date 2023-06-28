export interface Post {
  store_name: string;
  store_address: string;
  open_time: string;
  close_day: string;
}

export const PostDetails: React.FC<{ post: Post }> = ({ post }) => (
  <div key={post.store_name}>
    <h1 className='title'>{post.store_name}</h1>
    <tr>
      <th>店名</th>
      <td>{post.store_name}</td>
    </tr>
    <tr>
      <th>住所</th>
      <td>{post.store_address}</td>
    </tr>
    <tr>
      <th>営業時間</th>
      <td>{post.open_time}</td>
    </tr>
    <tr>
      <th>定休日</th>
      <td>{post.close_day}</td>
    </tr>
  </div>
);