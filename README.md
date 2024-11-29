# bruno-postman-env-converter-lib
### This is a quick extraction on the logic Bruno uses to convert json environments to "bru" format

$${\color{red}As\ of\ July\ 4th,\ Bruno\ supports\ bulk\ env\ imports}$$ [bulk import PR](https://github.com/usebruno/bruno/pull/2509). $${\color{red}This\ leaves\ the\ use\ case\ for\ this\ logic\ to\ be\ very\ niche.}$$

>Most other API clients rely on JSON while Bruno leans on a custom BRU implementation. I simply checked their source code and extracted what's necessary to convert a *.json file to *.bru.

* This code has been tested with **postman environments** and does not work standalone. Please check in case you're using Insomnia or something else.
* I would supply a bash script, but your use case may be quite specific. Please consider these two files as a library.
* They come as is with no warranty provided. They should serve the propely frustrated person well.

>At least until Bruno implements bulk environment import.

### Example usage

1. Write a bash (or whatever type you prefer) script to handle all files you'd need in bulk. You could also extend this library.
2. Install ***npx*** (it might be already bundled) and supply these 2 files as separate scripts in the bruno *package.json*

```json
"scripts": {
    "get-env-name": "npx run-func convert.js getEnvName",
    "convert-env": "npx run-func convert.js conversion"
}
```
>**Note:** The two files need to be in the same dir since they depend on eachother.
3. Make sure that your script calls these 2 methods, one for the name, one for converting the *.json file itself.

The usage above is already implemented in this project if you'd like to run the files here.

* Simply run *npm run-script [script-name] [file]*
> The output will be visible in the terminal and could be piped (>) to a *.bru file

### Example single file conversion
```bash
echo "`npm run-script convert-env ./example-case/example-env.json | tail -n +5`" > "./output/`npm run-script get-env-name ./example-case/example-env.json | awk NR==5`"
```
> The above will convert the example env json to a **\*.bru** valid format inside the *./output* folder

### If you have any questions please email me / open an issue, and we'll work this out.
