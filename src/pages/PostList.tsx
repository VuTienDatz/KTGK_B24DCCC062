import { useMemo, useState } from 'react'
import type { Post } from '../types'
import PostCard from '../compoments/PostCard'
import { Link } from 'react-router-dom'

export default function PostList({ posts, onDelete }:{ posts: Post[]; onDelete:(id:string)=>void }){
  const [q, setQ] = useState('')
  const filtered = useMemo(()=>{
    const x = q.trim().toLowerCase()
    if(!x) return posts
    return posts.filter(p => p.title.toLowerCase().includes(x))
  }, [q, posts])

  return (
    <section>
      <div className="actions" style={{margin:'0 0 12px'}}>
        <Link className="btn" to="/create">✍️ Viết bài mới</Link>
        <input className="input" placeholder="Lọc theo tiêu đề…" value={q} onChange={e=>setQ(e.target.value)} style={{maxWidth:320}}/>
        <span className="small">Tổng: {filtered.length}</span>
      </div>
      <div className="grid">
        {filtered.map(p => (<PostCard key={p.id} post={p} onDelete={onDelete} />))}
      </div>
    </section>
  )
}
