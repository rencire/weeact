import { CURRENT_RENDERING_COMPONENT_ID, render } from "./weeact-dom.js";

type StateUpdater = (newState: any) => void;

type StateListNode = {
  state: any;
  updater: StateUpdater;
  next: StateListNode | null;
}

type StateList = {
  head: StateListNode | null;
  current: StateListNode | null;
}

// Global state Map for components using state Hooks
const COMPONENT_STATE_MAP = new Map<number, StateList>();

export const resetStateListHead = () => {
  if (CURRENT_RENDERING_COMPONENT_ID < 0) {
    return;
  }
  // Yes the ID is a number, so technically we can use an Array instead of an Map.
  // But this flexiblity allows us to change key type in future.
  const stateList = COMPONENT_STATE_MAP.get(CURRENT_RENDERING_COMPONENT_ID);

  if (stateList) {
    // Reset pointer, so next time previous Component is rendered, `useState` will return the correct states in order.
    stateList.current = stateList.head;
  }
};

const createUpdater = (stateNode: StateListNode): StateUpdater => {
  return newState => {
    // if newState is different from stateNode.state
    //   stateNode.state = newState;
    //   re-render component (for now just inefficiently re-render the whole tree from root...)
    render();
    //   // TODO In future, can add render operations in a queue.
    //   // - can then save cycles by checking if already in queue. If so, then no need to make another render operation.
  };
};

// Notes:
// - https://stackoverflow.com/questions/54673188/how-does-react-implement-hooks-so-that-they-rely-on-call-order
export const useState = (initialValue: any) => {
  // Figure out which component we're currently in
  // Retrieve hook state list for this component
  // If currentNode is null,
  //   Create a new stateNode with initial state, and a new updator function
  //   Assign it to the stateList
  // Else, retrieve  `state`, and `updater` from stateList.currentNode
  // Prepare for next `useState()` call in the same component.
  // stateList.current = stateListNode.next;
  // Reset position to head if this is the last `useState()` call in the component
  // BUT, how to differentiate between being in the last node, and calling `useState()` for the first time, (since `next` will also be null)?
  // - can move this reset logic to the function that records which component is currently rendering
  // if (stateListNode.next === null) {
  //   stateList.currentNode = stateList.head;
  // }
  // return [state, updater];
};
