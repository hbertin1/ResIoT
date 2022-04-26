import { store } from './Store'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'


const dispatch = useDispatch()
const ledNumber = useSelector((state) => state.ledNumber)

dispatch({
    "type": "setLedNumber",
    "number": 5
  })
console.log(ledNumber)