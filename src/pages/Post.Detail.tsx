import { Link, useNavigate, useParams } from 'react-router-dom'
import type { Post } from '../types'

export default function PostDetail({ posts, onDelete }:{ posts: Post[]; onDelete:(id:string)=>void }){
  const { id } = useParams()
  const nav = useNavigate()
  const post = posts.find(p => p.id === id)
  if(!post) return <div className="card">Không tìm thấy bài viết.</div>
  const date = new Date(post.createdAt).toLocaleString()
  return (
    <article className="card">
      <img className="thumb" src={post.thumbnail} alt={post.title} />
      <h2 style={{marginTop:10}}>{post.title}</h2>
      <p className="small">Tác giả: {post.author} • {date} • {post.category}</p>
      <p style={{whiteSpace:'pre-wrap', marginTop:12}}>{post.content}</p>
      <div className="actions" style={{marginTop:12}}>
        <button className="btn secondary" onClick={()=>nav(-1)}>← Quay lại</button>
        <Link className="btn" to={`/posts/edit/${post.id}`}>Chỉnh sửa</Link>
        <button className="btn danger" onClick={()=>onDelete(post.id)}>Xóa bài viết</button>
      </div>
    </article>
  )
}
