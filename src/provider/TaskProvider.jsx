import { createContext, useContext, useEffect, useState } from 'react';
import { getTasks } from '../utils/api';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getTasks();
      setTasks(response.data);
    }
    fetchData();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TaskContext);
};