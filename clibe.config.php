<?php
/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║           CLIBE — PERSONAL CONFIGURATION FILE           ║
 * ║                                                          ║
 * ║  Edit ONLY this file to update your portfolio content.  ║
 * ║  Do not edit functions.php, index.php, or terminal.js.  ║
 * ╚══════════════════════════════════════════════════════════╝
 *
 * File: clibe.config.php
 * Location: your-theme-folder/clibe.config.php
 */

defined('ABSPATH') || exit;

/* ══════════════════════════════════════════════════════════
   1. IDENTITY
══════════════════════════════════════════════════════════ */
define('CLIBE_NAME',      'LanManLab');
define('CLIBE_ROLE',      'N/A');
define('CLIBE_LOCATION',  'Karnataka, India');
define('CLIBE_EMAIL',     'prathameshgodse0402@gmail.com');
define('CLIBE_WEBSITE',   'PrathameshGodse.com');
define('CLIBE_RESUME',    'N/A');

// Short bio — shown in about.txt and neofetch
define('CLIBE_BIO',
    'LanManLab' .
    'Interested in servers and homelab and AI'
);

// Terminal prompt labels
define('CLIBE_USER', 'visitor');
define('CLIBE_HOST', 'portfolio');


/* ══════════════════════════════════════════════════════════
   2. SOCIAL LINKS
══════════════════════════════════════════════════════════ */
define('CLIBE_GITHUB',    'https://github.com/yourhandle');
define('CLIBE_LINKEDIN',  'https://linkedin.com/in/yourhandle');
define('CLIBE_TWITTER',   'https://twitter.com/yourhandle');


/* ══════════════════════════════════════════════════════════
   3. SKILLS
   Format: [ 'Category Name' => ['Item', 'Item', ...] ]
══════════════════════════════════════════════════════════ */
define('CLIBE_SKILLS', serialize([
    'Languages'              => ['PHP', 'C', 'C++', 'Python', 'SQL', 'Bash'],
    'Frameworks & Libraries' => ['WordPress'],
    'Tools & Platforms'      => ['Git', 'Docker', 'Linux', 'AWS', 'Nginx'],
    'Databases'              => ['MySQL', 'Redis'],
]));


/* ══════════════════════════════════════════════════════════
   4. WORK EXPERIENCE
   Fields: company, role, period, description
══════════════════════════════════════════════════════════ */
define('CLIBE_EXPERIENCE', serialize([
    [
        'company'     => 'N/A',
        'role'        => 'N/A',
        'period'      => 'N/A',
        'description' => 'N/A',
    ],
    [
        'company'     => 'N/A',
        'role'        => 'N/A',
        'period'      => 'N/A',
        'description' => 'N/A',
    ],
    [
        'company'     => 'N/A',
        'role'        => 'N/A',
        'period'      => 'N/A',
        'description' => 'N/A',
    ],
]));


/* ══════════════════════════════════════════════════════════
   5. PROJECTS
   Fields: name, slug (no spaces), status, stack, url, source, description
   slug becomes the filename: e.g. slug "my-app" → cat my-app.txt
══════════════════════════════════════════════════════════ */
define('CLIBE_PROJECTS', serialize([
    [
        'name'        => 'Clibe Theme',
        'slug'        => 'clibe-theme',
        'status'      => 'Active',
        'stack'       => 'PHP, JavaScript, CSS',
        'url'         => 'https://yourwebsite.com/clibe',
        'source'      => 'https://github.com/yourhandle/clibe',
        'description' => 'A minimal Linux terminal-style WordPress portfolio theme. Navigate the portfolio like a filesystem using simulated shell commands.',
    ],
    [
        'name'        => 'DevTracker',
        'slug'        => 'devtracker',
        'status'      => 'Completed',
        'stack'       => 'React, Node.js, PostgreSQL',
        'url'         => 'https://devtracker.example.com',
        'source'      => 'https://github.com/yourhandle/devtracker',
        'description' => 'A project and time tracking tool for freelance developers. Features invoicing, Kanban board, and time reports.',
    ],
    [
        'name'        => 'Weather CLI',
        'slug'        => 'weather-cli',
        'status'      => 'Archived',
        'stack'       => 'Python, Click, Requests',
        'url'         => 'https://pypi.org/project/owm-cli/',
        'source'      => 'https://github.com/yourhandle/weather-cli',
        'description' => 'A command-line tool to fetch and display weather forecasts from OpenWeatherMap. Supports multiple cities and unit systems.',
    ],
]));


/* ══════════════════════════════════════════════════════════
   6. BLOG POSTS
   Fields: title, slug (no spaces), date, tags (comma-separated), excerpt, content
   slug becomes the filename: e.g. slug "hello-world" → cat hello-world.txt
   content supports plain text with \n for newlines
══════════════════════════════════════════════════════════ */
define('CLIBE_BLOG_POSTS', serialize([
    [
        'title'   => 'Hello World — Why I Built a Terminal Portfolio',
        'slug'    => 'hello-world',
        'date'    => '2024-01-15',
        'tags'    => 'meta, design, terminal',
        'excerpt' => 'The story behind building a portfolio that works like a Linux shell.',
        'content' =>
            "I've always loved the terminal. There's something deeply satisfying about\n" .
            "navigating a system with nothing but a keyboard and a blinking cursor.\n\n" .
            "Most portfolios feel like brochures. Mine should feel like a tool.\n\n" .
            "So I built Clibe — a WordPress theme that turns your portfolio into a\n" .
            "virtual filesystem you explore with shell commands.\n\n" .
            "Type `ls`, `cat about.txt`, `cd projects`. That's it.",
    ],
    [
        'title'   => 'The Art of Minimalism in Web Development',
        'slug'    => 'minimalism-in-web-dev',
        'date'    => '2024-02-03',
        'tags'    => 'design, philosophy, css',
        'excerpt' => 'Less is more — but only when every element earns its place.',
        'content' =>
            "Minimalism isn't about removing things until something breaks.\n" .
            "It's about removing things until nothing else can be removed.\n\n" .
            "In web development this means: no framework if vanilla JS works,\n" .
            "no library if a CSS variable works, no animation if stillness works.\n\n" .
            "The hardest part isn't writing the code. It's resisting the urge to add more.",
    ],
    [
        'title'   => 'Things I Wish I Knew Before Learning Linux',
        'slug'    => 'learning-linux',
        'date'    => '2024-03-20',
        'tags'    => 'linux, beginner, sysadmin',
        'excerpt' => 'A practical survival guide for the Linux newcomer.',
        'content' =>
            "1. man is your best friend. Always read man <command> first.\n\n" .
            "2. Tab completion is not optional. Use it for everything.\n\n" .
            "3. Ctrl+C cancels. Ctrl+D exits. Ctrl+Z suspends. Learn these early.\n\n" .
            "4. Piping | is superpower. grep, awk, sed, sort, uniq — learn them.\n\n" .
            "5. Don't fear the terminal. It's just text in, text out.",
    ],
]));
