<template>
  <footer>
    <div class="footer">
      This website is not officially produced by devicon. It is produced by
      monkey cat. If you have any questions related to the website, please post
      questions on
      <a href="https://github.com/a3510377/devicon" target="_blank">
        a3510377-devicon
      </a>
      . For other questions related to icons, please go to
      <a href="https://github.com/devicons/devicon" target="_blank">devicon</a>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  padding: 20px 0;
  margin-top: 60px;
  background-color: #81848d;

  .footer {
    width: 80%;
    height: 70px;
    margin: 0 auto;
    font-size: 15pt;
    color: #e8eaed;

    @media all and (max-width: 900px) {
      font-size: 2.2vw;
    }
    @media all and (max-width: 300px) {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
<style>
:root {
  --footer-height: 170px;
}
</style>
