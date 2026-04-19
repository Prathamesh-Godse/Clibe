/* ============================================================
   CLIBE — terminal.js
   Full terminal simulation: boot → splash → shell
   Personal data is injected via clibeData (from clibe.config.php)
============================================================ */

(function () {
  'use strict';

  /* ── CONFIG ─────────────────────────────────────────────── */
  const CFG = {
    user:      clibeData.user    || 'visitor',
    host:      clibeData.host    || 'clibe',
    version:   clibeData.version || '1.0.0',
    bootSeen:  'clibe_boot_seen',
    splashSeen:'clibe_splash_seen',
  };

  /* ── FILESYSTEM BUILDER ─────────────────────────────────── */
  function buildFS() {
    const FS = {
      '/':                    { type: 'dir' },
      '/home':                { type: 'dir' },
      '/home/visitor':        { type: 'dir' },
      '/home/visitor/projects': { type: 'dir' },
      '/home/visitor/blog':   { type: 'dir' },
    };

    // ── Static files ──────────────────────────────────────
    FS['/home/visitor/about.txt'] = {
      type: 'file',
      content: `<div class="section-title">About Me</div>
<div class="kv-pair"><span class="k">Name</span><span class="v">${clibeData.ownerName}</span></div>
<div class="kv-pair"><span class="k">Role</span><span class="v">${clibeData.ownerRole}</span></div>
<div class="kv-pair"><span class="k">Location</span><span class="v">${clibeData.ownerLocation}</span></div>
<div class="kv-pair"><span class="k">Email</span><span class="v"><a href="mailto:${clibeData.ownerEmail}">${clibeData.ownerEmail}</a></span></div>
<div class="kv-pair"><span class="k">Website</span><span class="v"><a href="${clibeData.ownerWebsite}" target="_blank">${clibeData.ownerWebsite}</a></span></div>
<br>${clibeData.ownerBio}`,
    };

    FS['/home/visitor/skills.txt'] = {
      type: 'file',
      content: `<div class="section-title">Skills & Technologies</div>` +
        (clibeData.skills || []).map(g =>
          `<div class="section-title" style="font-size:11px;margin-top:10px">${g.category}</div>` +
          `<div>${(g.items || []).map(s => `<span class="tag">${s}</span>`).join('')}</div>`
        ).join(''),
    };

    FS['/home/visitor/experience.txt'] = {
      type: 'file',
      content: `<div class="section-title">Work Experience</div>` +
        (clibeData.experience || []).map(e => `
<div style="margin-bottom:14px">
  <div class="kv-pair"><span class="k">Company</span><span class="v" style="color:var(--cyan)">${e.company}</span></div>
  <div class="kv-pair"><span class="k">Role</span><span class="v">${e.role}</span></div>
  <div class="kv-pair"><span class="k">Period</span><span class="v" style="color:var(--yellow)">${e.period}</span></div>
  <div style="margin-top:6px;color:var(--text-dim)">${e.description}</div>
</div>`).join('<hr style="border-color:var(--border);margin:8px 0">'),
    };

    FS['/home/visitor/contact.txt'] = {
      type: 'file',
      content: `<div class="section-title">Contact</div>
<div class="kv-pair"><span class="k">Email</span><span class="v"><a href="mailto:${clibeData.ownerEmail}">${clibeData.ownerEmail}</a></span></div>
<div class="kv-pair"><span class="k">LinkedIn</span><span class="v"><a href="${clibeData.social.linkedin}" target="_blank">${clibeData.social.linkedin}</a></span></div>
<div class="kv-pair"><span class="k">GitHub</span><span class="v"><a href="${clibeData.social.github}" target="_blank">${clibeData.social.github}</a></span></div>
<div class="kv-pair"><span class="k">Twitter</span><span class="v"><a href="${clibeData.social.twitter}" target="_blank">${clibeData.social.twitter}</a></span></div>`,
    };

    FS['/home/visitor/resume.txt'] = {
      type: 'file',
      content: `<div class="section-title">Resume / CV</div>
<div class="kv-pair"><span class="k">Download PDF</span><span class="v"><a href="${clibeData.resumeUrl}" target="_blank">${clibeData.resumeUrl}</a></span></div>
<br><span class="dim">See also: experience.txt and skills.txt</span>`,
    };

    // ── Projects ──────────────────────────────────────────
    FS['/home/visitor/projects/README.txt'] = {
      type: 'file',
      content: `<div class="section-title">Projects</div>
<span class="dim">Run <span style="color:var(--green)">ls</span> to see all projects, then <span style="color:var(--green)">cat &lt;project&gt;.txt</span> to read details.</span>`,
    };

    (clibeData.projects || []).forEach(p => {
      FS[`/home/visitor/projects/${p.slug}.txt`] = {
        type: 'file',
        content: `<div class="section-title">${p.name}</div>
<div class="kv-pair"><span class="k">Status</span><span class="v" style="color:var(--green)">${p.status}</span></div>
<div class="kv-pair"><span class="k">Stack</span><span class="v">${p.stack}</span></div>
<div class="kv-pair"><span class="k">Live URL</span><span class="v"><a href="${p.url}" target="_blank">${p.url}</a></span></div>
<div class="kv-pair"><span class="k">Source</span><span class="v"><a href="${p.source}" target="_blank">${p.source}</a></span></div>
<br>${p.description}`,
      };
    });

    // ── Blog ──────────────────────────────────────────────
    FS['/home/visitor/blog/README.txt'] = {
      type: 'file',
      content: `<div class="section-title">Blog</div>
<span class="dim">Run <span style="color:var(--green)">ls</span> to see all posts, then <span style="color:var(--green)">cat &lt;post&gt;.txt</span> to read.</span>`,
    };

    (clibeData.blogPosts || []).forEach(post => {
      FS[`/home/visitor/blog/${post.slug}.txt`] = {
        type: 'file',
        content: `<div class="section-title">${post.title}</div>
<div class="kv-pair"><span class="k">Date</span><span class="v" style="color:var(--yellow)">${post.date}</span></div>
<div class="kv-pair"><span class="k">Tags</span><span class="v" style="color:var(--cyan)">${post.tags}</span></div>
<br><div style="color:var(--text-dim);margin-bottom:10px;font-style:italic">${post.excerpt}</div>
<hr style="border-color:var(--border);margin:8px 0">
<div style="line-height:2;white-space:pre-wrap">${post.content}</div>`,
      };
    });

    return FS;
  }

  const FS = buildFS();

  /* ── SHELL STATE ────────────────────────────────────────── */
  let cwd     = '/home/visitor';
  let history = [];
  let histIdx = -1;

  /* ── DOM ────────────────────────────────────────────────── */
  const bootScreen   = document.getElementById('boot-screen');
  const bootOutput   = document.getElementById('boot-output');
  const bootBar      = document.getElementById('boot-progress-bar');
  const splashScreen = document.getElementById('splash-screen');
  const termApp      = document.getElementById('terminal-app');
  const termOutput   = document.getElementById('term-output');
  const termInput    = document.getElementById('term-input');
  const promptPath   = document.getElementById('prompt-path');

  /* ── BOOT SEQUENCE ──────────────────────────────────────── */
  const BOOT_LINES = [
    { t: 0,   label: 'CLIBE OS v1.0.0',                    status: 'INIT', type: 'info' },
    { t: 80,  label: 'Loading kernel modules',             status: 'OK',   type: 'ok'   },
    { t: 140, label: 'Mounting filesystems',               status: 'OK',   type: 'ok'   },
    { t: 200, label: 'Starting udev daemon',               status: 'OK',   type: 'ok'   },
    { t: 260, label: 'Initializing network interfaces',    status: 'OK',   type: 'ok'   },
    { t: 310, label: 'Loading entropy pool',               status: 'OK',   type: 'ok'   },
    { t: 370, label: 'Starting syslogd',                   status: 'OK',   type: 'ok'   },
    { t: 420, label: 'Mounting /proc and /sys',            status: 'OK',   type: 'ok'   },
    { t: 480, label: 'Running fsck on /dev/sda1',          status: 'OK',   type: 'ok'   },
    { t: 530, label: 'Loading terminal emulator',          status: 'OK',   type: 'ok'   },
    { t: 600, label: 'Checking portfolio data integrity',  status: 'OK',   type: 'ok'   },
    { t: 660, label: 'Spawning virtual filesystem',        status: 'OK',   type: 'ok'   },
    { t: 720, label: 'Starting SSH server',                status: 'SKIP', type: 'warn' },
    { t: 770, label: 'Applying security policies',         status: 'OK',   type: 'ok'   },
    { t: 830, label: 'Loading user profile',               status: 'OK',   type: 'ok'   },
    { t: 900, label: 'Starting display manager',           status: 'OK',   type: 'ok'   },
    { t: 950, label: '',                                   status: '',     type: 'blank' },
    { t: 980, label: `Welcome to Clibe — ${clibeData.ownerName}'s Portfolio`, status: '', type: 'info' },
  ];

  function runBoot() {
    if (sessionStorage.getItem(CFG.bootSeen)) { showSplash(); return; }
    bootScreen.classList.remove('hidden');

    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        const el = document.createElement('span');
        el.className = `boot-line ${line.type}`;
        if (line.type === 'blank') {
          el.innerHTML = ' ';
        } else if (line.type === 'info') {
          el.innerHTML = `<span class="bl-status" style="color:var(--cyan)">  ** </span><span class="bl-label">${line.label}</span>`;
        } else {
          const col = line.type === 'ok' ? 'var(--green)' : line.type === 'fail' ? 'var(--red)' : 'var(--yellow)';
          el.innerHTML = `<span class="bl-bracket">[</span><span class="bl-status" style="color:${col}">${line.status.padStart(4)}</span><span class="bl-bracket">]</span>  <span class="bl-label">${line.label}</span>`;
        }
        bootOutput.appendChild(el);
        bootOutput.scrollTop = bootOutput.scrollHeight;

        const pct = Math.round(((i + 1) / BOOT_LINES.length) * 100);
        bootBar.style.background = `linear-gradient(to right, var(--green) ${pct}%, var(--green-dim) ${pct}%)`;

        if (i === BOOT_LINES.length - 1) {
          sessionStorage.setItem(CFG.bootSeen, '1');
          setTimeout(() => { bootScreen.classList.add('hidden'); showSplash(); }, 900);
        }
      }, line.t);
    });
  }

  /* ── SPLASH ─────────────────────────────────────────────── */
  function showSplash() {
    if (sessionStorage.getItem(CFG.splashSeen)) { launchTerminal(); return; }
    splashScreen.classList.add('active');

    function dismiss() {
      sessionStorage.setItem(CFG.splashSeen, '1');
      splashScreen.classList.remove('active');
      splashScreen.classList.add('hidden');
      launchTerminal();
    }

    document.getElementById('splash-enter').addEventListener('click', dismiss);
    document.addEventListener('keydown', function onKey(e) {
      if (e.key === 'Enter' || e.key === ' ') { dismiss(); document.removeEventListener('keydown', onKey); }
    });
  }

  /* ── TERMINAL LAUNCH ────────────────────────────────────── */
  function launchTerminal() {
    termApp.classList.add('active');
    updatePrompt();
    printWelcome();
    termInput.focus();
    termApp.addEventListener('click', () => termInput.focus());
  }

  function updatePrompt() {
    promptPath.textContent = cwd.replace('/home/visitor', '~');
  }

  /* ── WELCOME BANNER ─────────────────────────────────────── */
  function printWelcome() {
    const ascii = `
    ██████╗ ██████╗  █████╗ ████████╗██╗  ██╗ █████╗ ███╗   ███╗███████╗███████╗██╗  ██╗
    ██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██║  ██║██╔══██╗████╗ ████║██╔════╝██╔════╝██║  ██║
    ██████╔╝██████╔╝███████║   ██║   ███████║███████║██╔████╔██║█████╗  ███████╗███████║
    ██╔═══╝ ██╔══██╗██╔══██║   ██║   ██╔══██║██╔══██║██║╚██╔╝██║██╔══╝  ╚════██║██╔══██║
    ██║     ██║  ██║██║  ██║   ██║   ██║  ██║██║  ██║██║ ╚═╝ ██║███████╗███████║██║  ██║
    ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝

     ██████╗  ██████╗ ██████╗ ███████╗███████╗
    ██╔════╝ ██╔═══██╗██╔══██╗██╔════╝██╔════╝
    ██║  ███╗██║   ██║██║  ██║███████╗█████╗
    ██║   ██║██║   ██║██║  ██║╚════██║██╔══╝
    ╚██████╔╝╚██████╔╝██████╔╝███████║███████╗
     ╚═════╝  ╚═════╝ ╚═════╝ ╚══════╝╚══════╝`;

    appendHTML(`<div class="welcome-ascii">${ascii}</div>`);
    appendLine('');
    appendLine(`  ${clibeData.ownerName} — Portfolio Terminal  v${CFG.version}`, 'info');
    appendLine(`  Type <span style="color:var(--green)">help</span> to see available commands.  Type <span style="color:var(--green)">ls</span> to explore.`, 'dim');
    appendLine('');
  }

  /* ── OUTPUT HELPERS ─────────────────────────────────────── */
  function appendLine(text, cls = '') {
    const el = document.createElement('div');
    el.className = `out-line ${cls}`;
    el.innerHTML = text;
    termOutput.appendChild(el);
    scrollBottom();
  }

  function appendHTML(html) {
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    termOutput.appendChild(wrap);
    scrollBottom();
  }

  function appendEcho(cmd) {
    const path = cwd.replace('/home/visitor', '~');
    appendHTML(`<div class="out-line cmd-echo" style="opacity:.7">
      <span class="prompt-user">${CFG.user}</span><span class="prompt-at">@</span><span class="prompt-host">${CFG.host}</span><span class="prompt-colon">:</span><span class="prompt-path">${path}</span><span class="prompt-sym"> $ </span><span>${esc(cmd)}</span>
    </div>`);
  }

  function scrollBottom() { termOutput.scrollTop = termOutput.scrollHeight; }
  function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  /* ── PATH UTILS ─────────────────────────────────────────── */
  function resolvePath(target) {
    if (!target)            return cwd;
    if (target === '~')     return '/home/visitor';
    if (target.startsWith('/')) return normalize(target);
    return normalize(cwd + '/' + target);
  }

  function normalize(p) {
    const parts = p.split('/').filter(Boolean);
    const out = [];
    for (const part of parts) {
      if (part === '..') out.pop();
      else if (part !== '.') out.push(part);
    }
    return '/' + out.join('/');
  }

  function lsDir(path) {
    const prefix = path === '/' ? '/' : path + '/';
    const seen = new Set();
    const entries = [];
    for (const key of Object.keys(FS)) {
      if (key === path || !key.startsWith(prefix)) continue;
      const rest = key.slice(prefix.length);
      const name = rest.split('/')[0];
      if (!seen.has(name)) {
        seen.add(name);
        const fullPath = (path === '/' ? '' : path) + '/' + name;
        entries.push({ name, type: FS[fullPath] ? FS[fullPath].type : 'dir' });
      }
    }
    return entries;
  }

  /* ── COMMANDS ───────────────────────────────────────────── */
  const COMMANDS = {

    help() {
      appendHTML(`<div class="out-line" style="margin:6px 0">
        <table class="help-table">
          <tr><td class="cmd">ls</td><td class="args">[path]</td><td class="desc">List directory contents</td></tr>
          <tr><td class="cmd">cd</td><td class="args">&lt;dir&gt;</td><td class="desc">Change directory</td></tr>
          <tr><td class="cmd">cat</td><td class="args">&lt;file&gt;</td><td class="desc">Display file contents</td></tr>
          <tr><td class="cmd">pwd</td><td class="args"></td><td class="desc">Print working directory</td></tr>
          <tr><td class="cmd">whoami</td><td class="args"></td><td class="desc">Current user</td></tr>
          <tr><td class="cmd">neofetch</td><td class="args"></td><td class="desc">System info with ASCII logo</td></tr>
          <tr><td class="cmd">tree</td><td class="args">[path]</td><td class="desc">Display directory tree</td></tr>
          <tr><td class="cmd">echo</td><td class="args">&lt;text&gt;</td><td class="desc">Print text</td></tr>
          <tr><td class="cmd">date</td><td class="args"></td><td class="desc">Current date and time</td></tr>
          <tr><td class="cmd">uname</td><td class="args">[-a]</td><td class="desc">System information</td></tr>
          <tr><td class="cmd">open</td><td class="args">&lt;file&gt;</td><td class="desc">Open URL found inside a file</td></tr>
          <tr><td class="cmd">history</td><td class="args"></td><td class="desc">Command history</td></tr>
          <tr><td class="cmd">man</td><td class="args">&lt;cmd&gt;</td><td class="desc">Manual for a command</td></tr>
          <tr><td class="cmd">clear</td><td class="args"></td><td class="desc">Clear the terminal</td></tr>
          <tr><td class="cmd">reboot</td><td class="args"></td><td class="desc">Replay boot animation</td></tr>
        </table>
      </div>
      <div class="out-line dim">Tip: <span style="color:var(--yellow)">Tab</span> autocomplete &nbsp;|&nbsp; <span style="color:var(--yellow)">↑↓</span> history &nbsp;|&nbsp; <span style="color:var(--yellow)">Ctrl+L</span> clear</div>`);
    },

    ls(args) {
      const target = args[0] ? resolvePath(args[0]) : cwd;
      const entry = FS[target];
      if (!entry) { appendLine(`ls: cannot access '${esc(args[0])}': No such file or directory`, 'error'); return; }
      if (entry.type === 'file') { appendLine(target.split('/').pop()); return; }

      const entries = lsDir(target);
      if (!entries.length) { appendLine('(empty directory)', 'dim'); return; }

      const html = entries.map(e => {
        const cls = e.type === 'dir' ? 'dir' : 'file';
        const marker = e.type === 'dir' ? 'd' : '-';
        return `<div class="ls-item ${cls}"><span class="ls-icon">${marker}</span><span class="ls-name">${esc(e.name)}</span></div>`;
      }).join('');
      appendHTML(`<div class="ls-grid out-line">${html}</div>`);
    },

    cd(args) {
      const target = args[0] || '/home/visitor';
      const resolved = resolvePath(target);
      const entry = FS[resolved];
      if (!entry)                    { appendLine(`cd: ${esc(args[0])}: No such file or directory`, 'error'); return; }
      if (entry.type !== 'dir')      { appendLine(`cd: ${esc(args[0])}: Not a directory`, 'error'); return; }
      cwd = resolved;
      updatePrompt();
    },

    cat(args) {
      if (!args[0]) { appendLine('cat: missing file operand', 'error'); return; }
      const resolved = resolvePath(args[0]);
      const entry = FS[resolved];
      if (!entry)              { appendLine(`cat: ${esc(args[0])}: No such file or directory`, 'error'); return; }
      if (entry.type === 'dir') { appendLine(`cat: ${esc(args[0])}: Is a directory`, 'error'); return; }
      appendHTML(`<div class="cat-output">${entry.content}</div>`);
    },

    pwd()    { appendLine(cwd); },
    whoami() { appendLine(CFG.user, 'success'); },
    echo(args) { appendLine(args.join(' ')); },
    date()   { appendLine(new Date().toString()); },
    clear()  { termOutput.innerHTML = ''; },

    uname(args) {
      appendLine(args.includes('-a')
        ? 'Clibe OS 1.0.0 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux'
        : 'Clibe OS');
    },

    history() {
      if (!history.length) { appendLine('(no history)', 'dim'); return; }
      history.forEach((cmd, i) => appendLine(`  ${String(i+1).padStart(4)}  ${esc(cmd)}`, 'dim'));
    },

    tree(args) {
      const root = args[0] ? resolvePath(args[0]) : cwd;
      const lines = [];
      function walk(path, prefix) {
        lsDir(path).forEach((e, i, arr) => {
          const last = i === arr.length - 1;
          const conn = last ? '└── ' : '├── ';
          const childPfx = prefix + (last ? '    ' : '│   ');
          const style = e.type === 'dir' ? 'color:var(--blue)' : 'color:var(--text)';
          lines.push(`${prefix}${conn}<span style="${style}">${esc(e.name)}</span>`);
          if (e.type === 'dir') walk((path === '/' ? '' : path) + '/' + e.name, childPfx);
        });
      }
      lines.push(`<span style="color:var(--blue)">${root.split('/').pop() || '/'}</span>`);
      walk(root, '');
      appendHTML(`<div class="out-line" style="line-height:1.6">${lines.join('<br>')}</div>`);
    },

    neofetch() {
      const ascii = `
      ██████╗ ██████╗  █████╗ ████████╗██╗  ██╗ █████╗ ███╗   ███╗███████╗███████╗██╗  ██╗
      ██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██║  ██║██╔══██╗████╗ ████║██╔════╝██╔════╝██║  ██║
      ██████╔╝██████╔╝███████║   ██║   ███████║███████║██╔████╔██║█████╗  ███████╗███████║
      ██╔═══╝ ██╔══██╗██╔══██║   ██║   ██╔══██║██╔══██║██║╚██╔╝██║██╔══╝  ╚════██║██╔══██║
      ██║     ██║  ██║██║  ██║   ██║   ██║  ██║██║  ██║██║ ╚═╝ ██║███████╗███████║██║  ██║
      ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝

       ██████╗  ██████╗ ██████╗ ███████╗███████╗
      ██╔════╝ ██╔═══██╗██╔══██╗██╔════╝██╔════╝
      ██║  ███╗██║   ██║██║  ██║███████╗█████╗
      ██║   ██║██║   ██║██║  ██║╚════██║██╔══╝
      ╚██████╔╝╚██████╔╝██████╔╝███████║███████╗
       ╚═════╝  ╚═════╝ ╚═════╝ ╚══════╝╚══════╝`;

      appendHTML(`<div class="neofetch-wrap">
        <div class="neofetch-logo">${ascii}</div>
        <div class="neofetch-info">
          <div class="nf-row"><span class="nf-key">${CFG.user}@${CFG.host}</span></div>
          <div class="nf-row"><span class="nf-key" style="color:var(--text-dim)">──────────────────</span></div>
          <div class="nf-row"><span class="nf-key">OS</span><span class="nf-sep">~</span><span class="nf-val">Clibe OS v${CFG.version}</span></div>
          <div class="nf-row"><span class="nf-key">Owner</span><span class="nf-sep">~</span><span class="nf-val">${clibeData.ownerName}</span></div>
          <div class="nf-row"><span class="nf-key">Role</span><span class="nf-sep">~</span><span class="nf-val">${clibeData.ownerRole}</span></div>
          <div class="nf-row"><span class="nf-key">Shell</span><span class="nf-sep">~</span><span class="nf-val">clibe-sh 1.0</span></div>
          <div class="nf-row"><span class="nf-key">Terminal</span><span class="nf-sep">~</span><span class="nf-val">clibe-term</span></div>
          <div class="nf-row"><span class="nf-key">Uptime</span><span class="nf-sep">~</span><span class="nf-val" id="nf-uptime">0s</span></div>
          <div class="nf-row"><span class="nf-key">Files</span><span class="nf-sep">~</span><span class="nf-val">${Object.values(FS).filter(e=>e.type==='file').length} files / ${Object.values(FS).filter(e=>e.type==='dir').length} dirs</span></div>
          <div class="nf-colors">${['#0d0d0d','#e06c75','#39d353','#e5c07b','#61afef','#c678dd','#56d4dd','#c8c8c8'].map(c=>`<span class="nf-swatch" style="background:${c}"></span>`).join('')}</div>
        </div>
      </div>`);
      const start = Date.now();
      const el = document.getElementById('nf-uptime');
      if (el) {
        const t = setInterval(() => {
          if (!document.getElementById('nf-uptime')) { clearInterval(t); return; }
          const s = Math.floor((Date.now()-start)/1000);
          el.textContent = s < 60 ? `${s}s` : `${Math.floor(s/60)}m ${s%60}s`;
        }, 1000);
      }
    },

    open(args) {
      if (!args[0]) { appendLine('open: missing operand', 'error'); return; }
      const entry = FS[resolvePath(args[0])];
      if (!entry || entry.type !== 'file') { appendLine(`open: ${esc(args[0])}: No such file`, 'error'); return; }
      const match = entry.content.match(/href="([^"]+)"/);
      if (match) { window.open(match[1], '_blank'); appendLine(`Opening ${match[1]} ...`, 'success'); }
      else        { appendLine('open: no URL found in file', 'warn'); }
    },

    man(args) {
      const pages = {
        ls:       'ls [path] — List directory contents. Dirs in blue, files in grey.',
        cd:       'cd <dir> — Change directory. Use ~ for home, .. for parent.',
        cat:      'cat <file> — Print file contents to terminal.',
        pwd:      'pwd — Print current working directory.',
        tree:     'tree [path] — Recursively display directory structure.',
        neofetch: 'neofetch — Display system and portfolio info with ASCII logo.',
        open:     'open <file> — Open the first URL found inside a .txt file.',
        reboot:   'reboot — Replay the boot animation sequence.',
        blog:     'blog dir lives at ~/blog — use cd blog && ls to browse posts.',
      };
      if (!args[0]) { appendLine('man: what manual page do you want?', 'error'); return; }
      pages[args[0]]
        ? appendLine(`MANUAL: ${pages[args[0]]}`, 'info')
        : appendLine(`man: no manual entry for ${esc(args[0])}`, 'error');
    },

    reboot() {
      sessionStorage.removeItem(CFG.bootSeen);
      sessionStorage.removeItem(CFG.splashSeen);
      appendLine('Rebooting...', 'warn');
      setTimeout(() => location.reload(), 800);
    },
  };

  /* ── AUTOCOMPLETE ───────────────────────────────────────── */
  function autocomplete(partial) {
    const parts = partial.split(' ');
    if (parts.length === 1) return Object.keys(COMMANDS).filter(c => c.startsWith(parts[0]));

    const argPartial = parts[parts.length - 1];
    const dirPart = argPartial.includes('/') ? argPartial.slice(0, argPartial.lastIndexOf('/') + 1) : '';
    const filePart = argPartial.slice(dirPart.length);
    const lookDir = resolvePath(dirPart || '.');

    return lsDir(lookDir)
      .filter(e => e.name.startsWith(filePart))
      .map(e => dirPart + e.name + (e.type === 'dir' ? '/' : ''));
  }

  /* ── INPUT ──────────────────────────────────────────────── */
  termInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      const raw = termInput.value.trim();
      termInput.value = '';
      histIdx = -1;
      if (!raw) return;
      history.unshift(raw);
      appendEcho(raw);
      dispatch(raw);
      return;
    }
    if (e.key === 'ArrowUp')   { e.preventDefault(); if (histIdx < history.length-1) termInput.value = history[++histIdx]; return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); histIdx > 0 ? (termInput.value = history[--histIdx]) : (histIdx = -1, termInput.value = ''); return; }
    if (e.key === 'Tab') {
      e.preventDefault();
      const matches = autocomplete(termInput.value);
      if (matches.length === 1) {
        const parts = termInput.value.split(' ');
        parts[parts.length - 1] = matches[0];
        termInput.value = parts.join(' ');
      } else if (matches.length > 1) {
        appendLine(matches.join('  '), 'dim');
      }
      return;
    }
    if (e.ctrlKey && e.key === 'c') { appendLine('^C', 'dim'); termInput.value = ''; return; }
    if (e.ctrlKey && e.key === 'l') { e.preventDefault(); termOutput.innerHTML = ''; return; }
  });

  function dispatch(raw) {
    const [name, ...args] = raw.split(/\s+/);
    const fn = COMMANDS[name];
    fn ? fn(args) : appendLine(`${esc(name)}: command not found. Type <span style="color:var(--green)">help</span> for available commands.`, 'error');
    appendLine('');
  }

  /* ── INIT ───────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', runBoot);

})();
