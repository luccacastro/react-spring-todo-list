import React, { useState, useEffect } from 'react';
import { updateTask, deleteTask } from '../utils/api';
import { useTasks } from '../provider/TaskProvider';
import { TaskUpdateModal } from './TaskUpdateModal';
import { Button } from '@mui/material';

const TaskItem = ({ task, taskType }) => {
  const { setTasks } = useTasks();
  const [timeLeft, setTimeLeft] = useState(() => {
    if (taskType === 'timedTasks') {
      const startTime = new Date(...task.startTime);
      const endTime = new Date(...task.endTime);
      const now = new Date();

      if (now < startTime) {
        return Math.max(0, Math.floor((endTime - startTime) / 1000));
      } else {
        return Math.max(0, Math.floor((endTime - now) / 1000));
      }
    }
    return 0;
  });
  const [isActive, setIsActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(task.title);
  const [updatedDescription, setUpdatedDescription] = useState(task.description);

  useEffect(() => {
    let timer;
    if (taskType === 'timedTasks' && isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, taskType]);

  const handleComplete = async () => {
    try {
      const updatedTask = { ...task, completed: true };
      await updateTask(task.id, updatedTask);
      setTasks(prevTasks => ({
        ...prevTasks,
        [taskType]: prevTasks[taskType].map(t => (t.id === task.id ? updatedTask : t))
      }));
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      setTasks(prevTasks => ({
        ...prevTasks,
        [taskType]: prevTasks[taskType].filter(t => t.id !== task.id)
      }));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleStartStop = () => {
    setIsActive(!isActive);
  };

  const handleTaskUpdate = async () => {
    try {
        //last second workaround
        delete task["uuid"]
        delete task["parentTask"]
        delete task["subTasks"]
      const updatedTask = {
        ...task,
        title: updatedTitle,
        description: updatedDescription,
        task_type: taskType 
      };
      await updateTask(task.id, updatedTask);
      setTasks(prevTasks => ({
        ...prevTasks,
        [taskType]: prevTasks[taskType].map(t => (t.id === task.id ? updatedTask : t))
      }));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const formatTimeLeft = (seconds) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
  };

  return (
    <div className="task-item bg-white p-4 rounded-lg shadow-md flex flex-col justify-between items-start">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-orange-600">{task.title}</h3>
        <p className="text-gray-700 mt-2">{task.description}</p>
        <p className={`text-lg font-bold ${task.completed ? 'text-green-500' : 'text-red-500'}`}>
          Status: {task.completed ? 'Completed' : 'Not Completed'}
        </p>
      </div>
      <div className="w-full flex justify-between items-center">
        {taskType === 'timedTasks' && (
          <div className="flex items-center space-x-2">
            <p className="text-lg font-mono text-orange-500">
              Time Left: {timeLeft > 0 ? formatTimeLeft(timeLeft) : '00:00:00'}
            </p>
            <Button
              onClick={handleStartStop}
              variant="contained"
              color={isActive ? 'secondary' : 'primary'}
            >
              {isActive ? 'Stop' : 'Start'}
            </Button>
          </div>
        )}
        {taskType === 'dueDateTasks' && task.dueDate && (
          <p className="text-lg text-orange-500">Due Date: {new Date(...task.dueDate).toLocaleString()}</p>
        )}
        <div className="flex space-x-2 ml-auto">
          {!task.completed && (
            <Button
              onClick={handleComplete}
              variant="contained"
              color="warning"
            >
              Complete
            </Button>
          )}
          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="contained"
            color="info"
          >
            Update
          </Button>
        </div>
      </div>
      <TaskUpdateModal
        isModalOpen={isModalOpen}
        updatedTitle={updatedTitle}
        updatedDescription={updatedDescription}
        setUpdatedTitle={setUpdatedTitle}
        setUpdatedDescription={setUpdatedDescription}
        handleTaskUpdate={handleTaskUpdate}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default TaskItem;
