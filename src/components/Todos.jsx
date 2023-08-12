import { useState, useEffect } from 'react';
import {
  doc,
  query,
  where,
  addDoc,
  orderBy,
  deleteDoc,
  updateDoc,
  onSnapshot,
  collection,
} from 'firebase/firestore';

import { db } from '../api/firebase';
import { useUser } from '../context/user';


function TodoAdd({ onSubmit }) {
  const [text, setText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (text.trim()) {
      setText('');
      onSubmit(text.trim());
    }
  }

  return (
		<form className="flex justify-center" onSubmit={handleSubmit}>
      <input
        className="w-full me-2 px-2 py-1 rounded-md text-neutral-800 focus-visible:outline-orange-400"
        type="text"
        value={text}
        placeholder="Add todo"
        onChange={e => setText(e.target.value)}
      />
      <button
        className="min-w-[40px] min-h-[40px] px-4 rounded-full bg-orange-300 text-neutral-900"
        type="submit"
      >
        +
      </button>
    </form>
	);
}

function Todo({ todoItem, onToggle, onDelete }) {
	return (
		<div className="p-2 flex items-center space-x-2">
      <input
        className="accent-orange-700"
        type="checkbox"
        checked={todoItem.done}
        onChange={() => onToggle(todoItem)}
      />
      <p
        className={"flex-1 overflow-hidden text-ellipsis" + (todoItem.done ? " line-through" : "") }
      >
        {todoItem.text}
      </p>
      <button
        className="flex justify-center items-center bg-red-500 rounded-full min-w-[24px] min-h-[24px]"
        onClick={() => onDelete(todoItem)}
      >
        -
      </button>
    </div>
	);
}


function TodoList({ todoItems, onToggle, onDelete }) {
	return (
		<div className="divide-y divide-dashed divide-orange-200 space-y-1">
      {todoItems.map(item => <Todo key={item.id}
        todoItem={item}
        onToggle={onToggle}
        onDelete={onDelete}
      />)}
		</div>
	);
}


function Todos() {
	const user = useUser();
	const [todos, setTodos] = useState([]);

	useEffect(() => {
    if (user == null) return;

    const q = query(
      collection(db, 'todos'),
      where('uid', '==', user.uid),
      orderBy('time', 'asc')
    );

    const unsubscribe = onSnapshot(q, snapshot => {
			const list = snapshot.docs.map(doc => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });

			setTodos(list);
		});

		return unsubscribe;
  }, [user]);

  async function handleSubmit(text) {
    addDoc(collection(db, 'todos'), {
      text,
      done: false,
      uid: user.uid,
      time: new Date(),
    });
  }

  async function handleToggle(item) {
    updateDoc(doc(collection(db, 'todos'), item.id), {
      done: !item.done
    });
  }

  async function handleDelete(item) {
    deleteDoc(doc(collection(db, 'todos'), item.id));
  }

  return (
      <>
        {user &&
          <div className="my-8 space-y-4">
            <TodoAdd onSubmit={handleSubmit} />
            <TodoList todoItems={todos} onToggle={handleToggle} onDelete={handleDelete} />
          </div>
        }
      </>
	);
}


export default Todos;
