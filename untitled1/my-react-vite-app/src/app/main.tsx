import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import {getUser, listUsers, printListUsers, sum} from "../features/zxc.tsx";

const users = listUsers();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div>Результат: {sum(2, 4)}</div>
      {printListUsers(users)}
  </StrictMode>,
)
