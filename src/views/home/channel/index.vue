<template>
  <div>
    <van-popup
      :value="value"
      @input="$emit('input',$event)"
      position="bottom"
      :style="{ height: '90%' }"
    >
      内容
      <van-grid>
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
export default {
  props: ["value"]
};
</script>

<style>
</style>