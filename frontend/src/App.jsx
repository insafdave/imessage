import './App.css';
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react';
import { useState } from 'react';
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>MY APP</h1>

      <header>
        <Show when="signed-out">
          <SignInButton mode="modal" />
          <SignUpButton mode="modal" />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
    </div>
  )
};

export default App;
