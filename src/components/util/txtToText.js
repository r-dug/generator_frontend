const reader = new FileReader()
        console.log(fileType)
        reader.onload = (e) => {
        const content = e.target.result
        setResumeValue(content)
        }

        return reader.readAsText(file)