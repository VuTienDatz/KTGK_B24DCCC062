import { Link } from 'react-router-dom'
import type { Post } from '../types'


export default function PostCard({ post, onDelete }:{ post: Post; onDelete: (id:string)=>void }){
const preview = post.content.length > 100 ? post.content.slice(0,100) + '…' : post.content
const date = new Date(post.createdAt).toLocaleDateString()
return (
<article className="card">
<img className="thumb" src={post.thumbnail} alt={post.title} />
<h3 style={{margin: '10px 0 6px'}}>{post.title}</h3>
<p className="small">Tác giả: {post.author} • {date} • {post.category}</p>
<p className="small" style={{margin:'8px 0 12px'}}>{preview}</p>
<div className="actions">
<Link className="btn" to={`/posts/${post.id}`}>Đọc thêm</Link>
<button className="btn danger" onClick={()=>onDelete(post.id)}>Xóa</button>
</div>
</article>
)
}