const { workerData, parentPort } = require('worker_threads');
const calculator = require('./calculator');

const stats = calculator.getStats(workerData);

parentPort.postMessage(stats)