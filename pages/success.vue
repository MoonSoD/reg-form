<template>
  <section class="wrapper">
    <div class="content">
      <svg width="170" height="170" viewBox="0 0 170 170" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_7_1)">
          <path d="M31 68C31 97.8234 55.1766 122 85 122C114.823 122 139 97.8234 139 68C139 38.1766 114.823 14 85 14C55.1766 14 31 38.1766 31 68Z" fill="#17BA87"/>
        </g>
        <path d="M72 67.8462L81.35 77L98.7143 60" stroke="white" stroke-width="4" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <defs>
          <filter id="filter0_d_7_1" x="0" y="0" width="170" height="170" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="17"/>
            <feGaussianBlur stdDeviation="15.5"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.172549 0 0 0 0 0.792157 0 0 0 0 0.458824 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_7_1"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_7_1" result="shape"/>
          </filter>
        </defs>
      </svg>
      <h1 class="text--heading">Success registration</h1>
      <p class="description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Mauris lobortis gravida ex, at maximus lorem condimentum ut.
        Cras purus mauris, convallis vitae sollicitudin sed, fringilla lobortis lorem.
      </p>
    </div>

  </section>
</template>

<script>

</script>

<style scoped lang="scss">
.wrapper {
  text-align: center;
}

.content {
  max-width: 31.25rem;

  @media only screen and (max-width: 768px) {
    width: calc(100% - 2.5rem);
  }
}

.text--heading {
  margin: -24px 0 0;

  line-height: 4.125rem;
}

.description {
  color: $text-input-secondary;
  line-height: 2rem;
}
</style>