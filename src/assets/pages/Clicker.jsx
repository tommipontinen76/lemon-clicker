import Balance from '../../components/Balance.jsx'
import Booster from '../../components/Booster.jsx'
import Header from '../../components/Header.jsx'
import Lemon from '../../components/Lemon.jsx'

function Clicker(props) {
  return (
    <div className="container clicker">
      <Header>lemon clicker</Header>
      <Balance total={props.stats.clicks} />
      <Lemon onClick={props.handleClick} />
      <Booster value={props.stats.increase} />
    </div>
  )
}

export default Clicker
