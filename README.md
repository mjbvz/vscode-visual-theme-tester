# VS Code Visual Theme Tester

Automated visual testing for VS Code color themes. This cli tool helps theme developers by capturing screenshots of VS Code UI elements with a given theme.

With this tool, you:

- Write plain english scenario files that describe what you want to test in VS Code and the screenshots you want to capture. For example: "Capture the suggest widget in a TypeScript file"

- `generate`. Uses Claude to generate Playwright scripts that run each scenario. This only needs to be run when a scenario is added or changed.

- `run`. Executes the Playwright scripts and output the screenshots. This does not require any AI requests.


## Quick start

Requires Node 22+. You'll need an [Anthropic API key](https://console.anthropic.com/) for the `generate` step.

```sh
npm install
npx playwright install chromium
```

After setup, then run `generate` to create the scripts. By default this looks for `*.prompt.md` files in a folder called `theme-scenarios`:

```sh
# You can pass your ANTHROPIC_API_KEY on the command line
ANTHROPIC_API_KEY=sk-ant-... node src/cli.ts generate ./theme-scenarios

# Or using a `.env` file
node --env-file=.env src/cli.ts generate ./theme-scenarios
```

The generated `scenarios` are written to a folder called `.generated-scenarios`.

Then to execute the generated scenarios:

```sh
node src/cli.ts run --themes "My Theme Dark, My Theme Light" --extension ./path-to-my-theme-ext
```

The screenshots are saved to `theme-scenario-results/<scenario>/<theme>/` by default.


## Example

The `example-workspace/` directory contains a complete working example with a test theme extension and scenarios covering editor, workbench, terminal, and notebook UI states.

To try it out:

```sh
# Generate the automation scripts
node --env-file=.env src/cli.ts generate --cwd ./example-workspace

# Run all scenarios against the test themes from `test-theme-ext`
node src/cli.ts run --cwd ./example-workspace \
  --extension ./test-theme-ext \
  --themes "Test Theme Dark, Test Theme Light"
```


## Writing scenarios

Scenarios are written in `*.prompt.md` files in the `theme-scenarios/` folder. They are natural-language instructions describing what VS Code UI state to set up. You can then say "take a screenshot" wherever you want a capture the UI in its current state.

Here's a simple example:

```md
Open a TypeScript file with several import statements and a class definition.
Make sure the sidebar is visible with the Explorer open.
Take a screenshot.

Open the Command Palette and search for "settings".
Take a screenshot.
```

You can also directly write the JavaScript that runs scenarios instead of using AI to generate it. See the [scenario scripts documentation](CONTRIBUTING.md#scenario-scripts) for a brief overview of how to do this.


## CLI Commands

### `generate`
Reads each scenario prompt and uses Claude to generate a Playwright automation script plus realistic workspace fixture files. Results are cached in `theme-scenarios/.generated-scenarios/` and reused on subsequent runs unless the prompt changes.


```sh
node src/cli.ts generate
node src/cli.ts generate ./my-scenarios # Pass in a custom scenarios dir
node src/cli.ts generate --grep "editor/*" # Generate just the editor scenarios
node src/cli.ts generate --force # Force regenerate all
```

You must have `ANTHROPIC_API_KEY` when running generate. One easy way to do this is an envfile:

```sh
node --env-file=.env src/cli.ts generate
```

| Argument / Flag | Default | Description |
|------|---------|-------------|
| `[dir]` | `theme-scenarios` | Path to scenarios folder |
| `--cwd <path>` | | Override working directory |
| `--grep <pattern>` | | Filter scenarios by name (supports `*` wildcards) |
| `--model <name>` | `claude-sonnet-4-20250514` | Claude model |
| `--force` | `false` | Regenerate all scripts even if cached |
| `--refinement-passes <n>` | `0` | Number of refinement rounds per scenario (0 = none) |
| `--vscode-path <path>` | | Path to VS Code executable (only used for refinement) |
| `--log-level <level>` | `info` | Log level: `error`, `info`, `verbose` |


### `run`
Launches VS Code via Playwright, applies each theme, and executes the cached scripts to capture screenshots. No API key needed.

```bash
node src/cli.ts run --themes "Default Dark Modern, Monokai"
node src/cli.ts run --grep terminal --themes "My Theme"
node src/cli.ts run --extension ./my-theme --themes "My Theme Dark, My Theme Light"
node src/cli.ts run ./my-scenarios --themes "My Theme"
```

| Argument / Flag | Default | Description |
|------|---------|-------------|
| `[dir]` | `theme-scenarios` | Path to scenarios folder |
| `--cwd <path>` | | Override working directory |
| `--grep <pattern>` | | Filter scenarios by name (supports `*` wildcards) |
| `--themes <names>` | `Default Dark Modern` | Comma-separated theme names to test |
| `--extension <path>` | | Path to extension folder or VSIX to install |
| `--vscode-path <path>` | auto-detect | Path to VS Code executable |
| `--output <dir>` | `./theme-scenario-results` | Output directory for screenshots |
| `--hide` | `false` | Hide the VS Code window (moves offscreen) |
| `--settle-delay <ms>` | `200` | Wait after each action (ms) |
| `--width <px>` | `1200` | VS Code window width |
| `--height <px>` | `800` | VS Code window height |
| `--zoom <level>` | `2` | VS Code zoom level |
| `--autogenerate` | `false` | Automatically regenerate stale scripts before running |
| `--model <name>` | `claude-sonnet-4-20250514` | Claude model (used with `--autogenerate`) |
| `--log-level <level>` | `info` | Log level: `error`, `info`, `verbose` |

## Filtering with `--grep`

The `--grep` flag filters scenarios by their full name (folder path + filename without `.prompt.md`):

```bash
--grep "editor/*"           # all scenarios under editor/
--grep "terminal"           # exact match
--grep "editor/diagnostics" # specific scenario
```

## Output

Screenshots are organized by scenario and theme:

```
output/
  editor/bracket-pairs/
    Default Dark Modern/
      1-editor-showing-brackets.png
    Monokai/
      1-editor-showing-brackets.png
  terminal/
    My Theme Dark/
      1-terminal-with-colors.png
```

### Debugging scenarios in VS Code
Generated scenarios are just scripts, so you can debug and pause their execution. This can be a useful way to diagnose why a given scenario isn't working correctly. You can also use this to pause the UI in a given state so that you can manually inspect UI elements in it.

The repo includes an example VS Code launch configurations for debugging the `terminal` scenario from `example-workspace`. To try it:

- Add create a breakpoint in `example-workspace/theme-scenarios/.generated-scenarios/terminal/scenario.mjs`

- Launch the `Debug example scenario` debug config in VS Code.

You should see a new VS Code window launch and the breakpoint will be hit after a few seconds.

While paused, you can also use the dev tools in the launched window to inspect the styling of the VS Code workbench.


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details on contributing to  this project.
