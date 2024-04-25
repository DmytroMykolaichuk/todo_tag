export const getTasks = state => state.tasks;

export const getTaskEmails = state => state.tasks.map(task => task.email);

export const getStatusFilter = state => state.filters.status;
