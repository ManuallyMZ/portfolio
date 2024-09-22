<template>
  <div class="contact-modal">

    <div class="contactHeader"><h2>Find me on</h2></div>
    <div class="contactTelegram">
      <img src="../assets/SVG/Telegram.svg" alt="Telegram Icon" class="contactIcon">
      <p class="shineText"><a href="https://t.me/RMZ131" class="contactTelegramLink">RMZ131</a></p>
    </div>
    <div class="contactGithub">
      <img src="../assets/SVG/Github.svg" alt="Github Icon" class="contactIcon">
      <p class="shineText"><a href="https://github.com/ManuallyMZ" class="contactGithubLink">ManuallyMZ</a></p>
    </div>
    <div class="contactLinkedin">
      <img src="../assets/SVG/Linkedin.svg" alt="Linkedin Icon" class="contactIcon">
      <p class="shineText"><a href="https://www.linkedin.com/in/nima-ramezani-8271a8323/" class="contactLinkedinLink">Nima Ramezani</a></p>
    </div>
    <div class="contactEmail">
      <img src="../assets/SVG/Gmail.svg" alt="Gmail Icon" class="contactIcon">
      <p class="shineText"><a href="mailto:n.ramezani2002@gmail.com" class="contactEmailLink">n.ramezani2002</a></p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.contact-modal {
  position: relative;
  background-color: #313466;
  padding: 20px;
  border-radius: 15px;
  width: 80%;
  max-width: 600px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 4px 30px rgba(123, 4, 160, 0.3);
  box-sizing: border-box;
  padding-bottom: 60px;
  color: bisque;
  justify-content: center;
  font-family: 'Roboto', sans-serif;

}
.shineText, .contactHeader, .contactTelegram, .contactEmail, .contactGithub, .contactLinkedin {
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.shineText {
  opacity: 1;
  display: inline;
}
.shineText a:visited, a:link , a:hover , a:active {
  text-decoration: none;
  color: aliceblue;
  cursor: default;
}
.contactIcon {
  position: relative;
  width: 30px;
  height: 30px;
  margin-right: 5px;
}
</style>