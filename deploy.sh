#!/bin/bash

if [[ $npm_package_version =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]
then
  echo "Pushing $npm_package_version"
  git push --follow-tags
else
  echo "Pushing $npm_package_version"
  git push --follow-tags
fi