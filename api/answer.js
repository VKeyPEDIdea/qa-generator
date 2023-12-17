const getAnswerDir = (projectName) => {
    return `${config.projects.path}/${projectName}/answers`;
};

({
    create: (projectName, { answers }) => {
        const path = getAnswerDir(projectName);
        Object.values(answers).forEach(data => {
            const cb = fileName => err => {
                if (err) throw err;
                console.log(`New answer has been added: ${projectName} ${fileName}.json`);
            };
            fs.writeFile(`${path}/${data.id}.json`, JSON.stringify(data), cb(data.id));
        });
    },
    delete: (projectName, id) => {
        const path = getAnswerDir(projectName);
        fs.rm(`${path}/${id}.json`, (err) => {
            if (err) console.log(err);
            console.log('Answer has been deleted: ', `${projectName} ${path}/${id}.json`);
        });
    },
});
