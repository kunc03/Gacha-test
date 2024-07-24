<template>
  <div class="grow flex flex-col">
    <Header>
      <p
        style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)"
        class="text-black font-bold text-exd-1824.52"
      >
        パスワード入力
      </p>
    </Header>

    <div class="flex flex-col grow items-center justify-center">
      <div
        class="flex flex-col gap-4 pt-exd-81 pb-exd-60 justify-center items-center"
      >
        <p>パスワードを入力してください</p>
        <InputOtp v-model="value" class="!flex !flex-row !gap-3" />
      </div>
      <div class="grow w-full flex flex-col gap-5">
        <div
          class="bg-exd-banana mx-3 font-bold text-exd-gray-scorpion text-exd-1424 p-5"
        >
          パスワードは「名古屋観光デジタルマップ」　 で このスポットを探してGET!
        </div>
        <div class="w-full grow bg-gray-100 p-5 relative flex flex-col">
          <div class="overflow-y-auto grow max-h-[calc(100dvh-550px)]">
            <p class="font-bold text-exd-1424 text-exd-gray-scorpion">
              注意事項
            </p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas
            in hic temporibus vel maxime fuga distinctio consequatur ut odio
            possimus, neque aperiam at, quis molestiae iusto, mollitia quo
            eveniet? Facilis pariatur natus voluptatibus modi dolorem. Beatae
            eos reiciendis doloribus, laboriosam similique amet tempore ab
            reprehenderit adipisci. Illo iusto praesentium enim. Iste, commodi
            excepturi. Illum, quam doloribus itaque quo repudiandae debitis a
            harum ea nisi quis repellendus vero nostrum facere corporis, ullam
            accusantium! Sit mollitia hic suscipit nisi facere a? Nostrum
            commodi, ipsum aperiam corrupti nihil, at laboriosam vitae eos
            magnam fugit consectetur quis porro? Ullam qui tenetur
            exercitationem. Exercitationem ab itaque incidunt pariatur vitae
            atque cum quam dolores fugiat tempore? Recusandae sint officiis
            unde. Ex sunt doloremque assumenda, dicta reprehenderit quos
            consequuntur delectus porro suscipit temporibus repellendus
            voluptatem fugit maxime ipsa illo quod iure eveniet fuga in unde
            excepturi, totam, nemo explicabo nostrum? Asperiores harum eos fugit
            beatae! Numquam autem corrupti labore, iste libero fugit beatae!
            Facere veritatis maxime, deserunt perspiciatis explicabo corporis
            itaque. Iusto ipsum repellat maxime culpa? Quae, voluptatem nostrum
            corrupti quibusdam nesciunt eveniet exercitationem! Voluptatibus et
            natus aliquid a. Ipsum, voluptatibus similique consectetur qui
            praesentium impedit. Accusantium voluptatum aspernatur, illum odit
            veritatis doloribus, magnam maiores dicta laborum, doloremque ipsa
            hic! Fugiat velit repudiandae similique explicabo, nobis officia
            rerum illo voluptatem eius? Distinctio sunt vel fugit rerum
            corporis, qui quibusdam veritatis pariatur rem blanditiis, mollitia
            adipisci voluptates consequatur est autem expedita tempore, quod ea!
            Qui repellat pariatur in, harum dicta aperiam dolore dignissimos
            alias consequuntur, temporibus voluptatem quibusdam blanditiis
            dolorum animi laboriosam, delectus dolorem tempora illo rerum quo.
            Doloremque soluta minima impedit adipisci rerum consectetur
            doloribus necessitatibus perferendis quam deleniti ex nemo,
            laudantium quae voluptas reprehenderit magni neque in vel ea? Ullam
            dolores nemo a soluta enim eaque exercitationem accusantium
            recusandae explicabo quisquam quos aut consequatur adipisci facere,
            minima cumque temporibus voluptas ab quia eum ipsam quod
            necessitatibus magnam sint. Veritatis obcaecati repudiandae impedit
            totam magni cumque minus laborum repellendus cupiditate voluptas
            magnam adipisci earum dolores, explicabo deleniti vero? Nesciunt eum
            nostrum quibusdam incidunt omnis consequuntur deserunt. Delectus
            consectetur suscipit possimus soluta distinctio dolorem, repellat
            dolore ratione nemo aliquid ab, blanditiis laborum error omnis
            ducimus eius maiores ipsum corporis similique labore corrupti eaque.
            Cupiditate nihil ipsum debitis officia veritatis, provident
            repudiandae obcaecati? Sapiente, quas voluptatem ut dolores
            similique explicabo adipisci velit debitis aperiam molestiae
            deleniti, commodi vero. Hic, velit quam illo temporibus atque eum
            laborum repellendus odio distinctio.
          </div>

          <Button
            class="!inset-x-1/2 !z-50 !mb-3 !-translate-x-1/2 !-translate-y-1/4 !absolute !bottom-1 !bg-exd-gold !py-4 !w-exd-312 !uppercase !font-bold !text-exd-1424 !rounded-full !text-white !flex !flex-row !justify-between !px-5"
            raised
          >
            <span class="grow text-center">GO!</span>
            <NuxtImg
              src="/arrow.svg"
              alt="arrow"
              width="10"
              height="10"
              preload
              class="shrink-0"
            />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import InputOtp from 'primevue/inputotp'
import Header from '~/components/header.vue'
</script>

<style scoped>
::v-deep(.p-inputtext) {
  @apply border border-exd-gray-44 bg-white w-exd-40 h-exd-50;
}
</style>
