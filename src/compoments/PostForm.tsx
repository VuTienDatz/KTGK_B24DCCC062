// src/components/PostForm.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Category, PostInput } from '../types'

const CATEGORIES: Category[] = ['Công nghệ','Du lịch','Ẩm thực','Đời sống','Khác']

export default function PostForm({
  mode, initial, onSubmit
}:{
  mode: 'create' | 'edit'
  initial?: PostInput
  onSubmit: (input: PostInput) => void
}){
  const nav = useNavigate()

  // State
  const [title, setTitle] = useState(initial?.title ?? '')
  const [author, setAuthor] = useState(initial?.author ?? '')
  const [thumbnail, setThumbnail] = useState(initial?.thumbnail ?? '')
  const [content, setContent] = useState(initial?.content ?? '')
  const [category, setCategory] = useState<Category>(initial?.category ?? 'Công nghệ')

  const [errors, setErrors] = useState<Record<string,string>>({})

  // Validate
  const validate = () => {
    const e: Record<string,string> = {}
    if (!title || title.trim().length < 10) e.title = 'Tiêu đề ít nhất 10 ký tự'
    if (!author || author.trim().length < 3) e.author = 'Tác giả ít nhất 3 ký tự'
    if (!content || content.trim().length < 50) e.content = 'Nội dung ít nhất 50 ký tự'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  // Submit
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault()
    if (!validate()) return
    onSubmit({
      title: title.trim(),
      author: author.trim(),
      thumbnail: thumbnail.trim(),
      content: content.trim(),
      category
    })
  }

  return (
    <section className="card">
      <h2>{mode === 'create' ? 'Tạo bài viết' : 'Chỉnh sửa bài viết'}</h2>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
        {/* Tiêu đề */}
        <div>
          <label htmlFor="title">Tiêu đề</label>
          <input
            id="title"
            className="input"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Ít nhất 10 ký tự"
          />
          {errors.title && (
            <div className="small" style={{ color: '#b91c1c' }}>{errors.title}</div>
          )}
        </div>

        {/* Tác giả */}
        <div>
          <label htmlFor="author">Tác giả</label>
          <input
            id="author"
            className="input"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            placeholder="Ít nhất 3 ký tự"
          />
          {errors.author && (
            <div className="small" style={{ color: '#b91c1c' }}>{errors.author}</div>
          )}
        </div>

        {/* Thumbnail */}
        <div>
          <label htmlFor="thumb">URL ảnh thumbnail</label>
          <input
            id="thumb"
            className="input"
            value={thumbnail}
            onChange={e => setThumbnail(e.target.value)}
            placeholder="https://..."
            inputMode="url"
          />
        </div>

        {/* Nội dung */}
        <div>
          <label htmlFor="content">Nội dung</label>
          <textarea
            id="content"
            className="input"
            rows={10}
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Ít nhất 50 ký tự"
          />
          {errors.content && (
            <div className="small" style={{ color: '#b91c1c' }}>{errors.content}</div>
          )}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category">Thể loại</label>
          <select
            id="category"
            className="select"
            value={category}
            onChange={e => setCategory(e.target.value as Category)}
          >
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Actions */}
        <div className="actions" style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button className="btn" type="submit">
            {mode === 'create' ? 'Đăng bài' : 'Cập nhật'}
          </button>
          <button
            className="btn secondary"
            type="button"
            onClick={() => nav(-1)}  // ✅ dùng useNavigate, không dùng history
            aria-label="Hủy và quay lại"
          >
            Hủy
          </button>
        </div>
      </form>
    </section>
  )
}
