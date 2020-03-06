const map = {
    'A': handleJobA,
    'B': handleJobB
}

process.on('message', (msg) => {
    if (map[msg]) {
        const result = map[msg]()
        process.send(result)
    } else {
        process.send('Job not exist')
    }
})

function handleJobA() {
    for (let i = 0; i < 1e10; i++){}
    for (let i = 0; i < 1e10; i++){}
    return 'handle job A'
}

function handleJobB() {
    for (let i = 0; i < 1e10; i++){}
    for (let i = 0; i < 1e10; i++){}
    return 'handle job B'
}
