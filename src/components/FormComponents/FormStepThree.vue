<template>
  <div ref="formPageThree" class="formPageThree">
    <form>
      
      <label>Preferred Contact Method:</label>
      <div class="radio-group">
        <div class="radio-group-container">
          <input type="radio" id="email" value="Email" v-model="preferredContact" required />
          <input type="radio" id="phone" value="Phone" v-model="preferredContact" required />
          <input type="radio" id="telegram" value="Telegram" v-model="preferredContact" required />
        </div>
        <div class="radio-group-container">
          <label for="email">Email</label>
          <label for="phone">Phone</label>
          <label for="telegram">Telegram</label>
        </div>
      </div>
      <p v-if="errors.preferredContact" class="error-message">{{ errors.preferredContact }}</p>

      
      <label for="attachment">Attach File (Optional):</label>
      <input type="file" id="attachment" @change="handleFileUpload" class="contact-file"/>

    
      <label for="meetingDate">Preferred Meeting Date (Optional):</label>
      <input type="date" id="meetingDate" v-model="meetingDate" />

    
      <label for="budget">Budget (Optional):</label>
      <input type="number" id="budget" v-model="budget" placeholder="$"/>
    </form>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useFormStore } from '../../stores/form';
import { gsap } from 'gsap'

export default {
  setup() {
    const formStore = useFormStore();
    const preferredContact = ref(formStore.preferredContact);
    const attachment = ref(formStore.attachment);
    const meetingDate = ref(formStore.meetingDate);
    const budget = ref(formStore.budget);
    const errors = ref({
      preferredContact: ''
    });

    const handleFileUpload = (event) => {
      attachment.value = event.target.files[0];
    };

    const validateForm = () => {
      let isValid = true;
      if (!preferredContact.value) {
        errors.value.preferredContact = 'Please select a contact method';
        isValid = false;
      }
      return isValid;
    };

    onMounted(() => {
      gsap.fromTo(
        '.formPageThree',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    });

    onBeforeUnmount(() => {
      formStore.setAdditionalInfo(
        preferredContact.value,
        attachment.value,
        meetingDate.value,
        budget.value
      );
    });

    return {
      preferredContact,
      attachment,
      meetingDate,
      budget,
      errors,
      handleFileUpload,
      validateForm
    };
  }
};
</script>

<style>
.error-message {
  color: red;
  font-size: 12px;
}
.radio-group {
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
}
.radioEmail, .radioPhone, .radioTelegram {
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
}
.radio-group input {
  margin: 0 2px 0 0;
  height: 2vh;
  min-height: 15px;
  min-width: 15px;
}
.contact-file {
  display: flex;
  align-content: center;
  align-items: center;
}
.radio-group-container {
  height: 10vh;
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
  justify-content: space-evenly;
  min-height: 65px;
  max-height: 130px;
}
</style>
