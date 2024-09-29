<template>
  <div ref="formPageTwo" class="formPageTwo">
    <form>

      <label for="subject">Subject:</label>
      <input type="text" id="subject" v-model="subject" required />
      <p v-if="errors.subject" class="error-message">{{ errors.subject }}</p>

      <label for="reason">Reason for Contact:</label>
      <select id="reason" v-model="reason" required class="contact-reason">
        <option disabled value="">Select reason</option>
        <option>Freelance Work</option>
        <option>Job Opportunity</option>
        <option>Collaboration</option>
        <option>General Inquiry</option>
      </select>
      <p v-if="errors.reason" class="error-message">{{ errors.reason }}</p>

      
      <label for="message">Message (Optional):</label>
      <textarea id="message" v-model="message"></textarea>
    </form>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useFormStore } from '@/stores/form';
import { gsap } from 'gsap'

export default {
  setup() {
    const formStore = useFormStore();
    const subject = ref(formStore.subject);
    const reason = ref(formStore.reason);
    const message = ref(formStore.message);
    const errors = ref({
      subject: '',
      reason: ''
    });

    const validateForm = () => {
      let isValid = true;
      if (!subject.value) {
        errors.value.subject = 'Subject is required';
        isValid = false;
      }
      if (!reason.value) {
        errors.value.reason = 'Reason is required';
        isValid = false;
      }

      return isValid;
    };

    onMounted(() => {
      gsap.fromTo(
        '.formPageTwo',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    });

    onBeforeUnmount(() => {
      formStore.setInquiryDetails(subject.value, reason.value, message.value);
    });

    return {
      subject,
      reason,
      message,
      errors,
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
.contact-reason{
  margin: 5px auto;
  margin-bottom: 10px;
  width: calc( 80% + 20px);
  background: #1e1f38;
  color: bisque;
  height: 10vh;
  min-height: 30px;
  max-height: 45px;
  border: 1px solid #2e2f50;
  border-radius: 15px;
}
textarea {
  margin: 5px auto;
  margin-bottom: 10px;
  max-width: 80%;
  min-width: 50%;
  width: 80%;
  border-radius: 15px;
  max-height: 50vh;
  color: rgb(110, 255, 224);
  background: #1e1f38;
  border: none;
  padding: 0 10px;
  font-size: 15px;
}
textarea:focus {
  outline: none;
}
select:focus {
  outline: none;
}

</style>
