# Clibe — Terminal Portfolio WordPress Theme

A minimal Linux terminal-style portfolio theme for WordPress.



## Installation

1. Copy the `clibe/` folder to `wp-content/themes/clibe/`
2. Activate via **Appearance → Themes**
3. Configure via **Appearance → Customize → Clibe Portfolio**
4. Add skills, experience, and projects via **Settings → Clibe Portfolio**

## Filesystem Structure

Once installed, visitors can explore your portfolio using:

```
/home/visitor/
├── about.txt        ← Bio, contact info
├── skills.txt       ← Technologies & tools
├── experience.txt   ← Work history
├── resume.txt       ← CV & download link
├── contact.txt      ← Social links
└── projects/
    ├── README.txt
    ├── project-1.txt
    └── project-2.txt
```

## Available Commands

| Command         | Description                        |
|-----------------|------------------------------------|
| `ls [path]`     | List directory contents            |
| `cd <dir>`      | Change directory                   |
| `cat <file>`    | Display file contents              |
| `pwd`           | Print working directory            |
| `tree [path]`   | Display full directory tree        |
| `neofetch`      | System + portfolio overview        |
| `whoami`        | Current user                       |
| `echo <text>`   | Print text                         |
| `date`          | Current date/time                  |
| `uname [-a]`    | System info                        |
| `open <file>`   | Open URL found in a file           |
| `history`       | Command history                    |
| `man <cmd>`     | Manual for a command               |
| `clear`         | Clear terminal                     |
| `reboot`        | Replay boot animation              |

## Customization

### Via WordPress Customizer
Go to **Appearance → Customize → Clibe Portfolio** to set:
- Owner name, role, location, bio
- Email, website, social links
- Resume PDF URL
- Terminal username/hostname

### Via Settings Page
Go to **Settings → Clibe Portfolio** to edit JSON arrays for:
- Skills (grouped by category)
- Experience entries
- Project entries

## Keyboard Shortcuts

- `Tab` — Autocomplete paths and commands
- `↑ / ↓` — Navigate command history
- `Ctrl+L` — Clear terminal
- `Ctrl+C` — Cancel current input

## Boot & Splash Screens

- **Boot animation** — Shown once per session (first visit). Replayed with `reboot` command.
- **Splash screen** — pfSense-style info panel shown after boot. Shows filesystem map, quick start commands, and system info. Dismissed with Enter/Space.
- Both screens use `sessionStorage` to avoid repeating on every page load.

## Requirements

- WordPress 6.0+
- PHP 7.4+
- Modern browser (Chrome, Firefox, Safari, Edge)

## License

GPL v2 or later
