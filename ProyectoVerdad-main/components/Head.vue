<template>
  <b-container class="mt-3">
    <b-row align-v="center" class="d-none d-lg-flex">
      <b-col>
        <img
          src="@/assets/img/logo2.png"
          alt="UNAM"
          align="left"
          class="img-fluid d-none d-md-inline logo"
        />
      </b-col>
      <b-col cols>
       <img
          src="@/assets/img/unam.png"
          alt="UNAM"
          align="left"
          class="img-fluid d-none d-md-inline logo"
        />
        </b-col>
<!--
        <b-col>
          <p class="text-center lead">
            Universidad Nacional Autónoma de México
            <br />
            Facultad de Ingeniería
            <br />
            Estructuras Discretas
          </p>
        </b-col>
   -->
      <b-col cols>
        <img
          src="@/assets/img/logo.png"
          alt="UNAM"
          align="right"
          class="img-fluid d-none d-md-inline logo"
        />
      </b-col>
    </b-row>




<!--CUANDO SE HACE MAS PEQUEÑO-->

    <b-row class="d-flex d-lg-none" align-h="between">
      <b-col cols="12">
        <img
          src="@/assets/img/logo2.png"
          alt="UNAM"
          class="img-fluid logo"
        />
      </b-col>
      <b-col cols="12">
        <b-col>
      <img
          src="@/assets/img/unam.png"
          alt="UNAM"
          class="img-fluid logo my-2"
        />
          <!--
          <p class="text-center lead">
            Universidad Nacional Autónoma de México
            <br />
            Facultad de Ingeniería
            <br />
            Estructuras Discretas
          </p>
          -->
        </b-col>
      </b-col>

      <b-col cols="12">
        <img
          src="@/assets/img/logo.png"
          alt="UNAM"
          class="img-fluid  logo"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<style>
.logo {
  display: block;
  margin: 0 auto;
  height: 150px;
}
</style>
