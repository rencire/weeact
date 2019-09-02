import { createElement as c, useState } from "./lib/weeact.js";
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
    c(Counter),
    c(MultipleCounter),
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
const Counter = ({}) => {
  const [ count, setCount ] = useState(0);

  return h.div(
     h.p(`Count: ${count}`),
     h.button({onclick: () => setCount(count+1)}, 'Increment count'),
  );
}

// Component w/ multiple state
const MultipleCounter = ({}) => {
  const [ countA, setCountA ] = useState(0);
  const [ countB, setCountB ] = useState(0);

  const handleClick = (e) => {
    setCountA(countA+1); 
    setCountB(countB+2); 
  };

  return h.div(
     h.p(`Count A: ${countA}`),
     h.p(`Count B: ${countB}`),
     h.button({onclick: handleClick}, 'Increment both counts'),
  );
}

WeeactDOM.render(
  c(App, { className: "test" }),
  document.querySelector("#root"),
  true
);
