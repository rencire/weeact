import { render } from "./weeact-dom.js";
import { CURRENT_RENDERING_COMPONENT_ID } from "./weeact.js";

type StateUpdater = (newState: any) => void;

type StateListNode = {
  state: any;
  updater?: StateUpdater;
  next: StateListNode | null;
};

export type StateList = {
  head: StateListNode | null;
  current: StateListNode | null;
  isInitialRender: boolean;
};

// Global state Map for components using state Hooks
const COMPONENT_STATE_MAP: Map<number, StateList> = new Map();

// Resets state list pointers for last rendered component
export const resetStateListHead = () => {
  // Since the ID is a number, technically we can use an Array instead of an Map.
  // But this flexiblity allows us to change key type in future.
  const stateList = COMPONENT_STATE_MAP.get(CURRENT_RENDERING_COMPONENT_ID);

  if (stateList) {
    // Reset pointer, so next time previous Component is rendered, `useState` will return the correct states in order.
    stateList.current = stateList.head;

    // Set to false after component is done rendering.
    // TODO consider moving to another function like `finishHooks()`
    stateList.isInitialRender = false;
  }
};

const createUpdater = (node: StateListNode): StateUpdater => {
  return newState => {
    // if newState is different from stateNode.state
    //   re-render component (for now just inefficiently re-render the whole tree from root...)
    //   // TODO In future, can add render operations in a queue.
    //   // - can then save cycles by checking if already in queue. If so, then no need to make another render operation.
    if (newState !== node.state) {
      node.state = newState;
      render();
    }
  };
};

// Notes:
// - https://stackoverflow.com/questions/54673188/how-does-react-implement-hooks-so-that-they-rely-on-call-order
export const useState = (initialValue: any) => {
  // Retrieve hook state list for currently rendering component
  const stateList = COMPONENT_STATE_MAP.get(CURRENT_RENDERING_COMPONENT_ID);

  // A) Initial case; Component's first render; First `useState()` call
  if (!stateList) {
    const node: StateListNode = { state: initialValue, next: null };
    // No lazy eval in JS/ES, hence can't write a fixed point function. Instead need to mutate `node` after its assigned.
    node.updater = createUpdater(node);

    // Create StateList for component
    COMPONENT_STATE_MAP.set(CURRENT_RENDERING_COMPONENT_ID, {
      current: node,
      head: node,
      isInitialRender: true
    });

    return [node.state, node.updater];
  }

  // B) Component's first render; Subsequent `useState()` calls
  // Invariants:
  // - `stateList` exists, and has one node.
  if (stateList.isInitialRender) {
    const node: StateListNode = { state: initialValue, next: null };
    node.updater = createUpdater(node);

    // Good old linked list pointer manipulation
    stateList.current.next = node;
    stateList.current = node;

    return [node.state, node.updater];
  }

  // C) Subsequent component renders; Subsequent `useState()` calls
  const { state, updater } = stateList.current;
  stateList.current = stateList.current.next;
  return [state, updater];
};
