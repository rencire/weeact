# weeact

A wee little implemention of [react.js][react] for personal learning.

# Quick start

### Setup

Choose one of the following:

#### A) Nixos/Nix + Direnv (preferred):

If you're using [nix](https://nixos.org/nix/), and have [direnv](https://direnv.net/) installed (e.g. `nix-env -i direnv`), simply `cd` into this repo and the correct nodejs version will be installed.

#### B) NVM

If you have [nvm](https://github.com/nvm-sh/nvm), `.nvmrc` is provided.

#### C) None of above

Pick A or B.

### Install:

```
npm install
```

### Demo

An Example application is in `index.html`, and `main.js`.

```
npx browser-sync -s
```

### Develop

Build src files

```
npx tsc --watch
```

Run tests on src changes

```
npx jest --watchAll
```

Run server and watch file for changes

```
npx browser-sync -s -f 'main.js' -f 'lib'
```

# TODO

* Vdom syntax

  * [x] Functional stateless component
  * [x] Template for common DOM elements (h1, p, div)
  * [x] Build virtual tree of components and dom nodes (initial render)
  * [x] Initial render on page

* Components

  * [ ] Hooks
    * [ ] setState()

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
