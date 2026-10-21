import type { Dispatch, SetStateAction } from 'react';

export type Task = {
    id: string;
    title: string;
    description: string;
    done: boolean;
    createdAt: string;
};

export type TasksProps = {
    tasks: Task[];
    setTasks: Dispatch<SetStateAction<Task[]>>;
};