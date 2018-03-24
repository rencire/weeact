module.exports = {
  "hooks": {
    "pre-commit": "lint-staged",
    //"prepare-commit-msg": "./gitHooks/prepare-commit-msg ${GIT_PARAMS}",
    // "commit-msg": "./gitHooks/commit-msg ${GIT_PARAMS}",
    "pre-push": "jest -c  --bail"
  }
}
