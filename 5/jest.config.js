module.exports = {
  displayName: 'weihnachtskind',
  preset: 'ts-jest',
  transform: {
    '^.+\\.sql$': '<rootDir>/jest-raw-transformer.js',
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html']
}
