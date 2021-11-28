# 🐤 MiniExec

Minimalist approach to running shell commands in Deno.

## Usage

Pass a shell command to `miniexec` to run it and capture its output:

```ts
import { miniexec } from "https://deno.land/x/miniexec/mod.ts";

const output = await miniexec("echo hello world");

console.log(output); // "hello world"
```

Wrap the `miniexec` call in a try & catch to handle command errors:

```ts
import { miniexec } from "https://deno.land/x/miniexec/mod.ts";

try {
  await miniexec("cat i_do_not_exist.txt");
} catch (err) {
  console.error(err.message); // "i_do_not_exist.txt: No such file or directory"
}
```

## Permission

MiniExec requires
[the `--allow-run` flag](https://deno.land/manual/getting_started/permissions#permissions-list)
in order to run subprocesses.

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

By default, `miniexec` captures the stdout/stderr without printing it. Set
`printOutput` to `true` to dump the output to stdoud/stderr (while still
capturing it).

**`options.shell`**

Specifies what shell is used. Default is `/bin/sh`.
