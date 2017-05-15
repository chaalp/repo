import {Injectable} from '@angular/core'
import {Http, Response, Headers} from '@angular/http'

import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { Task } from '../model/Task';

@Injectable()
export class TaskService {

    constructor (private http: Http) {
        console.log("Task Service Initialized...");
    }

    getTasks() {
        return this.http.get('/api/tasks')
            .map(res => res.json());
    }

    addTask(task) {
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post('/api/task', JSON.stringify(task), {headers: headers})
                    .map((res: Response) => res.json());
    }

    deleteTask(id) {
        return this.http.delete('/api/task/'+id)
                    .map(res=> res.json());
    } 

    updateStatus(task) {
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.put('/api/task/'+task._id, JSON.stringify(task), {headers: headers})
                    .map(res=> res.json());
    }
}