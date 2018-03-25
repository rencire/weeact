# weeact

A wee little implemention of [react.js][react] for personal learning.

# Quick start

#### Install:

```
npm install
```

#### Demo

```
npm run demo
```

#### Develop

```
// build src files
npm run watch
// run tests on src changes
npm run test.wa
```

# TODO

* Vdom syntax

  * [x] Functional stateless component
  * [x] Template for common DOM elements (h1, p, div)
  * [x] Build virtual tree of components and dom nodes (initial render)
  * [x] Initial render on page

* Components
  * [ ] setState()
  * Lifecycle events:
    * Mounting:
      * [ ] constructor()
      * [ ] componentWillMount()
      * [ ] render()
      * [ ] componentDidMount()
    * Updating:
      * [ ] componentWillReceiveProps()
      * [ ] cshouldComponentUpdate()
      * [ ] componentWillUpdate()
      * [ ] render()
      * [ ] componentDidUpdate()
    * Unmounting:
      * [ ] componentWillUnmount()
    * Error Handling:
      * [ ] componentDidCatch()
* Rendering

  * [ ] Naively render all of virtual tree
  * [ ] Sub-tree Rendering
  * [ ] Batching
  * Diff algorithm:

    * Elements:
      * [ ] different type
      * [ ] same type
    * Components:
      * [ ] different type
      * [ ] same type
    * [ ] Keys

* [ ] Event Delegation

# Resources

## React

* https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html
* https://github.com/reactjs/react-basic
* https://reactjs.org/docs/reconciliation.html
* https://reactjs.org/docs/design-principles.html
* https://calendar.perfplanet.com/2013/diff/
* https://stackoverflow.com/questions/21109361/why-is-reacts-concept-of-virtual-dom-said-to-be-more-performant-than-dirty-mode#23995928

## typescript

* https://www.typescriptlang.org/docs/handbook/basic-types.html
* https://learnxinyminutes.com/docs/typescript/

[react]: https://reactjs.org/ "react"
