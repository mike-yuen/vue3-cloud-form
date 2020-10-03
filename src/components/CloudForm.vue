<template>
  <div
    class="relative flex bg-white my-16 shadow-xl rounded-lg"
    style="width: 820px;"
  >
    <div class="w-full">
      <form class="form-register">
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
          </div>
          <div class="content float-right bg-white" style="width: 540px">
            <section class="block">
              <div class="py-0 px-12">
                <div class="text-center pt-8 px-6 pb-2">
                  <h3 class="text-2xl font-bold">Vue3 CloudForm</h3>
                  <p class="text-md text-gray-700 font-medium my-4">
                    Please enter your infomation and proceed to any action so
                    you can see the notify.
                  </p>
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
                      type="text"
                      class="w-full pt-1 pb-2 px-4 rounded focus:outline-none border border-gray-400"
                      name="ssn"
                      placeholder="Message..."
                      rows="3"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div class="actions float-right bg-white" style="width: 540px">
            <ul role="menu" class="flex justify-end px-12 mt-3 mb-8">
              <li class="flex items-center h-10 rounded-full bg-primary">
                <a class="text-white px-4 pb-1">Revoke to origin data</a>
              </li>
              <li class="flex items-center h-10 rounded-full bg-secondary ml-4">
                <a class="text-white px-4 pb-1">
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
import { defineComponent } from "vue";

export default defineComponent({
  name: "CloudForm"
});
</script>
