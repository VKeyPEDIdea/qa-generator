({
  async getProjectList() {
    try {
      const items = await fsp.readdir(config.projects.path, 'utf-8');
      console.log(items);
      return items;
    } catch (error) {
      return ['Error'];
    }
  }
});
