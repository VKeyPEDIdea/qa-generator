import getItemsListByKeyFromStorage from 'shared/utils/getProjectKeysFromStorage';
import QA_PROJECT_KEY from 'shared/enums/qaProjectKey';
import api from 'api';

export interface IProjectListStore {
    projectListKeys: string[];
}

class ProjectListStore implements IProjectListStore {
    projectListKeys: string[];

    constructor() {
        // this.projectListKeys = getItemsListByKeyFromStorage(QA_PROJECT_KEY) || [];
        this.projectListKeys = [];
        this.init();
    }

    async init() {
      this.projectListKeys = await api.general.getProjectList();
    }
}

export default ProjectListStore;