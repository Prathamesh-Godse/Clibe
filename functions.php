<?php
/**
 * Clibe Terminal Theme — functions.php
 *
 * ⚠  Do NOT edit personal details here.
 *    Edit clibe.config.php instead.
 */

defined('ABSPATH') || exit;

// Load the config file — all personal data lives there
require_once get_template_directory() . '/clibe.config.php';

/* ── Theme Support ─────────────────────────────────────────── */
function clibe_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', [
        'style', 'script', 'comment-list', 'comment-form',
        'search-form', 'gallery', 'caption',
    ]);
}
add_action('after_setup_theme', 'clibe_setup');

/* ── Enqueue Assets ────────────────────────────────────────── */
function clibe_enqueue_assets() {
    wp_enqueue_style(
        'clibe-fonts',
        'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&display=swap',
        [],
        null
    );

    wp_enqueue_style(
        'clibe-terminal',
        get_template_directory_uri() . '/css/terminal.css',
        ['clibe-fonts'],
        '1.0.0'
    );

    wp_register_script(
        'clibe-terminal',
        get_template_directory_uri() . '/js/terminal.js',
        [],
        '1.0.0',
        true
    );

    wp_localize_script('clibe-terminal', 'clibeData', clibe_build_js_data());
    wp_enqueue_script('clibe-terminal');
}
add_action('wp_enqueue_scripts', 'clibe_enqueue_assets');

/* ── Build JS Data from Config Constants ───────────────────── */
function clibe_build_js_data() {
    $skills_raw     = unserialize(CLIBE_SKILLS);
    $experience_raw = unserialize(CLIBE_EXPERIENCE);
    $projects_raw   = unserialize(CLIBE_PROJECTS);
    $blog_raw       = unserialize(CLIBE_BLOG_POSTS);

    $skills = [];
    foreach ($skills_raw as $category => $items) {
        $skills[] = ['category' => $category, 'items' => $items];
    }

    return [
        'user'          => CLIBE_USER,
        'host'          => CLIBE_HOST,
        'version'       => '1.0.0',
        'ownerName'     => CLIBE_NAME,
        'ownerRole'     => CLIBE_ROLE,
        'ownerLocation' => CLIBE_LOCATION,
        'ownerEmail'    => CLIBE_EMAIL,
        'ownerWebsite'  => CLIBE_WEBSITE,
        'ownerBio'      => CLIBE_BIO,
        'resumeUrl'     => CLIBE_RESUME,
        'social' => [
            'github'   => CLIBE_GITHUB,
            'linkedin' => CLIBE_LINKEDIN,
            'twitter'  => CLIBE_TWITTER,
        ],
        'skills'     => $skills,
        'experience' => $experience_raw,
        'projects'   => $projects_raw,
        'blogPosts'  => $blog_raw,
    ];
}
