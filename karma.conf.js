module.exports = (config) => {
  config.set({
    basePath: '../..',
    frameworks: ['jasmine'],
		coverageReporter: { 
			reporters: [ { type: 'lcov' }] 
		}
  });
}