# favour

> 该项目用于GitHub pages部署个人站点

### 步骤

### 1. 创建仓库 
```
在github上创建，并按提示上传代码（注：要把build打包后的dist一起上传，确保 dist 目录被 git 托管）
```

### 2. 推送到 subtree 
```
在dist生成后，执行 git subtree push --prefix=dist origin gh-pages
git会自动创建gh-pages分支并实现gitHub pages（可进settings->GitHub Pages查看）
```

```
注：每次更新代码要把dist一起push上去！！！
```


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
