const project = db('project');

({
    getQuestionList(projectName) {      
        function gatherContent(name) {
            const path = `${config.projects.path}/${projectName}/${name}`;
            const files = fs.readdirSync(path, 'utf-8');
            return files.reduce((result, fileName) => {
                const file = fs.readFileSync(`${path}/${fileName}`, 'utf-8');
                return [...result, JSON.parse(file)];
            }, []);
        }

        return {
            questionList: gatherContent('questions'),
            answerList: gatherContent('answers'),
        };
    }
});
