<script lang="ts">
import Vue from 'vue'
import {
  CBox,
  CImage,
  CAspectRatioBox,
  CIcon,
  CMenu,
  CMenuButton,
  CMenuList,
  CMenuItem,
  CMenuDivider,
} from '@chakra-ui/vue'

export default Vue.extend({
  components: {
    CBox,
    CImage,
    CAspectRatioBox,
    CIcon,
    CMenu,
    CMenuButton,
    CMenuList,
    CMenuItem,
    CMenuDivider,
  },
  props: {
    imageUrl: {
      type: String,
      default: '',
    },
  },
  computed: {},
  methods: {},
})
</script>

<template>
  <CAspectRatioBox max-w="160px" :ratio="1" position="relative">
    <CBox w="100%" h="100%" border="1px" borderColor="gray.200">
      <CImage w="100%" h="100%" :src="imageUrl" object-fit="contain" />

      <CBox pos="absolute" top="8px" right="8px">
        <CMenu v-slot="{ isOpen }">
          <CMenuButton
            fontSize="sm"
            opacity="0.8"
            p="2"
            :_hover="{ opacity: 1.0 }"
            :isActive="isOpen"
            :rightIcon="isOpen ? 'chevron-up' : 'chevron-down'"
          >
            設定
          </CMenuButton>
          <CMenuList minW="auto" w="120px" :placement="'bottom-end'">
            <CMenuItem fontSize="sm">
              <CIcon size="4" name="arrow-left" mr="2" />
              左へ移動
            </CMenuItem>
            <CMenuItem fontSize="sm">
              <CIcon size="4" name="arrow-right" mr="2" />
              右へ移動
            </CMenuItem>
            <CMenuDivider />
            <CMenuItem color="red" fontSize="sm">
              <CIcon size="4" name="trash-can" mr="2" />
              削除
            </CMenuItem>
          </CMenuList>
        </CMenu>
      </CBox>
    </CBox>
  </CAspectRatioBox>
</template>
