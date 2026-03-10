import { useEffect, useState } from 'react'
import './App.css'
import { login, logout } from './store/authSlice'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

function App() {
  
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentuser()
    .then((userData)=>{
      if(userData){
        dispatch(login(userData))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>{
      setLoading(false)
    })

  }, [])
  
  return !loading ? (
    <>
    <div className=''>
      <Header/>
      <Footer/>
    </div>
    </>
  ) : (
    <>
    <div>loadding</div>
    </>
  )
}

export default App
