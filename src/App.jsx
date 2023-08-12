import { UserProvider } from './context/user';
import Todos from './components/Todos';
import UserButton from './components/UserButton';

function App() {
  return (
    <UserProvider>
      <div className="my-4 m-auto max-w-sm px-2 flex flex-col">
        <UserButton />
        <Todos />
      </div>
    </UserProvider>
  );
}

export default App;
