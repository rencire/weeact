import { createElement as c } from "./weeact"
import WeeactDOM, {Component} from "./weeact-dom"

import h from "./helpers"


// NOTE
// - caveats:
//  - Need to wrap stateless component to allow for cleaner syntax in `render()`
const Main = ({ from }) => (
    h.div({className: 'main'},
      "hey there!!!",
      h.h1({
          className: "title",
          style: {
            color: "blue",
            backgroundColor: "red"
          }
        },
        "Title"
      ),
      h.p("no props for this element"),
      h.p({id: "a", style: {color: "green"}}, "Some props for this element"),
      `from prop: ${from}`
    )
)

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      h.div({className: 'app'},
        c(Main, {from: 'King of Tree'})
      )
    )
  }
}

WeeactDOM.render( c(App, {className: "test"}), document.querySelector("#root"))
