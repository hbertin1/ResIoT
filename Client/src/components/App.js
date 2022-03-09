import Banner from './Banner'
import Body from './Body'
import Cart from './Cart'


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
      {/* <Cart /> */}
    </div>
  )
}

export default App;