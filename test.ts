import {
  assertEquals,
  assertThrowsAsync,
} from "https://deno.land/std/testing/asserts.ts";

import { miniexec } from "./mod.ts";

Deno.test({
  name: `Succeeds when the command runs successfully`,
  async fn() {
    const output = await miniexec("echo hello world");
    assertEquals(output, "hello world");
  },
});

Deno.test({
  name: `Runs multiple commands in parallel successfully`,
  async fn() {
    const output = await Promise.all([
      miniexec("echo hello world 1"),
      miniexec("echo hello world 2"),
      miniexec("echo hello world 3"),
    ]);
    assertEquals(output[0], "hello world 1");
    assertEquals(output[1], "hello world 2");
    assertEquals(output[2], "hello world 3");
  },
});

Deno.test({
  name: `Throws when the command errors out`,
  async fn() {
    await assertThrowsAsync(
      async () => {
        return await miniexec("cat i_do_not_exist.txt");
      },
      Error,
      "No such file or directory"
    );
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
