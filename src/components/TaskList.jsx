import React from 'react';
import TaskItem from '../components/TaskItem';
import { useTasks } from '../provider/TaskProvider';

const TaskList = ({ title, taskType }) => {
    const { tasks } = useTasks();
    const filteredTasks = tasks[taskType] || [];
    console.log(filteredTasks)
  
    return (
      <div className="task-list space-y-4">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} taskType={taskType}/>
          ))
        ) : (
          <p className="text-gray-500">No tasks available</p>
        )}
      </div>
    );
  };
  
  export default TaskList;
  
