# 🐤 MiniExec

Minimalist approach to running shell commands in Deno.

## Usage

Passing a shell command to `miniexec` runs it and captures its output:

```ts
import { miniexec } from "https://deno.land/x/miniexec/mod.ts";

const output = await miniexec("echo hello world");

console.log(output); // Logs "hello world";
```

Wrap the miniexec call in a try & catch to handle command errors:

```ts
import { miniexec } from "https://deno.land/x/miniexec/mod.ts";

try {
  await miniexec("cat i_do_not_exist.txt");
} catch (err) {
  console.error(err.message); // Logs "i_do_not_exist.txt: No such file or directory";
}
```

## Options

Besides the input command, `miniexec` accepts a parameter object:

```ts
import { miniexec, MiniExecOptions } from "https://deno.land/x/miniexec/mod.ts";

const options: MiniExecOptions = {
  printOutput: false,
  shell: "/bin/sh",
};

await miniexec("echo hello world", options);
```

**`options.printOutput`**

By default, `miniexec` captures the stdout/stderr without printing it. Set `printOutput` to `true` to dump the output to stdoud/stderr (while still capturing it).

**`options.shell`**

Specifies what shell is used. Default is `/bin/sh`.
