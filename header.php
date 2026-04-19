<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php echo esc_attr(get_option('clibe_owner_name', 'Portfolio')); ?> — Terminal Portfolio">
    <meta name="theme-color" content="#0d0d0d">
    <?php wp_head(); ?>
</head>
<body <?php body_class('clibe-terminal-body'); ?>>
<?php wp_body_open(); ?>
