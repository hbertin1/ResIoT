import Banner from './Banner'
import Body from './Body'
import { useDispatch } from 'react-redux';
import { addLed } from './Store';


function App() {

  const dispatch = useDispatch();
  dispatch(addLed(1, true));
  dispatch(addLed(2, true));
  dispatch(addLed(3, true));
  dispatch(addLed(4, true));

  return (
    <div>
      <Banner />
      <Body/>
    </div>
  )
}

export default App;