export enum Status {
    PENDING,
    IN_PROGRESS,
    COMPLETED
}

export enum Priority {
    LOW,
    MEDIUM,
    HIGH
}

export interface Task {
    title: string;
    task_description: string;
    dueDate: string;
    priority: string;
    status: string;
    task_id: string;
}

export interface FormData {
    task_name?: string;
    task_description?: string;
    dueDate?: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
}