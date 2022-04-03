#!/bin/zsh

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

build () {
  { # try
    printh "Docker: Build"
    pnpm build
  } || { # catch 
    echo "Failed to build latest changes. Exiting..."
    exit 1
  }
}

start-service () {
  { # try

    printh "systemd: Restart (user instance)"
    systemctl --user start beanfrog
  } || { # catch 
    echo "Failed to build latest changes. Exiting..."
    exit 1
  }
}


# Execution

git-checkout
build
start-service
