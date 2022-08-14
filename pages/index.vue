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
  raw?: File
  url: string
  order: number
}

type Data = {
  isLoading: boolean
  selectedImages: Image[]
  removedImages: Image[]
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
      removedImages: [],
    }
  },

  methods: {
    addImage() {
      if (this.$refs.input) {
        ;(this.$refs.input as HTMLInputElement).click()
      }
    },

    onImageSelected(event: Event) {
      // TODO: eventに適切な方を設定し、asを使わないように修正する
      const input = event.target as HTMLInputElement

      if (input.files?.length && input.files?.length > 0) {
        const max = this.selectedImages.length
        Array.from(input.files).forEach((file, index) => {
          this.selectedImages.push({
            id: this.$utils.getRandomString(),
            raw: file,
            url: URL.createObjectURL(file),
            order: max + index,
          })
        })
      }

      input.files = null
      input.value = ''
    },

    moveToLeft(id: string) {
      const target = this.selectedImages.find((image) => image.id === id)
      const prevImage =
        target &&
        this.selectedImages.find((image) => image.order === target.order - 1)

      if (target && prevImage) {
        target.order -= 1
        prevImage.order += 1
      }
      this.selectedImages.sort((a, b) => a.order - b.order)
    },

    moveToRight(id: string) {
      const target = this.selectedImages.find((image) => image.id === id)
      const nextImage =
        target &&
        this.selectedImages.find((image) => image.order === target.order + 1)

      if (target && nextImage) {
        target.order += 1
        nextImage.order -= 1
      }
      this.selectedImages.sort((a, b) => a.order - b.order)
    },

    onRemoved(id: string) {
      const target = this.selectedImages.find((image) => image.id === id)
      if (target) {
        this.removedImages.push(target)
        this.selectedImages = this.selectedImages
          .filter((image) => image.id !== id)
          .map((image, index) => ({ ...image, order: index }))
      }
    },

    submit() {
      // TODO: submit
      this.isLoading = true

      setTimeout(() => {
        this.isLoading = false
      }, 2500)
    },
  },
})
</script>

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

        <CStack
          :p="4"
          spacing="4"
          align="center"
          border="1px"
          borderColor="gray.100"
        >
          <CSimpleGrid :columns="4" :spacing="4" w="640px">
            <SelectedImageCard
              v-for="image in selectedImages"
              :key="image.id"
              :imageUrl="image.url"
              @toLeft="moveToLeft(image.id)"
              @toRight="moveToRight(image.id)"
              @onRemoved="onRemoved(image.id)"
            />
            <AddButton @click="addImage" />
          </CSimpleGrid>

          <input
            ref="input"
            type="file"
            accept="image/jpeg, image/jpg, image/png"
            multiple
            style="display: none"
            @change="onImageSelected"
          />
          <CButton
            variantColor="green"
            w="120px"
            :isLoading="isLoading"
            @click="submit"
          >
            保存
          </CButton>
        </CStack>
      </CFlex>
    </CStack>
  </div>
</template>
