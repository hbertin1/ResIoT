import Banner from './Banner'
import Body from './Body'
import Display from './Display'

function App() {
  return (
    <div>
      <Banner />
      <Body/>
      <Display id={1}/>
    </div>
  )
}

export default App;