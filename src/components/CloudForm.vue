<template>
  <div
    class="relative flex bg-white my-16 shadow-xl rounded-lg"
    style="width: 820px;"
  >
    <div class="w-full">
      <form @submit.prevent="updateFirebase" @input="fieldUpdate">
        <div class="block w-full overflow-hidden bg-primary rounded-lg">
          <div class="steps float-left bg-primary" style="width: 280px">
            <ul class="p-0 m-0">
              <li class="relative cursor-pointer">
                <a class="outline-none">
                  <div class="flex items-center px-6 py-3">
                    <p class="w-10 h-10 m-3 ml-0 rounded-full bg-white">
                      <span
                        class="flex w-full h-full justify-center items-center"
                      >
                        <img src="@/assets/logo.png" width="30" />
                      </span>
                    </p>
                    <span class="text-white font-bold">Vue3 CloudForm</span>
                  </div>
                </a>
              </li>
            </ul>
            <Notification :state="state" />
          </div>
          <div class="content float-right bg-white" style="width: 540px">
            <section class="block">
              <div class="py-0 px-12">
                <div class="text-center pt-8 pb-4">
                  <h3 class="text-2xl font-bold">Vue3 CloudForm</h3>
                  <div class="flex justify-between items-center">
                    <p class="text-md text-secondary font-medium my-4">
                      Vue Form State:
                    </p>
                    <span class="p-1 px-3 bg-blue-200 text-sm text-blue-600">
                      {{ state == "" ? "waiting for changes" : state }}
                    </span>
                  </div>
                  <hr />
                </div>
                <div class="flex relative -mx-2">
                  <!-- First Name -->
                  <div class="relative px-2 mb-4 w-1/2">
                    <fieldset
                      class="rounded px-4 border border-gray-400 text-left"
                    >
                      <legend class="text-xs font-medium text-gray-600">
                        First Name
                      </legend>
                      <input
                        type="text"
                        class="w-full pt-1 pb-2 focus:outline-none"
                        name="first-name"
                        placeholder="First Name"
                        autocomplete="off"
                        v-model="formData.firstname"
                      />
                    </fieldset>
                  </div>
                  <!-- Last Name -->
                  <div class="relative px-2 mb-4 w-1/2">
                    <fieldset
                      class="rounded px-4 border border-gray-400 text-left"
                    >
                      <legend class="text-xs font-medium text-gray-600">
                        Last Name
                      </legend>
                      <input
                        type="text"
                        class="w-full pt-1 pb-2 focus:outline-none"
                        name="last-name"
                        placeholder="Last Name"
                        v-model="formData.lastname"
                      />
                    </fieldset>
                  </div>
                </div>
                <!-- Your Email -->
                <div class="flex relative -mx-2">
                  <div class="relative px-2 mb-4 w-full">
                    <fieldset
                      class="rounded px-4 border border-gray-400 text-left"
                    >
                      <legend class="text-xs font-medium text-gray-600">
                        Your Email (no validation)
                      </legend>
                      <input
                        type="text"
                        name="your_email"
                        class="w-full pt-1 pb-2 focus:outline-none"
                        placeholder="example@email.com"
                        v-model="formData.email"
                      />
                    </fieldset>
                  </div>
                </div>
                <!-- Your phone -->
                <div class="flex relative -mx-2">
                  <div class="relative px-2 mb-4 w-full">
                    <fieldset
                      class="rounded px-4 border border-gray-400 text-left"
                    >
                      <legend class="text-xs font-medium text-gray-600">
                        Phone Number
                      </legend>
                      <input
                        type="text"
                        class="w-full pt-1 pb-2 focus:outline-none"
                        name="phone"
                        placeholder="+1 888-999-7777"
                        v-model="formData.phone"
                      />
                    </fieldset>
                  </div>
                </div>
                <hr class="my-4" />
                <div class="flex relative -mx-2">
                  <div class="relative px-2 mb-4 w-full text-left ">
                    <label class="block text-sm font-medium text-gray-600 mb-2">
                      Your Note:
                    </label>
                    <textarea
                      class="w-full pt-1 pb-2 px-4 rounded focus:outline-none border border-gray-400"
                      name="ssn"
                      placeholder="Message..."
                      rows="3"
                      v-model="formData.note"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div class="actions float-right bg-white" style="width: 540px">
            <ul role="menu" class="flex justify-end px-12 mt-3 mb-8">
              <li class="flex items-center h-10 rounded-full bg-primary">
                <a
                  class="text-white px-4 pb-1 cursor-pointer"
                  @click="revokeData"
                >
                  Revoke to origin data
                </a>
              </li>
              <li
                v-if="state === 'modifying'"
                class="flex items-center h-10 rounded-full bg-secondary ml-4"
              >
                <a
                  class="text-white px-4 pb-1 cursor-pointer"
                  @click="updateFirebase"
                >
                  Save changes
                </a>
              </li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import debounce from "lodash/debounce";
import {
  getCloudForm,
  setCloudForm,
  checkSyncProgress
} from "@/services/firebaseServices";
import { CloudformData } from "@/interface/cloudformData.interface";
import Notification from "@/components/Notification.vue";

export default defineComponent({
  name: "CloudForm",
  components: {
    Notification
  },

  setup() {
    const state = ref("loading"); // synced, modifying, revoked, error
    const errorMessage = ref("");
    const formData = reactive<CloudformData>({});
    const originalData = reactive<CloudformData>({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      note: ""
    });

    function cloneData(source: CloudformData, object: CloudformData) {
      object.firstname = source.firstname || "";
      object.lastname = source.lastname || "";
      object.email = source.email || "";
      object.phone = source.phone || "";
      object.note = source.note || "";
    }

    async function getFirebaseData() {
      const data = await getCloudForm();
      if (!data) {
        setCloudForm(originalData);
      } else {
        cloneData(data, originalData);
      }
      cloneData(originalData, formData);
      state.value = "synced";
    }

    async function updateFirebase() {
      try {
        await setCloudForm(formData);
        state.value = "synced";
        checkSyncProgress();
      } catch (error) {
        errorMessage.value = JSON.stringify(error);
        state.value = "error";
      }
    }

    const debouncedUpdate = debounce(() => updateFirebase(), 1500);

    function fieldUpdate() {
      state.value = "modifying";
      debouncedUpdate();
    }

    async function revokeData() {
      cloneData(originalData, formData);
      await updateFirebase();
      state.value = "revoked";
    }

    // created
    getFirebaseData();

    return {
      state,
      formData,
      originalData,
      errorMessage,
      updateFirebase,
      fieldUpdate,
      revokeData
    };
  }
});
</script>
