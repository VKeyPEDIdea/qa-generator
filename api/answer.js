({
    create: (projectName, { ...answers }) => {
        const path = `${config.projects.path}/${projectName}/answers`;
        const files = fs.readdirSync(path);
        Object.values(answers).forEach(data => {
            let nextFileName = files.length + 1;
            fs.writeFile(`${path}/${nextFileName}.json`, JSON.stringify(data), (err) => {
                if (err) throw err;
                console.log(`New answer has been added: ${nextFileName}.json`);
            })
            nextFileName += 1;
        });
    },
});
