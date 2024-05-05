import api from 'api';
import { makeAutoObservable, runInAction } from 'mobx';

export interface IProjectListStore {
  projectListKeys: string[];
  loadProjectList: () => void;
}

class ProjectListStore implements IProjectListStore {
  projectListKeys: string[] = [];

  constructor() {
    this.loadProjectList = this.loadProjectList.bind(this);
    makeAutoObservable(this);
  }

  loadProjectList() {
    api.general
      .getProjectList()
      .then((res) => {
        runInAction(() => {
          this.projectListKeys = res;
        });
        return res;
      })
      .catch((err) => console.error(err));
  }
}

export default ProjectListStore;
