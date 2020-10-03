<template>
  <div class="w-full flex justify-center mx-auto">
    <CloudForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CloudForm from "@/components/CloudForm.vue";

export default defineComponent({
  name: "Home",
  components: {
    CloudForm
  }
});
</script>
