#!/bin/zsh

# Update script.
# CHMOD +x to run.


# Utility Functions

printh () {
  echo "----------------------------------------------"
  echo "        $1"
  echo ""
}


# Steps

git-checkout () {
  { # try
    printh "Git: Pull Latest"
    git fetch origin && \
    git reset --hard origin/master
  } || { # catch 
    echo "Failed to pull latest changes. Exiting..."
    exit 1
  }
}

stop-containers () {
  { # try
    # https://nickjanetakis.com/blog/docker-tip-83-stop-docker-containers-by-name-pattern
    printh "Docker: Stop Containers"
    docker container stop $(docker container ls -q --filter name=beanfrog-bot-service-container)
  } || { # catch 
    echo "Failed to stop Docker containers. Exiting..."
    exit 1
  }
}

build () {
  { # try
    printh "Docker: Build"
    docker-compose build
  } || { # catch 
    echo "Failed to build latest changes. Exiting..."
    exit 1
  }
}

start-containers () {
  { # try
    printh "Docker: Start BeanFrog"
    docker-compose up --detach
  } || { # catch 
    echo "Failed to up the container. Exiting..."
    exit 1
  }
}

# Execution

git-checkout
stop-containers
build
start-containers