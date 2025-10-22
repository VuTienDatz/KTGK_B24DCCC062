// src/App.tsx
import { Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom'
import Navbar from './compoments/Navbar'
import PostList from './pages/PostList'
import PostDetail from './pages/Post.Detail'
import PostForm from './compoments/PostForm'
import type { Post, PostInput } from './types'
import { useMemo, useState } from 'react'

const seed: Post[] = [
  {
    id: 'p1',
    title: 'Khởi đầu với TypeScript trong React',
    author: 'Minh Nguyen',
    thumbnail: 'https://picsum.photos/seed/ts/800/500',
    content: 'TypeScript giúp phát triển React an toàn hơn nhờ typing tĩnh. Bài viết này hướng dẫn cài đặt, cấu hình tsconfig và các tip thường gặp khi kết hợp với React Router...'.repeat(3),
    category: 'Công nghệ',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p2',
    title: 'Một ngày dạo Hồ Gươm',
    author: 'Lan Pham',
    thumbnail: 'https://picsum.photos/seed/hoan-kiem/800/500',
    content: 'Hà Nội đẹp nhất về đêm, đặc biệt là không gian quanh Hồ Gươm. Cùng mình khám phá những góc ảnh, đồ ăn vặt, và các quán cà phê xung quanh nhé...'.repeat(3),
    category: 'Du lịch',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p3',
    title: 'Bí quyết nấu phở bò chuẩn vị nhà làm',
    author: 'Quang Tran',
    thumbnail: 'https://picsum.photos/seed/pho/800/500',
    content: 'Nước dùng trong, thơm, ngọt từ xương là linh hồn của bát phở. Mình chia sẻ cách sơ chế, hầm xương, nêm nếm gia vị hợp lý và mẹo giữ sợi bánh dai...'.repeat(3),
    category: 'Ẩm thực',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p4',
    title: 'Sống tối giản: ít đi để được nhiều hơn',
    author: 'Thu Ha',
    thumbnail: 'https://picsum.photos/seed/minimal/800/500',
    content: 'Tối giản không chỉ là dọn dẹp vật chất, mà còn là sắp xếp lại ưu tiên trong cuộc sống. Bài viết chia sẻ hành trình và cách bắt đầu...'.repeat(3),
    category: 'Đời sống',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p5',
    title: 'Notebook lập trình: chọn máy như thế nào?',
    author: 'Tuan Le',
    thumbnail: 'https://picsum.photos/seed/laptop/800/500',
    content: 'CPU, RAM, SSD hay màn hình – yếu tố nào quan trọng khi chọn laptop cho coder? Cùng phân tích từng cấu hình với ngân sách phổ biến ở VN...'.repeat(3),
    category: 'Công nghệ',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p6',
    title: 'Checklist 24h ở Đà Lạt',
    author: 'My Anh',
    thumbnail: 'https://picsum.photos/seed/dalat/800/500',
    content: 'Đà Lạt có gì mới? Lịch trình 24h gợi ý để vừa chill vừa đủ các điểm hot: cà phê đồi, vườn hoa, food tour đêm và homestay view đồi...' .repeat(3),
    category: 'Du lịch',
    createdAt: new Date().toISOString(),
  }
]

export default function App(){
  const [posts, setPosts] = useState<Post[]>(seed)
  const navigate = useNavigate()

  const createPost = (input: PostInput) => {
    const newPost: Post = {
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      ...input,
    }
    setPosts(p => [newPost, ...p])
    alert('Đăng bài thành công!')
    navigate('/')
  }

  const updatePost = (id: string, input: PostInput) => {
    setPosts(p => p.map(item => item.id === id ? { ...item, ...input } : item))
    alert('Cập nhật thành công!')
    navigate(`/posts/${id}`)
  }

  const deletePost = (id: string) => {
    if (!window.confirm('Bạn có chắc muốn xóa bài viết này?')) return
    setPosts(p => p.filter(item => item.id !== id))
    navigate('/')
  }

  const actions = useMemo(() => ({ createPost, updatePost, deletePost }), [])

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<PostList posts={posts} onDelete={actions.deletePost} />} />
          <Route path="/posts" element={<PostList posts={posts} onDelete={actions.deletePost} />} />
          <Route path="/create" element={<PostForm mode="create" onSubmit={actions.createPost} />} />
          <Route path="/posts/create" element={<PostForm mode="create" onSubmit={actions.createPost} />} />
          <Route path="/posts/:id" element={<PostDetail posts={posts} onDelete={actions.deletePost} />} />
          <Route path="/posts/edit/:id" element={<EditWrapper posts={posts} onSubmit={actions.updatePost} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  )
}

function EditWrapper({ posts, onSubmit }: { posts: Post[]; onSubmit: (id:string, input: PostInput)=>void }){
  const { id } = useParams()
  const post = posts.find(p => p.id === id)
  if(!post) return <div className="card">Không tìm thấy bài viết.</div>
  const { createdAt, id: _id, ...rest } = post
  return <PostForm mode="edit" initial={rest} onSubmit={(input)=> onSubmit(post.id, input)} />
}
