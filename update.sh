#!/bin/zsh

# Update script.
# CHMOD +x to run.

pull () {
  { # try
    git reset --hard && \
    git clean -fd && \
    git checkout master && \
    git pull --rebase
  } || { # catch 
    echo "Failed to pull latest changes. Exiting..."
    exit 1
  }
}

stop () {
  { # try
    # https://nickjanetakis.com/blog/docker-tip-83-stop-docker-containers-by-name-pattern
    docker container stop $(docker container ls -q --filter name=beanfrog-bot-service-container)
  } || { # catch 
    echo "Failed to stop Docker containers. Exiting..."
    exit 1
  }
}

build () {
  { # try
    docker-compose build
  } || { # catch 
    echo "Failed to build latest changes. Exiting..."
    exit 1
  }
}

up () {
  { # try
    docker-compose up --detach
  } || { # catch 
    echo "Failed to up the container. Exiting..."
    exit 1
  }
}

pull
stop
build
up
