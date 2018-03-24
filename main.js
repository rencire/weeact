import { createElement as c } from "./lib/weeact.js";
import WeeactDOM, { Component } from "./lib/weeact-dom.js";
import h from "./lib/helpers.js";
// NOTE
// - caveats:
//  - Need to wrap stateless component to allow for cleaner syntax in `render()`
// const Main = ({ from }) =>
//   h.div(
//     { className: "main" },
//     "hey there!!!",
//     h.h1(
//       {
//         className: "title",
//         style: {
//           color: "blue",
//           backgroundColor: "red"
//         }
//       },
//       "Title"
//     ),
//     h.p("no props for this element"),
//     h.p({ id: "a", style: { color: "green" } }, "Some props for this element"),
//     `from prop: ${from}`
//   );
// class App extends Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return h.div({ className: "app" }, c(Main, { from: "King of Tree" }));
//   }
// }
// WeeactDOM.render(
//   c(App, { className: "test" }),
//   document.querySelector("#root")
// );
