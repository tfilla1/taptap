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

install node, vite and pnpm, these will be helpful in local development.

[node](https://nodejs.org/)
[vite](https://vitejs.org/)
[pnpm](https://pnpm.io/)

install dependencies

``` {shell}
# pnpm
pnpm install


### Compiles and hot-reloads for development

``` {shell}

# pnpm 
pnpm run dev
```

### Compiles and minifies for production

```{shell}
# pnpm 
pnpm run build
```

### Lints and fixes files

```{shell}
# pnpm 
pnpm run lint
```

The app will start running on [https://localhost:3420/]


## Other Things

[draw shapes using paperjs](http://paperjs.org/)

[play sounds using howler](https://howlerjs.com/)
