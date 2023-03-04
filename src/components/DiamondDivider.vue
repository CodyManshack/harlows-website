<template>
  <div class="triple-diamond-divider">
    <div class="left-line"></div>
    <div class="right-line"></div>
    <div class="small-diamond-left"></div>
    <div class="small-diamond-right"></div>
    <div class="large-diamond"></div>
  </div>
</template>

<script>
export default {
  name: 'DiamondDivider',
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.triple-diamond-divider {
  display: grid;
  grid-template-columns:
    [line-start]    1fr
    [small-start]   8px
    [large-start]   2px
    [small-end]   12px
    [small-start]  2px
    [large-end]     8px
    [small-end]     1fr
    [line-end]
  ;
  grid-template-rows:
    [large-start] 3px
    [small-start] 5px
    [midline]     5px
    [small-end]   3px
    [large-end]
  ;
  .left-line {
    grid-column: line-start / small-start 1;
    grid-row: midline / large-end;
    border-top: 1px solid #fff;
  }
  .right-line {
    grid-column: small-end 2 / line-end;
    grid-row: midline / large-end;
    border-top: 1px solid #fff;
  }
  .small-diamond-left {
    grid-column: small-start 1 / small-end 1;
    grid-row: small-start / small-end;
    transform: rotate(45deg);
    border: 1px solid #fff;
    box-shadow: 2px 0px 2px rgba(0,0,0,0.5);
  }
  .small-diamond-right {
    grid-column: small-start 2 / small-end 2;
    grid-row: small-start / small-end;
    transform: rotate(45deg);
    border: 1px solid #fff;
    box-shadow: 2px 0px 2px rgba(0,0,0,0.5);
  }
  .large-diamond {
    grid-area: large;
    transform: rotate(45deg);
    border: 1px solid #fff;
    box-shadow: 2px 0px 2px rgba(0,0,0,0.5);
  }
}
</style>
