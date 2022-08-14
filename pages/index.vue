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
  CModal,
  CModalOverlay,
  CModalContent,
  CModalHeader,
  CModalBody,
  CModalCloseButton,
  CCode,
} from '@chakra-ui/vue'

import SelectedImageCard from '@/components/ProductImage/SelectedImageCard/Card.vue'
import AddButton from '@/components/ProductImage/AddButton/Button.vue'

// Types
import type {
  Image,
  PostOrdersRequest,
  DeleteImageRequest,
  PostNewImageRequest,
} from '@/types/api'

type ModalContent = {
  isOpen: boolean
  title: string
  code?: string
}

type Data = {
  selectedImages: Image[]
  removedImages: Image[]
  isLoading: boolean
  modalContent?: ModalContent
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
    CModal,
    CModalOverlay,
    CModalContent,
    CModalHeader,
    CModalBody,
    CModalCloseButton,
    CCode,
    SelectedImageCard,
    AddButton,
  },
  data(): Data {
    return {
      selectedImages: [],
      removedImages: [],
      isLoading: false,
      modalContent: undefined,
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
            previewUrl: URL.createObjectURL(file),
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

    async submit() {
      this.isLoading = true

      // register new images
      const newImagesRequests: PostNewImageRequest[] = this.selectedImages
        .filter((image) => !!image.raw)
        .map((image) => {
          const body: PostNewImageRequest = new FormData()
          body.append('id', image.id)
          image.raw && body.append('raw', image.raw)
          return body
        })

      // delete images
      const deletedImagesRequests: DeleteImageRequest[] =
        this.removedImages.map((image) => ({ id: image.id }))

      // register orders
      const ordersRequest: PostOrdersRequest = {
        images: this.selectedImages.map((image) => ({
          id: image.id,
          order: image.order,
        })),
      }

      await Promise.all([
        ...newImagesRequests.map((body) =>
          this.$axios.post(this.$constants.api.path.postNewImage, body, {
            headers: {
              'content-type': 'multipart/form-data',
            },
          })
        ),
        ...deletedImagesRequests.map((body) =>
          this.$axios.delete(
            this.$constants.api.path.deleteImage.replace(':id', body.id)
          )
        ),
        this.$axios.post(this.$constants.api.path.postOrders, ordersRequest),
      ])
        .then((results) => {
          this.openModal({
            title: 'Success.',
            code: results
              ?.map((result) => JSON.stringify(result.data, null, 2))
              .join('\n\n'),
          })
        })
        .catch((e) => {
          this.$toast({
            title: 'Error.',
            description: JSON.stringify(e),
            status: 'error',
            duration: 10000,
          })
        })
        .finally(() => {
          this.isLoading = false
        })
    },

    openModal(content: Omit<ModalContent, 'isOpen'>) {
      this.modalContent = {
        ...content,
        isOpen: true,
      }
    },

    closeModal() {
      if (this.modalContent) this.modalContent.isOpen = false
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
              :imageUrl="image.previewUrl"
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

    <!-- Modal -->
    <CModal
      :is-open="modalContent?.isOpen"
      :on-close="closeModal"
      size="full"
      scrollBehavior="inside"
    >
      <CModalContent ref="content">
        <CModalHeader>{{ modalContent?.title }}</CModalHeader>
        <CModalCloseButton />
        <CModalBody>
          <CCode whiteSpace="pre-wrap">{{ modalContent?.code }}</CCode>
        </CModalBody>
      </CModalContent>
      <CModalOverlay />
    </CModal>
  </div>
</template>
