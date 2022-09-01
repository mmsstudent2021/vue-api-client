<template>
  <div class="container">
    <div class="row my-4">
      <div class="col-12">
        <h1>Product Edit</h1>
        <hr>
        <form action="" @submit.prevent="updateProduct" ref="productEdit">
          <div class="row">
            <div class="col">
              <div class="mb-3">
                <Input label="Product Name" name="name" :value="product.name" :errors="errors" />
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <Input label="Price" type="number" :value="product.price" name="price" :errors="errors"  />
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <Input label="Stock" type="number" :value="product.stock" name="stock" :errors="errors"  />
              </div>
            </div>
            <div class="col-12 text-center">
              <button :disabled="isLoading" class="btn btn-lg btn-primary">
                <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Update Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Input from "@/components/Input";
import {mapGetters} from "vuex";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      errors: {},
      isLoading : false,
      product : {}
    }
  },
  components: {Input},
  computed: {
    ...mapGetters([
        'getUrl'
    ])
  },
  methods: {
    showToast(icon,message){

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: icon,
        title: message
      })
    },
    updateProduct() {
      this.isLoading = true
      let formData = new FormData(this.$refs.productEdit);
      axios.put(this.getUrl('/products/'+this.$route.params.id),new URLSearchParams(formData).toString())
          .then(res => {
            console.log(res)
            this.errors = {}
            if(res.data.success === true){
              this.showToast('success',res.data.message)
              this.product = res.data.product
              this.$router.push('/product')
            }
          })
          .catch(e => {
            console.log(e)
            if(e.response.status === 422){

              this.errors = e.response.data.errors

              this.showToast('error',e.response.data.message)

            }
          })
          .finally(_=>this.isLoading = false)
    },
    fetchProduct(id){
      axios.get(this.getUrl('/products/'+id))
          .then(res => this.product = res.data.data)
    }
  },
  mounted() {
   this.fetchProduct(this.$route.params.id)
  }
}
</script>

<style scoped>

</style>