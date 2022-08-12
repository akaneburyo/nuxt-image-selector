<script lang="ts">
import Vue from 'vue'
import { CImage, CAspectRatioBox } from '@chakra-ui/vue'

export default Vue.extend({
  components: {
    CImage,
    CAspectRatioBox,
  },
  props: {
    imageUrl: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
})
</script>

<template>
  <CAspectRatioBox max-w="160px" :ratio="1">
    <CImage
      :src="imageUrl"
      w="100%"
      h="100%"
      object-fit="contain"
      border="1px"
      borderColor="gray.200"
    />
  </CAspectRatioBox>
</template>
