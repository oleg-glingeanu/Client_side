module.exports = {
  // ... other Jest configurations
  transformIgnorePatterns: [
    "/node_modules/",
    "^logo",
    "^.+\\.module\\.(css|sass|scss)$",
    "<rootDir>/src/Assets/(.*)\\.(png|jpg|jpeg|gif)$" // ignore image files
  ],
};