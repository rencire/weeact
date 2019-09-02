import { createElement as c} from "./lib/weeact.js";
import WeeactDOM, { Component } from "./lib/weeact-dom.js";
import h from "./lib/helpers.js";

// Functional Stateless Component
const Main = ({ from }) =>
  h.div(
    { className: "main" },
    "hey there!",
    h.h1(
      {
        className: "title",
        style: {
          color: "blue",
          backgroundColor: "red"
        }
      },
      "Title"
    ),
    h.p("No props for this element"),
    h.p({ id: "a", style: { color: "green" } }, "Some props for this element"),
    `Test from prop: ${from}`,
    // c(Counter),
  );

// Component
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return h.div({ className: "app" }, c(Main, { from: "King of Tree" }));
  }
}

// Component w/ state
// const Counter = ({}) => {
//   const [ count, setCount ] = useState(0);

//   return h.div(
//      h.p(`Count: ${count}`),
//      h.button({onclick: () => setCount(count+1)}, 'Increment count'),
//   );
// }

// // Component w/ multiple state
// const TextInput = ({}) => {
//   const [ count, setCount ] = useState(0);
//   const [ text, setText ] = useState('');

//   const handleInput = (e) => {
//     setText(e.target.value);
//     setCount(count+1); 
//   };

//   return h.div(
//      h.p(`Text: ${text}. Number of times edited: ${count}`),
//      h.input({oninput: handleInput}, 'Increment count'),
//   );
// }

WeeactDOM.render(
  c(App, { className: "test" }),
  document.querySelector("#root"),
  true
);
