#Project Requirement

1. Task Management
    * Edit, Delete, View Task, Add task
    * Properties -> Title,Description,Due Date, Priority(Low,Medium,High),Status(Pending,In Progress,Completed)
2. Task Filtering and Sorting
    * Allow filter on the basis of Pending,In Progress,Completed
    * Allow Sorting by due data or Priority
3. Api Integration
    * Implement it in the localstorage
    * Migrate to Firebase 


type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'In Progress' | 'Completed';
};
