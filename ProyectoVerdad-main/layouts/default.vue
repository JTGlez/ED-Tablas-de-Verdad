<template>
  <div>
    <Navbar />
    <Head />
    <Nuxt class="h-min" />
    <Footer />
  </div>
</template>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.mt-1 {
  margin: 15px;
  display: inline-block;
  border-radius: 5px;
  background-color: #4db8ff;
  border: 1px solid #1929b469;
  color: #ffffff;
  text-decoration: none;
  padding: 5px 20px;
}

.mt-1:hover {
  color: #fff;
  background-color: #0b5a9b;
}

body {
  background-image: url(../assets/img/fondo.jpg);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
}

.h-min {
  min-height: 100vh;
}
</style>
