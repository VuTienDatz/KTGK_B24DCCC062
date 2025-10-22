import { NavLink, useNavigate } from 'react-router-dom'


export default function Navbar(){
const nav = useNavigate()
const style = ({isActive}:{isActive:boolean}) => ({
padding: '8px 12px', borderRadius: 10, textDecoration:'none',
background: isActive ? '#e2e8f0' : 'transparent', color:'#0f172a'
}) as React.CSSProperties
return (
<nav>
<div className="brand" onClick={()=>nav('/')} style={{cursor:'pointer'}}>Blog<span style={{color:'#0ea5e9'}}>.</span></div>
<div style={{flex:1}} />
<NavLink to="/" style={style} end>Bài viết</NavLink>
<NavLink to="/create" style={style}>Viết bài</NavLink>
</nav>
)
}