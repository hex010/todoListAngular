import {v4 as uuidv4} from 'uuid';
export class Todo {
    public id: string;
    public title: string;
    public description: string;
    public completed: boolean;

    constructor(title: string, description: string){
        this.id = uuidv4();
        this.title = title;
        this.description = description;
        this.completed = false;
    }
}