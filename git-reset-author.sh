#!/bin/sh

# Credits: http://stackoverflow.com/a/750191

git filter-branch -f --env-filter "
    GIT_AUTHOR_NAME='Yaoni'
    GIT_AUTHOR_EMAIL='y.wang7@uq.net.au'
    GIT_COMMITTER_NAME='Yaoni'
    GIT_COMMITTER_EMAIL='y.wang7@uq.net.au'
  " HEAD
