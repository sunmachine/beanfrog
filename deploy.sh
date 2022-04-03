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
    printh "PNPM: Build"
    nvm use
    NODE_ENV=production pnpm build
  } || { # catch 
    echo "Failed to build latest changes. Exiting..."
    exit 1
  }
}

restart-service () {
  { # try

    printh "systemd: Restart (user instance)"
    systemctl --user restart beanfrog
  } || { # catch 
    echo "Failed to build latest changes. Exiting..."
    exit 1
  }
}


# Execution

git-checkout
build
restart-service
