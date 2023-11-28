({
  getProjectList() {
    try {
      const items = fs.readdirSync(config.projects.path, 'utf-8');
      return items;
    } catch (error) {
      console.error(error);
      return ['Error'];
    }
  }
});
