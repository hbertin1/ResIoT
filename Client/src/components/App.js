import Banner from './Banner'
import Body from './Body'
import Display from './Display'


// function reducer(state, action) {
//   if (action.type === "OnOff") {
//       return {
//           ...state,
//           runningC: !state.runningC
//       };
//   }
//   return state;
// }

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