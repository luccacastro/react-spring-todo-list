import { useState } from 'react';
import { createTask } from '../utils/api';
import { useTasks } from '../provider/TaskProvider';

const DATE_NOW = new Date().toISOString().slice(0, 16)

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [taskType, setTaskType] = useState('standardTasks');
    const [duration, setDuration] = useState('');
    const [dueDate, setDueDate] = useState(DATE_NOW);
    const { setTasks } = useTasks();
    const [error, setError] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const newTask = { title, description, task_type: taskType };
  
      if (taskType === 'timedTasks') {
        if (!duration) {
          setError('Please enter a valid duration in the format hh:mm:ss (up to 23:59:59).');
          return;
        }
        newTask.startTime = new Date().toISOString();
        newTask.endTime = new Date(Date.now() + parseDuration(duration) * 1000).toISOString();
      }
  
      if (taskType === 'dueDateTasks') {
        if (!dueDate) {
          setError('Please enter a valid due date and time.');
          return;
        }
        newTask.dueDate = new Date(dueDate).toISOString();
      }
  
      try {
        const response = await createTask(newTask);
        setTasks(prevTasks => ({
          ...prevTasks,
          [taskType]: [...(prevTasks[taskType] || []), response.data]
        }));
        setTitle('');
        setDescription('');
        setTaskType('standardTasks');
        setDuration('');
        setDueDate('');
        setError('');
      } catch (error) {
        console.error('Error creating task:', error);
        if (error.response && error.response.data) {
          setError(error.response.data.error || 'Failed to create task.');
        } else {
          setError('Failed to create task.');
        }
      }
    };
  
    const parseDuration = (duration) => {
      const [hours, minutes, seconds] = duration.split(':').map(Number);
      return (hours * 3600) + (minutes * 60) + (seconds || 0);
    };
  
    return (
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg mb-6 shadow-md">
        {error && <div className="bg-red-200 text-red-700 p-2 rounded mb-4">{error}</div>}
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-2 bg-transparent border-b-2 border-gray-300 rounded-none focus:outline-none focus:border-orange-500 text-xl"
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 p-2 bg-transparent border-b-2 border-gray-300 rounded-none focus:outline-none focus:border-orange-500 text-lg resize-none"
        ></textarea>
        <select
          value={taskType}
          onChange={(e) => setTaskType(e.target.value)}
          className="w-full mb-4 p-2 bg-transparent border-b-2 border-gray-300 rounded-none focus:outline-none focus:border-orange-500 text-lg"
        >
          <option value="standardTasks">Standard Task</option>
          <option value="dueDateTasks">Due Date Task</option>
          <option value="timedTasks">Timed Task</option>
        </select>
        {taskType === 'timedTasks' && (
          <input
            type="time"
            step="1"
            max="23:59:59"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full mb-4 p-2 bg-transparent border-b-2 border-gray-300 rounded-none focus:outline-none focus:border-orange-500 text-lg font-mono"
          />
        )}
        {taskType === 'dueDateTasks' && (
          <input
            type="datetime-local"
            value={dueDate}
            min={DATE_NOW}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full mb-4 p-2 bg-transparent border-b-2 border-gray-300 rounded-none focus:outline-none focus:border-orange-500 text-lg"
          />
        )}
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition w-full text-lg">Add Task</button>
      </form>
    );
  };
  
  export default TaskForm;
