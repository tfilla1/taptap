# taptap

an app for pianoing around with shapes and colors and whatnot;

## Project setup

### Intro to Git

all of the following git commands can be replaced by downloading github desktop:
[Github Desktop](https://github.com/apps/desktop)

[otherwise prepare to jump in](https://ohshitgit.com/)

get the project

```{shell}
git clone https://github.com/tfilla1/taptap.git
```

for adding a feature, create a branch off of main

```{shell}
git checkout main
git checkout -b {{user}}/{{feature}}
```

when the feature is ready to be added to main

```{shell}
git add .
git commit -m '{{update message}}'
git push origin {{user}}/{{feature}}
```

then submit a pull request, through github

### Intro to Node

install node, vite and pnpm, these will be helpful in local development. also, since javascript is javascript, i highly recommend nvm, which is a Node Version Manager to bounce around in versions.

[pnpm](https://pnpm.io/)
[node](https://nodejs.org/)
[nvm](https://github.com/nvm-sh/nvm)
[vite](https://vitejs.org/)

### install dependencies

``` {shell}
pnpm install
```

### Compiles and hot-reloads for development

``` {shell}
pnpm run dev
```

### Compiles and minifies for production

```{shell}
pnpm run build
```

### Lints and fixes files

```{shell}
pnpm run lint
```

The app will start running on [https://localhost:3420/]

## Other Things

[draw shapes using paperjs](http://paperjs.org/)

[play sounds using howler](https://howlerjs.com/)

## Intro to Music Theory
