import WeeactDOM from "./weeact-dom"
import {
  div,
  h1,
  p,
  wrap as c
} from "./helpers"

// import { Component, createElement as n } from "./weeact"

// NOTE
// - caveats:
//  - Need to wrap stateless component to allow for cleaner syntax in `render()`
const App = c(
  ({className, children}) => div({className}, ...children)
)

// Alternatively, declare it without wrapping
// const App = ({className, children}) => div({className}, children)
//
// but now when we render, we need to specify like this:
//
//
// import { createElement as w } from "./weeact"
//
// WeeactDOM.render(
//   w('App',
//     {className: "test"},
//     ...
//   ),
//   document.getElementById("root")
// )




WeeactDOM.render(
  App({className: "test"},
    div({className: "myDiv"},
      "hey there!!!"
    ),
    h1({
        className: "title",
        style: {
          color: "blue",
          backgroundColor: "red"
        }
      },
      "Hey there world"
    ),
    p("no props for this element"),
    p({id: "a", style: {color: "green"}}, "Some props for this element")
  ),
  // p('test'),
  document.querySelector("#root")
)
