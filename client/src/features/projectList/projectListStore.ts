import api from 'api';
import { makeAutoObservable } from 'mobx';

export interface IProjectListStore {
    projectListKeys: string[];
}

class ProjectListStore implements IProjectListStore {
    projectListKeys: string[];

    constructor() {
        this.projectListKeys = [];
        makeAutoObservable(this);
        this.init();
    }

    async init() {
      this.projectListKeys = await api.general.getProjectList();
    }
}

export default ProjectListStore;