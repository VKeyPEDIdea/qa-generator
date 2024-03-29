import getItemsListByKeyFromStorage from 'shared/utils/getProjectKeysFromStorage';
import QA_PROJECT_KEY from 'shared/enums/qaProjectKey';

export interface IProjectListStore {
    projectListKeys: string[];
}

class ProjectListStore implements IProjectListStore {
    projectListKeys: string[];

    constructor() {
        this.projectListKeys = getItemsListByKeyFromStorage(QA_PROJECT_KEY) || [];
    }
}

export default ProjectListStore;