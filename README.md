# taptap

an app for pianoing around with shapes and colors and whatnot;


## Project setup

get the project

```{shell}
git clone https://github.com/tfilla1/taptap.git
```

for adding a feature, create a branch off of main

```{shell}
git checkout main
git checkout -b {user}/{feature}
```

when the feature is ready to be added to main

```{shell}
git add .
git commit -m '{update message}'
git push origin {user}/{feature}
```

then submit a pull request, through github

install bun, this will be the package manager and server we'll use.

```{shell}
curl -fsSL https://bun.sh/install | bash
```

install dependencies

``` {shell}
# bun 
bun install
```

### Compiles and hot-reloads for development

``` {shell}

# bun 
bun run dev
```

### Compiles and minifies for production

```{shell}
# bun 
bun run build
```

### Lints and fixes files

```{shell}
# bun 
bun run lint
```

The app will start running on [https://localhost:3420/]


## Other Things

[draw shapes using paperjs](http://paperjs.org/)

[play sounds using howler](https://howlerjs.com/)
