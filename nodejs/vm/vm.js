const vm = require('vm');

const context = {
    animal: 'cat',
    count: 2,
    console: {
        log: (v) => {
            console.log(v);
        },
    },
};

const script = new vm.Script('count += 1; name = "kitty"; console.log(count)');

// vm.createContext(context);
script.runInNewContext(context);

console.log(context);
