import { createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension'; // (Tùy chọn) Để debug
import rootReducer from './reducers';

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('todoAppState');
    if (serializedState === null) return undefined; // Nếu chưa có gì thì trả về undefined để Redux dùng default state
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Không tải được state từ local storage", e);
    return undefined;
  }
}

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('todoAppState', serializedState);
  } catch (e) {
    console.warn("Không lưu được state vào local storage", e);
  }
}

const persistedState = loadFromLocalStorage();
const store = createStore(
  rootReducer,
  persistedState, 
  composeWithDevTools()
);

store.subscribe(() => {
  const state = store.getState();
  saveToLocalStorage({
    todos: state.todos,
  });
});

export default store;