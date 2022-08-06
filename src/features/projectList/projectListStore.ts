import getProjectKeysFromStorage from 'shared/utils/getProjectKeysFromStorage';

interface IProjectListStore {
    projectListKeys: string[];
}

class ProjectListStore implements IProjectListStore {
    projectListKeys: string[];

    constructor() {
        this.projectListKeys = getProjectKeysFromStorage() || [];
    }

}

export default ProjectListStore;