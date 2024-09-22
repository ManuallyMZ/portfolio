<template>
  <div ref="formPageOne" class="formPageOne">
    <form>
      <!-- Name Input -->
      <label for="fullName">Name:</label>
      <input type="text" id="fullName" v-model="fullName" required />
      <p v-if="errors.fullName" class="error-message">{{ errors.fullName }}</p>

      <!-- Email Input -->
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />
      <p v-if="errors.email" class="error-message">{{ errors.email }}</p>

      <!-- Phone Number (Optional) -->
      <label for="phone">Phone Number (Optional):</label>
      <input type="tel" id="phone" ref="phoneInput" v-model="phone" />
      <p v-if="errors.phone" class="error-message">{{ errors.phone }}</p>
    </form>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useFormStore } from '../../stores/form';
import { gsap } from 'gsap';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';

export default {
  setup() {
    const formStore = useFormStore();
    const fullName = ref(formStore.fullName);
    const email = ref(formStore.email);
    const phone = ref(formStore.phone);
    const countryCode = ref(''); // Reactive variable to store country code
    const errors = ref({
      fullName: '',
      email: '',
      phone: ''
    });
    
    let phoneInput = null;
    let iti = null;

    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    };

    const validatePhone = (phone) => {
      const phonePattern = /^[+\d]?(?:[\d-.\s()]*)$/;
      return phone ? phonePattern.test(phone.trim()) : true;
    };

    const validateForm = () => {
      console.log('validateForm called');
      let isValid = true;
      errors.value = { // Reset errors
        fullName: '',
        email: '',
        phone: ''
      };
      if (!fullName.value) {
        errors.value.fullName = 'Full name is required';
        isValid = false;
      }
      if (!email.value) {
        errors.value.email = 'Email is required';
        isValid = false;
      } else if (!validateEmail(email.value)) {
        errors.value.email = 'Please enter a valid email address';
        isValid = false;
      }
      console.log('Phone:', phone.value);
      console.log('Country Code:', countryCode.value);
      
      if (phone.value && !validatePhone(phone.value)) {
        errors.value.phone = 'Please enter a valid phone number';
        isValid = false;
      }
      console.log('Countryyyyyyyyy', !(!countryCode.value));
      if (phone.value && !countryCode.value) {
        console.log('Countryyyyyyyyy');
        errors.value.phone = 'Please enter select a country code if a number is provided';
        isValid = false;
      }
      return isValid;
    };

    onMounted(() => {
      phoneInput = document.querySelector('#phone');
      iti = intlTelInput(phoneInput, {
        separateDialCode: true,
        preferredCountries: ['us', 'gb'], // Modify as needed
        utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js'
      });
      const dropdown = document.querySelector('.iti__country-list');
      if (dropdown) {
        dropdown.style.zIndex = '2000'; // Ensure it appears above other elements
      }
      phoneInput.addEventListener('countrychange', () => {
        const selectedCountry = iti.getSelectedCountryData();
        countryCode.value = selectedCountry.dialCode; // Store the country code
      });

      gsap.fromTo(
        '.formPageOne',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    });

    onBeforeUnmount(() => {
      const shouldStoreCountryCode = phone.value ? countryCode.value : ''; // Only set countryCode if phone is provided
      console.log('Phone:', phone.value);
      console.log('Should Store Country Code:', shouldStoreCountryCode);
      formStore.setPersonalInfo(fullName.value, email.value, phone.value, shouldStoreCountryCode);
      if (iti) {
        iti.destroy();
      }
    });

    return {
      fullName,
      email,
      phone,
      countryCode,
      errors,
      validateForm
    };
  }
};
</script>

<style>
.formPageOne {
  display: flex;
  flex-flow: column;
}
label {
  display: block;
}
input {
  display: block;
  margin: 5px auto;
  padding: 0 10px;
  margin-bottom: 10px;
  width: 80%;
  border: none;
  height: 10vh;
  min-height: 30px;
  max-height: 45px;
  border-radius: 15px;
  background: #1e1f38;
  color: rgb(110, 255, 224);
  font-family: 'Roboto', sans-serif;
}
input:focus {
  outline: none;
  box-shadow: none;
}
.error-message {
  color: red;
  font-size: 12px;
}
.iti__tel-input {
  width: 100%;
}
.iti__dropdown-content {
  background: #313250;
  border: none;
  outline: none;
  z-index: 20000;
  position: absolute;
  padding: 2px;

}
.iti--inline-dropdown .iti__dropdown-content {
  border: none;
  border-radius: 15px;
}
.iti--inline-dropdown, .iti__dropdown-content {
  margin-top: 10px;
}
.iti__search-input {
  border-radius: 15px;
}
</style>
