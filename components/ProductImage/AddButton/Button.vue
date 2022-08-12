<script lang="ts">
import Vue from 'vue'
import { CBox, CFlex, CAspectRatioBox, CIcon, CText } from '@chakra-ui/vue'

export default Vue.extend({
  components: {
    CBox,
    CFlex,
    CAspectRatioBox,
    CIcon,
    CText,
  },
  methods: {
    onclick() {
      this.$emit('click')
    },
  },
})
</script>

<template>
  <CAspectRatioBox
    max-w="160px"
    :ratio="1"
    as="button"
    cursor="pointer"
    :_hover="{ bg: 'gray.100' }"
    @click="onclick"
  >
    <CFlex
      w="100%"
      h="100%"
      border="1px"
      borderColor="gray.100"
      align="center"
      justify="center"
    >
      <CBox text-align="center">
        <CIcon name="add" mb="2" />
        <CText font-size="sm" @click="onclick">画像を追加</CText>
      </CBox>
    </CFlex>
  </CAspectRatioBox>
</template>
