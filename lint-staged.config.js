module.exports = {
  "*.{ts,tsx}": [
    "prettier --write",
    "tslint -c tslint.json --fix",
    "git add",
    "jest --bail --findRelatedTests"
  ],
  "*.{json,md}": ["prettier --write", "git add"]
};
