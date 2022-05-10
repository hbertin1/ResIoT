const os = require('node:os');

const candidateInterfaces = os.networkInterfaces();
console.log(candidateInterfaces)