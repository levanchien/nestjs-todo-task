export interface Task {
    id: number;
    title: string;
    description: string;
    isDone: boolean;
    isDeleted: string;
    status: TaskStatus;
    dateCreated: string;
    dateExpired: string; 
}

export enum TaskStatus {
    OPEN = 1,
    DONE = 2,
    DELETED = 3,
    EXPIRED = 4
}