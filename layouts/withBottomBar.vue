<template>
  <main
    class="w-full max-w-md mx-auto min-h-dvh max-h-full overflow-hidden bg-white flex flex-col relative bg-[url('assets/images/bg-red2.svg')] bg-cover bg-center"
  >
    <Header :hasBack="hasBack">
      <p
        style="text-shadow: 0 3px 3px rgba(0, 0, 0, 0.16)"
        class="text-exd-gray-scorpion font-bold text-exd-1824.52"
      >
        {{ title }}
      </p>
    </Header>

    <slot />
    <BottomBar />
  </main>
</template>

<script setup>
const layoutCustomProps = useAttrs()

const hasBack = ref(layoutCustomProps.hasBack ?? false)
console.log(hasBack.value)
const title = ref(layoutCustomProps.title)
</script>
