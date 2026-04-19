<?php
/**
 * Clibe Terminal Theme — index.php
 * Personal data is sourced from clibe.config.php via functions.php
 */
get_header();
?>

<!-- BOOT SCREEN -->
<div id="boot-screen">
    <div id="boot-output"></div>
    <div id="boot-progress-bar"></div>
</div>

<!-- SPLASH / PFSENSE-STYLE INFO SCREEN -->
<div id="splash-screen">
    <div class="splash-header">
        <span>CLIBE OS v1.0.0 — Portfolio Terminal</span>
        <span><?php echo esc_html(date('D M j H:i:s Y')); ?></span>
    </div>

    <div class="splash-body">
        <pre class="splash-ascii">
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
         ╚═════╝  ╚═════╝ ╚═════╝ ╚══════╝╚══════╝

   <?php echo esc_html(CLIBE_NAME); ?> — <?php echo esc_html(CLIBE_ROLE); ?>

        </pre>

        <div class="splash-section">
            <h3>System Information</h3>
            <div class="splash-kv"><span class="k">OS</span><span class="v">Clibe OS 1.0.0</span></div>
            <div class="splash-kv"><span class="k">Kernel</span><span class="v">clibe-terminal-5.4.0</span></div>
            <div class="splash-kv"><span class="k">Shell</span><span class="v">clibe-sh 1.0.0</span></div>
            <div class="splash-kv"><span class="k">Host</span><span class="v"><?php echo esc_html(CLIBE_HOST); ?></span></div>
            <div class="splash-kv"><span class="k">User</span><span class="v"><?php echo esc_html(CLIBE_USER); ?></span></div>
            <div class="splash-kv"><span class="k">PHP</span><span class="v"><?php echo esc_html(phpversion()); ?></span></div>
        </div>

        <div class="splash-section">
            <h3>Portfolio Owner</h3>
            <div class="splash-kv"><span class="k">Name</span><span class="v"><?php echo esc_html(CLIBE_NAME); ?></span></div>
            <div class="splash-kv"><span class="k">Role</span><span class="v"><?php echo esc_html(CLIBE_ROLE); ?></span></div>
            <div class="splash-kv"><span class="k">Location</span><span class="v"><?php echo esc_html(CLIBE_LOCATION); ?></span></div>
            <div class="splash-kv"><span class="k">Email</span><span class="v"><?php echo esc_html(CLIBE_EMAIL); ?></span></div>
        </div>

        <div class="splash-section">
            <h3>Virtual Filesystem</h3>
            <ul>
                <li>~/about.txt — Bio &amp; identity</li>
                <li>~/skills.txt — Technologies &amp; tools</li>
                <li>~/experience.txt — Work history</li>
                <li>~/projects/ — Portfolio projects</li>
                <li>~/blog/ — Blog posts</li>
                <li>~/resume.txt — CV &amp; download link</li>
                <li>~/contact.txt — Social links</li>
            </ul>
        </div>

        <div class="splash-section">
            <h3>Quick Start</h3>
            <ul>
                <li>ls — List current directory</li>
                <li>cat about.txt — Read about me</li>
                <li>cd projects &amp;&amp; ls — View projects</li>
                <li>cd blog &amp;&amp; ls — Read blog posts</li>
                <li>neofetch — System overview</li>
                <li>help — All commands</li>
            </ul>
        </div>

        <div class="splash-section">
            <h3>Keyboard Shortcuts</h3>
            <ul>
                <li><strong>Tab</strong> — Autocomplete paths &amp; commands</li>
                <li><strong>↑ ↓</strong> — Navigate command history</li>
                <li><strong>Ctrl+L</strong> — Clear the screen</li>
                <li><strong>Ctrl+C</strong> — Cancel input</li>
                <li>Type <strong>reboot</strong> to replay boot animation</li>
            </ul>
        </div>
    </div>

    <div class="splash-footer">
        <span>CLIBE OS — Terminal Portfolio Environment</span>
        <span><span class="key">ENTER</span> or <span class="key">SPACE</span> to continue <span class="splash-blink">_</span></span>
        <button id="splash-enter" style="background:var(--green);color:#000;border:none;padding:6px 18px;font-family:var(--font);font-size:12px;font-weight:700;cursor:pointer;letter-spacing:.08em;">[ ENTER ]</button>
    </div>
</div>

<!-- TERMINAL APPLICATION -->
<div id="terminal-app">
    <div class="term-titlebar">
        <div class="term-dots">
            <div class="term-dot red"></div>
            <div class="term-dot yellow"></div>
            <div class="term-dot green"></div>
        </div>
        <div class="term-title">
            <?php echo esc_html(CLIBE_USER); ?>@<?php echo esc_html(CLIBE_HOST); ?>: ~
        </div>
        <div class="term-meta" id="term-clock"></div>
    </div>

    <div id="term-output" role="log" aria-live="polite" aria-label="Terminal output"></div>

    <div class="term-input-row">
        <div class="term-prompt-display">
            <span class="prompt-user"><?php echo esc_html(CLIBE_USER); ?></span><!--
            --><span class="prompt-at">@</span><!--
            --><span class="prompt-host"><?php echo esc_html(CLIBE_HOST); ?></span><!--
            --><span class="prompt-colon">:</span><!--
            --><span class="prompt-path" id="prompt-path">~</span><!--
            --><span class="prompt-sym"> $ </span>
        </div>
        <input
            type="text"
            id="term-input"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            aria-label="Terminal input"
        >
    </div>
</div>

<script>
(function () {
    const el = document.getElementById('term-clock');
    if (!el) return;
    function tick() { el.textContent = new Date().toLocaleTimeString(); }
    tick();
    setInterval(tick, 1000);
})();
</script>

<?php get_footer(); ?>
