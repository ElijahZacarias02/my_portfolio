<script setup>
defineProps({
  variant: {
    type: String,
    default: 'default',
  },
})
</script>

<template>
  <div class="section-parallax" :class="`section-parallax--${variant}`" aria-hidden="true">
    <div class="section-parallax__blob section-parallax__blob--1" data-parallax-speed="0.2"></div>
    <div class="section-parallax__blob section-parallax__blob--2" data-parallax-speed="-0.14"></div>
    <div class="section-parallax__grid" data-parallax-speed="0.28"></div>
    <div class="section-parallax__floats">
      <!-- Left -->
      <span
        class="float-object-wrap float-object-wrap--1 float-object-wrap--edge-left"
        data-parallax-speed="0.11"
      >
        <span class="float-object float-object--ring float-anim-y"></span>
      </span>
      <span
        class="float-object-wrap float-object-wrap--3 float-object-wrap--edge-left"
        data-parallax-speed="0.09"
      >
        <span class="float-object float-object--square float-anim-y-alt"></span>
      </span>
      <!-- Right -->
      <span
        class="float-object-wrap float-object-wrap--2 float-object-wrap--edge-right"
        data-parallax-speed="-0.16"
      >
        <span class="float-object float-object--orb float-anim-diag"></span>
      </span>
      <span
        class="float-object-wrap float-object-wrap--4 float-object-wrap--edge-right"
        data-parallax-speed="0.14"
      >
        <span class="float-object float-object--pill float-anim-x"></span>
      </span>
      <!-- Top -->
      <span
        class="float-object-wrap float-object-wrap--5 float-object-wrap--edge-top"
        data-parallax-speed="-0.12"
      >
        <span class="float-object float-object--ring-sm float-anim-x"></span>
      </span>
      <span
        class="float-object-wrap float-object-wrap--6 float-object-wrap--edge-top"
        data-parallax-speed="0.1"
      >
        <span class="float-object float-object--dot-sm float-anim-diag-reverse"></span>
      </span>
      <!-- Bottom -->
      <span
        class="float-object-wrap float-object-wrap--7 float-object-wrap--edge-bottom"
        data-parallax-speed="0.13"
      >
        <span class="float-object float-object--dash float-anim-x-reverse"></span>
      </span>
      <span
        class="float-object-wrap float-object-wrap--8 float-object-wrap--edge-bottom"
        data-parallax-speed="-0.08"
      >
        <span class="float-object float-object--diamond float-anim-y"></span>
      </span>
    </div>
  </div>
</template>
