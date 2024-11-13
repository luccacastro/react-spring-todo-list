import React, { useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { TaskProvider } from '../provider/TaskProvider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export const TaskPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <TaskProvider>
      <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold mb-6 text-orange-600">To-Do List</h1>
        <TaskForm />
        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 2 }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="task type tabs">
            <Tab label="Standard Tasks" />
            <Tab label="Due Date Tasks" />
            <Tab label="Timed Tasks" />
          </Tabs>
        </Box>
        {activeTab === 0 && <TaskList title="Standard Tasks" taskType="standardTasks" />}
        {activeTab === 1 && <TaskList title="Due Date Tasks" taskType="dueDateTasks" />}
        {activeTab === 2 && <TaskList title="Timed Tasks" taskType="timedTasks" />}
      </div>
    </TaskProvider>
  );
};

  