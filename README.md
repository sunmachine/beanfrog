# BeanFrog

It's a bot. It's stupid. And I love it.

# Deployment

You can't. Well, you can. Do it yourself. Local-only. No GitHub actions for this shit.

```zsh
#!/bin/zsh

# Startup ssh-agent
eval $(ssh-agent -s) >> /dev/null

deploy-beanfrog () {
  { #try
    ssh-add ~/.ssh/my_rsa
    ssh user@myraspberrypi "cd ~/beanfrog && ./update.sh"
  } || { #catch
    echo "Failed to deploy to BeanFrog..."
  }
}
```
