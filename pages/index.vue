<template>
  <div class="container">
    <CStack
      spacing="6"
      direction="column"
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <!-- Title section  -->
      <CStack spacing="4" direction="row" align="center">
        <CHeading>nuxt-image-selector</CHeading>
        <CLink
          is-external
          href="https://github.com/akaneburyo/nuxt-image-selector"
        >
          <CIcon size="6" name="github" />
        </CLink>
      </CStack>

      <!-- Main section -->
      <CFlex justify="center" direction="row" align="stretch">
        <CBox w="160px" bg="gray.50" :p="4">
          <CText font-size="md">商品画像</CText>
        </CBox>

        <CStack>
          <CSimpleGrid :p="4" :columns="4" :spacing="4" min-width="512px">
            <SelectedImageCard :imageUrl="'https://placehold.jp/150x150.png'" />
            <SelectedImageCard :imageUrl="'https://placehold.jp/150x150.png'" />
            <SelectedImageCard :imageUrl="'https://placehold.jp/150x150.png'" />
            <SelectedImageCard :imageUrl="'https://placehold.jp/150x150.png'" />
            <SelectedImageCard :imageUrl="'https://placehold.jp/150x150.png'" />

            <AddButton @click="addimage" />
          </CSimpleGrid>

          <CButton variant-color="green" :is-loading="isLoading" @click="submit"
            >保存</CButton
          >
        </CStack>
      </CFlex>
    </CStack>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  CBox,
  CFlex,
  CStack,
  CSimpleGrid,
  CHeading,
  CButton,
  CText,
  CIcon,
  CLink,
} from '@chakra-ui/vue'

import SelectedImageCard from '@/components/ProductImage/SelectedImageCard/Card.vue'
import AddButton from '@/components/ProductImage/AddButton/Button.vue'

type Image = {
  id: string
  raw: File
  url: string
  order: number
}

type Data = {
  isLoading: boolean
  selectedImages: Image[]
}

export default Vue.extend({
  name: 'IndexPage',
  components: {
    CBox,
    CSimpleGrid,
    CButton,
    CFlex,
    CStack,
    CHeading,
    CText,
    CIcon,
    CLink,
    SelectedImageCard,
    AddButton,
  },
  data(): Data {
    return {
      isLoading: false,
      selectedImages: [],
    }
  },

  methods: {
    addimage() {
      // TODO
    },

    submit() {
      // TODO: submit
      this.isLoading = false

      setTimeout(() => {
        this.isLoading = false
      }, 2500)
    },
  },
})
</script>
