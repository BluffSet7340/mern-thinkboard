import React from 'react'
import {Route, Routes} from 'react-router'
import HomePage from './pages/HomePage'
import CreateNotePage from './pages/CreateNotePage'
import ViewNoteDetailPage from './pages/ViewNoteDetailPage'

const App = () => {
  return (
    <div className='relative h-full w-full' >
      <div>
      <Routes>
        {/* go to this route and boom it take you to the home page */}
        <Route path='/' element={<HomePage/>}/>
        <Route path='/create' element={<CreateNotePage/>}/>
        {/* id will be dynamic */}
        <Route path='/note/:id' element={<ViewNoteDetailPage/>}/>
      </Routes>
      </div>
    </div>
  )
}

export default App